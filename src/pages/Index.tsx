import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import ReviewsSection from "@/components/ReviewsSection";
import ServicesSection from "@/components/ServicesSection";
import TipsSection from "@/components/TipsSection";
import ChecklistsSection from "@/components/ChecklistsSection";
import MarathonSection from "@/components/MarathonSection";
import BuyModal from "@/components/BuyModal";
import CasesSection from "@/components/CasesSection";
import ActivityToast from "@/components/ActivityToast";
import FaqSection from "@/components/FaqSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import CalculatorSection from "@/components/CalculatorSection";
import PainsSection from "@/components/PainsSection";
import AboutSection from "@/components/AboutSection";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/files/b7745768-dddb-4b05-ab03-80b3e89956cf.jpg";
const NOTIFY_URL = "https://functions.poehali.dev/c328fb70-3615-4b46-8463-95a676ea3214";
const COUNTER_URL = "https://functions.poehali.dev/466a7ae9-ffcb-4019-87a3-51ac4a629d27";

type Step = "landing" | "anketa" | "quiz" | "deepquiz" | "result" | "thanks";
type Section = "about" | "services" | "cases" | "reviews" | "faq" | "howwework" | "calculator" | "checklists" | "marathon" | null;

interface AnketaData {
  name: string;
  city: string;
  project: string;
  staff: string;
  problem: string;
  contact: string;
}

interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  options: { text: string; score: number }[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    category: "Финансы",
    question: "Знаете ли вы точную себестоимость каждого блюда в вашем меню?",
    options: [
      { text: "Да, у нас есть точные расчёты для каждой позиции", score: 10 },
      { text: "Примерно, считаем по ощущениям", score: 4 },
      { text: "Нет, никогда не считали", score: 0 },
    ],
  },
  {
    id: "q2",
    category: "Финансы",
    question: "Какова ваша средняя наценка на блюда и напитки?",
    options: [
      { text: "Более 250% — знаю цифры точно", score: 10 },
      { text: "100–250% — примерно понимаю", score: 5 },
      { text: "Менее 100% или не знаю", score: 0 },
    ],
  },
  {
    id: "q3",
    category: "Доходы",
    question: "Как изменилась ваша выручка за последние 3 месяца?",
    options: [
      { text: "Растёт — есть положительная динамика", score: 10 },
      { text: "Стабильна, без роста и падения", score: 5 },
      { text: "Снижается или сильно скачет", score: 0 },
    ],
  },
  {
    id: "q4",
    category: "Персонал",
    question: "Как часто у вас меняется персонал (текучка)?",
    options: [
      { text: "Редко — команда работает больше года", score: 10 },
      { text: "Средняя — раз в 3–6 месяцев", score: 5 },
      { text: "Высокая — сотрудники постоянно меняются", score: 0 },
    ],
  },
  {
    id: "q5",
    category: "Персонал",
    question: "Есть ли у вас прописанные стандарты сервиса и обучение персонала?",
    options: [
      { text: "Да — есть скрипты, тренинги и стандарты", score: 10 },
      { text: "Частично — что-то есть, но не системно", score: 4 },
      { text: "Нет — всё на интуиции и опыте", score: 0 },
    ],
  },
  {
    id: "q6",
    category: "Меню",
    question: "Проводите ли вы анализ продаж (АБС-анализ / инженерия меню)?",
    options: [
      { text: "Да — регулярно анализируем и обновляем меню", score: 10 },
      { text: "Иногда — смотрим что плохо продаётся", score: 4 },
      { text: "Нет — меню не меняется годами", score: 0 },
    ],
  },
  {
    id: "q7",
    category: "Гости",
    question: "Работаете ли вы с отзывами и повторными визитами гостей?",
    options: [
      { text: "Да — программа лояльности, мониторинг отзывов", score: 10 },
      { text: "Частично — отвечаем на отзывы когда видим", score: 4 },
      { text: "Нет — не занимаемся этим", score: 0 },
    ],
  },
  {
    id: "q8",
    category: "Маркетинг",
    question: "Есть ли у вас работающая стратегия привлечения новых гостей?",
    options: [
      { text: "Да — SMM, реклама, коллаборации и акции", score: 10 },
      { text: "Иногда делаем акции или посты", score: 4 },
      { text: "Нет — работаем только на «сарафанном радио»", score: 0 },
    ],
  },
  {
    id: "q9",
    category: "Управление",
    question: "Используете ли вы систему учёта (iiko, r_keeper, Poster и др.)?",
    options: [
      { text: "Да — автоматизирован склад, кухня и касса", score: 10 },
      { text: "Есть кассовая программа, но склад вручную", score: 5 },
      { text: "Нет — всё вручную или на бумаге", score: 0 },
    ],
  },
  {
    id: "q10",
    category: "Управление",
    question: "Знаете ли вы свою точку безубыточности и плановую прибыль?",
    options: [
      { text: "Да — есть финансовая модель и план", score: 10 },
      { text: "Примерно понимаю, но без расчётов", score: 4 },
      { text: "Нет — не знаю эти цифры", score: 0 },
    ],
  },
  {
    id: "q11",
    category: "Поставщики",
    question: "Насколько стабильны ваши поставщики и условия закупок?",
    options: [
      { text: "Стабильно — договоры, фиксированные цены, несколько поставщиков", score: 10 },
      { text: "В целом нормально, но бывают перебои", score: 5 },
      { text: "Проблемы — задержки, рост цен, один поставщик", score: 0 },
    ],
  },
  {
    id: "q12",
    category: "Аренда",
    question: "Какую долю от выручки составляет аренда?",
    options: [
      { text: "До 10% — комфортно и обоснованно", score: 10 },
      { text: "10–20% — терпимо, но давит", score: 5 },
      { text: "Более 20% — аренда съедает прибыль", score: 0 },
    ],
  },
];

const DEEP_QUESTIONS = [
  { id: "revenue_change", label: "Как изменилась ваша выручка за последние 6 месяцев по сравнению с аналогичным периодом прошлого года?", placeholder: "Например: выросла на 15%, снизилась на 10%..." },
  { id: "avg_check", label: "Каков средний чек сейчас и как он менялся за последние 3 месяца?", placeholder: "Например: 1200 руб., за 3 месяца вырос на 100 руб." },
  { id: "peak_load", label: "Насколько заполнены ваши залы в часы пик по шкале 1–5?", placeholder: "1 — почти пусто, 5 — полностью заполнено. Например: 3–4" },
  { id: "cost_control", label: "Есть ли у вас системы учёта себестоимости и контроля запасов?", placeholder: "FIFO, карточки блюд, учёт в 1С / ПО — или нет, опишите как считаете" },
  { id: "staff_turnover", label: "Какова текучесть персонала за последний год?", placeholder: "Например: 30% уволилось, среднее время работы — 8 месяцев" },
  { id: "service_standards", label: "Есть ли стандарты обслуживания и регулярные тренинги?", placeholder: "Да / нет + частота. Например: да, раз в квартал" },
  { id: "menu_relevance", label: "Насколько актуально ваше меню по шкале 1–5?", placeholder: "1 — всё ок, 5 — много проблем с рентабельностью позиций" },
  { id: "main_costs", label: "Какие основные статьи затрат вызывают наибольшее беспокойство?", placeholder: "Аренда / закупки / ЗП / коммуналка / маркетинг / прочее — выберите" },
  { id: "crisis_cases", label: "Были ли в последние 12 месяцев кризисные ситуации? Как решали?", placeholder: "Резкое падение выручки, срыв поставок, штрафы — опишите кратко" },
  { id: "tracked_metrics", label: "Какие ключевые метрики вы сейчас отслеживаете регулярно?", placeholder: "Выручка, средний чек, % сырья, конверсия брони, отток клиентов и т.д." },
];

const MAX_SCORE = QUESTIONS.length * 10;

const ALL_CATEGORIES = ["Финансы", "Доходы", "Персонал", "Меню", "Гости", "Маркетинг", "Управление", "Поставщики", "Аренда"];

function getResultData(percent: number) {
  if (percent >= 75) {
    return {
      label: "Ваш бизнес в хорошей форме",
      emoji: "💚",
      color: "text-green-400",
      barColor: "from-green-500 to-emerald-400",
      description:
        "У вас выстроены ключевые процессы. Тем не менее всегда есть точки роста — поговорим о масштабировании и увеличении прибыли.",
    };
  } else if (percent >= 45) {
    return {
      label: "Есть серьёзные зоны риска",
      emoji: "🟡",
      color: "text-yellow-400",
      barColor: "from-yellow-500 to-orange-400",
      description:
        "Ваш бизнес работает, но теряет деньги на нескольких критических участках. Без вмешательства ситуация будет ухудшаться.",
    };
  } else {
    return {
      label: "Критическое состояние бизнеса",
      emoji: "🔴",
      color: "text-red-400",
      barColor: "from-red-600 to-red-500",
      description:
        "Ваш проект находится в зоне высокого риска убытков. Необходимо срочно выявить и устранить ключевые проблемы.",
    };
  }
}

export default function Index() {
  const [step, setStep] = useState<Step>("landing");
  const [anketa, setAnketa] = useState<AnketaData>({
    name: "", city: "", project: "", staff: "", problem: "", contact: "",
  });
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const [displayPercent, setDisplayPercent] = useState(0);
  const [deepAnswers, setDeepAnswers] = useState<Record<string, string>>({});
  const [currentDeepQ, setCurrentDeepQ] = useState(0);
  const [deepAnimKey, setDeepAnimKey] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [diagCount, setDiagCount] = useState(247);
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>(null);

  useEffect(() => {
    fetch(COUNTER_URL).then(r => r.json()).then(d => setDiagCount(d.count)).catch(() => {});
  }, []);

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const percent = Math.round((totalScore / MAX_SCORE) * 100);

  useEffect(() => {
    if (step === "result") {
      setDisplayPercent(0);
      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        setDisplayPercent(current);
        if (current >= percent) clearInterval(interval);
      }, 18);
      return () => clearInterval(interval);
    }
  }, [step, percent]);

  const handleAnketaSubmit = () => {
    if (!anketa.name || !anketa.city || !anketa.project || !anketa.contact) return;
    setStep("quiz");
    setCurrentQ(0);
    setAnimKey((k) => k + 1);
  };

  const handleOptionSelect = (score: number, idx: number) => {
    setSelectedOption(idx);
    setTimeout(() => {
      const qId = QUESTIONS[currentQ].id;
      setAnswers((prev) => ({ ...prev, [qId]: score }));
      setSelectedOption(null);
      if (currentQ + 1 < QUESTIONS.length) {
        setCurrentQ((q) => q + 1);
        setAnimKey((k) => k + 1);
      } else {
        setStep("deepquiz");
        setCurrentDeepQ(0);
        setDeepAnimKey((k) => k + 1);
      }
    }, 350);
  };

  const sendResultToRuslan = async (currentPercent: number, currentDeepAnswers: Record<string, string>) => {
    const res = getResultData(currentPercent);
    await fetch(NOTIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: anketa.name,
        contact: anketa.contact,
        city: anketa.city || "—",
        project: anketa.project || "—",
        staff: anketa.staff || "—",
        problem: anketa.problem || "—",
        score: currentPercent,
        result_label: res.label,
        quiz_answers: answers,
        ...currentDeepAnswers,
      }),
    });
  };

  const handleConsultRequest = () => {
    setStep("thanks");
  };

  const result = getResultData(percent);

  const resetAll = () => {
    setStep("landing");
    setActiveSection(null);
    setAnswers({});
    setCurrentQ(0);
    setAnketa({ name: "", city: "", project: "", staff: "", problem: "", contact: "" });
    setDeepAnswers({});
    setCurrentDeepQ(0);
    setDisplayPercent(0);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-montserrat overflow-x-hidden">

      {/* ─── LANDING ─── */}
      {step === "landing" && activeSection === null && (
        <div className="min-h-screen flex flex-col">
          {/* Hero */}
          <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2d1a00 40%, #ff6a00 100%)" }}>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #ff8c00 0%, transparent 50%), radial-gradient(circle at 80% 30%, #ff4500 0%, transparent 40%)" }} />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 pt-10 pb-0">
              <div className="text-center mb-6">
                <h1 className="font-oswald font-black leading-none uppercase" style={{ fontSize: "clamp(3rem, 9vw, 8rem)", color: "#ff8c00", textShadow: "0 4px 40px rgba(255,140,0,0.35)" }}>
                  ЭКСПЕРТ И КОНСУЛЬТАНТ
                </h1>
                <h2 className="font-oswald font-black leading-none uppercase text-white" style={{ fontSize: "clamp(1.5rem, 4.5vw, 4rem)" }}>
                  В СФЕРЕ <span style={{ color: "#ff8c00" }}>HoReCa</span> ДЛЯ РЕСТОРАНОВ, БАРОВ И КОФЕЕН
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-end gap-6 md:min-h-[480px]">
                <div className="flex flex-col justify-end py-8">
                  <p className="text-white font-black text-xl mb-4 uppercase tracking-wide leading-tight">Диагностирую бизнес<br />и нахожу точки потерь:</p>
                  <ul className="space-y-3 mb-6">
                    {["выявляю где утекают деньги","нахожу проблемы в команде и сервисе","показываю потенциал роста прибыли"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-white text-base">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#ff8c00" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setStep("anketa")}
                    className="text-white font-black text-lg px-7 py-4 rounded-2xl uppercase tracking-wide inline-flex items-center gap-3 self-start transition-all hover:scale-105 active:scale-95 shadow-2xl"
                    style={{ background: "#ff6a00", boxShadow: "0 8px 32px rgba(255,106,0,0.5)" }}
                  >
                    Пройти диагностику бесплатно
                    <Icon name="ArrowRight" size={22} />
                  </button>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="flex -space-x-2">
                      {["🧑‍🍳","👨‍💼","👩‍🍳"].map((e,i) => (
                        <span key={i} className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs">{e}</span>
                      ))}
                    </div>
                    <p className="text-white/60 text-sm">Уже <span className="text-white font-bold">{diagCount}</span> заведений прошли диагностику</p>
                  </div>
                  <div className="mt-4 p-3 rounded-xl border border-white/10" style={{ background: "rgba(255,255,255,0.07)" }}>
                    <p className="text-white font-bold text-sm"><span style={{ color: "#ff8c00" }}>Руслан Фатуллаев,</span> антикризисный управляющий</p>
                    <p className="text-white/60 text-xs mt-0.5">Опыт 16 лет • 50+ заведений • 100+ аудитов</p>
                  </div>
                </div>
                <div className="flex justify-center items-end relative self-end">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full opacity-30 blur-3xl" style={{ background: "#ff6a00" }} />
                  <img
                    src="https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/bucket/d57a9577-834b-496f-a898-a37c73e09e7e.jpg"
                    alt="Руслан Фатуллаев"
                    className="relative z-10 w-64 md:w-80 object-cover object-top rounded-t-3xl"
                    style={{ maxHeight: "480px", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.6))" }}
                  />
                </div>
                <div className="hidden md:flex flex-col justify-end pb-8">
                  <TipsSection />
                </div>
              </div>
            </div>
          </div>

          {/* ─── ПЛИТКИ ─── */}
          <div className="px-4 py-8 max-w-2xl mx-auto w-full">
            <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-5 font-semibold">Выберите раздел</p>

            {/* Сетка: 2 равные колонки */}
            <div className="grid grid-cols-2 gap-3">

              {/* 1. Обо мне — portrait фото */}
              <button
                onClick={() => setActiveSection("about")}
                className="relative overflow-hidden rounded-2xl text-left transition-all hover:scale-[1.02] active:scale-[0.98] col-span-1 h-44"
                style={{ background: "#1a1a1a" }}
              >
                <img src="https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/bucket/3ace7e19-595a-4113-8944-5ba5d71dd2cc.jpg" alt="" className="absolute inset-0 w-full h-full object-cover object-top" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />
                <div className="absolute bottom-0 left-0 p-4">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-1.5" style={{ background: "rgba(255,140,0,0.3)" }}>
                    <Icon name="User" size={14} style={{ color: "#ff8c00" }} />
                  </div>
                  <p className="text-white font-bold text-base leading-tight">Обо мне</p>
                  <p className="text-white/55 text-xs mt-0.5">Опыт и достижения</p>
                </div>
                <Icon name="ChevronRight" size={16} className="absolute right-3 top-3 text-white/30" />
              </button>

              {/* 2. Услуги — ресторан */}
              <button
                onClick={() => setActiveSection("services")}
                className="relative overflow-hidden rounded-2xl text-left transition-all hover:scale-[1.02] active:scale-[0.98] col-span-1 h-44"
                style={{ background: "#1a1a1a" }}
              >
                <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(255,106,0,0.18) 0%, transparent 60%)" }} />
                <div className="absolute bottom-0 left-0 p-4">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-1.5" style={{ background: "rgba(255,106,0,0.3)" }}>
                    <Icon name="Briefcase" size={14} style={{ color: "#ff6a00" }} />
                  </div>
                  <p className="text-white font-bold text-base leading-tight">Услуги</p>
                  <p className="text-white/55 text-xs mt-0.5">Форматы работы</p>
                </div>
                <Icon name="ChevronRight" size={16} className="absolute right-3 top-3 text-white/30" />
              </button>

              {/* 3. Кейсы — широкая плитка */}
              <button
                onClick={() => setActiveSection("cases")}
                className="relative overflow-hidden rounded-2xl text-left transition-all hover:scale-[1.02] active:scale-[0.98] col-span-2 h-40"
                style={{ background: "#1a1a1a" }}
              >
                <img src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=900&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.1) 100%)" }} />
                <div className="absolute inset-y-0 left-0 p-5 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,140,0,0.3)" }}>
                      <Icon name="BarChart3" size={14} style={{ color: "#ff8c00" }} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#ff8c00" }}>Реальные результаты</span>
                  </div>
                  <p className="text-white font-black text-xl leading-tight uppercase font-oswald">Кейсы клиентов</p>
                  <p className="text-white/55 text-sm mt-1">25+ убыточных заведений выведено в плюс</p>
                </div>
                <Icon name="ChevronRight" size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30" />
              </button>

              {/* 4. Как работаем */}
              <button
                onClick={() => setActiveSection("howwework")}
                className="relative overflow-hidden rounded-2xl text-left transition-all hover:scale-[1.02] active:scale-[0.98] col-span-1 h-44"
                style={{ background: "#1a1a1a" }}
              >
                <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)" }} />
                <div className="absolute bottom-0 left-0 p-4">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-1.5" style={{ background: "rgba(229,90,0,0.3)" }}>
                    <Icon name="Workflow" size={14} style={{ color: "#e55a00" }} />
                  </div>
                  <p className="text-white font-bold text-base leading-tight">Как работаем</p>
                  <p className="text-white/55 text-xs mt-0.5">Процесс сотрудничества</p>
                </div>
                <Icon name="ChevronRight" size={16} className="absolute right-3 top-3 text-white/30" />
              </button>

              {/* 5. Калькулятор */}
              <button
                onClick={() => setActiveSection("calculator")}
                className="relative overflow-hidden rounded-2xl text-left transition-all hover:scale-[1.02] active:scale-[0.98] col-span-1 h-44"
                style={{ background: "linear-gradient(135deg, #1a0a00 0%, #2d1200 100%)" }}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <Icon name="Calculator" size={100} className="text-orange-400" />
                </div>
                {/* Декоративные цифры */}
                <div className="absolute inset-0 overflow-hidden">
                  {["₽","↑","%","×"].map((s,i) => (
                    <span key={i} className="absolute font-black text-2xl opacity-10 text-orange-400" style={{ top: `${15+i*18}%`, left: `${55+i*8}%`, transform: `rotate(${i*15-10}deg)` }}>{s}</span>
                  ))}
                </div>
                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-1.5" style={{ background: "rgba(204,78,0,0.4)" }}>
                    <Icon name="Calculator" size={14} style={{ color: "#ff8c00" }} />
                  </div>
                  <p className="text-white font-bold text-base leading-tight">Калькулятор</p>
                  <p className="text-white/55 text-xs mt-0.5">Посчитай потери прибыли</p>
                </div>
                <Icon name="ChevronRight" size={16} className="absolute right-3 top-3 text-white/30" />
              </button>

              {/* 6. Отзывы */}
              <button
                onClick={() => setActiveSection("reviews")}
                className="relative overflow-hidden rounded-2xl text-left transition-all hover:scale-[1.02] active:scale-[0.98] col-span-2 h-36"
                style={{ background: "#0f1a10" }}
              >
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 100%)" }} />
                <div className="absolute inset-y-0 left-0 p-5 flex flex-col justify-center">
                  <div className="flex gap-0.5 mb-2">
                    {[0,1,2,3,4].map(s => <Icon key={s} name="Star" size={14} style={{ color: "#ff8c00", fill: "#ff8c00" }} />)}
                  </div>
                  <p className="text-white font-black text-xl leading-tight uppercase font-oswald">Отзывы клиентов</p>
                  <p className="text-white/55 text-sm mt-1">«Вырос средний чек на 35% за 2 месяца»</p>
                </div>
                <Icon name="ChevronRight" size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30" />
              </button>

              {/* 7. Чек-листы */}
              <button
                onClick={() => setActiveSection("checklists")}
                className="relative overflow-hidden rounded-2xl text-left transition-all hover:scale-[1.02] active:scale-[0.98] col-span-1 h-44"
                style={{ background: "#0d0d1a" }}
              >
                <img src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=80" alt="" className="absolute inset-0 w-full h-full object-cover opacity-35" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)" }} />
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: "#ff6a00", color: "#fff" }}>PDF</div>
                <div className="absolute bottom-0 left-0 p-4">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-1.5" style={{ background: "rgba(229,90,0,0.3)" }}>
                    <Icon name="ClipboardList" size={14} style={{ color: "#e55a00" }} />
                  </div>
                  <p className="text-white font-bold text-base leading-tight">Чек-листы</p>
                  <p className="text-white/55 text-xs mt-0.5">Готовые инструменты</p>
                </div>
                <Icon name="ChevronRight" size={16} className="absolute right-3 bottom-4 text-white/30" />
              </button>

              {/* 8. FAQ */}
              <button
                onClick={() => setActiveSection("faq")}
                className="relative overflow-hidden rounded-2xl text-left transition-all hover:scale-[1.02] active:scale-[0.98] col-span-1 h-44"
                style={{ background: "linear-gradient(135deg, #0d1a1a 0%, #001a1a 100%)" }}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-3 right-4 text-5xl font-black opacity-10 text-teal-400">?</div>
                  <div className="absolute top-8 right-10 text-3xl font-black opacity-7 text-teal-400">?</div>
                </div>
                <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80" alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 60%)" }} />
                <div className="absolute bottom-0 left-0 p-4">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-1.5" style={{ background: "rgba(0,180,180,0.2)" }}>
                    <Icon name="HelpCircle" size={14} style={{ color: "#4dd9d9" }} />
                  </div>
                  <p className="text-white font-bold text-base leading-tight">Вопросы</p>
                  <p className="text-white/55 text-xs mt-0.5">Частые вопросы</p>
                </div>
                <Icon name="ChevronRight" size={16} className="absolute right-3 bottom-4 text-white/30" />
              </button>

            </div>

            {/* Советы для бизнеса — отдельная полная карточка */}
            <div className="mt-3 rounded-2xl overflow-hidden border border-orange-500/20" style={{ background: "rgba(255,106,0,0.06)" }}>
              <TipsSection />
            </div>

            {/* CTA */}
            <button
              onClick={() => setStep("anketa")}
              className="w-full mt-4 text-white font-black text-base py-5 rounded-2xl uppercase tracking-wide flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: "linear-gradient(135deg, #ff6a00, #ff8c00)", boxShadow: "0 8px 24px rgba(255,106,0,0.4)" }}
            >
              <Icon name="Zap" size={20} />
              Начать бесплатную диагностику
            </button>
          </div>
        </div>
      )}

      {/* ─── СЕКЦИИ (открываются из плиток) ─── */}
      {step === "landing" && activeSection !== null && (
        <div className="min-h-screen flex flex-col">
          <div className="px-4 pt-6 pb-4 max-w-2xl mx-auto w-full">
            <button
              onClick={() => setActiveSection(null)}
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-2"
            >
              <Icon name="ArrowLeft" size={18} />
              <span className="text-sm">Назад</span>
            </button>
          </div>
          {activeSection === "about" && (
            <div className="px-4 pb-12 max-w-2xl mx-auto w-full">
              <AboutSection />
            </div>
          )}
          {activeSection === "services" && (
            <div className="pb-12">
              <ServicesSection />
            </div>
          )}
          {activeSection === "howwework" && (
            <div className="pb-12">
              <HowWeWorkSection />
            </div>
          )}
          {activeSection === "calculator" && (
            <div className="pb-12">
              <CalculatorSection />
            </div>
          )}
          {activeSection === "cases" && (
            <div className="pb-12">
              <CasesSection />
            </div>
          )}
          {activeSection === "reviews" && (
            <div className="pb-12">
              <ReviewsSection />
            </div>
          )}
          {activeSection === "checklists" && (
            <div className="pb-12">
              <ChecklistsSection onBuyClick={() => setBuyModalOpen(true)} />
            </div>
          )}
          {activeSection === "faq" && (
            <div className="pb-12">
              <FaqSection />
            </div>
          )}
          <div className="px-4 pb-8 max-w-2xl mx-auto w-full mt-auto">
            <button
              onClick={() => setStep("anketa")}
              className="w-full text-white font-black text-base py-5 rounded-2xl uppercase tracking-wide flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: "linear-gradient(135deg, #ff6a00, #ff8c00)", boxShadow: "0 8px 24px rgba(255,106,0,0.4)" }}
            >
              <Icon name="Zap" size={20} />
              Начать бесплатную диагностику
            </button>
          </div>
        </div>
      )}

      {/* ─── ANKETA ─── */}
      {step === "anketa" && (
        <div className="min-h-screen flex items-center justify-center px-6 py-16">
          <div className="w-full max-w-2xl animate-fade-in">
            <button onClick={() => setStep("landing")} className="text-white/50 hover:text-white flex items-center gap-2 mb-8 transition-colors">
              <Icon name="ArrowLeft" size={18} />
              Назад
            </button>

            <div className="inline-flex items-center gap-2 bg-neon/10 border border-neon/30 text-neon text-xs font-semibold px-3 py-1.5 rounded-full mb-4 uppercase tracking-widest">
              Шаг 1 из 2
            </div>

            <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase mb-2 text-white">
              Расскажите о себе
            </h2>
            <p className="text-white/55 mb-8">Заполните анкету — это займёт 1 минуту</p>

            <div className="space-y-4">
              {[
                { key: "name", label: "Ваше ФИО *", placeholder: "Иванов Иван Иванович" },
                { key: "city", label: "Город *", placeholder: "Москва, Санкт-Петербург..." },
                { key: "project", label: "Название заведения *", placeholder: "Ресторан «Восток», Бар «Якорь»..." },
                { key: "staff", label: "Количество персонала", placeholder: "Например: 12 человек" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm text-white/70 mb-2 font-medium">{field.label}</label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={anketa[field.key as keyof AnketaData]}
                    onChange={(e) => setAnketa((a) => ({ ...a, [field.key]: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-neon/60 focus:bg-white/8 transition-all"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm text-white/70 mb-2 font-medium">Что больше всего беспокоит?</label>
                <textarea
                  placeholder="Падает выручка, не могу удержать персонал, высокие расходы..."
                  value={anketa.problem}
                  onChange={(e) => setAnketa((a) => ({ ...a, problem: e.target.value }))}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-neon/60 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-2 font-medium">Telegram или телефон *</label>
                <input
                  type="text"
                  placeholder="@username или +7 999 999-99-99"
                  value={anketa.contact}
                  onChange={(e) => setAnketa((a) => ({ ...a, contact: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-neon/60 transition-all"
                />
              </div>
            </div>

            <button
              onClick={handleAnketaSubmit}
              disabled={!anketa.name || !anketa.city || !anketa.project || !anketa.contact}
              className="neon-btn text-white font-bold text-lg w-full py-5 rounded-2xl uppercase tracking-wide flex items-center justify-center gap-3 mt-8 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Перейти к диагностике
              <Icon name="ArrowRight" size={22} />
            </button>
          </div>
        </div>
      )}

      {/* ─── QUIZ ─── */}
      {step === "quiz" && (
        <div className="min-h-screen flex items-center justify-center px-6 py-16">
          <div className="w-full max-w-2xl">
            <div className="mb-10">
              <div className="flex justify-between text-sm text-white/50 mb-2">
                <span>Вопрос {currentQ + 1} из {QUESTIONS.length}</span>
                <span className="text-neon font-semibold">{Math.round((currentQ / QUESTIONS.length) * 100)}%</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-neon to-red-500 rounded-full progress-glow transition-all duration-500"
                  style={{ width: `${(currentQ / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            <div key={animKey} className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-neon/10 border border-neon/30 text-neon text-xs font-semibold px-3 py-1.5 rounded-full mb-5 uppercase tracking-widest">
                {QUESTIONS[currentQ].category}
              </div>

              <h2 className="font-oswald text-3xl md:text-4xl font-bold uppercase leading-tight mb-8 text-white">
                {QUESTIONS[currentQ].question}
              </h2>

              <div className="space-y-3">
                {QUESTIONS[currentQ].options.map((opt, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleOptionSelect(opt.score, idx)}
                    className={`option-card rounded-xl p-5 flex items-center gap-4 ${selectedOption === idx ? "selected" : ""}`}
                  >
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${selectedOption === idx ? "border-neon bg-neon/20" : "border-white/20"}`}>
                      {selectedOption === idx && <Icon name="Check" size={16} className="text-neon" />}
                    </div>
                    <span className="text-white/90 leading-snug">{opt.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── DEEP QUIZ ─── */}
      {step === "deepquiz" && (() => {
        const dq = DEEP_QUESTIONS[currentDeepQ];
        const currentVal = deepAnswers[dq.id] || "";
        const finishDeepQuiz = (finalDeepAnswers: Record<string, string>) => {
          const total = Object.values(answers).reduce((a, b) => a + b, 0);
          const finalPercent = Math.round((total / MAX_SCORE) * 100);
          sendResultToRuslan(finalPercent, finalDeepAnswers);
          fetch(COUNTER_URL, { method: "POST" }).then(r => r.json()).then(d => setDiagCount(d.count)).catch(() => {});
          setStep("result");
        };
        const handleNext = () => {
          if (currentDeepQ + 1 < DEEP_QUESTIONS.length) {
            setCurrentDeepQ((q) => q + 1);
            setDeepAnimKey((k) => k + 1);
          } else {
            finishDeepQuiz(deepAnswers);
          }
        };
        const handleSkip = () => {
          if (currentDeepQ + 1 < DEEP_QUESTIONS.length) {
            setCurrentDeepQ((q) => q + 1);
            setDeepAnimKey((k) => k + 1);
          } else {
            finishDeepQuiz(deepAnswers);
          }
        };
        return (
          <div className="min-h-screen flex items-center justify-center px-6 py-16">
            <div className="w-full max-w-2xl">
              <div className="mb-10">
                <div className="flex justify-between text-sm text-white/50 mb-2">
                  <span>Углублённый вопрос {currentDeepQ + 1} из {DEEP_QUESTIONS.length}</span>
                  <span className="text-neon font-semibold">{Math.round(((currentDeepQ + 1) / DEEP_QUESTIONS.length) * 100)}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-neon to-red-500 rounded-full progress-glow transition-all duration-500"
                    style={{ width: `${((currentDeepQ + 1) / DEEP_QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              <div key={deepAnimKey} className="animate-fade-in">
                <div className="inline-flex items-center gap-2 bg-neon/10 border border-neon/30 text-neon text-xs font-semibold px-3 py-1.5 rounded-full mb-5 uppercase tracking-widest">
                  Детальный анализ
                </div>

                <h2 className="font-oswald text-2xl md:text-3xl font-bold leading-tight mb-6 text-white">
                  {dq.label}
                </h2>

                <textarea
                  rows={4}
                  value={currentVal}
                  onChange={(e) => setDeepAnswers((prev) => ({ ...prev, [dq.id]: e.target.value }))}
                  placeholder={dq.placeholder}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-neon/60 transition-all resize-none mb-4"
                />

                <div className="flex gap-3">
                  <button
                    onClick={handleNext}
                    disabled={!currentVal.trim()}
                    className="neon-btn text-white font-bold text-base flex-1 py-4 rounded-2xl uppercase tracking-wide flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {currentDeepQ + 1 < DEEP_QUESTIONS.length ? "Следующий вопрос" : "Получить результат"}
                    <Icon name="ArrowRight" size={18} />
                  </button>
                  <button
                    onClick={handleSkip}
                    className="text-white/40 hover:text-white/70 text-sm px-5 py-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all"
                  >
                    Пропустить
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ─── RESULT ─── */}
      {step === "result" && (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
          <div className="w-full max-w-2xl animate-fade-in text-center">
            <div className="mb-4 text-5xl animate-count">{result.emoji}</div>

            <div className="inline-flex items-center gap-2 bg-neon/10 border border-neon/30 text-neon text-xs font-semibold px-3 py-1.5 rounded-full mb-5 uppercase tracking-widest">
              Результат диагностики
            </div>

            <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase mb-3 text-white">
              {result.label}
            </h2>

            <div className="my-10">
              <div className={`font-oswald text-6xl sm:text-8xl md:text-9xl font-black ${result.color} animate-count`}>
                {displayPercent}%
              </div>
              <p className="text-white/50 mt-2">рентабельность вашего бизнеса</p>
            </div>

            <div className="h-4 bg-white/10 rounded-full overflow-hidden mb-4 mx-auto max-w-md">
              <div
                className={`h-full bg-gradient-to-r ${result.barColor} rounded-full progress-glow transition-all duration-1000`}
                style={{ width: `${percent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-white/30 max-w-md mx-auto mb-10 px-1">
              <span>Критично</span>
              <span>Риск</span>
              <span>Норма</span>
              <span>Отлично</span>
            </div>

            {/* Categories */}
            <div className="glass-card rounded-2xl p-6 mb-8 text-left">
              <h3 className="font-oswald text-xl uppercase mb-5 text-white/80">Разбивка по категориям</h3>
              {ALL_CATEGORIES.map((cat) => {
                const catQuestions = QUESTIONS.filter((q) => q.category === cat);
                if (!catQuestions.length) return null;
                const catMax = catQuestions.length * 10;
                const catScore = catQuestions.reduce((acc, q) => acc + (answers[q.id] ?? 0), 0);
                const catPct = Math.round((catScore / catMax) * 100);
                return (
                  <div key={cat} className="flex items-center gap-4 mb-3">
                    <span className="text-white/60 text-sm w-20 sm:w-28 flex-shrink-0">{cat}</span>
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${catPct >= 70 ? "bg-gradient-to-r from-green-500 to-emerald-400" : catPct >= 40 ? "bg-gradient-to-r from-yellow-500 to-orange-400" : "bg-gradient-to-r from-red-600 to-red-500"}`}
                        style={{ width: `${catPct}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold w-10 text-right text-white/80">{catPct}%</span>
                  </div>
                );
              })}
            </div>

            <p className="text-white/65 leading-relaxed mb-8 text-lg">{result.description}</p>

            {/* CTA */}
            <div className="neon-border rounded-3xl p-8 glass-card text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="font-oswald text-3xl font-bold uppercase mb-3 text-white">
                Диагностика завершена!
              </h3>
              <p className="text-white/65 mb-6 text-lg leading-relaxed">
                Ваши результаты уже у эксперта. Мы свяжемся с вами в течение <span className="text-neon font-bold">2–4 часов</span> — будьте на связи.
              </p>
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-left">
                <p className="text-white/40 text-xs mb-0.5">Диагностика отправлена эксперту</p>
                <p className="text-white font-medium text-sm">{anketa.name} · {anketa.project}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── THANKS ─── */}
      {step === "thanks" && (
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-lg animate-fade-in">
            <div className="text-7xl mb-6">🚀</div>
            <h2 className="font-oswald text-5xl font-bold uppercase mb-4 neon-text">
              Заявка принята!
            </h2>
            <p className="text-white/65 text-lg leading-relaxed mb-8">
              Мы свяжемся с вами в течение нескольких часов. Подготовьтесь к честному
              разговору о вашем бизнесе — это первый шаг к реальным переменам.
            </p>
            <div className="glass-card neon-border rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-3 text-left">
                <Icon name="CheckCircle" size={24} className="text-neon flex-shrink-0" />
                <p className="text-white/80">Ваша заявка отправлена эксперту</p>
              </div>
              <div className="flex items-center gap-3 text-left mt-3">
                <Icon name="Clock" size={24} className="text-neon flex-shrink-0" />
                <p className="text-white/80">Ожидайте ответа в течение 2–4 часов</p>
              </div>
            </div>
            <button
              onClick={resetAll}
              className="text-white/50 hover:text-white underline underline-offset-4 transition-colors text-sm"
            >
              Вернуться на главную
            </button>
          </div>
        </div>
      )}
      <BuyModal open={buyModalOpen} onClose={() => setBuyModalOpen(false)} />
      <ActivityToast />
    </div>
  );
}