import { useState } from "react";
import Icon from "@/components/ui/icon";

const NOTIFY_URL = "https://functions.poehali.dev/c328fb70-3615-4b46-8463-95a676ea3214";

const INFO_FIELDS = [
  { id: "fullName", label: "Ф.И.О.", placeholder: "Иванов Иван Иванович", type: "text" },
  { id: "city", label: "Город", placeholder: "Москва", type: "text" },
  { id: "projectName", label: "Название проекта", placeholder: "Бар «Огонёк»", type: "text" },
  { id: "seats", label: "Количество посадочных мест", placeholder: "80", type: "number" },
  { id: "staff", label: "Количество сотрудников проекта", placeholder: "15", type: "number" },
  { id: "payroll", label: "Текущий Фонд Оплаты Труда (₽/мес)", placeholder: "350000", type: "number" },
  { id: "managers", label: "Количество руководящих лиц", placeholder: "3", type: "number" },
];

const QUESTIONS = [
  "Какой проект у вас — ресторан, бар, кафе или кофейня, и какой у него стиль/направление?",
  "Как бы вы описали общую атмосферу и вибрацию вашего проекта?",
  "Можете ли вы описать текущее меню — еду и предлагаемые напитки?",
  "Какова средняя скорость обслуживания гостей, заказывающих напитки и еду?",
  "Не могли бы вы объяснить процесс управления запасами для вашего проекта?",
  "Как вы обеспечиваете качество и консистенцию напитков и еды?",
  "Можете ли вы описать возможности обучения и повышения квалификации персонала?",
  "Как вы обрабатываете жалобы гостей или отзывы, связанные с обслуживанием?",
  "Какие стратегии у вас есть для стимулирования роста продаж и увеличения средних расходов гостей?",
  "Можете ли вы предоставить подробную информацию о текущем доходе и норме прибыли?",
  "Как вы продвигаете своё заведение, чтобы привлечь новых гостей?",
  "Насколько в среднем загружено ваше заведение в час пик?",
  "Можете ли вы предоставить информацию о продажах напитков (коктейли, пиво, вино, еда)?",
  "Есть ли у вас фирменное меню блюд или коктейлей? Как часто вы обновляете его?",
  "Как вы рекламируете специальные предложения, мероприятия или счастливые часы?",
  "Как вы оцениваете работу сотрудников и обеспечиваете стабильное качество обслуживания?",
  "Какова текучесть кадров в вашем заведении?",
];

function calcProfitability(info: Record<string, string>): {
  label: string;
  color: string;
  icon: string;
  title: string;
  text: string;
} {
  const seats = parseInt(info.seats) || 0;
  const staff = parseInt(info.staff) || 0;
  const managers = parseInt(info.managers) || 0;
  const payroll = parseInt(info.payroll) || 0;

  let score = 0;

  // Соотношение сотрудников к местам
  const staffRatio = seats > 0 ? staff / seats : 0;
  if (staffRatio < 0.2) score += 0;
  else if (staffRatio < 0.35) score += 1;
  else score += 2;

  // Доля руководителей
  const managerRatio = staff > 0 ? managers / staff : 0;
  if (managerRatio < 0.15) score += 0;
  else if (managerRatio < 0.25) score += 1;
  else score += 2;

  // ФОТ на сотрудника
  const avgSalary = staff > 0 ? payroll / staff : 0;
  if (avgSalary < 80000) score += 0;
  else if (avgSalary < 150000) score += 1;
  else score += 2;

  if (score <= 1) {
    return {
      label: "Высокая рентабельность",
      color: "#22c55e",
      icon: "TrendingUp",
      title: "Структура проекта оптимальна",
      text: "Соотношение персонала и нагрузки выглядит здорово. Есть потенциал для роста прибыли на 15–25% через оптимизацию меню и маркетинг.",
    };
  }
  if (score <= 3) {
    return {
      label: "Средняя рентабельность",
      color: "#f59e0b",
      icon: "AlertTriangle",
      title: "Есть скрытые потери",
      text: "Структура держится, но деньги утекают через незакрытые дыры. По нашей практике вы теряете 20–40% выручки ежемесячно.",
    };
  }
  return {
    label: "Низкая рентабельность",
    color: "#ef4444",
    icon: "AlertOctagon",
    title: "Требуется срочный аудит",
    text: "Текущая структура затрат критична. Без системных изменений риск убыточности высокий. Нужен антикризисный разбор как можно скорее.",
  };
}

interface DiagnosticQuizProps {
  diagRef?: React.RefObject<HTMLElement>;
}

export default function DiagnosticQuiz({ diagRef }: DiagnosticQuizProps) {
  const [step, setStep] = useState<"intro" | "info" | "quiz" | "result" | "done">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [info, setInfo] = useState<Record<string, string>>({});
  const [answers, setAnswers] = useState<string[]>(Array(QUESTIONS.length).fill(""));
  const [loading, setLoading] = useState(false);
  const [infoErrors, setInfoErrors] = useState<Record<string, boolean>>({});

  const result = calcProfitability(info);
  const progress = Math.round(((currentQ + 1) / QUESTIONS.length) * 100);

  const handleInfoChange = (id: string, value: string) => {
    setInfo((prev) => ({ ...prev, [id]: value }));
    if (value.trim()) setInfoErrors((e) => ({ ...e, [id]: false }));
  };

  const submitInfo = () => {
    const errors: Record<string, boolean> = {};
    INFO_FIELDS.forEach((f) => {
      if (!info[f.id]?.trim()) errors[f.id] = true;
    });
    if (Object.keys(errors).length) {
      setInfoErrors(errors);
      return;
    }
    setStep("quiz");
    setCurrentQ(0);
  };

  const handleAnswer = (value: string) => {
    const updated = [...answers];
    updated[currentQ] = value;
    setAnswers(updated);
  };

  const nextQ = () => {
    if (!answers[currentQ]?.trim()) return;
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep("result");
    }
  };

  const prevQ = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
    else setStep("info");
  };

  const submit = async () => {
    setLoading(true);
    const summary = QUESTIONS.map((q, i) => `${q}\n→ ${answers[i] || "—"}`).join("\n\n");
    const infoText = INFO_FIELDS.map((f) => `${f.label}: ${info[f.id] || "—"}`).join("\n");

    try {
      await fetch(NOTIFY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "diagnostic_quiz",
          profitability: result.label,
          info: infoText,
          answers: summary,
          name: info.fullName,
          contact: info.city,
        }),
      });
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
    setStep("done");
  };

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
              Ответьте на вопросы — узнайте рентабельность вашего заведения и получите личный разбор от эксперта
            </p>
            <div className="flex justify-center gap-6 my-6 text-sm flex-wrap">
              <div className="flex items-center gap-2 text-gray-400">
                <Icon name="Clock" size={16} className="text-[#FF6B00]" />
                10–15 минут
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

        {/* INFO BLOCK */}
        {step === "info" && (
          <div className="glass-card rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">О вашем проекте</h3>
              <button onClick={() => setStep("intro")} className="text-gray-600 hover:text-gray-400 transition-colors">
                <Icon name="X" size={18} />
              </button>
            </div>
            <div className="space-y-4">
              {INFO_FIELDS.map((f) => (
                <div key={f.id}>
                  <label className="block text-sm text-gray-400 mb-1">{f.label}</label>
                  <input
                    type={f.type}
                    value={info[f.id] || ""}
                    onChange={(e) => handleInfoChange(f.id, e.target.value)}
                    placeholder={f.placeholder}
                    className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF6B00] transition-colors ${
                      infoErrors[f.id] ? "border-red-500" : "border-white/10"
                    }`}
                  />
                  {infoErrors[f.id] && (
                    <p className="text-red-400 text-xs mt-1">Обязательное поле</p>
                  )}
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

        {/* QUIZ BLOCK */}
        {step === "quiz" && (
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="h-1 bg-white/5">
              <div
                className="h-full bg-[#FF6B00] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[#FF6B00] text-sm font-semibold">
                  Вопрос {currentQ + 1} из {QUESTIONS.length}
                </span>
                <span className="text-gray-600 text-sm">{progress}%</span>
              </div>

              <h3 className="text-lg md:text-xl font-bold text-white mb-5 leading-snug">
                {QUESTIONS[currentQ]}
              </h3>

              <textarea
                value={answers[currentQ]}
                onChange={(e) => handleAnswer(e.target.value)}
                rows={4}
                placeholder="Введите ваш ответ..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF6B00] transition-colors resize-none"
              />

              <div className="flex gap-3 mt-5">
                <button
                  onClick={prevQ}
                  className="px-5 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-colors flex items-center gap-2"
                >
                  <Icon name="ArrowLeft" size={16} />
                  Назад
                </button>
                <button
                  onClick={nextQ}
                  disabled={!answers[currentQ]?.trim()}
                  className="neon-btn text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 flex-1 justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {currentQ < QUESTIONS.length - 1 ? (
                    <>Далее <Icon name="ArrowRight" size={16} /></>
                  ) : (
                    <>Получить результат <Icon name="BarChart2" size={16} /></>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RESULT */}
        {step === "result" && (
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
            <p className="text-gray-400 mb-8 max-w-md mx-auto">{result.text}</p>

            <div className="glass-card rounded-xl p-5 mb-6 text-left">
              <p className="text-gray-400 text-sm mb-1">Ваш проект</p>
              <p className="text-white font-semibold">{info.projectName} — {info.city}</p>
              <p className="text-gray-500 text-sm mt-1">
                {info.seats} мест · {info.staff} сотрудников · ФОТ {parseInt(info.payroll || "0").toLocaleString("ru")} ₽/мес
              </p>
            </div>

            <p className="text-gray-400 text-sm mb-5">
              Нажмите кнопку ниже — ваши ответы отправятся эксперту, и он свяжется с вами для личного разбора
            </p>

            <button
              onClick={submit}
              disabled={loading}
              className="neon-btn text-white font-bold text-lg px-10 py-4 rounded-xl flex items-center gap-3 mx-auto disabled:opacity-60"
            >
              {loading ? (
                <><Icon name="Loader2" size={20} className="animate-spin" />Отправляю...</>
              ) : (
                <><Icon name="Send" size={20} />Отправить результаты эксперту</>
              )}
            </button>
          </div>
        )}

        {/* DONE */}
        {step === "done" && (
          <div className="glass-card rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[rgba(34,197,94,0.15)] flex items-center justify-center mx-auto mb-5">
              <Icon name="CheckCircle" size={32} className="text-green-500" />
            </div>
            <h3 className="text-2xl font-oswald font-bold text-white mb-3 uppercase">
              Готово!
            </h3>
            <p className="text-gray-400 max-w-sm mx-auto">
              Ваши ответы получены. Эксперт свяжется с вами в ближайшее время для личного разбора.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}