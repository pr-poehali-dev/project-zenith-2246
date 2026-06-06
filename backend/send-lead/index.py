import os
import json
import smtplib
import logging
import psycopg2
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def handler(event: dict, context) -> dict:
    """Отправка заявки на прайс на почту и сохранение в БД"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    contact = body.get('contact', '').strip()
    email = body.get('email', '').strip()

    logger.info(f"Новая заявка: contact={contact}")

    if not contact:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Контакт обязателен'})
        }

    # Сохраняем в БД всегда
    try:
        schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
        conn = psycopg2.connect(os.environ['DATABASE_URL'], sslmode='disable')
        cur = conn.cursor()
        cur.execute(
            f"INSERT INTO {schema}.leads (name, contact, email) VALUES (%s, %s, %s)",
            (name or None, contact, email or None)
        )
        conn.commit()
        cur.close()
        conn.close()
        logger.info("БД: заявка сохранена")
    except Exception as e:
        logger.error(f"БД ошибка: {e}")

    # Отправляем на почту
    mail_error = None
    try:
        smtp_user = 'parfopt-1@yandex.ru'
        smtp_password = os.environ['SMTP_PASSWORD']

        msg = MIMEMultipart('alternative')
        msg['Subject'] = 'Новая заявка на прайс-лист FirstOpt'
        msg['From'] = smtp_user
        msg['To'] = smtp_user

        lines = ['<h3>Новая заявка на прайс-лист FirstOpt</h3><ul>']
        if name:
            lines.append(f'<li><b>Имя:</b> {name}</li>')
        lines.append(f'<li><b>Контакт:</b> {contact}</li>')
        if email:
            lines.append(f'<li><b>E-mail:</b> {email}</li>')
        lines.append('</ul>')
        msg.attach(MIMEText(''.join(lines), 'html', 'utf-8'))

        with smtplib.SMTP('smtp.yandex.ru', 587, timeout=20) as server:
            server.ehlo()
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.sendmail(smtp_user, smtp_user, msg.as_string())
        logger.info("Email: отправлено успешно")
    except Exception as e:
        mail_error = str(e)
        logger.error(f"Email ошибка: {e}")

    # Отправляем в Telegram через Bot API
    tg_error = None
    try:
        import requests as req_lib

        lines = ['🔔 Новая заявка на прайс-лист']
        if name:
            lines.append(f'👤 Имя: {name}')
        lines.append(f'📞 Контакт: {contact}')
        if email:
            lines.append(f'📧 Email: {email}')

        if contact.startswith('@'):
            tg_username = contact.lstrip('@')
            lines.append(f'\n💬 https://t.me/{tg_username}')
        else:
            phone = ''.join(c for c in contact if c in '0123456789+')
            if phone:
                lines.append(f'\n📞 tel:{phone}')

        tg_text = '\n'.join(lines)

        bot_token = os.environ['TELEGRAM_BOT_TOKEN']
        chat_id = os.environ['TELEGRAM_CHAT_ID']
        r = req_lib.post(
            f'https://api.telegram.org/bot{bot_token}/sendMessage',
            json={'chat_id': chat_id, 'text': tg_text},
            timeout=15
        )
        logger.info(f"Telegram API: {r.status_code} {r.text[:200]}")
    except Exception as e:
        tg_error = str(e)
        logger.error(f"Telegram ошибка: {e}")

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True, 'mail_error': mail_error, 'tg_error': tg_error})
    }