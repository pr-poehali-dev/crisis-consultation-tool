import { useState } from "react";
import Icon from "@/components/ui/icon";
import { sendLead } from "@/utils/sendLead";

const WEEKS = [
  {
    title: "Неделя 1 — Склад и учёт",
    color: "from-orange-500/20 to-orange-600/5",
    accent: "#FF6B00",
    days: [
      {
        day: 1,
        title: "Выявляем «дырки»",
        goal: "Понять, что теряется",
        task: "Пересчитайте 30 ключевых товаров и заполните файл «аудит_30.xlsx»",
        deliver: "Файл + 3 фото складских полок",
        icon: "Search",
      },
      {
        day: 2,
        title: "Убираем хаос",
        goal: "Видимость порядка",
        task: "Промаркируйте 10 товаров наклейками (дата / открытие / срок)",
        deliver: "Фото 10 наклеек",
        icon: "Tag",
      },
      {
        day: 3,
        title: "Отработка инвентаризации",
        goal: "Внедряем быстрый рабочий процесс",
        task: "Проведите инвентаризацию 10 позиций, заполните «инвентаризация_пилот.xlsx»",
        deliver: "Файл + 1 фото листа учёта",
        icon: "ClipboardList",
      },
      {
        day: 4,
        title: "Контроль температур",
        goal: "Обеспечить безопасное хранение",
        task: "Ведите журнал температур 2 смены (файл «журнал_температур.xlsx»)",
        deliver: "Файл с 2 днями записи",
        icon: "Thermometer",
      },
      {
        day: 5,
        title: "Что выкидываем и почему",
        goal: "Понять причины списаний",
        task: "Выгрузите списания за 30 дней, сгруппируйте по причинам в «списания_30.xlsx»",
        deliver: "Файл + ТОП-3 причин в 3 строках",
        icon: "Trash2",
      },
    ],
  },
  {
    title: "Неделя 2 — Закупки и поставки",
    color: "from-blue-500/20 to-blue-600/5",
    accent: "#3B82F6",
    days: [
      {
        day: 6,
        title: "Поставщики под контролем",
        goal: "Систематизировать базу поставщиков",
        task: "Составьте карточки 5 ключевых поставщиков в файле «поставщики.xlsx»",
        deliver: "Файл",
        icon: "Truck",
      },
      {
        day: 7,
        title: "Попросите скидку",
        goal: "Снизить закупочные цены",
        task: "Подготовьте запрос по 3 товарам, отправьте поставщику, сохраните ответ",
        deliver: "Файл «запрос_на_цену.xlsx» + скрин переписки",
        icon: "Percent",
      },
      {
        day: 8,
        title: "Считаем партии",
        goal: "Найти выгодный объём закупки",
        task: "Рассчитайте, выгоднее ли брать большую партию для 1 товара («расчёт_партии.xlsx»)",
        deliver: "Файл + вывод (1 строка)",
        icon: "Package",
      },
      {
        day: 9,
        title: "Оцениваем поставщиков",
        goal: "Рейтинг надёжности",
        task: "Заполните KPI по 3 поставщикам в файле «kpi_поставщиков.xlsx»",
        deliver: "Файл",
        icon: "Star",
      },
      {
        day: 10,
        title: "План экономии",
        goal: "Конкретные меры снижения затрат",
        task: "Подготовьте 3 меры экономии с расчётом ожидаемого эффекта («план_экономии.xlsx»)",
        deliver: "Файл",
        icon: "TrendingDown",
      },
    ],
  },
  {
    title: "Неделя 3 — Процессы и внедрение",
    color: "from-green-500/20 to-green-600/5",
    accent: "#22C55E",
    days: [
      {
        day: 11,
        title: "Регламент приёмки",
        goal: "Стандартизировать приёмку товара",
        task: "Заполните шаблон регламента и примените при следующей поставке («регламент_приёмки.docx»)",
        deliver: "Файл + фото приёмки",
        icon: "FileCheck",
      },
      {
        day: 12,
        title: "Мини-дашборд",
        goal: "Видеть ключевые цифры каждый день",
        task: "Составьте мини-дашборд из 5 показателей за 14 дней («дашборд_kpi.xlsx»)",
        deliver: "Файл + скрин графика",
        icon: "BarChart2",
      },
      {
        day: 13,
        title: "Привяжите бонус",
        goal: "Мотивировать команду на результат",
        task: "Предложите формулу бонуса для одной смены, согласуйте её («схема_мотивации.xlsx»)",
        deliver: "Файл",
        icon: "Award",
      },
      {
        day: 14,
        title: "Тайная проверка",
        goal: "Найти скрытые проблемы",
        task: "Проведите одну внезапную проверку по чек-листу («акт_проверки.xlsx»)",
        deliver: "Файл + 3 фото",
        icon: "Eye",
      },
      {
        day: 15,
        title: "Финал: итоговый пакет",
        goal: "Упаковать все результаты",
        task: "Упакуйте все файлы и фото в архив, отправьте в Telegram с темой «Марафон — Название — Отчёт — ФИО»",
        deliver: "Архив + 1-страничная сводка: что сделано, цифры, 3 рекомендации",
        icon: "Trophy",
      },
    ],
  },
];

const BONUSES = [
  { icon: "Phone", text: "Персональный разбор по звонку от эксперта" },
  { icon: "Instagram", text: "Репост вашего кейса в Инстаграме" },
  { icon: "Badge", text: "Значок «Выполнил марафон» — в коллекцию" },
];

interface MarathonModalProps {
  onClose: () => void;
}

function MarathonModal({ onClose }: MarathonModalProps) {
  const [mode, setMode] = useState<"choose" | "telegram" | "email" | "done">("choose");
  const [deliveryMode, setDeliveryMode] = useState<"telegram" | "email">("telegram");
  const [telegram, setTelegram] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!name.trim()) { setError("Введите ваше имя"); return; }
    if (mode === "telegram" && !telegram.trim()) { setError("Введите ник в Telegram"); return; }
    if (mode === "email" && !email.trim()) { setError("Введите email"); return; }

    setDeliveryMode(mode as "telegram" | "email");
    setLoading(true);
    setError("");
    try {
      await sendLead({
        source: "marathon",
        name,
        telegram: mode === "telegram" ? telegram : "",
        email: mode === "email" ? email : "",
        mode,
      });
      setMode("done");
    } catch {
      setError("Ошибка сети, попробуйте ещё раз");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="glass-card w-full max-w-md p-8 rounded-2xl relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
          <Icon name="X" size={20} />
        </button>

        {mode === "done" ? (
          <div className="text-center py-2">
            {/* Иконка */}
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full bg-[rgba(255,107,0,0.15)] animate-pulse" />
              <div className="relative w-20 h-20 rounded-full bg-[rgba(255,107,0,0.2)] flex items-center justify-center">
                <span className="text-4xl">🏃</span>
              </div>
            </div>

            <h3 className="font-heading text-2xl text-white mb-1">Марафон запущен!</h3>
            <p className="text-[#FF6B00] text-sm font-semibold mb-5">
              {deliveryMode === "email" ? "Проверьте почту — письмо уже летит" : "Загляните в Telegram — марафон там"}
            </p>

            {/* Мотивация */}
            <div className="bg-gradient-to-br from-[rgba(255,107,0,0.1)] to-[rgba(255,45,85,0.05)] border border-[rgba(255,107,0,0.2)] rounded-2xl p-5 mb-4 text-left">
              <p className="text-[#FF6B00] font-bold text-sm mb-2">🔥 15 дней — и ваш бизнес изменится</p>
              <p className="text-white text-sm leading-relaxed">
                Каждый день — одно конкретное действие. Не теория, не советы "в стол". Только то, что даёт результат уже на этой неделе.
              </p>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                Выполните все 15 заданий — и пришлите финальный пакет. Лично разберу ваш кейс.
              </p>
            </div>

            {/* Шаги */}
            <div className="space-y-2 mb-5 text-left">
              {[
                { icon: "Package", text: "Неделя 1 — Склад и учёт: найдём дыры" },
                { icon: "Truck", text: "Неделя 2 — Закупки: снизим затраты" },
                { icon: "BarChart2", text: "Неделя 3 — Процессы: внедрим систему" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-3 bg-white/4 rounded-xl px-4 py-2.5">
                  <Icon name={icon} size={16} className="text-[#FF6B00] flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{text}</span>
                </div>
              ))}
            </div>

            {/* Telegram */}
            <a
              href="https://t.me/Roko_Tiis"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full border border-[rgba(0,136,204,0.4)] bg-[rgba(0,136,204,0.08)] text-[#0088cc] hover:bg-[rgba(0,136,204,0.15)] py-3 rounded-xl transition-colors text-sm font-semibold mb-3"
            >
              <Icon name="Send" size={16} />
              Написать Руслану в Telegram
            </a>

            <button onClick={onClose} className="w-full text-gray-500 text-sm hover:text-gray-300 transition-colors py-1">
              Закрыть
            </button>
          </div>
        ) : mode === "choose" ? (
          <>
            <h3 className="font-heading text-2xl text-white mb-2 text-center">Как прислать марафон?</h3>
            <p className="text-white/50 text-sm text-center mb-6">Выберите удобный способ</p>
            <div className="space-y-3">
              <button
                onClick={() => setMode("telegram")}
                className="w-full flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-[rgba(255,107,0,0.1)] hover:border-[#FF6B00]/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[rgba(0,136,204,0.15)] flex items-center justify-center">
                  <Icon name="Send" size={22} className="text-[#0088cc]" />
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold">В Telegram</p>
                  <p className="text-white/40 text-sm">Получите ссылку прямо в мессенджер</p>
                </div>
                <Icon name="ChevronRight" size={18} className="text-white/30 ml-auto group-hover:text-[#FF6B00] transition-colors" />
              </button>
              <button
                onClick={() => setMode("email")}
                className="w-full flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-[rgba(255,107,0,0.1)] hover:border-[#FF6B00]/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[rgba(255,107,0,0.15)] flex items-center justify-center">
                  <Icon name="Mail" size={22} className="text-[#FF6B00]" />
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold">На почту</p>
                  <p className="text-white/40 text-sm">Пришлём на email в течение минуты</p>
                </div>
                <Icon name="ChevronRight" size={18} className="text-white/30 ml-auto group-hover:text-[#FF6B00] transition-colors" />
              </button>
            </div>
          </>
        ) : (
          <>
            <button onClick={() => setMode("choose")} className="flex items-center gap-1 text-white/40 hover:text-white text-sm mb-5 transition-colors">
              <Icon name="ArrowLeft" size={15} /> Назад
            </button>
            <h3 className="font-heading text-2xl text-white mb-5">
              {mode === "telegram" ? "Получить в Telegram" : "Получить на почту"}
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-white/60 text-sm mb-1 block">Ваше имя</label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Как вас зовут?"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF6B00]/50 transition-colors"
                />
              </div>
              {mode === "telegram" ? (
                <div>
                  <label className="text-white/60 text-sm mb-1 block">Ваш Telegram</label>
                  <input
                    value={telegram}
                    onChange={e => setTelegram(e.target.value)}
                    placeholder="@username"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF6B00]/50 transition-colors"
                  />
                </div>
              ) : (
                <div>
                  <label className="text-white/60 text-sm mb-1 block">Email</label>
                  <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="example@mail.ru"
                    type="email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF6B00]/50 transition-colors"
                  />
                </div>
              )}
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="neon-btn w-full py-3 rounded-xl font-semibold mt-2 disabled:opacity-50"
              >
                {loading ? "Отправляем..." : "Получить марафон бесплатно"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function MarathonSection() {
  const [openWeek, setOpenWeek] = useState<number | null>(0);
  const [openDay, setOpenDay] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="py-16 px-4">
      {showModal && <MarathonModal onClose={() => setShowModal(false)} />}

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-[rgba(255,107,0,0.15)] text-[#FF6B00] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 border border-[#FF6B00]/20">
            Бесплатный марафон
          </span>
          <h2 className="font-heading text-3xl md:text-5xl text-white mb-4">
            3 недели —{" "}
            <span className="neon-text">Операционный бустер</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Для администраторов и управляющих ресторанов. 15 рабочих дней,
            30–60 минут в день — реальные изменения в вашем заведении.
          </p>
        </div>

        {/* Key principles */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
          {[
            { icon: "Clock", text: "30–60 мин в день" },
            { icon: "Zap", text: "Максимум практики" },
            { icon: "CheckSquare", text: "Чёткие задания" },
            { icon: "Camera", text: "Фото-отчёты" },
            { icon: "MessageSquare", text: "Личный разбор" },
            { icon: "Gift", text: "Бесплатно" },
          ].map((item) => (
            <div key={item.text} className="glass-card rounded-xl p-3 flex items-center gap-3">
              <Icon name={item.icon} size={18} className="text-[#FF6B00] shrink-0" />
              <span className="text-white/80 text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Program by weeks */}
        <div className="space-y-4 mb-12">
          <h3 className="font-heading text-xl text-white/80 mb-2">Программа марафона</h3>
          {WEEKS.map((week, wi) => (
            <div key={wi} className="glass-card rounded-2xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-5 text-left"
                onClick={() => setOpenWeek(openWeek === wi ? null : wi)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-heading font-bold text-sm"
                    style={{ background: `${week.accent}22`, color: week.accent }}
                  >
                    {wi + 1}
                  </div>
                  <span className="text-white font-semibold">{week.title}</span>
                </div>
                <Icon
                  name="ChevronDown"
                  size={18}
                  className="text-white/40 transition-transform"
                  style={{ transform: openWeek === wi ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>

              {openWeek === wi && (
                <div className="border-t border-white/5">
                  {/* Table header */}
                  <div className="hidden md:grid grid-cols-[60px_1fr_2fr_1fr] gap-4 px-5 py-3 bg-white/[0.02] text-white/40 text-xs uppercase tracking-wider font-semibold">
                    <span>День</span>
                    <span>Задание</span>
                    <span>Что делаем</span>
                    <span>Что сдаём</span>
                  </div>
                  <div className="divide-y divide-white/5">
                    {week.days.map((d, di) => (
                      <div key={di}>
                        {/* Mobile: card click to expand */}
                        <button
                          className="w-full md:hidden flex items-center gap-3 px-5 py-4 text-left"
                          onClick={() => setOpenDay(openDay === d.day ? null : d.day)}
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold"
                            style={{ background: `${week.accent}22`, color: week.accent }}
                          >
                            {d.day}
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-medium text-sm">{d.title}</p>
                            <p className="text-white/40 text-xs mt-0.5">{d.goal}</p>
                          </div>
                          <Icon
                            name="ChevronDown"
                            size={15}
                            className="text-white/30 transition-transform shrink-0"
                            style={{ transform: openDay === d.day ? "rotate(180deg)" : "rotate(0deg)" }}
                          />
                        </button>
                        {openDay === d.day && (
                          <div className="md:hidden px-5 pb-4 space-y-2">
                            <p className="text-white/60 text-sm">{d.task}</p>
                            <div className="flex items-start gap-2 bg-white/5 rounded-lg p-3">
                              <Icon name="Send" size={13} className="text-[#FF6B00] mt-0.5 shrink-0" />
                              <span className="text-white/50 text-xs">{d.deliver}</span>
                            </div>
                          </div>
                        )}

                        {/* Desktop: table row */}
                        <div className="hidden md:grid grid-cols-[60px_1fr_2fr_1fr] gap-4 px-5 py-4 items-start hover:bg-white/[0.02] transition-colors">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                              style={{ background: `${week.accent}22`, color: week.accent }}
                            >
                              {d.day}
                            </div>
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">{d.title}</p>
                            <p className="text-white/40 text-xs mt-0.5">{d.goal}</p>
                          </div>
                          <p className="text-white/60 text-sm leading-relaxed">{d.task}</p>
                          <div className="flex items-start gap-1.5">
                            <Icon name="Send" size={12} className="text-[#FF6B00] mt-0.5 shrink-0" />
                            <span className="text-white/50 text-xs leading-relaxed">{d.deliver}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* What you get for the report */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h3 className="font-heading text-xl text-white mb-4 flex items-center gap-2">
            <Icon name="Gift" size={20} className="text-[#FF6B00]" />
            За финальный отчёт вы получаете
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {BONUSES.map((b) => (
              <div key={b.text} className="flex items-start gap-3 bg-white/5 rounded-xl p-4">
                <div className="w-9 h-9 rounded-lg bg-[rgba(255,107,0,0.15)] flex items-center justify-center shrink-0">
                  <Icon name={b.icon} size={18} className="text-[#FF6B00]" />
                </div>
                <p className="text-white/80 text-sm leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 rounded-xl border border-[#FF6B00]/20 bg-[rgba(255,107,0,0.06)]">
            <p className="text-white/60 text-sm leading-relaxed">
              <span className="text-[#FF6B00] font-semibold">Как сдать финал:</span> упакуйте все файлы и фото в архив,
              отправьте в Telegram с темой{" "}
              <span className="text-white font-mono text-xs bg-white/10 px-2 py-0.5 rounded">
                «Марафон — Название — Отчёт — ФИО»
              </span>
            </p>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="text-center">
          <p className="text-white/50 text-sm mb-5">
            Выберите, как получить марафон — это <span className="text-white font-semibold">бесплатно</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setShowModal(true)}
              className="neon-btn px-8 py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2"
            >
              <Icon name="Send" size={18} />
              Получить в Telegram
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="px-8 py-4 rounded-xl font-semibold text-base border border-[#FF6B00]/40 text-[#FF6B00] hover:bg-[rgba(255,107,0,0.1)] transition-all flex items-center justify-center gap-2"
            >
              <Icon name="Mail" size={18} />
              Получить на почту
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}