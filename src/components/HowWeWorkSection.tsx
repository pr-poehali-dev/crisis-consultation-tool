import Icon from "@/components/ui/icon";

const STEPS = [
  {
    number: "01",
    icon: "ClipboardList",
    title: "Диагностика",
    description: "Вы проходите бесплатный аудит-квиз. Я получаю полную картину вашего бизнеса: финансы, персонал, меню, процессы. Смотрю где и сколько теряете.",
    duration: "Бесплатно · 15 минут",
    color: "#ff6a00",
  },
  {
    number: "02",
    icon: "MessageSquare",
    title: "Разбор",
    description: "Созваниваемся на 60–90 минут. Разбираем конкретные проблемы, я показываю точки потерь и даю чёткий план: что делать, в каком порядке, какой результат ожидать.",
    duration: "10 000 ₽ · 60–90 минут",
    color: "#3b82f6",
  },
  {
    number: "03",
    icon: "TrendingUp",
    title: "Внедрение",
    description: "Вы внедряете изменения по плану. При необходимости — системное сопровождение: я на связи, помогаю с конкретными задачами, контролирую результат.",
    duration: "Индивидуально",
    color: "#22c55e",
  },
];

export default function HowWeWorkSection() {
  return (
    <section className="py-16 px-4" style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #0f0800 100%)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Как мы работаем</h2>
          <p className="text-gray-400 text-lg">Три шага от проблемы к результату</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {STEPS.map((step, i) => (
            <div key={i} className="relative rounded-2xl border border-white/10 bg-white/3 p-6 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-5xl font-black opacity-10 text-white leading-none">{step.number}</span>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: step.color + "22", color: step.color }}
                >
                  <Icon name={step.icon} size={22} />
                </div>
              </div>
              <h3 className="text-white text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed flex-1">{step.description}</p>
              <div
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-lg self-start"
                style={{ background: step.color + "18", color: step.color }}
              >
                <Icon name="Clock" size={14} />
                {step.duration}
              </div>

              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 z-10 -translate-y-1/2">
                  <Icon name="ChevronRight" size={20} className="text-gray-600" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-[#ff6a00]/30 p-6 md:p-8 text-center"
          style={{ background: "linear-gradient(135deg, #1a0f00, #2d1a00)" }}>
          <p className="text-gray-400 text-sm mb-1">Стоимость консультации (разбора)</p>
          <div className="text-5xl font-black text-white mb-1">10 000 <span className="text-[#ff8c00]">₽</span></div>
          <p className="text-gray-400 text-sm mb-6">Один платёж · Без подписок · Результат с первой сессии</p>
          <a
            href="#diagnostic"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95"
            style={{ background: "#ff6a00", boxShadow: "0 8px 32px rgba(255,106,0,0.4)" }}
          >
            Начать с бесплатной диагностики
            <Icon name="ArrowRight" size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
