import { X } from "lucide-react";

interface PageHeaderProps {
  onOpenModal: (e: React.MouseEvent) => void;
}

const PageHeader = ({ onOpenModal }: PageHeaderProps) => {
  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-2xl border-b border-accent/20 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center">
        <div className="flex items-center">
          <div className="font-display font-bold text-2xl tracking-tighter bg-gradient-to-r from-white via-accent to-accent/80 bg-clip-text text-transparent">
            FirstOpt
          </div>
        </div>
        <nav className="hidden md:flex gap-10 text-sm font-medium">
          <a href="#features" className="text-muted-foreground hover:text-white transition-colors">
            Преимущества
          </a>
          <a href="#how" className="text-muted-foreground hover:text-white transition-colors">
            Как это работает
          </a>
          <a href="#pricing" className="text-muted-foreground hover:text-white transition-colors">
            О нас
          </a>
        </nav>
        <div className="flex gap-2 sm:gap-3">
          <a
            href="https://t.me/alexparfopt"
            className="hidden sm:block px-5 py-2.5 text-sm font-medium border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all"
          >
            Telegram
          </a>
          <button
            onClick={onOpenModal}
            className="px-4 sm:px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-accent via-accent to-accent/80 text-black rounded-full hover:shadow-lg hover:shadow-accent/40 transition-all font-semibold whitespace-nowrap"
          >
            Получить прайс
          </button>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
