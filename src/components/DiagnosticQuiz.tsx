import { useState } from "react";
import Icon from "@/components/ui/icon";

const NOTIFY_URL = "https://functions.poehali.dev/7bba2fb3-0000-4130-964b-1f300eb201bc";

const INFO_FIELDS = [
  { id: "fullName", label: "Ф.И.О.", placeholder: "Иванов Иван Иванович" },
  { id: "phone", label: "Телефон / Telegram", placeholder: "+7 900 000 00 00 или @username" },
  { id: "city", label: "Город", placeholder: "Москва" },
  { id: "projectName", label: "Название проекта", placeholder: "Бар «Огонёк»" },
  { id: "seats", label: "Количество посадочных мест", placeholder: "80", type: "number" },
  { id: "staff", label: "Количество сотрудников проекта", placeholder: "15", type: "number" },
  { id: "payroll", label: "Текущий Фонд Оплаты Труда (₽/мес)", placeholder: "350000", type: "number" },
  { id: "managers", label: "Количество руководящих лиц", placeholder: "3", type: "number" },
];

const QUESTIONS = [
  {
    id: "type",
    question: "Какой проект у вас — ресторан, бар, кафе или кофейня, и какой у него стиль/направление?",
    options: ["Ресторан", "Бар", "Кафе", "Кофейня", "Смешанный формат"],
  },
  {
    id: "atmosphere",
    question: "Как бы вы описали общую атмосферу и вибрацию вашего проекта?",
    options: ["Уютная и домашняя", "Деловая и строгая", "Яркая и тусовочная", "Расслабленная и спокойная", "Творческая и нестандартная"],
  },
  {
    id: "menu",
    question: "Можете ли вы описать текущее меню — еду и предлагаемые напитки?",
    options: ["Широкое меню: еда + алкоголь + напитки", "Только еда и безалкогольные", "Упор на напитки, еда минимальная", "Авторская кухня и коктейли", "Меню нуждается в обновлении"],
  },
  {
    id: "speed",
    question: "Какова средняя скорость обслуживания гостей, заказывающих напитки и еду?",
    options: ["До 5 минут — отлично", "5–10 минут — нормально", "10–20 минут — бывают задержки", "Более 20 минут — часто жалуются"],
  },
  {
    id: "inventory",
    question: "Не могли бы вы объяснить процесс управления запасами для вашего проекта?",
    options: ["Автоматизированный учёт, инвентаризация регулярно", "Таблицы Excel, вручную", "Примерно считаем, точных данных нет", "Хаос — часто не хватает позиций"],
  },
  {
    id: "quality",
    question: "Как вы обеспечиваете качество и консистенцию напитков и еды?",
    options: ["Прописанные стандарты и ТК для каждой позиции", "Контроль шеф-повара / бар-менеджера", "На усмотрение сотрудников", "Пока системы нет"],
  },
  {
    id: "training",
    question: "Можете ли вы описать возможности обучения и повышения квалификации персонала?",
    options: ["Регулярные тренинги и аттестации", "Обучаем при найме", "Стажировка 1–2 дня и в бой", "Обучения практически нет"],
  },
  {
    id: "complaints",
    question: "Как вы обрабатываете жалобы гостей или отзывы, связанные с обслуживанием?",
    options: ["CRM или книга жалоб, разбираем каждый случай", "Менеджер разбирает на месте", "Скидка или замена блюда", "Стараемся игнорировать"],
  },
  {
    id: "sales",
    question: "Какие стратегии у вас есть для стимулирования роста продаж?",
    options: ["Апселл-скрипты, акции, спецпредложения", "Сезонные меню", "Работаем как есть — без стратегии", "Пробовали, но не работает"],
  },
  {
    id: "profit",
    question: "Можете ли вы предоставить информацию о текущем доходе и норме прибыли?",
    options: ["Знаю точно: считаю P&L ежемесячно", "Примерно понимаю", "Сложно сказать — не считаю", "Работаем в ноль или в минус"],
  },
  {
    id: "marketing",
    question: "Как вы продвигаете своё заведение, чтобы привлечь новых гостей?",
    options: ["Instagram, таргет, блогеры", "Сарафанное радио", "Яндекс карты / Google", "Никак — продвижения нет"],
  },
  {
    id: "load",
    question: "Насколько в среднем загружено ваше заведение в час пик?",
    options: ["80–100% — полные залы", "50–70% — норма", "30–50% — много пустых мест", "Менее 30% — пустые смены"],
  },
  {
    id: "drinks",
    question: "Можете ли вы предоставить информацию о продажах напитков (коктейли, пиво, вино, еда)?",
    options: ["Коктейли — основной доход", "Пиво и вино — в приоритете", "Еда перекрывает напитки", "Продажи примерно поровну"],
  },
  {
    id: "signature",
    question: "Есть ли у вас фирменное меню блюд или коктейлей? Как часто обновляете?",
    options: ["Да, обновляем раз в сезон", "Есть фирменные позиции, меню не меняем", "Планируем создать", "Нет фирменного меню"],
  },
  {
    id: "promo",
    question: "Как вы рекламируете специальные предложения, мероприятия или счастливые часы?",
    options: ["Соцсети + email-рассылка", "Только соцсети", "Объявления внутри заведения", "Не рекламируем"],
  },
  {
    id: "performance",
    question: "Как вы оцениваете работу сотрудников и обеспечиваете стабильное качество обслуживания?",
    options: ["KPI и ежемесячная оценка", "Тайный гость / отзывы гостей", "По ощущениям", "Никак не оцениваем"],
  },
  {
    id: "turnover",
    question: "Какова текучесть кадров в вашем заведении?",
    options: ["Минимальная — команда стабильна", "Умеренная — 1–2 в месяц", "Высокая — постоянно ищем людей", "Хаос — сложно удержать кого-либо"],
  },
];

function calcProfitability(answers: Record<string, string>): {
  label: string;
  color: string;
  icon: string;
  title: string;
  text: string;
} {
  let score = 0;

  const scoring: Record<string, Record<string, number>> = {
    speed: { "До 5 минут — отлично": 0, "5–10 минут — нормально": 1, "10–20 минут — бывают задержки": 2, "Более 20 минут — часто жалуются": 3 },
    inventory: { "Автоматизированный учёт, инвентаризация регулярно": 0, "Таблицы Excel, вручную": 1, "Примерно считаем, точных данных нет": 2, "Хаос — часто не хватает позиций": 3 },
    profit: { "Знаю точно: считаю P&L ежемесячно": 0, "Примерно понимаю": 1, "Сложно сказать — не считаю": 2, "Работаем в ноль или в минус": 3 },
    load: { "80–100% — полные залы": 0, "50–70% — норма": 1, "30–50% — много пустых мест": 2, "Менее 30% — пустые смены": 3 },
    turnover: { "Минимальная — команда стабильна": 0, "Умеренная — 1–2 в месяц": 1, "Высокая — постоянно ищем людей": 2, "Хаос — сложно удержать кого-либо": 3 },
    quality: { "Прописанные стандарты и ТК для каждой позиции": 0, "Контроль шеф-повара / бар-менеджера": 1, "На усмотрение сотрудников": 2, "Пока системы нет": 3 },
  };

  for (const [key, map] of Object.entries(scoring)) {
    score += map[answers[key]] ?? 1;
  }

  if (score <= 4) {
    return {
      label: "Высокая рентабельность",
      color: "#22c55e",
      icon: "TrendingUp",
      title: "У вас крепкий фундамент",
      text: "Основные процессы выстроены. Есть точки роста — можно увеличить прибыль на 15–25% через оптимизацию меню и маркетинг.",
    };
  }
  if (score <= 10) {
    return {
      label: "Средняя рентабельность",
      color: "#f59e0b",
      icon: "AlertTriangle",
      title: "Есть скрытые потери",
      text: "Бизнес держится, но деньги утекают через незакрытые дыры. По нашей практике — вы теряете 20–40% выручки ежемесячно.",
    };
  }
  return {
    label: "Низкая рентабельность",
    color: "#ef4444",
    icon: "AlertOctagon",
    title: "Требуется срочный аудит",
    text: "Без системных изменений риск убыточности высокий. Нужен антикризисный разбор как можно скорее.",
  };
}

interface DiagnosticQuizProps {
  diagRef?: React.RefObject<HTMLElement>;
}

export default function DiagnosticQuiz({ diagRef }: DiagnosticQuizProps) {
  const [step, setStep] = useState<"intro" | "info" | "quiz" | "done">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [info, setInfo] = useState<Record<string, string>>({});
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [infoErrors, setInfoErrors] = useState<Record<string, boolean>>({});
  const [sending, setSending] = useState(false);

  const handleInfoChange = (id: string, value: string) => {
    setInfo((prev) => ({ ...prev, [id]: value }));
    if (value.trim()) setInfoErrors((e) => ({ ...e, [id]: false }));
  };

  const submitInfo = () => {
    const errors: Record<string, boolean> = {};
    INFO_FIELDS.forEach((f) => {
      if (!info[f.id]?.trim()) errors[f.id] = true;
    });
    if (Object.keys(errors).length) { setInfoErrors(errors); return; }
    setStep("quiz");
    setCurrentQ(0);
  };

  const selectAnswer = async (value: string) => {
    const q = QUESTIONS[currentQ];
    const newAnswers = { ...answers, [q.id]: value };
    setAnswers(newAnswers);

    const isLast = currentQ === QUESTIONS.length - 1;

    if (!isLast) {
      setTimeout(() => setCurrentQ((c) => c + 1), 280);
    } else {
      setSending(true);
      const result = calcProfitability(newAnswers);
      const infoText = INFO_FIELDS.map((f) => `${f.label}: ${info[f.id] || "—"}`).join("\n");
      const answersText = QUESTIONS.map((q) => `${q.question}\n→ ${newAnswers[q.id] || "—"}`).join("\n\n");

      try {
        await fetch(NOTIFY_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source: "diagnostic_quiz",
            name: info.fullName,
            contact: info.phone,
            profitability: result.label,
            info: infoText,
            answers: answersText,
          }),
        });
      } catch (e) {
        console.error(e);
      }
      setSending(false);
      setStep("done");
    }
  };

  const q = QUESTIONS[currentQ];
  const progress = Math.round((currentQ / QUESTIONS.length) * 100);
  const result = calcProfitability(answers);

  return (
    <section
      ref={diagRef as React.RefObject<HTMLElement>}
      id="diagnostics"
      className="py-16 px-4 bg-[#0d0d0d]"
    >
      <div className="max-w-2xl mx-auto">

        {/* INTRO */}
        {step === "intro" && (
          <div className="glass-card rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[rgba(255,107,0,0.15)] flex items-center justify-center mx-auto mb-5">
              <Icon name="ClipboardList" size={32} className="text-[#FF6B00]" />
            </div>
            <h2 className="text-3xl font-oswald font-bold text-white mb-3 uppercase">
              Бесплатная диагностика
            </h2>
            <p className="text-gray-400 mb-2">
              Пройдите диагностику — узнайте рентабельность вашего заведения и получите личный разбор от эксперта
            </p>
            <div className="flex justify-center gap-6 my-6 text-sm flex-wrap">
              <div className="flex items-center gap-2 text-gray-400">
                <Icon name="Clock" size={16} className="text-[#FF6B00]" />
                5–7 минут
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Icon name="Gift" size={16} className="text-[#FF6B00]" />
                Бесплатно
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Icon name="BarChart2" size={16} className="text-[#FF6B00]" />
                Личный разбор
              </div>
            </div>
            <button
              onClick={() => setStep("info")}
              className="neon-btn text-white font-bold text-lg px-10 py-4 rounded-xl flex items-center gap-3 mx-auto"
            >
              <Icon name="Play" size={20} />
              Начать диагностику
            </button>
          </div>
        )}

        {/* INFO */}
        {step === "info" && (
          <div className="glass-card rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Расскажите о проекте</h3>
              <button onClick={() => setStep("intro")} className="text-gray-600 hover:text-gray-400 transition-colors">
                <Icon name="X" size={18} />
              </button>
            </div>
            <div className="space-y-4">
              {INFO_FIELDS.map((f) => (
                <div key={f.id}>
                  <label className="block text-sm text-gray-400 mb-1">{f.label}</label>
                  <input
                    type={f.type || "text"}
                    value={info[f.id] || ""}
                    onChange={(e) => handleInfoChange(f.id, e.target.value)}
                    placeholder={f.placeholder}
                    className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF6B00] transition-colors ${
                      infoErrors[f.id] ? "border-red-500" : "border-white/10"
                    }`}
                  />
                  {infoErrors[f.id] && <p className="text-red-400 text-xs mt-1">Обязательное поле</p>}
                </div>
              ))}
            </div>
            <button
              onClick={submitInfo}
              className="neon-btn text-white font-bold px-8 py-3 rounded-xl mt-6 w-full flex items-center justify-center gap-2"
            >
              Далее — вопросы о проекте
              <Icon name="ArrowRight" size={18} />
            </button>
          </div>
        )}

        {/* QUIZ */}
        {step === "quiz" && (
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="h-1 bg-white/5">
              <div className="h-full bg-[#FF6B00] transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[#FF6B00] text-sm font-semibold">
                  Вопрос {currentQ + 1} из {QUESTIONS.length}
                </span>
                {sending && <Icon name="Loader2" size={18} className="text-gray-400 animate-spin" />}
              </div>

              <h3 className="text-lg md:text-xl font-bold text-white mb-6 leading-snug">
                {q.question}
              </h3>

              <div className="space-y-3">
                {q.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => selectAnswer(opt)}
                    disabled={sending}
                    className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 disabled:opacity-50 ${
                      answers[q.id] === opt
                        ? "border-[#FF6B00] bg-[rgba(255,107,0,0.12)] text-white"
                        : "border-white/10 bg-white/3 text-gray-300 hover:border-[#FF6B00]/50 hover:bg-[rgba(255,107,0,0.06)]"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {currentQ > 0 && (
                <button
                  onClick={() => setCurrentQ((c) => c - 1)}
                  className="mt-5 text-gray-600 hover:text-gray-400 transition-colors text-sm flex items-center gap-1"
                >
                  <Icon name="ArrowLeft" size={14} />
                  Назад
                </button>
              )}
            </div>
          </div>
        )}

        {/* DONE */}
        {step === "done" && (
          <div className="glass-card rounded-2xl p-8 text-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background: `${result.color}22` }}
            >
              <Icon name={result.icon} size={32} style={{ color: result.color }} />
            </div>
            <div
              className="inline-block text-sm font-bold px-4 py-1.5 rounded-full mb-4"
              style={{ background: `${result.color}22`, color: result.color }}
            >
              {result.label}
            </div>
            <h3 className="text-2xl font-oswald font-bold text-white mb-3 uppercase">
              {result.title}
            </h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">{result.text}</p>
            <div className="glass-card rounded-xl p-4 mb-6 text-left">
              <p className="text-gray-500 text-sm mb-1">Ваш проект</p>
              <p className="text-white font-semibold">{info.projectName} — {info.city}</p>
              <p className="text-gray-500 text-sm mt-1">
                {info.seats} мест · {info.staff} сотрудников · ФОТ {parseInt(info.payroll || "0").toLocaleString("ru")} ₽/мес
              </p>
            </div>
            <div className="bg-[rgba(255,107,0,0.08)] border border-[rgba(255,107,0,0.2)] rounded-xl p-4 text-sm text-gray-400">
              <Icon name="CheckCircle" size={16} className="text-[#FF6B00] inline mr-2" />
              Ваши ответы отправлены эксперту — ожидайте звонка или сообщения
            </div>
          </div>
        )}
      </div>
    </section>
  );
}