import { useState } from "react";
import Icon from "@/components/ui/icon";
import { sendLead } from "@/utils/sendLead";
import ContactFallback from "@/components/ContactFallback";

type FormatId = "coffee" | "bar" | "restaurant";

const FORMATS: { id: FormatId; label: string; icon: string; duration: string; intro: string }[] = [
  {
    id: "coffee",
    label: "Кофейня",
    icon: "☕",
    duration: "1–2 месяца",
    intro: "Компактный формат с быстрым запуском: акцент на атмосферу, кофе и повторные визиты гостей.",
  },
  {
    id: "bar",
    label: "Бар",
    icon: "🍸",
    duration: "2–3 месяца",
    intro: "Формат с упором на атмосферу вечера, барную карту и работу с лицензированием крепкого алкоголя.",
  },
  {
    id: "restaurant",
    label: "Ресторан",
    icon: "🍽️",
    duration: "3–4 месяца",
    intro: "Полноценный проект с кухней, залом и сложной операционкой — требует самой тщательной подготовки.",
  },
];

interface Stage {
  icon: string;
  title: string;
  description: string;
  includes: string[];
  specifics: Record<FormatId, string>;
}

const STAGES: Stage[] = [
  {
    icon: "MessageCircle",
    title: "Встреча и бриф",
    description: "Первая встреча, на которой я узнаю вашу цель, бюджет, локацию и видение будущего заведения. Здесь закладывается фундамент всего проекта — без этого шага двигаться дальше нет смысла.",
    includes: [
      "Разбор вашей идеи и ожиданий от бизнеса",
      "Определение бюджета и сроков запуска",
      "Оценка локации, если она уже выбрана",
      "Формирование технического задания на проект",
    ],
    specifics: {
      coffee: "Обсуждаем формат: to-go, зона для гостей или гибрид, трафик района.",
      bar: "Обсуждаем концепцию вечера: коктейльный, пивной, винный формат, целевую аудиторию.",
      restaurant: "Обсуждаем кухню, формат подачи, вместимость зала и требуемую посадку.",
    },
  },
  {
    icon: "Target",
    title: "Концепция и позиционирование",
    description: "Разрабатываю концепцию заведения: атмосферу, стиль, целевую аудиторию и то, чем вы будете отличаться от конкурентов в вашем районе.",
    includes: [
      "Анализ конкурентов в радиусе локации",
      "Определение целевой аудитории и её потребностей",
      "Формулирование уникального торгового предложения",
      "Название, атмосфера, общая стилистика заведения",
    ],
    specifics: {
      coffee: "Делаем акцент на узнаваемость и повод возвращаться каждый день.",
      bar: "Продумываем вечернюю атмосферу, музыку, освещение, формат мероприятий.",
      restaurant: "Формируем гастрономическую идею и историю, которую расскажет меню.",
    },
  },
  {
    icon: "Calculator",
    title: "Финансовая модель",
    description: "Считаю, сколько денег нужно на запуск и когда заведение выйдет в плюс. Финансовая модель — это ваша страховка от кассовых разрывов в первые месяцы работы.",
    includes: [
      "Расчёт бюджета открытия по всем статьям расходов",
      "Прогноз выручки и точка безубыточности",
      "План по операционным расходам на старте",
      "Сценарии: пессимистичный, реалистичный, оптимистичный",
    ],
    specifics: {
      coffee: "Считаем окупаемость оборудования и трафик, необходимый для выхода в ноль.",
      bar: "Учитываем сезонность и неравномерную загрузку по дням недели.",
      restaurant: "Закладываем более длинный период выхода на операционную прибыль.",
    },
  },
  {
    icon: "FileText",
    title: "Помещение и документы",
    description: "Помогаю с проверкой и подбором помещения, а также разбираюсь в юридических и разрешительных вопросах, чтобы вы не получили штраф или закрытие в первый месяц работы.",
    includes: [
      "Чек-лист требований к помещению под ваш формат",
      "Проверка договора аренды на риски",
      "Список разрешений: СЭС, пожарная безопасность, вывеска",
      "Оформление ИП/юрлица и налогового режима",
    ],
    specifics: {
      coffee: "Проверяем вентиляцию и возможность установки кофемашины и точек воды.",
      bar: "Разбираем нюансы лицензии на розничную продажу алкоголя.",
      restaurant: "Уделяем особое внимание требованиям к производственным помещениям кухни.",
    },
  },
  {
    icon: "Ruler",
    title: "Дизайн и ремонт",
    description: "Формирую техническое задание для дизайнера и контролирую, чтобы планировка была не только красивой, но и удобной для персонала — от этого зависит скорость обслуживания.",
    includes: [
      "Функциональное зонирование зала и рабочей зоны",
      "Техническое задание для дизайнера и подрядчиков",
      "Контроль соответствия проекта нормам и вашему бюджету",
      "Подбор подрядчиков и контроль сроков ремонта",
    ],
    specifics: {
      coffee: "Продумываем барную стойку как центр внимания зала.",
      bar: "Прорабатываем зонирование барной стойки и посадочных зон для разного трафика.",
      restaurant: "Отдельно прорабатываем логистику кухни: от приёмки продуктов до подачи блюд.",
    },
  },
  {
    icon: "BookOpen",
    title: "Меню и технологические карты",
    description: "Разрабатываю меню или барную карту с просчитанной себестоимостью каждой позиции — чтобы блюда были вкусными для гостя и прибыльными для вас.",
    includes: [
      "Формирование структуры меню/карты напитков",
      "Технологические карты с точной себестоимостью",
      "Подбор поставщиков продуктов и напитков",
      "Ценообразование с учётом целевой маржинальности",
    ],
    specifics: {
      coffee: "Формируем компактную карту напитков и еды навынос с высокой маржой.",
      bar: "Разрабатываем сигнатурные коктейли и карту крепкого алкоголя.",
      restaurant: "Прорабатываем полноценное меню с балансом хитов и маржинальных позиций.",
    },
  },
  {
    icon: "Wrench",
    title: "Оборудование и поставщики",
    description: "Подбираю оборудование под ваш формат и бюджет, помогаю договориться с поставщиками на выгодных условиях — это экономит сотни тысяч рублей на старте.",
    includes: [
      "Спецификация оборудования кухни/бара и зала",
      "Переговоры с поставщиками оборудования",
      "Подбор мебели, посуды и инвентаря",
      "Настройка кассового и учётного оборудования",
    ],
    specifics: {
      coffee: "Помогаю выбрать кофемашину и помол под ваш бюджет и объём трафика.",
      bar: "Подбираем барное оборудование и посуду под концепцию заведения.",
      restaurant: "Формируем полную спецификацию кухонного оборудования по всем цехам.",
    },
  },
  {
    icon: "Users",
    title: "Подбор и обучение персонала",
    description: "Помогаю найти ключевых сотрудников и обучаю их стандартам сервиса ещё до открытия — чтобы в первый день команда работала слаженно, а не училась на гостях.",
    includes: [
      "Профили должностей и требования к кандидатам",
      "Помощь в подборе управляющего и ключевых сотрудников",
      "Обучение стандартам сервиса до открытия",
      "Разработка мотивации и системы смен",
    ],
    specifics: {
      coffee: "Обучаем бариста работе с потоком гостей в часы пик.",
      bar: "Обучаем барменов стандартам приготовления и скорости обслуживания.",
      restaurant: "Обучаем официантов и кухню слаженной работе в связке зал–кухня.",
    },
  },
  {
    icon: "Rocket",
    title: "Маркетинг и запуск",
    description: "Готовлю стратегию привлечения первых гостей: от оформления соцсетей до дня открытия. Первые недели работы задают репутацию заведения на месяцы вперёд.",
    includes: [
      "Стратегия продвижения перед открытием",
      "Оформление соцсетей и карточек на картах",
      "План мягкого открытия для обкатки процессов",
      "Сценарий официального открытия для привлечения гостей",
    ],
    specifics: {
      coffee: "Делаем акцент на локальное продвижение и программу лояльности.",
      bar: "Готовим событийный запуск: вечеринка открытия, коллаборации.",
      restaurant: "Приглашаем блогеров и локальных лидеров мнений на пре-опенинг.",
    },
  },
  {
    icon: "TrendingUp",
    title: "Сопровождение после открытия",
    description: "Первые недели — самые важные. Остаюсь на связи, чтобы быстро скорректировать процессы, меню или работу персонала по факту первых отзывов гостей.",
    includes: [
      "Контроль качества сервиса в первые недели",
      "Корректировка меню и цен по факту продаж",
      "Разбор обратной связи от первых гостей",
      "Рекомендации по дальнейшему росту заведения",
    ],
    specifics: {
      coffee: "Анализируем топ-продажи и корректируем ассортимент под спрос.",
      bar: "Оцениваем загрузку по дням недели и корректируем программу мероприятий.",
      restaurant: "Разбираем работу кухни в потоке и донастраиваем тайминги подачи.",
    },
  },
];

export default function StartupSection() {
  const [format, setFormat] = useState<FormatId>("coffee");
  const [openStage, setOpenStage] = useState<number | null>(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const activeFormat = FORMATS.find((f) => f.id === format)!;

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) return;
    setLoading(true);
    setError(false);
    try {
      await sendLead({
        source: "startup",
        name,
        contact: phone,
        format: activeFormat.label,
      });
      window.ym?.(108400507, "reachGoal", "startup_submit");
      setSent(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 bg-[#1A120B]" id="startup">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[rgba(255,122,26,0.1)] border border-[rgba(255,122,26,0.3)] rounded-full px-4 py-2 mb-6">
            <Icon name="Rocket" size={16} className="text-[#FF7A1A]" />
            <span className="text-[#FF7A1A] text-sm font-medium uppercase tracking-wider">Открытие под ключ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-oswald font-bold text-white mb-4 uppercase">
            От идеи <span className="neon-text">до первого гостя</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Провожу заведение через весь путь запуска — кофейню, бар или ресторан. Ниже расписан каждый этап: что именно я делаю и что получаете вы.
          </p>
        </div>

        {/* Переключатель формата */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          {FORMATS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFormat(f.id)}
              className={`flex-1 rounded-2xl px-5 py-4 text-left transition-all duration-200 border ${
                format === f.id
                  ? "bg-[rgba(255,122,26,0.15)] border-[#FF7A1A]"
                  : "bg-white/5 border-white/10 hover:border-[rgba(255,122,26,0.4)]"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{f.icon}</span>
                <span className="text-white font-oswald font-bold uppercase">{f.label}</span>
              </div>
              <p className="text-gray-400 text-xs">{f.duration} на запуск</p>
            </button>
          ))}
        </div>

        <div className="glass-card rounded-2xl p-6 mb-10 border border-[rgba(255,122,26,0.2)]">
          <p className="text-gray-300 text-sm leading-relaxed">{activeFormat.intro}</p>
        </div>

        {/* Этапы */}
        <div className="flex flex-col gap-3">
          {STAGES.map((stage, i) => {
            const isOpen = openStage === i;
            return (
              <div
                key={stage.title}
                className="glass-card rounded-2xl overflow-hidden border border-white/10"
              >
                <button
                  onClick={() => setOpenStage(isOpen ? null : i)}
                  className="w-full flex items-center gap-4 p-5 text-left"
                >
                  <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-[rgba(255,122,26,0.15)] flex items-center justify-center text-[#FF7A1A] font-bold">
                    {i + 1}
                  </span>
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                    <Icon name={stage.icon} size={18} className="text-[#FFA64D]" />
                  </div>
                  <span className="flex-1 text-white font-oswald font-bold text-base md:text-lg uppercase tracking-wide">
                    {stage.title}
                  </span>
                  <Icon
                    name="ChevronDown"
                    size={20}
                    className={`text-gray-500 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pl-[4.75rem] flex flex-col gap-4">
                    <p className="text-gray-300 text-sm leading-relaxed">{stage.description}</p>

                    <ul className="flex flex-col gap-2">
                      {stage.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="text-[#FFA64D] mt-0.5 flex-shrink-0">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="rounded-xl px-4 py-3 bg-[rgba(255,122,26,0.08)] border border-[rgba(255,122,26,0.2)]">
                      <p className="text-xs text-[#FFA64D] font-semibold mb-1">
                        {activeFormat.icon} Для формата «{activeFormat.label}»
                      </p>
                      <p className="text-gray-300 text-sm">{stage.specifics[format]}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA форма */}
        <div className="mt-12 rounded-2xl p-6 md:p-8 border-2 border-[rgba(255,122,26,0.3)]" style={{ background: "rgba(255,122,26,0.06)" }}>
          {sent ? (
            <div className="text-center py-4">
              <div className="text-5xl mb-3">🚀</div>
              <h3 className="text-xl font-oswald font-bold text-white mb-2">Заявка принята!</h3>
              <p className="text-gray-400 text-sm">Руслан свяжется с вами, чтобы обсудить открытие вашего заведения.</p>
              <ContactFallback />
            </div>
          ) : (
            <>
              <h3 className="text-xl md:text-2xl font-oswald font-bold text-white mb-2 uppercase">
                Хотите открыть {activeFormat.label.toLowerCase()}?
              </h3>
              <p className="text-gray-400 text-sm mb-5">
                Оставьте заявку — обсудим ваш проект и стоимость сопровождения. Стоимость рассчитывается индивидуально под формат, локацию и масштаб заведения.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[rgba(255,122,26,0.5)] transition-colors"
                />
                <input
                  type="text"
                  placeholder="Телефон или Telegram"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[rgba(255,122,26,0.5)] transition-colors"
                />
              </div>

              {error && <ContactFallback isError />}

              {!error && (
                <button
                  onClick={handleSubmit}
                  disabled={loading || !name.trim() || !phone.trim()}
                  className="neon-btn w-full sm:w-auto text-white font-bold px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Icon name="Loader2" size={18} className="animate-spin" />
                  ) : (
                    <Icon name="Rocket" size={18} />
                  )}
                  Обсудить открытие заведения
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
