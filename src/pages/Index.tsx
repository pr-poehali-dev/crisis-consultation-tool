import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/files/6ee65e60-1550-4aee-8391-a03e0253b4be.jpg";

type Step = "landing" | "anketa" | "quiz" | "result" | "thanks";

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
  const [requestData, setRequestData] = useState({ name: "", contact: "" });
  const [submitting, setSubmitting] = useState(false);

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
        setStep("result");
      }
    }, 350);
  };

  const handleConsultRequest = async () => {
    if (!requestData.name || !requestData.contact) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    setStep("thanks");
  };

  const result = getResultData(percent);

  const resetAll = () => {
    setStep("landing");
    setAnswers({});
    setCurrentQ(0);
    setAnketa({ name: "", city: "", project: "", staff: "", problem: "", contact: "" });
    setRequestData({ name: "", contact: "" });
    setDisplayPercent(0);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-montserrat overflow-x-hidden">

      {/* ─── LANDING ─── */}
      {step === "landing" && (
        <div className="min-h-screen flex flex-col">
          {/* Hero */}
          <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center scale-105"
              style={{ backgroundImage: `url(${HERO_IMAGE})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-background" />
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-neon/20 to-transparent animate-pulse-slow" />
              <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-neon/10 to-transparent animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
            </div>

            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-neon/10 border border-neon/30 text-neon text-sm font-semibold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
                <span className="w-2 h-2 bg-neon rounded-full animate-pulse" />
                Бесплатная диагностика
              </div>

              <h1 className="font-oswald text-5xl md:text-7xl font-bold leading-tight mb-6 uppercase text-white">
                Ваш ресторан<br />
                <span className="neon-text">теряет деньги?</span>
              </h1>

              <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
                Пройдите бесплатную диагностику за 5 минут и узнайте, насколько рентабелен
                ваш ресторан, бар или кафе. Получите конкретные точки роста от эксперта-практика.
              </p>

              <button
                onClick={() => setStep("anketa")}
                className="neon-btn text-white font-bold text-lg px-10 py-5 rounded-2xl uppercase tracking-wide inline-flex items-center gap-3"
              >
                Пройти диагностику бесплатно
                <Icon name="ArrowRight" size={22} />
              </button>

              <p className="text-white/40 text-sm mt-4">Занимает 5 минут • Без регистрации • 100% бесплатно</p>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
              <Icon name="ChevronDown" size={28} />
            </div>
          </div>

          {/* Benefits section */}
          <div className="py-20 px-6 max-w-6xl mx-auto w-full">
            <div className="text-center mb-14">
              <h2 className="font-oswald text-4xl font-bold uppercase mb-3 text-white">
                Что вы узнаете после диагностики
              </h2>
              <div className="w-16 h-1 bg-neon mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: "TrendingDown", title: "Где утекают деньги", desc: "Выявим конкретные статьи расходов, которые снижают вашу прибыль каждый месяц" },
                { icon: "Users", title: "Проблемы с командой", desc: "Определим слабые места в управлении персоналом и сервисе, которые отпугивают гостей" },
                { icon: "BarChart3", title: "Потенциал роста", desc: "Покажем, сколько дополнительной прибыли вы можете получить при правильных изменениях" },
              ].map((item, i) => (
                <div key={i} className="glass-card rounded-2xl p-8 text-center">
                  <div className="w-14 h-14 bg-neon/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <Icon name={item.icon} fallback="CircleAlert" size={28} className="text-neon" />
                  </div>
                  <h3 className="font-oswald text-2xl font-semibold mb-3 uppercase text-white">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Expert */}
            <div className="mt-16 glass-card rounded-3xl p-8 md:p-12 neon-border flex flex-col md:flex-row gap-8 items-start">
              <img
                src="https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/bucket/4b220787-c107-4a34-84d9-fc829de00e77.jpg"
                alt="Руслан Фатуллаев"
                className="w-32 h-32 rounded-2xl object-cover object-top flex-shrink-0 border-2 border-neon/40"
              />
              <div>
                <p className="text-neon text-sm uppercase tracking-widest font-semibold mb-1">Эксперт и консультант</p>
                <h3 className="font-oswald text-3xl font-bold uppercase mb-1 text-white">Руслан Фатуллаев</h3>
                <p className="text-white/40 text-sm mb-4">Спикер школы Upskill • Бизнес-тренер • Антикризисный управляющий</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                  {[
                    { num: "16+", label: "лет в индустрии" },
                    { num: "50+", label: "заведений открыто" },
                    { num: "100+", label: "аудитов проведено" },
                    { num: "150+", label: "специалистов обучено" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-neon/8 rounded-xl p-3 text-center border border-neon/15">
                      <div className="font-oswald text-2xl font-bold text-neon">{stat.num}</div>
                      <div className="text-white/50 text-xs mt-0.5 leading-tight">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <p className="text-white/65 leading-relaxed text-sm">
                  Более 600 часов профильной консультационной поддержки. Вывел на стабильную позицию более 25 убыточных объектов.
                  Провёл 70+ вебинаров и выступал в Москве, Саратове, Оренбурге, Тюмени и других городах.
                </p>
                <p className="text-white/45 leading-relaxed text-sm italic mt-3">
                  «Каждое заведение должно создавать уникальный опыт для гостей и при этом быть прибыльным. Я не даю шаблонных решений — каждый проект индивидуален.»
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => setStep("anketa")}
                className="neon-btn text-white font-bold text-lg px-10 py-5 rounded-2xl uppercase tracking-wide inline-flex items-center gap-3"
              >
                Начать диагностику
                <Icon name="ArrowRight" size={22} />
              </button>
            </div>
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
              <div className={`font-oswald text-8xl md:text-9xl font-black ${result.color} animate-count`}>
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
                    <span className="text-white/60 text-sm w-28 flex-shrink-0">{cat}</span>
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

            <p className="text-white/65 leading-relaxed mb-10 text-lg">{result.description}</p>

            {/* CTA */}
            <div className="neon-border rounded-3xl p-8 glass-card">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-oswald text-3xl font-bold uppercase mb-3 text-white">
                Получите бесплатную консультацию
              </h3>
              <p className="text-white/60 mb-6">
                20 минут с экспертом-антикризисником. Разберём вашу конкретную ситуацию
                и дадим первые шаги к росту прибыли.
              </p>

              <div className="space-y-3 mb-6">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={requestData.name}
                  onChange={(e) => setRequestData((d) => ({ ...d, name: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-neon/60 transition-all"
                />
                <input
                  type="text"
                  placeholder="Telegram или телефон"
                  value={requestData.contact}
                  onChange={(e) => setRequestData((d) => ({ ...d, contact: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-neon/60 transition-all"
                />
              </div>

              <button
                onClick={handleConsultRequest}
                disabled={!requestData.name || !requestData.contact || submitting}
                className="neon-btn text-white font-bold text-lg w-full py-5 rounded-2xl uppercase tracking-wide flex items-center justify-center gap-3 disabled:opacity-40"
              >
                {submitting ? (
                  <>
                    <Icon name="Loader2" size={22} className="animate-spin" />
                    Отправляем...
                  </>
                ) : (
                  <>
                    Записаться на консультацию
                    <Icon name="ArrowRight" size={22} />
                  </>
                )}
              </button>

              <p className="text-white/30 text-xs text-center mt-4">
                Без спама. Только один звонок по делу.
              </p>
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
    </div>
  );
}