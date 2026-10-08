import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

type IconName = Parameters<typeof Icon>[0]["name"];

type Item = { icon?: IconName; title: string; text: string };

type Slide = {
  image: string;
  title: string;
  subtitle: string;
  lead: string;
  items: Item[];
  note?: string;
};

const CDN = "https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/files";

const slides: Slide[] = [
  {
    image: `${CDN}/d512b409-d8e8-4791-a943-48f6a7e409e3.jpg`,
    title: "Что изменилось",
    subtitle: "для ресторанов",
    lead: "С 1 октября 2026 года для ресторанов вступило в силу сразу несколько новых правил. Разбираем главное простыми словами.",
    items: [
      { icon: "Tag", title: "Маркировка колбас", text: "Обязательные коды Data Matrix на колбасных изделиях." },
      { icon: "Smartphone", title: "Коды в меню Яндекс Еды", text: "Классификационный код для каждой позиции меню." },
      { icon: "ScanLine", title: "Переход на ТС ПиОТ", text: "Новый способ проверки кодов маркировки на кассе." },
      { icon: "Scale", title: "Закон о платформенной экономике", text: "Федеральный закон № 289-ФЗ для доставки и маркетплейсов." },
    ],
  },
  {
    image: `${CDN}/2af77291-39c6-4df0-8afa-a5b84ed70b35.jpg`,
    title: "Маркировка",
    subtitle: "колбасных изделий",
    lead: "С 1 октября 2026 года началась обязательная маркировка колбасных изделий.",
    items: [
      { title: "Что нужно маркировать", text: "Варёные, фаршированные, кровяные, жареные, копчёные колбасы и другие мясные изделия." },
      { title: "Если закупаете такую продукцию", text: "Она должна быть с кодами Data Matrix." },
      { title: "Если делаете сами и продаёте в розницу", text: "Маркировка обязательна для вас." },
    ],
  },
  {
    image: `${CDN}/605917f7-b093-42ef-99fe-05e6cb752b5c.jpg`,
    title: "Яндекс Еда:",
    subtitle: "коды в меню",
    lead: "С 1 октября 2026 года Яндекс Еда требует указать классификационный код для каждой позиции меню.",
    items: [
      { icon: "ConciergeBell", title: "Блюда собственного приготовления", text: "Горячее, салаты, кофе, коктейли — единый код ОКПД2 56.10.11.120." },
      { icon: "Package", title: "Готовые товары от поставщика", text: "Бутилированная вода, снеки, десерты, мерч — индивидуальный код ТН ВЭД или ОКПД2." },
      { icon: "EyeOff", title: "Если не указать коды", text: "Позицию временно скроют из меню." },
    ],
    note: "Это касается всех ресторанов на платформе, независимо от формата и организационной формы.",
  },
  {
    image: `${CDN}/06c74982-e9d2-47b3-b20d-9dc2257d9abe.jpg`,
    title: "Переход",
    subtitle: "на ТС ПиОТ",
    lead: "Проверка кодов маркировки на кассе теперь идёт через специальный модуль.",
    items: [
      { title: "Как теперь проверять коды", text: "Через ТС ПиОТ — модуль с защищённым соединением с системой «Честный знак»." },
      { title: "Послабление для общепита", text: "Можно работать в льготном режиме по GTIN, не используя ТС ПиОТ." },
      { title: "Когда модуль обязателен", text: "Если продаёте маркированные товары как розницу (бутилированная вода, снеки) — ТС ПиОТ обязателен." },
    ],
    note: "После 1 октября 2026 года проверка через токен X-API-KEY не работает. Используйте ТС ПиОТ или льготный режим по GTIN (для общепита).",
  },
  {
    image: `${CDN}/34c19e0e-19cc-4e68-96a6-c3170a30a2e9.jpg`,
    title: "Закон",
    subtitle: "о платформенной экономике",
    lead: "С 1 октября 2026 года вступает в силу Федеральный закон № 289-ФЗ «Об отдельных вопросах регулирования платформенной экономики».",
    items: [
      { icon: "Layers", title: "Что предусматривает закон", text: "Цифровые платформы (агрегаторы доставки, маркетплейсы) обязаны тщательнее проверять товары и услуги, которые продаются через них." },
      { icon: "Search", title: "Что это значит для ресторанов", text: "Данные о позициях меню должны быть полными и корректными." },
      { icon: "FileText", title: "Кого касается", text: "Всех ресторанов на платформах доставки и маркетплейсах — независимо от формата и организационной формы." },
    ],
  },
  {
    image: `${CDN}/2af07af8-480f-4a85-9aba-97993e5ed294.jpg`,
    title: "Что делать",
    subtitle: "прямо сейчас",
    lead: "Короткий чек-лист, чтобы быть готовыми к изменениям с 1 октября 2026 года.",
    items: [
      { icon: "Tag", title: "Проверить", text: "какие товары требуют маркировки." },
      { icon: "Settings", title: "Настроить ТС ПиОТ", text: "при необходимости." },
      { icon: "FileText", title: "Проверить коды в меню", text: "для Яндекс Еды." },
      { icon: "Database", title: "Убедиться,", text: "что данные о товарах передаются корректно." },
    ],
    note: "Сохраните этот чек-лист, чтобы вернуться к нему позже.",
  },
];

export default function Oct2026() {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const last = slides.length - 1;

  const go = (i: number) => setIndex(Math.min(Math.max(i, 0), last));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, last));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [last]);

  return (
    <div className="min-h-screen bg-[#0E0B09] text-white font-manrope flex flex-col">
      <header className="flex items-center justify-between px-4 md:px-8 h-14 border-b border-white/10">
        <a href="/" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
          <Icon name="ArrowLeft" size={16} />
          На главную
        </a>
        <span className="font-unbounded text-[11px] md:text-xs tracking-widest uppercase text-red-500">
          С 1 октября 2026
        </span>
        <span className="text-sm text-white/60 tabular-nums">
          {index + 1} / {slides.length}
        </span>
      </header>

      <main className="flex-1 flex items-center justify-center p-3 md:p-8">
        <article
          key={index}
          className="relative w-full max-w-5xl rounded-3xl overflow-hidden bg-[#F4F2EF] text-[#0E0B09] grid md:grid-cols-[1.25fr_1fr] min-h-[620px] animate-in fade-in duration-500"
        >
          <div className="relative z-10 p-6 md:p-10 flex flex-col">
            <h1 className="font-unbounded uppercase leading-[1.05] text-3xl md:text-5xl font-black break-words">
              {slide.title}
              <span className="block font-medium text-xl md:text-3xl mt-2 normal-case tracking-tight">
                {slide.subtitle}
              </span>
            </h1>

            <p className="mt-5 text-sm md:text-base text-[#0E0B09]/75 max-w-xl">{slide.lead}</p>

            <ul className="mt-6 space-y-3">
              {slide.items.map((item, i) => (
                <li key={item.title} className="flex gap-3 items-start bg-white/70 rounded-2xl p-3 md:p-4 border border-black/5">
                  <span className="shrink-0 w-9 h-9 rounded-full bg-[#0E0B09] text-white flex items-center justify-center text-xs font-bold">
                    {item.icon ? <Icon name={item.icon} size={16} /> : String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-extrabold uppercase text-xs md:text-sm tracking-wide">{item.title}</p>
                    <p className="text-sm text-[#0E0B09]/70 mt-0.5">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            {slide.note && (
              <div className="mt-4 flex gap-3 items-start rounded-2xl bg-[#0E0B09] text-white p-4">
                <Icon name="TriangleAlert" size={20} className="shrink-0 text-red-500 mt-0.5" />
                <p className="text-sm">{slide.note}</p>
              </div>
            )}
          </div>

          <div className="relative min-h-[260px] md:min-h-0 order-first md:order-last">
            <img src={slide.image} alt={`${slide.title} ${slide.subtitle}`} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#F4F2EF] via-transparent to-transparent" />
          </div>
        </article>
      </main>

      <footer className="flex items-center justify-center gap-4 pb-6">
        <button
          onClick={() => go(index - 1)}
          disabled={index === 0}
          aria-label="Назад"
          className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#0E0B09] transition-colors disabled:opacity-30 disabled:pointer-events-none"
        >
          <Icon name="ChevronLeft" size={20} />
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Слайд ${i + 1}`}
              className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-red-600" : "w-2 bg-white/30"}`}
            />
          ))}
        </div>
        <button
          onClick={() => go(index + 1)}
          disabled={index === last}
          aria-label="Вперёд"
          className="w-11 h-11 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition-colors disabled:opacity-30 disabled:pointer-events-none"
        >
          <Icon name="ChevronRight" size={20} />
        </button>
      </footer>
    </div>
  );
}
