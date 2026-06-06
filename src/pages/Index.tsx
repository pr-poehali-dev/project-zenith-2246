import { useEffect, useState } from "react";
import { ArrowRight, Package, Truck, Star, ShieldCheck, Clock, Users } from "lucide-react";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});

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
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
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
          <div className="flex gap-3">
            <a
              href="https://t.me/+79932770600"
              className="px-5 py-2.5 text-sm font-medium border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all"
            >
              Telegram
            </a>
            <a
              href="mailto:parfopt-1@yandex.ru"
              className="px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-accent via-accent to-accent/80 text-black rounded-full hover:shadow-lg hover:shadow-accent/40 transition-all font-semibold"
            >
              Скачать прайс
            </a>
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
              <div className="mb-8 inline-block">
                <span className="text-xs font-medium tracking-widest text-accent/80 uppercase">
                  Оптовая парфюмерия · 7 лет на рынке
                </span>
              </div>
              <h1 className="text-6xl lg:text-7xl font-display font-black leading-tight mb-8 tracking-tighter">
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
                <a
                  href="mailto:parfopt-1@yandex.ru"
                  className="group px-8 py-4 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full hover:shadow-2xl hover:shadow-accent/50 transition-all font-semibold text-lg flex items-center gap-3 justify-center"
                >
                  Скачать прайс-лист
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </a>
                <a
                  href="https://t.me/+79932770600"
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
              { num: "01", title: "Скачайте прайс", desc: "Запросите актуальный прайс-лист с более чем 92 000 позиций" },
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
                  <div className="text-4xl mb-6">👋</div>
                  <h3 className="font-display font-bold text-2xl mb-4">Меня зовут Александр</h3>
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
                <h3 className="font-display font-bold text-2xl mb-6">Контакты</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Mail" size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <a href="mailto:parfopt-1@yandex.ru" className="text-white hover:text-accent transition-colors">
                        parfopt-1@yandex.ru
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Send" size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Telegram</p>
                      <a href="https://t.me/+79932770600" className="text-white hover:text-accent transition-colors">
                        +7 993 277 0600
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="MapPin" size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Город и время работы</p>
                      <p className="text-white">Москва, с 10:00 до 23:00 без выходных</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
            <a
              href="mailto:parfopt-1@yandex.ru"
              className="group px-10 py-5 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full hover:shadow-2xl hover:shadow-accent/40 transition-all font-bold text-lg flex items-center gap-3 justify-center"
            >
              Получить прайс-лист
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </a>
            <a
              href="https://t.me/+79932770600"
              className="px-10 py-5 border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all font-bold text-lg text-white text-center"
            >
              Написать в Telegram
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-accent/10 py-12 px-6 bg-background/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <p>© 2025 FirstOpt — Оригинальная парфюмерия оптом</p>
          <div className="flex gap-8">
            <a href="mailto:parfopt-1@yandex.ru" className="hover:text-white transition-colors">
              parfopt-1@yandex.ru
            </a>
            <a href="https://t.me/+79932770600" className="hover:text-white transition-colors">
              Telegram
            </a>
            <a href="#features" className="hover:text-white transition-colors">
              Преимущества
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;