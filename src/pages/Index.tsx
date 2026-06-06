import { useEffect, useState } from "react";
import { ArrowRight, Package, Truck, Star, ShieldCheck, Clock, Users, X } from "lucide-react";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const reviewUrls = [
    "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/d981d827-ba42-4701-b8a4-eaed83a391d8.JPG",
    "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/a61eb943-dd8d-4805-873a-89d2b7982ae5.JPG",
    "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/748dc942-1bc7-4a50-81f8-febad9e88714.JPG",
    "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/621d5de0-07a3-4049-8b7b-80dae0fe39c9.JPG",
    "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/352b530d-153d-47b9-85e5-c86938c58840.JPG",
    "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/74a3d18a-179d-48b0-a3bf-f18fdc63db04.JPG",
    "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/9dce4c15-325a-4dd9-a556-55ad872e4083.JPG",
    "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/0300c764-825c-4dcd-90db-3fbafd5e9aea.JPG",
    "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/cef8fe87-264f-44ab-b66a-a1cb627a7526.JPG",
    "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/dab8f2e0-56e5-4e27-adb0-adf938b93ae7.JPG",
    "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/202aea84-caf5-4049-823d-811dbea861d1.JPG",
    "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/1b7159a7-cd66-4258-b250-f94ee04792e0.JPG",
    "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/d5f6a587-5ab2-4aa2-93a5-d0d6193f55b0.JPG",
    "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/dce00f25-7e12-4c57-a683-f924f522cd5d.JPG",
    "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/30691347-36b1-4305-9d38-04a87723a37f.JPG",
    "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/27732d88-d1cf-445d-ab3c-a69004405c5d.JPG",
    "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/1be0cf76-6607-47cd-a1e8-c050e6bebcb9.JPG",
    "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/38bb981d-d767-470c-8f9a-fc430abe9c73.JPG",
    "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/cbeaa636-776b-4e2b-99b7-53f726ee109d.JPG",
  ];

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setSubmitted(false);
    setForm({ name: "", contact: "", email: "" });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    fetch('https://functions.poehali.dev/5d91e12e-30c5-492c-9329-cdcf7cf28592', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
  };

  useEffect(() => {
    const observers: Record<string, IntersectionObserver> = {};

    const sectionIds = ["hero", "features", "how", "pricing", "cta"];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      observers[id] = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [id]: true }));
            observers[id].unobserve(element);
          }
        },
        { threshold: 0.15 }
      );

      observers[id].observe(element);
    });

    return () => {
      Object.values(observers).forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
              onClick={openModal}
              className="px-4 sm:px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-accent via-accent to-accent/80 text-black rounded-full hover:shadow-lg hover:shadow-accent/40 transition-all font-semibold whitespace-nowrap"
            >
              Получить прайс
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-32 px-6 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src="https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/files/decc27e4-3411-4e82-a745-4c3f4dd62f32.jpg"
            alt="Склад парфюмерии"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/75" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-1000 ${visibleSections["hero"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-black leading-tight mb-8 tracking-tighter">
                <span className="bg-gradient-to-br from-white via-white to-accent/40 bg-clip-text text-transparent">
                  Оригинальная
                </span>
                <br />
                <span className="text-accent">парфюмерия оптом</span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-xl font-light">
                Более 92 000 позиций по выгодным ценам с доставкой по РФ и СНГ. От 1 любой позиции — без предоплаты и минимальной суммы.
              </p>
              <div className="flex gap-4 mb-12 flex-col sm:flex-row">
                <button
                  onClick={openModal}
                  className="group px-8 py-4 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full hover:shadow-2xl hover:shadow-accent/50 transition-all font-semibold text-lg flex items-center gap-3 justify-center"
                >
                  Получить прайс-лист
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </button>
                <a
                  href="https://t.me/alexparfopt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all font-medium text-lg text-white text-center"
                >
                  Написать в Telegram
                </a>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                <div>
                  <div className="text-2xl font-bold text-accent mb-2">92 000+</div>
                  <p className="text-sm text-white/60">Позиций в прайсе</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-2">127+</div>
                  <p className="text-sm text-white/60">Проверенных поставщиков</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent mb-2">7 лет</div>
                  <p className="text-sm text-white/60">На рынке парфюмерии</p>
                </div>
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${visibleSections["features"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Преимущества</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4 mb-6">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Почему выбирают нас
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "Package",
                title: "Нет минимальной суммы",
                desc: "Выкупайте от 1 любой позиции из прайс-листа без дополнительных наценок и комиссий.",
              },
              {
                icon: "TrendingDown",
                title: "Выгодные цены",
                desc: "Работаем с более чем 127 проверенными поставщиками, что даёт одни из лучших цен на рынке.",
              },
              {
                icon: "Truck",
                title: "Быстрая сборка и отправка",
                desc: "Отправляем заказы из Москвы по России и СНГ, вам или напрямую вашим клиентам в этот же или на следующий рабочий день.",
              },
              {
                icon: "LayoutGrid",
                title: "Широкий ассортимент",
                desc: "Более 90 000 позиций оригинальной парфюмерии от мировых брендов в наличии.",
              },
              {
                icon: "Camera",
                title: "Комплектация до оплаты",
                desc: "Работаем без предоплаты. Перед отправкой делаем фото укомплектованного заказа.",
              },
              {
                icon: "Shield",
                title: "Только оригинал",
                desc: "Тщательно отбираем поставщиков на протяжении 7 лет — гарантируем оригинальность каждой позиции.",
              },
            ].map((item, i) => {
              const isVisible = visibleSections["features"];
              return (
                <div
                  key={i}
                  className={`group p-8 border border-accent/10 hover:border-accent/40 rounded-2xl bg-card/50 hover:bg-card/80 transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center mb-6 transition-colors">
                    <Icon name={item.icon} size={22} className="text-accent" fallback="Star" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${visibleSections["how"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Процесс</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Как оформить заказ
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Оставьте заявку на прайс", desc: "Запросите актуальный прайс-лист с более чем 92 000 позиций" },
              { num: "02", title: "Выберите товары", desc: "Отметьте нужные позиции — от 1 штуки без ограничений" },
              { num: "03", title: "Получите фото", desc: "Мы соберём заказ и пришлём фото укомплектованного заказа до оплаты" },
              { num: "04", title: "Получите заказ", desc: "Отправим в день заказа. Доставка по всей России и СНГ" },
            ].map((step, i) => {
              const isVisible = visibleSections["how"];
              return (
                <div
                  key={i}
                  className={`relative transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="group bg-accent/10 hover:bg-accent/20 border border-accent/20 hover:border-accent/40 rounded-2xl p-8 h-full flex flex-col justify-between transition-all backdrop-blur-sm cursor-pointer">
                    <div>
                      <div className="text-5xl font-display font-black text-accent mb-4 group-hover:scale-110 transition-transform">
                        {step.num}
                      </div>
                      <h3 className="font-display font-bold text-xl mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-accent/40 to-transparent" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="pricing" className="py-32 px-6 bg-accent/5">
        <div className="max-w-5xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${visibleSections["pricing"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">О компании</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Наша история
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div
              className={`transition-all duration-700 ${visibleSections["pricing"] ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              <div className="relative p-10 border border-accent/40 bg-accent/10 rounded-2xl backdrop-blur-sm">
                <div className="absolute -inset-1 bg-gradient-to-r from-accent via-accent to-accent/60 rounded-3xl opacity-20 blur-xl" />
                <div className="relative">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-accent/40 flex-shrink-0 ring-4 ring-accent/10">
                      <img
                        src="https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/0108dd91-4381-40e2-b756-0b650cd6aa2f.JPG"
                        alt="Александр"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <h3 className="font-display font-bold text-2xl">Меня зовут Александр</h3>
                  </div>
                  <p className="text-foreground/80 leading-relaxed mb-6">
                    Наша команда работает в сфере парфюмерии уже более 7 лет. Когда-то мы сами искали проверенного поставщика с оригинальным продуктом и лояльными условиями — это оказалось непросто.
                  </p>
                  <p className="text-foreground/80 leading-relaxed">
                    Поэтому мы решили начать оптовую продажу парфюмерии «как для себя» — с отгрузкой без минимальной суммы и с ежедневно обновляемым прайсом от тщательно отобранных поставщиков.
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`transition-all duration-700 ${visibleSections["pricing"] ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="p-10 border border-accent/10 bg-card/50 rounded-2xl backdrop-blur-sm h-full">
                <h3 className="font-display font-bold text-2xl mb-6">Наши ценности</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="ShieldCheck" size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Только оригинал</p>
                      <p className="text-white">Работаем исключительно с проверенными поставщиками</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Handshake" size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Лояльные условия</p>
                      <p className="text-white">Без минимальной суммы заказа и количества флаконов</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Zap" size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Быстро и надёжно</p>
                      <p className="text-white">Отправка 95% заказов день в день, сборка без предоплаты</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-32 bg-accent/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Отзывы</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Что говорят клиенты
              </span>
            </h2>
          </div>
        </div>

        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 px-6 scrollbar-none snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            ref={(el) => { if (el) el.style.cssText += '-webkit-overflow-scrolling: touch;' }}
            id="reviews-carousel"
          >
            {reviewUrls.map((url, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-64 snap-start bg-black/40 border border-accent/15 rounded-2xl overflow-hidden hover:border-accent/30 transition-all"
              >
                <div
                  className="w-full aspect-[9/16] overflow-hidden cursor-zoom-in"
                  onClick={() => setLightboxIndex(i)}
                >
                  <img
                    src={url}
                    alt={`Отзыв ${i + 1}`}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-8 px-6">
            <button
              onClick={() => {
                const el = document.getElementById('reviews-carousel');
                if (el) el.scrollBy({ left: -600, behavior: 'smooth' });
              }}
              className="w-11 h-11 rounded-full border border-accent/30 hover:border-accent/60 hover:bg-accent/10 transition-all flex items-center justify-center"
            >
              <Icon name="ChevronLeft" size={20} className="text-accent" />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('reviews-carousel');
                if (el) el.scrollBy({ left: 600, behavior: 'smooth' });
              }}
              className="w-11 h-11 rounded-full border border-accent/30 hover:border-accent/60 hover:bg-accent/10 transition-all flex items-center justify-center"
            >
              <Icon name="ChevronRight" size={20} className="text-accent" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-32 px-6">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${visibleSections["cta"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Готовы начать сотрудничество?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 font-light max-w-2xl mx-auto">
            Напишите нам — пришлём актуальный прайс-лист с более чем 92 000 позиций оригинальной парфюмерии.
          </p>
          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <button
              onClick={openModal}
              className="group px-10 py-5 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full hover:shadow-2xl hover:shadow-accent/40 transition-all font-bold text-lg flex items-center gap-3 justify-center"
            >
              Получить прайс-лист
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>
            <a
              href="https://t.me/alexparfopt"
              className="px-10 py-5 border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all font-bold text-lg text-white text-center"
            >
              Написать в Telegram
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-accent/20 bg-background pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Контакты */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
            <div>
              <div className="font-display font-bold text-2xl tracking-tighter bg-gradient-to-r from-white via-accent to-accent/80 bg-clip-text text-transparent mb-4">
                FirstOpt
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Оригинальная парфюмерия оптом. Более 92 000 позиций с доставкой по РФ и СНГ.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest text-accent/60 uppercase mb-5">Навигация</p>
              <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                <a href="#features" className="hover:text-white transition-colors">Преимущества</a>
                <a href="#how" className="hover:text-white transition-colors">Как это работает</a>
                <a href="#pricing" className="hover:text-white transition-colors">О нас</a>
                <a href="#reviews" className="hover:text-white transition-colors">Отзывы</a>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest text-accent/60 uppercase mb-5">Контакты</p>
              <div className="flex flex-col gap-4">
                <a href="mailto:parfopt-1@yandex.ru" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-white transition-colors group">
                  <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors flex-shrink-0">
                    <Icon name="Mail" size={16} className="text-accent" />
                  </div>
                  parfopt-1@yandex.ru
                </a>
                <a href="https://t.me/alexparfopt" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-white transition-colors group">
                  <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors flex-shrink-0">
                    <Icon name="Send" size={16} className="text-accent" />
                  </div>
                  +7 993 277 0600
                </a>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPin" size={16} className="text-accent" />
                  </div>
                  Москва, с 10:00 до 23:00 без выходных
                </div>
              </div>
            </div>
          </div>

          {/* Разделитель и копирайт */}
          <div className="border-t border-accent/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>© 2025 FirstOpt — Оригинальная парфюмерия оптом</p>
            <p>Москва, Россия</p>
          </div>
        </div>
      </footer>
      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors z-10"
            onClick={() => setLightboxIndex(null)}
          >
            <X size={28} />
          </button>

          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-sm text-white/50">
            {lightboxIndex + 1} / {reviewUrls.length}
          </div>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 hover:border-white/50 hover:bg-white/10 transition-all flex items-center justify-center z-10"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + reviewUrls.length) % reviewUrls.length); }}
          >
            <Icon name="ChevronLeft" size={22} className="text-white" />
          </button>

          <img
            src={reviewUrls[lightboxIndex]}
            alt={`Отзыв ${lightboxIndex + 1}`}
            className="max-h-[90vh] max-w-[calc(100vw-120px)] object-contain rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 hover:border-white/50 hover:bg-white/10 transition-all flex items-center justify-center z-10"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % reviewUrls.length); }}
          >
            <Icon name="ChevronRight" size={22} className="text-white" />
          </button>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative bg-background border border-accent/20 rounded-3xl p-8 w-full max-w-md shadow-2xl shadow-accent/10">
            <button
              onClick={() => setModalOpen(false)}
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
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm text-white/70 mb-1.5">Ваше имя</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                      onChange={(e) => setForm({ ...form, contact: e.target.value })}
                      placeholder="+7 999 123-45-67 или @username"
                      className="w-full bg-white/5 border border-accent/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-accent/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-1.5">E-mail</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
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
      )}
    </div>
  );
};

export default Index;