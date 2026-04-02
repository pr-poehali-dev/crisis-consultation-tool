import { useState } from "react";
import Icon from "@/components/ui/icon";

const NOTIFY_URL = "https://functions.poehali.dev/7bba2fb3-0000-4130-964b-1f300eb201bc";

interface Service {
  icon: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  blocks: string[];
  callout: string;
  format: string;
  duration: string;
  steps: string[];
  results: string[];
  note: string;
}

const SERVICES: Service[] = [
  {
    icon: "🔍",
    title: "Комплексный аудит ресторана",
    shortDesc: "Полная диагностика вашего заведения: сервис, кухня, финансы, персонал, маркетинг и безопасность.",
    fullDesc: "Системное проведение аудита ресторана является неотъемлемой практикой управления бизнес-процессами, так как это поможет выявить сильные и слабые стороны вашего бизнеса, увеличить общую прибыльность и оставаться конкурентоспособными на рынке.",
    blocks: [
      "Оценка работы Сервиса",
      "Оценка работы Кухни",
      "Аудит финансового состояния предприятия",
      "Аудит HR-процессов",
      "Маркетинговый аудит",
      "Аудит по безопасности предприятия",
    ],
    callout: "Преобразуйте свой ресторан в прибыльный бизнес — аудит откроет новые возможности для роста!",
    format: "Выезд на предприятие",
    duration: "2 дня",
    steps: [
      "Сбор информации путём запроса документов и отправки чек-листов на предприятие.",
      "Выезд на 2 дня в проект, проведение диагностики предприятия.",
      "Формирование отчётности и разработка дорожной карты — индивидуальных рекомендаций по улучшению работы ресторана.",
    ],
    results: [
      "Полную картину о состоянии вашего бизнеса на текущий момент",
      "Чёткий план действий по улучшениям каждого блока: сервис, маркетинг, финансы, персонал, кухня и безопасность",
      "Возможность заказать сопровождение на этапе внедрения изменений",
      "Дополнительно — обучение для ваших сотрудников",
    ],
    note: "Стоимость рассчитывается индивидуально под концепцию и потребности вашего бизнеса.",
  },
  {
    icon: "📋",
    title: "Консультация",
    shortDesc: "Разовая или системная работа по вашему запросу — меню, концепция, управление, сервис.",
    fullDesc: "Персональная консультация позволяет оперативно решить конкретные задачи вашего бизнеса без лишних затрат. Работаем точечно — там, где это нужно прямо сейчас.",
    blocks: [
      "Анализ текущей ситуации и запроса",
      "Разбор слабых мест по выбранному направлению",
      "Практические рекомендации и инструменты",
      "Ответы на все вопросы в режиме диалога",
    ],
    callout: "Один правильный совет в нужный момент — это сотни тысяч сэкономленных или заработанных рублей.",
    format: "Онлайн или выезд на предприятие",
    duration: "от 2 часов",
    steps: [
      "Предварительная анкета для понимания вашего запроса.",
      "Проведение консультации — разбор ситуации и выдача рекомендаций.",
      "Краткое резюме с ключевыми шагами после встречи.",
    ],
    results: [
      "Ясность в конкретном вопросе или направлении",
      "Готовые инструменты и решения под вашу ситуацию",
      "План ближайших действий",
    ],
    note: "Стоимость рассчитывается индивидуально.",
  },
  {
    icon: "🚀",
    title: "Открытие с нуля",
    shortDesc: "Концепция, меню-инжиниринг, стандарты, найм персонала. Запуск под ключ без лишних ошибок.",
    fullDesc: "Открытие ресторана — это сложный многоэтапный процесс, в котором каждая ошибка стоит денег и времени. Я провожу вас за руку от идеи до первого гостя, минуя типичные ловушки.",
    blocks: [
      "Разработка концепции и позиционирования",
      "Меню-инжиниринг и формирование ассортимента",
      "Подбор и обучение персонала",
      "Разработка стандартов сервиса",
      "Настройка операционных процессов",
      "Маркетинг и привлечение первых гостей",
    ],
    callout: "Запустимся в срок и без лишних потерь — я знаю все подводные камни этого пути.",
    format: "Выезд на предприятие + онлайн сопровождение",
    duration: "от 1 месяца",
    steps: [
      "Аудит исходных данных: концепция, локация, бюджет, целевая аудитория.",
      "Разработка дорожной карты открытия с чёткими дедлайнами.",
      "Сопровождение на каждом этапе вплоть до открытия и первых недель работы.",
    ],
    results: [
      "Готовое к работе заведение с выстроенными процессами",
      "Обученный персонал с едиными стандартами",
      "Работающее меню с просчитанной себестоимостью",
      "Первых гостей и стабильный старт",
    ],
    note: "Стоимость рассчитывается индивидуально под масштаб и формат проекта.",
  },
  {
    icon: "👥",
    title: "Обучение персонала",
    shortDesc: "Тренинги для официантов, баристов и управляющих. Скрипты, сервис, продажи.",
    fullDesc: "Персонал — это лицо вашего заведения. Правильно обученная команда увеличивает средний чек, снижает конфликты и создаёт атмосферу, к которой гости возвращаются.",
    blocks: [
      "Тренинги по стандартам сервиса",
      "Скрипты продаж и работы с гостем",
      "Обучение баристов и работе с меню",
      "Тренинг для управляющих и администраторов",
      "Работа с конфликтными ситуациями",
      "Увеличение среднего чека через технику допродаж",
    ],
    callout: "Один тренинг — и ваш персонал начинает работать по-другому.",
    format: "Выезд на предприятие",
    duration: "1–2 дня",
    steps: [
      "Диагностика текущего уровня команды и слабых мест.",
      "Проведение практического тренинга с разбором реальных ситуаций.",
      "Выдача скриптов и стандартов для ежедневного использования.",
    ],
    results: [
      "Единые стандарты обслуживания во всей команде",
      "Рост среднего чека за счёт правильных продаж",
      "Снижение конфликтов и текучести кадров",
      "Уверенный и мотивированный персонал",
    ],
    note: "Стоимость рассчитывается индивидуально в зависимости от размера команды.",
  },
  {
    icon: "📈",
    title: "Операционный менеджмент",
    shortDesc: "Выстраиваю процессы, повышаю оборачиваемость и снижаю потери без смены команды.",
    fullDesc: "Операционные проблемы — это медленная утечка денег. Я нахожу узкие места в работе заведения и выстраиваю систему, которая работает стабильно даже без вашего постоянного присутствия.",
    blocks: [
      "Аудит операционных процессов",
      "Оптимизация рабочих процессов кухни и зала",
      "Снижение потерь и издержек",
      "Настройка системы контроля качества",
      "Разработка регламентов и чек-листов",
      "Повышение оборачиваемости столов",
    ],
    callout: "Система работает без вас — вы управляете результатом, а не тушите пожары.",
    format: "Выезд на предприятие + онлайн сопровождение",
    duration: "от 2 недель",
    steps: [
      "Анализ текущих процессов и выявление точек потерь.",
      "Разработка и внедрение новых регламентов и стандартов.",
      "Контроль исполнения и корректировка на первом этапе.",
    ],
    results: [
      "Чёткие и понятные процессы для каждого сотрудника",
      "Снижение операционных потерь и издержек",
      "Рост оборачиваемости и прибыли",
      "Заведение, которое работает системно",
    ],
    note: "Стоимость рассчитывается индивидуально.",
  },
  {
    icon: "🍽️",
    title: "Меню-инжиниринг",
    shortDesc: "Анализ и перестройка меню для роста прибыли: себестоимость, маржинальность, структура.",
    fullDesc: "Меню — это главный инструмент продаж вашего заведения. Правильно выстроенное меню увеличивает средний чек и маржу без повышения цен для гостя.",
    blocks: [
      "Анализ текущего меню по матрице BCG",
      "Расчёт себестоимости и маржинальности каждой позиции",
      "Выявление убыточных и якорных позиций",
      "Разработка структуры и навигации меню",
      "Рекомендации по ценообразованию",
      "Сезонные обновления и спецпредложения",
    ],
    callout: "Правильное меню продаёт само — без уговоров и скидок.",
    format: "Онлайн или выезд на предприятие",
    duration: "3–5 дней",
    steps: [
      "Получение текущего меню и данных по продажам.",
      "Анализ каждой позиции и формирование рекомендаций.",
      "Финальный разбор с владельцем и передача обновлённой структуры меню.",
    ],
    results: [
      "Понимание, какие позиции приносят деньги, а какие — убытки",
      "Обновлённое меню с правильным балансом и ценообразованием",
      "Рост маржинальности без снижения привлекательности для гостей",
    ],
    note: "Стоимость рассчитывается индивидуально.",
  },
  {
    icon: "🤝",
    title: "Наставничество для рестораторов",
    shortDesc: "Персональное сопровождение владельца или управляющего на пути к системному бизнесу.",
    fullDesc: "Наставничество — это не разовая консультация, а системная работа рядом с вами. Я становлюсь вашим партнёром, который помогает принимать правильные решения и двигаться к целям быстрее.",
    blocks: [
      "Регулярные встречи и разборы текущих ситуаций",
      "Помощь в принятии управленческих решений",
      "Развитие как предпринимателя и руководителя",
      "Работа с командой и управление персоналом",
      "Финансовое мышление и контроль показателей",
      "Стратегия роста и масштабирования",
    ],
    callout: "Рядом с правильным наставником вы за полгода проходите путь, на который обычно уходят годы.",
    format: "Онлайн + выезды по необходимости",
    duration: "от 3 месяцев",
    steps: [
      "Вводная сессия: разбор текущей ситуации, целей и запросов.",
      "Регулярные встречи (2–4 раза в месяц) с разбором актуальных задач.",
      "Постоянная поддержка в чате между сессиями.",
    ],
    results: [
      "Ясность в стратегии и ближайших шагах",
      "Уверенность в управленческих решениях",
      "Системный бизнес, который растёт без хаоса",
      "Личностный рост как лидера и предпринимателя",
    ],
    note: "Стоимость рассчитывается индивидуально по формату и длительности.",
  },
];

export default function ServicesSection() {
  const [selected, setSelected] = useState<Service | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleClose = () => {
    setSelected(null);
    setSent(false);
    setName("");
    setPhone("");
  };

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim() || !selected) return;
    setSending(true);
    try {
      await fetch(NOTIFY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          contact: phone,
          problem: `Заявка на услугу: ${selected.title}`,
          city: "—",
          project: "—",
          staff: "—",
          score: 0,
          result_label: `Услуга: ${selected.title}`,
        }),
      });
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="py-20 px-6 w-full" id="services">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white mb-3 tracking-wide">
              МОИ <span style={{ color: "#ff6a00" }}>УСЛУГИ</span>
            </h2>
            <div className="w-16 h-1 mx-auto rounded-full" style={{ background: "#ff6a00" }} />
            <p className="text-gray-400 mt-4 text-base max-w-xl mx-auto">
              Системная работа с ресторанным бизнесом — от аудита до наставничества
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((service, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 flex flex-col gap-4 cursor-pointer group transition-all duration-200 hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,106,0,0.2)",
                }}
                onClick={() => setSelected(service)}
              >
                <div className="text-4xl">{service.icon}</div>
                <h3 className="font-oswald text-lg font-bold text-white uppercase tracking-wide leading-tight">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">
                  {service.shortDesc}
                </p>
                <button
                  className="mt-auto self-start px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                  style={{
                    background: "transparent",
                    border: "1.5px solid #ff6a00",
                    color: "#ff6a00",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = "#ff6a00";
                    (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    (e.currentTarget as HTMLButtonElement).style.color = "#ff6a00";
                  }}
                >
                  Подробнее
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)" }}
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
            style={{ background: "#1a1a1a", border: "1px solid rgba(255,106,0,0.3)" }}
            onClick={e => e.stopPropagation()}
          >
            <div className="px-7 py-5 rounded-t-2xl" style={{ background: "#ff6a00" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-white text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">Услуга</span>
              </div>
              <h2 className="font-oswald text-2xl md:text-3xl font-bold text-white uppercase leading-tight">
                {selected.title}
              </h2>
            </div>

            <div className="px-7 py-6 flex flex-col gap-6">
              <p className="text-gray-300 text-sm leading-relaxed">{selected.fullDesc}</p>

              <div>
                <p className="font-bold text-white mb-3 text-sm">
                  Я проведу работу, включая основные блоки:
                </p>
                <ul className="flex flex-col gap-2">
                  {selected.blocks.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <span style={{ color: "#ff6a00" }} className="mt-0.5 flex-shrink-0">•</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {selected.callout && (
                <p className="font-semibold text-white text-sm italic border-l-4 pl-4" style={{ borderColor: "#ff6a00" }}>
                  {selected.callout}
                </p>
              )}

              <div className="flex gap-6 flex-wrap">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Формат</p>
                  <p className="text-white text-sm font-semibold">{selected.format}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Сроки</p>
                  <p className="text-white text-sm font-semibold">{selected.duration}</p>
                </div>
              </div>

              <div>
                <p className="font-bold text-white mb-3 text-sm">Как будет проходить наша работа:</p>
                <div className="flex flex-col gap-3">
                  {selected.steps.map((step, i) => (
                    <div key={i} className="flex gap-3 items-start text-sm text-gray-300">
                      <span
                        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: "#ff6a00" }}
                      >
                        {i + 1}
                      </span>
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-bold text-white mb-3 text-sm">По результатам вы получите:</p>
                <ul className="flex flex-col gap-2">
                  {selected.results.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <span style={{ color: "#ff6a00" }} className="mt-0.5 flex-shrink-0">✓</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-gray-500 text-xs italic">*{selected.note}</p>

              <div className="rounded-xl p-5 flex flex-col gap-4" style={{ background: "rgba(255,106,0,0.08)", border: "1px solid rgba(255,106,0,0.25)" }}>
                {sent ? (
                  <div className="text-center py-4">
                    <div className="text-3xl mb-2">✅</div>
                    <p className="text-white font-bold text-base">Заявка отправлена!</p>
                    <p className="text-gray-400 text-sm mt-1">Руслан свяжется с вами в ближайшее время.</p>
                    <button
                      className="mt-4 px-6 py-2 rounded-xl text-sm font-semibold text-white"
                      style={{ background: "#ff6a00" }}
                      onClick={handleClose}
                    >
                      Закрыть
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-white font-bold text-sm">Оставить заявку на эту услугу</p>
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none"
                      style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
                    />
                    <input
                      type="tel"
                      placeholder="Телефон или Telegram"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none"
                      style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
                    />
                    <div className="flex gap-3 flex-wrap">
                      <button
                        className="px-6 py-3 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-50"
                        style={{ background: "#ff6a00" }}
                        onClick={handleSubmit}
                        disabled={sending || !name.trim() || !phone.trim()}
                      >
                        {sending ? "Отправляем..." : "Отправить заявку"}
                      </button>
                      <button
                        className="px-6 py-3 rounded-xl text-sm font-semibold transition-all"
                        style={{ border: "1px solid rgba(255,255,255,0.2)", color: "#aaa" }}
                        onClick={handleClose}
                      >
                        Закрыть
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            <button
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
              style={{ background: "rgba(255,255,255,0.1)" }}
              onClick={handleClose}
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}