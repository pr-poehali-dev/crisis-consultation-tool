import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const COUNTER_URL = "https://functions.poehali.dev/466a7ae9-ffcb-4019-87a3-51ac4a629d27";

const CHECKLISTS = [
  {
    id: 1,
    title: "Операционный старт кафе — 30 дней",
    description: "Пошаговый план действий для быстрого запуска или восстановления операционной части кафе с готовыми шаблонами и таблицами.",
    tags: ["Операции", "Запуск"],
    icon: "Rocket",
  },
  {
    id: 2,
    title: "Шаблон KPI и дашборд для кафе",
    description: "Готовый дашборд — отслеживайте выручку, себестоимость и оборачиваемость. 7 ключевых метрик с инструкциями.",
    tags: ["KPI", "Финансы"],
    icon: "BarChart2",
  },
  {
    id: 3,
    title: "Гайд «Аудит склада за один день»",
    description: "Чёткая методика и готовые таблицы для быстрого аудита склада: обнаружьте скрытые запасы и ошибки учёта за один рабочий день.",
    tags: ["Склад", "Аудит"],
    icon: "Package",
  },
  {
    id: 4,
    title: "Набор готовых регламентов — 5 документов",
    description: "Приёмка товара, инвентаризация, обучение новичка, кассовая дисциплина, ежедневная планёрка — готовы к применению.",
    tags: ["Регламенты", "Документы"],
    icon: "FileText",
  },
  {
    id: 5,
    title: "Портрет гостя и анализ меню по маржинальности",
    description: "Сегментация гостей и полный анализ маржинальности меню с готовыми рекомендациями и шаблонами сетов.",
    tags: ["Меню", "Маркетинг"],
    icon: "Users",
  },
  {
    id: 6,
    title: "План экономии закупок — 60 дней",
    description: "Пошаговый план переговоров и оптимизации закупок с таблицами для контроля экономии. Готовый переговорный пакет.",
    tags: ["Закупки", "Экономия"],
    icon: "TrendingDown",
  },
  {
    id: 7,
    title: "Чек-листы и сценарии обслуживания для бариста/официанта",
    description: "Чек-листы открытия/смены и 10 рабочих скриптов — внедрите за 1 день и сразу снизите ошибки и повысите средний чек.",
    tags: ["Сервис", "Скрипты"],
    icon: "Coffee",
  },
  {
    id: 8,
    title: "Промоплан: календарь акций на 3 месяца",
    description: "Календарь из 12 акций с текстами для соцсетей, SMS и KPI-шаблоном. Запускайте без долгой подготовки.",
    tags: ["Маркетинг", "Акции"],
    icon: "Calendar",
  },
  {
    id: 9,
    title: "Кейс: Увеличение оборачиваемости на 25%",
    description: "Конкретные действия и шаблоны из реального кейса для мгновенной оптимизации запасов и экономии.",
    tags: ["Кейс", "Склад"],
    icon: "TrendingUp",
  },
  {
    id: 10,
    title: "Идеальный сотрудник — профиль по ролям",
    description: "Профили и чек-листы оценки для официанта, бариста, менеджера смены, зам.управляющего и управляющего.",
    tags: ["Персонал", "HR"],
    icon: "UserCheck",
  },
  {
    id: 11,
    title: "ABC-анализ для общепита",
    description: "Пошаговая методика АБС-анализа ассортимента с формулами Excel, шаблонами и правилами внедрения в закупки.",
    tags: ["Аналитика", "Меню"],
    icon: "PieChart",
  },
  {
    id: 12,
    title: "Финансовая модель для запуска ресторана/бара/кофейни",
    description: "Полная финансовая модель: P&L, Cashflow, точка безубыточности, сценарный анализ на 36 месяцев.",
    tags: ["Финансы", "Запуск"],
    icon: "Calculator",
  },
  {
    id: 13,
    title: "Бизнес-план для открытия кофейни/бара/ресторана",
    description: "Готовая структура и чек-лист для быстрого создания полного бизнес-плана для запуска и привлечения инвестиций.",
    tags: ["Бизнес-план", "Инвестиции"],
    icon: "Briefcase",
  },
  {
    id: 14,
    title: "Тренинги для сотрудников: повара, официанты, бармены",
    description: "Модульная программа обучения для кухни и зала: теория, практика, оценка — внедряется за 1 месяц.",
    tags: ["Обучение", "Персонал"],
    icon: "GraduationCap",
  },
  {
    id: 15,
    title: "Нормы хранения продукции на кухне",
    description: "Чёткие правила для каждой группы продуктов, журналы температур, нормы и процедуры списания.",
    tags: ["Кухня", "Безопасность"],
    icon: "Thermometer",
  },
  {
    id: 16,
    title: "Аттестация сотрудников зала и кухни",
    description: "Практический чек-лист для оценки компетенций персонала с оценочными карточками и планами развития.",
    tags: ["HR", "Аттестация"],
    icon: "ClipboardCheck",
  },
];

interface ChecklistsSectionProps {
  onBuyClick: () => void;
}

export default function ChecklistsSection({ onBuyClick }: ChecklistsSectionProps) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [todayCount, setTodayCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(COUNTER_URL)
      .then(r => r.json())
      .then(data => setTodayCount(data.count))
      .catch(() => {});
  }, []);

  return (
    <section className="py-16 px-4" id="checklists">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[rgba(255,107,0,0.1)] border border-[rgba(255,107,0,0.3)] rounded-full px-4 py-2 mb-6">
            <Icon name="Package" size={16} className="text-[#FF6B00]" />
            <span className="text-[#FF6B00] text-sm font-medium uppercase tracking-wider">16 профессиональных документов</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-oswald font-bold text-white mb-4 uppercase">
            Полный пакет чек-листов для <span className="neon-text">ресторатора</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Всё что нужно для управления, запуска и роста заведения — готовые шаблоны с таблицами, скриптами и пошаговыми инструкциями
          </p>
        </div>

        {/* Price block */}
        <div className="glass-card rounded-2xl p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-5xl font-oswald font-bold text-white">1 499 ₽</span>
              <span className="text-gray-500 line-through text-xl">9 900 ₽</span>
              <span className="bg-[#FF2D55] text-white text-sm font-bold px-2 py-1 rounded-lg">-85%</span>
            </div>
            <p className="text-gray-400 text-sm">Все 16 чек-листов сразу на вашу почту после оплаты</p>
            {todayCount !== null && todayCount > 0 && (
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-sm font-medium">Сегодня скачали: {todayCount}</span>
              </div>
            )}
          </div>
          <button
            onClick={onBuyClick}
            className="neon-btn text-white font-bold text-lg px-10 py-4 rounded-xl flex items-center gap-3 whitespace-nowrap"
          >
            <Icon name="ShoppingCart" size={22} />
            Купить все чек-листы
          </button>
        </div>

        {/* Checklists grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {CHECKLISTS.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-xl overflow-hidden cursor-pointer hover:border-[rgba(255,107,0,0.4)] transition-all duration-300"
              onClick={() => setExpanded(expanded === item.id ? null : item.id)}
            >
              <div className="p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[rgba(255,107,0,0.15)] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name={item.icon} size={20} className="text-[#FF6B00]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-white font-semibold text-sm leading-snug">{item.title}</h3>
                    <Icon
                      name="ChevronDown"
                      size={18}
                      className={`text-gray-500 flex-shrink-0 transition-transform duration-300 ${expanded === item.id ? "rotate-180" : ""}`}
                    />
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-[rgba(255,107,0,0.1)] text-[#FF6B00] px-2 py-0.5 rounded-full border border-[rgba(255,107,0,0.2)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {expanded === item.id && (
                <div className="px-4 pb-4 pt-0 border-t border-[rgba(255,255,255,0.05)]">
                  <p className="text-gray-400 text-sm leading-relaxed mt-3">{item.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <button
            onClick={onBuyClick}
            className="neon-btn text-white font-bold text-xl px-14 py-5 rounded-xl inline-flex items-center gap-3"
          >
            <Icon name="Zap" size={24} />
            Получить все 16 чек-листов за 1 499 ₽
          </button>
          <p className="text-gray-500 text-sm mt-3">Оплата картой → чек-листы сразу на вашу почту</p>
        </div>
      </div>
    </section>
  );
}