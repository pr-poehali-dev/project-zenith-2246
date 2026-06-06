import { X } from "lucide-react";

interface LeadModalProps {
  form: { name: string; contact: string; email: string };
  submitted: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onFormChange: (field: string, value: string) => void;
}

const LeadModal = ({ form, submitted, onClose, onSubmit, onFormChange }: LeadModalProps) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-background border border-accent/20 rounded-3xl p-8 w-full max-w-md shadow-2xl shadow-accent/10">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-muted-foreground hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="text-5xl mb-4">✓</div>
            <h3 className="text-2xl font-bold text-white mb-3">Заявка отправлена!</h3>
            <p className="text-muted-foreground">Мы свяжемся с вами и пришлём актуальный прайс-лист.</p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-display font-black text-white mb-2">Получить прайс-лист</h3>
            <p className="text-muted-foreground text-sm mb-6">Заполните форму — пришлём актуальный прайс с 92 000+ позиций.</p>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm text-white/70 mb-1.5">Ваше имя</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => onFormChange("name", e.target.value)}
                  placeholder="Иван Иванов"
                  className="w-full bg-white/5 border border-accent/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-accent/60 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-1.5">
                  Номер телефона / юзернейм Telegram <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.contact}
                  onChange={(e) => onFormChange("contact", e.target.value)}
                  placeholder="+7 999 123-45-67 или @username"
                  className="w-full bg-white/5 border border-accent/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-accent/60 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-1.5">E-mail</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => onFormChange("email", e.target.value)}
                  placeholder="example@mail.ru"
                  className="w-full bg-white/5 border border-accent/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-accent/60 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="mt-2 w-full py-4 bg-gradient-to-r from-accent to-accent/90 text-black rounded-xl font-bold text-base hover:shadow-lg hover:shadow-accent/40 transition-all"
              >
                Отправить заявку
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LeadModal;
