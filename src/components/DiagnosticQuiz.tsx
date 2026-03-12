import { useState } from "react";
import Icon from "@/components/ui/icon";

const NOTIFY_URL = "https://functions.poehali.dev/c328fb70-3615-4b46-8463-95a676ea3214";

const QUESTIONS = [
  {
    id: "revenue",
    question: "Как у вас с выручкой последние 3 месяца?",
    options: [
      { label: "Растёт — всё хорошо", value: "growing", score: 0 },
      { label: "Стабильно, но хотелось бы больше", value: "stable", score: 1 },
      { label: "Упала или стоит на месте", value: "falling", score: 2 },
      { label: "Критически низкая, работаем в минус", value: "critical", score: 3 },
    ],
  },
  {
    id: "foodcost",
    question: "Знаете ли вы свой фудкост (себестоимость блюд)?",
    options: [
      { label: "Да, считаю регулярно, он в норме", value: "yes_ok", score: 0 },
      { label: "Считаю, но он выше 35%", value: "yes_high", score: 2 },
      { label: "Примерно знаю, точно не считаю", value: "approx", score: 2 },
      { label: "Не считаю вообще", value: "no", score: 3 },
    ],
  },
  {
    id: "staff",
    question: "Как обстоит дело с персоналом?",
    options: [
      { label: "Команда стабильная, текучки нет", value: "stable", score: 0 },
      { label: "Небольшая текучка, справляемся", value: "small", score: 1 },
      { label: "Частая смена, постоянно ищем людей", value: "high", score: 2 },
      { label: "Хаос — работаем сами, как придётся", value: "chaos", score: 3 },
    ],
  },
  {
    id: "load",
    question: "Насколько загружено заведение в среднем?",
    options: [
      { label: "80–100% в часы пик, стабильно", value: "full", score: 0 },
      { label: "50–70%, бывают пустые смены", value: "medium", score: 1 },
      { label: "30–50%, много пустых столов", value: "low", score: 2 },
      { label: "Меньше 30%, залы пустые", value: "empty", score: 3 },
    ],
  },
  {
    id: "processes",
    question: "Есть ли у вас прописанные стандарты и процессы?",
    options: [
      { label: "Да, всё задокументировано и работает", value: "yes", score: 0 },
      { label: "Частично — что-то есть, но не всё", value: "partial", score: 1 },
      { label: "Всё в голове у меня или старших", value: "head", score: 2 },
      { label: "Нет ничего, каждый делает как хочет", value: "no", score: 3 },
    ],
  },
  {
    id: "control",
    question: "Как часто вы физически присутствуете в заведении?",
    options: [
      { label: "Редко — бизнес работает без меня", value: "rarely", score: 0 },
      { label: "Несколько дней в неделю", value: "sometimes", score: 1 },
      { label: "Каждый день, но по несколько часов", value: "often", score: 2 },
      { label: "Постоянно — без меня всё рушится", value: "always", score: 3 },
    ],
  },
];

function getResult(score: number) {
  if (score <= 4) {
    return {
      level: "Зелёная зона",
      color: "#22c55e",
      icon: "CheckCircle",
      title: "У вас крепкий фундамент",
      text: "Основные процессы выстроены. Есть точки роста — можно увеличить прибыль на 15–25% через оптимизацию меню и маркетинг.",
    };
  }
  if (score <= 10) {
    return {
      level: "Жёлтая зона",
      color: "#f59e0b",
      icon: "AlertTriangle",
      title: "Есть скрытые потери",
      text: "Бизнес держится, но деньги утекают через незакрытые дыры. По нашей практике — вы теряете 20–40% выручки ежемесячно.",
    };
  }
  return {
    level: "Красная зона",
    color: "#ef4444",
    icon: "AlertOctagon",
    title: "Требуется срочное вмешательство",
    text: "Без системных изменений риск закрытия в течение 6–12 месяцев высокий. Нужен антикризисный аудит как можно скорее.",
  };
}

interface DiagnosticQuizProps {
  diagRef?: React.RefObject<HTMLElement>;
}

export default function DiagnosticQuiz({ diagRef }: DiagnosticQuizProps) {
  const [step, setStep] = useState<"intro" | "quiz" | "contact" | "done">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { value: string; score: number }>>({});
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);

  const totalScore = Object.values(answers).reduce((s, a) => s + a.score, 0);
  const result = getResult(totalScore);
  const progress = ((currentQ) / QUESTIONS.length) * 100;

  const selectAnswer = (value: string, score: number) => {
    const q = QUESTIONS[currentQ];
    const newAnswers = { ...answers, [q.id]: { value, score } };
    setAnswers(newAnswers);
    setTimeout(() => {
      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        setStep("contact");
      }
    }, 300);
  };

  const submit = async () => {
    if (!name.trim() || !contact.trim()) return;
    setLoading(true);
    const summary = QUESTIONS.map((q) => {
      const ans = answers[q.id];
      const opt = q.options.find((o) => o.value === ans?.value);
      return `${q.question} → ${opt?.label ?? "—"}`;
    }).join("\n");

    try {
      await fetch(NOTIFY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          contact,
          source: "diagnostic_quiz",
          score: totalScore,
          level: result.level,
          answers: summary,
        }),
      });
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
    setStep("done");
  };

  const q = QUESTIONS[currentQ];
  const selectedValue = answers[q?.id]?.value;

  return (
    <section
      ref={diagRef as React.RefObject<HTMLElement>}
      id="diagnostics"
      className="py-16 px-4 bg-[#0d0d0d]"
    >
      <div className="max-w-2xl mx-auto">
        {step === "intro" && (
          <div className="glass-card rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[rgba(255,107,0,0.15)] flex items-center justify-center mx-auto mb-5">
              <Icon name="ClipboardList" size={32} className="text-[#FF6B00]" />
            </div>
            <h2 className="text-3xl font-oswald font-bold text-white mb-3 uppercase">
              Бесплатная диагностика
            </h2>
            <p className="text-gray-400 mb-2">
              Пройдите 6 вопросов — узнайте, сколько денег теряет ваше заведение прямо сейчас
            </p>
            <div className="flex justify-center gap-6 my-6 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <Icon name="Clock" size={16} className="text-[#FF6B00]" />
                3–5 минут
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
              onClick={() => setStep("quiz")}
              className="neon-btn text-white font-bold text-lg px-10 py-4 rounded-xl flex items-center gap-3 mx-auto"
            >
              <Icon name="Play" size={20} />
              Начать диагностику
            </button>
          </div>
        )}

        {step === "quiz" && (
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="h-1 bg-white/5">
              <div
                className="h-full bg-[#FF6B00] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[#FF6B00] text-sm font-semibold">
                  Вопрос {currentQ + 1} из {QUESTIONS.length}
                </span>
                <button
                  onClick={() => { setStep("intro"); setCurrentQ(0); setAnswers({}); }}
                  className="text-gray-600 hover:text-gray-400 transition-colors"
                >
                  <Icon name="X" size={18} />
                </button>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-6 leading-snug">
                {q.question}
              </h3>

              <div className="space-y-3">
                {q.options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => selectAnswer(opt.value, opt.score)}
                    className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 text-sm font-medium ${
                      selectedValue === opt.value
                        ? "border-[#FF6B00] bg-[rgba(255,107,0,0.12)] text-white"
                        : "border-white/10 bg-white/3 text-gray-300 hover:border-white/30 hover:bg-white/5"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {currentQ > 0 && (
                <button
                  onClick={() => setCurrentQ(currentQ - 1)}
                  className="mt-5 flex items-center gap-2 text-gray-600 hover:text-gray-400 text-sm transition-colors"
                >
                  <Icon name="ChevronLeft" size={16} />
                  Назад
                </button>
              )}
            </div>
          </div>
        )}

        {step === "contact" && (
          <div className="glass-card rounded-2xl p-8">
            <div
              className="rounded-xl p-5 mb-6 text-center"
              style={{ background: result.color + "15", border: `1px solid ${result.color}40` }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ background: result.color + "20" }}
              >
                <Icon name={result.icon} size={24} style={{ color: result.color }} />
              </div>
              <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: result.color }}>
                {result.level}
              </div>
              <div className="text-white font-bold text-lg mb-1">{result.title}</div>
              <div className="text-gray-400 text-sm">{result.text}</div>
            </div>

            <h3 className="text-white font-bold text-xl mb-1">Получите полный разбор от Руслана</h3>
            <p className="text-gray-400 text-sm mb-5">
              Руслан лично свяжется с вами и расскажет что именно нужно исправить в первую очередь
            </p>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[rgba(255,107,0,0.5)] transition-colors"
              />
              <input
                type="text"
                placeholder="Телефон или Telegram"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[rgba(255,107,0,0.5)] transition-colors"
              />
              <button
                onClick={submit}
                disabled={loading || !name.trim() || !contact.trim()}
                className="neon-btn w-full text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Icon name="Loader2" size={18} className="animate-spin" />
                ) : (
                  <Icon name="Zap" size={18} />
                )}
                Получить разбор бесплатно
              </button>
              <p className="text-gray-600 text-xs text-center">Без обязательств · Ответ в течение часа</p>
            </div>
          </div>
        )}

        {step === "done" && (
          <div className="glass-card rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[rgba(255,107,0,0.15)] flex items-center justify-center mx-auto mb-5">
              <Icon name="CheckCircle" size={36} className="text-[#FF6B00]" />
            </div>
            <h2 className="text-2xl font-oswald font-bold text-white mb-3 uppercase">Заявка принята!</h2>
            <p className="text-gray-400 mb-4">
              Руслан получил результаты вашей диагностики и свяжется с вами в ближайшее время
            </p>
            <div
              className="rounded-xl p-4 inline-block text-sm"
              style={{ background: result.color + "15", border: `1px solid ${result.color}40`, color: result.color }}
            >
              Ваш результат: <strong>{result.level}</strong>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}