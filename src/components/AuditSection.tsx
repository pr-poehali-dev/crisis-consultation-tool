import { useState } from "react";
import Icon from "@/components/ui/icon";
import { sendLead } from "@/utils/sendLead";
import ContactFallback from "@/components/ContactFallback";

const STEPS = [
  {
    id: "basic",
    title: "О заведении",
    questions: [
      { id: "type", label: "Тип заведения", type: "select", options: ["Кафе", "Ресторан", "Бар", "Кофейня", "Фастфуд", "Другое"] },
      { id: "city", label: "Город", type: "text", placeholder: "Например: Москва" },
      { id: "seats", label: "Количество посадочных мест", type: "select", options: ["До 20", "20–50", "50–100", "100–200", "Более 200"] },
      { id: "years", label: "Сколько лет работает заведение?", type: "select", options: ["Только открываемся", "До 1 года", "1–3 года", "3–5 лет", "Более 5 лет"] },
    ],
  },
  {
    id: "finance",
    title: "Финансы",
    questions: [
      { id: "revenue", label: "Среднемесячная выручка", type: "select", options: ["До 500 тыс. ₽", "500 тыс. – 1 млн ₽", "1–3 млн ₽", "3–10 млн ₽", "Более 10 млн ₽"] },
      { id: "margin", label: "Знаете ли вы свою себестоимость блюд?", type: "select", options: ["Да, считаю точно", "Примерно знаю", "Не считаю", "Не знаю как"] },
      { id: "profit", label: "Заведение сейчас:", type: "select", options: ["Прибыльное", "В ноль", "В минусе", "Не знаю точно"] },
      { id: "rent", label: "Доля аренды от выручки", type: "select", options: ["До 10%", "10–20%", "20–30%", "Более 30%", "Не знаю"] },
    ],
  },
  {
    id: "operations",
    title: "Операции",
    questions: [
      { id: "staff", label: "Есть ли проблемы с персоналом?", type: "select", options: ["Всё хорошо", "Высокая текучка", "Сложно найти людей", "Низкая дисциплина", "Несколько проблем"] },
      { id: "inventory", label: "Как ведёте учёт склада?", type: "select", options: ["Автоматизированная система", "Excel/таблицы", "Вручную", "Практически не веду"] },
      { id: "suppliers", label: "Сколько ключевых поставщиков?", type: "select", options: ["1–2", "3–5", "Более 5", "Не знаю"] },
      { id: "menu", label: "Когда последний раз анализировали меню?", type: "select", options: ["В этом месяце", "1–3 месяца назад", "Более полугода назад", "Никогда"] },
    ],
  },
  {
    id: "problems",
    title: "Главные боли",
    questions: [
      { id: "main_problem", label: "Что беспокоит больше всего?", type: "select", options: ["Падение выручки", "Низкая прибыль при хорошей выручке", "Проблемы с персоналом", "Рост расходов", "Конкуренция", "Несколько проблем сразу"] },
      { id: "tried", label: "Что уже пробовали делать?", type: "textarea", placeholder: "Опишите кратко что уже пробовали..." },
      { id: "goal", label: "Какой результат хотите получить от аудита?", type: "textarea", placeholder: "Например: понять где теряем деньги..." },
    ],
  },
  {
    id: "contact",
    title: "Контакты для связи",
    questions: [
      { id: "name", label: "Ваше имя", type: "text", placeholder: "Как к вам обращаться?" },
      { id: "phone", label: "Телефон или Telegram", type: "text", placeholder: "+7 (999) 000-00-00 или @username" },
      { id: "email", label: "Email (необязательно)", type: "text", placeholder: "example@mail.ru" },
    ],
  },
];

export default function AuditSection() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const progress = ((step) / STEPS.length) * 100;

  const setAnswer = (id: string, val: string) => {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const canNext = () => {
    return current.questions.every((q) => {
      if (q.type === "textarea") return true;
      if (q.id === "email") return true;
      return !!answers[q.id];
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    const lines = STEPS.flatMap((s) =>
      s.questions.map((q) => `${q.label}: ${answers[q.id] || "—"}`)
    ).join("\n");

    try {
      await sendLead({
        source: "audit",
        name: answers["name"] || "—",
        contact: answers["phone"] || answers["email"] || "—",
        answers_text: lines,
        type: answers["type"] || "—",
        city: answers["city"] || "—",
        main_problem: answers["main_problem"] || "—",
      });
      setDone(true);
    } catch {
      setError("Ошибка сети, попробуйте ещё раз");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-4 bg-[#0d0d0d]" id="audit">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[rgba(255,107,0,0.1)] border border-[rgba(255,107,0,0.3)] rounded-full px-4 py-2 mb-6">
            <Icon name="Search" size={16} className="text-[#FF6B00]" />
            <span className="text-[#FF6B00] text-sm font-medium uppercase tracking-wider">Бесплатно</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-oswald font-bold text-white mb-4 uppercase">
            Онлайн-аудит <span className="neon-text">вашего заведения</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Заполните форму за 3 минуты — Руслан лично разберёт ситуацию и пришлёт рекомендации
          </p>
        </div>

        {done ? (
          <div className="glass-card rounded-2xl p-10 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-oswald font-bold text-white mb-3 uppercase">Аудит принят!</h3>
            <p className="text-gray-400 mb-2">Руслан изучит вашу ситуацию и свяжется с вами лично.</p>
            <p className="text-[#FF6B00] font-medium">Обычно ответ приходит в течение нескольких часов.</p>
            <ContactFallback />
          </div>
        ) : (
          <div className="glass-card rounded-2xl overflow-hidden">
            {/* Progress */}
            <div className="h-1.5 bg-[rgba(255,255,255,0.06)]">
              <div
                className="h-full bg-[#FF6B00] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="p-8">
              {/* Step header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#FF6B00] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {step + 1}
                </div>
                <h3 className="text-xl font-oswald font-bold text-white uppercase">{current.title}</h3>
                <span className="ml-auto text-gray-600 text-sm">{step + 1} / {STEPS.length}</span>
              </div>

              {/* Questions */}
              <div className="space-y-5">
                {current.questions.map((q) => (
                  <div key={q.id}>
                    <label className="text-gray-300 text-sm mb-2 block">{q.label}</label>
                    {q.type === "select" ? (
                      <div className="grid grid-cols-2 gap-2">
                        {q.options!.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => setAnswer(q.id, opt)}
                            className={`px-3 py-2.5 rounded-xl text-sm text-left transition-all duration-200 border ${
                              answers[q.id] === opt
                                ? "bg-[rgba(255,107,0,0.2)] border-[#FF6B00] text-white"
                                : "bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.08)] text-gray-400 hover:border-[rgba(255,107,0,0.4)] hover:text-white"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    ) : q.type === "textarea" ? (
                      <textarea
                        value={answers[q.id] || ""}
                        onChange={(e) => setAnswer(q.id, e.target.value)}
                        placeholder={q.placeholder}
                        rows={3}
                        className="w-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.12)] rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-[#FF6B00] transition-colors resize-none"
                      />
                    ) : (
                      <input
                        type="text"
                        value={answers[q.id] || ""}
                        onChange={(e) => setAnswer(q.id, e.target.value)}
                        placeholder={q.placeholder}
                        className="w-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.12)] rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-[#FF6B00] transition-colors"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Navigation */}
              {error && (
                <p className="text-[#FF2D55] text-sm text-center mt-4">{error}</p>
              )}
              <div className="flex gap-3 mt-4">
                {step > 0 && (
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    className="px-5 py-3 rounded-xl border border-[rgba(255,255,255,0.12)] text-gray-400 hover:text-white hover:border-[rgba(255,255,255,0.3)] transition-all"
                  >
                    <Icon name="ArrowLeft" size={18} />
                  </button>
                )}
                {isLast ? (
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !answers["name"] || !answers["phone"]}
                    className="neon-btn flex-1 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? <Icon name="Loader2" size={20} className="animate-spin" /> : <Icon name="Send" size={20} />}
                    {loading ? "Отправляем..." : "Отправить на аудит"}
                  </button>
                ) : (
                  <button
                    onClick={() => setStep((s) => s + 1)}
                    disabled={!canNext()}
                    className="neon-btn flex-1 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    Далее
                    <Icon name="ArrowRight" size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <p className="text-center text-gray-600 text-xs mt-4">
          Бесплатно и без обязательств. Руслан лично изучает каждую заявку.
        </p>
      </div>
    </section>
  );
}