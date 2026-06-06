import os
import json
import smtplib
import urllib.request
import urllib.parse
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки на прайс на почту и в Telegram"""

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

    if not contact:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Контакт обязателен'})
        }

    message_lines = ['📦 Новая заявка на прайс-лист FirstOpt']
    if name:
        message_lines.append(f'👤 Имя: {name}')
    message_lines.append(f'📱 Контакт: {contact}')
    if email:
        message_lines.append(f'✉️ E-mail: {email}')

    text = '\n'.join(message_lines)

    send_telegram(text)
    send_email(name, contact, email)

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }


def send_telegram(text: str):
    token = os.environ['TELEGRAM_BOT_TOKEN']
    chat_id = '@alexparfopt'
    url = f'https://api.telegram.org/bot{token}/sendMessage'
    data = urllib.parse.urlencode({'chat_id': chat_id, 'text': text}).encode()
    req = urllib.request.Request(url, data=data, method='POST')
    urllib.request.urlopen(req, timeout=10)


def send_email(name: str, contact: str, email: str):
    smtp_user = 'parfopt-1@yandex.ru'
    smtp_password = os.environ['SMTP_PASSWORD']

    msg = MIMEMultipart('alternative')
    msg['Subject'] = 'Новая заявка на прайс-лист FirstOpt'
    msg['From'] = smtp_user
    msg['To'] = smtp_user

    lines = ['<h3>📦 Новая заявка на прайс-лист FirstOpt</h3><ul>']
    if name:
        lines.append(f'<li><b>Имя:</b> {name}</li>')
    lines.append(f'<li><b>Контакт:</b> {contact}</li>')
    if email:
        lines.append(f'<li><b>E-mail:</b> {email}</li>')
    lines.append('</ul>')

    msg.attach(MIMEText(''.join(lines), 'html', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.yandex.ru', 465) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, smtp_user, msg.as_string())
