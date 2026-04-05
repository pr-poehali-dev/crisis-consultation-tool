import { useState } from "react";
import Icon from "@/components/ui/icon";

const FREE_CHECKLISTS_URL = "https://functions.poehali.dev/733d4042-b125-4eeb-ade2-b7225c6503bb";

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [botLink, setBotLink] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email.trim() || !email.includes("@")) {
      setError("Введите корректный email");
      return;
    }
    setSending(true);
    setError("");
    try {
      const res = await fetch(FREE_CHECKLISTS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.bot_link) {
        setBotLink(data.bot_link);
        setSent(true);
      } else {
        setError("Что-то пошло не так. Попробуйте ещё раз.");
      }
    } catch {
      setError("Ошибка соединения. Попробуйте ещё раз.");
    } finally {
      setSending(false);
    }
  };

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

        {/* Email form block */}
        <div className="glass-card rounded-2xl p-6 mb-10"
          style={{ background: "linear-gradient(135deg, rgba(255,107,0,0.1) 0%, rgba(10,10,10,0.8) 100%)", borderColor: "rgba(255,107,0,0.3)" }}>
          {sent ? (
            <div className="text-center py-4">
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="text-white font-bold text-xl mb-2">Отлично! Остался последний шаг</h3>
              <p className="text-gray-300 text-sm mb-5">
                Перейдите в Telegram-бот, подпишитесь на канал — и чек-листы сразу придут на <strong>{email}</strong>
              </p>
              <a
                href={botLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-white font-bold text-base px-8 py-3 rounded-xl transition-opacity hover:opacity-90"
                style={{ background: "#229ED9" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                Открыть Telegram-бот и получить чек-листы
              </a>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-[#FF6B00] text-white text-sm font-bold px-3 py-1 rounded-lg">Бесплатно</span>
                  <span className="text-white font-bold text-xl">Все 16 чек-листов на почту</span>
                </div>
                <p className="text-gray-400 text-sm">Введите имя и email — пришлю все материалы сразу на почту</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[rgba(255,107,0,0.5)] w-full sm:w-36"
                />
                <input
                  type="email"
                  placeholder="Ваш email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(""); }}
                  className="bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[rgba(255,107,0,0.5)] w-full sm:w-52"
                />
                <button
                  onClick={handleSubmit}
                  disabled={sending}
                  className="neon-btn text-white font-bold text-sm px-6 py-3 rounded-xl whitespace-nowrap disabled:opacity-60"
                >
                  {sending ? "Отправляем..." : "Получить →"}
                </button>
              </div>
            </div>
          )}
          {error && <p className="text-red-400 text-sm mt-3 text-center">{error}</p>}
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