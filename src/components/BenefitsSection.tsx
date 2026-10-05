import Icon from "@/components/ui/icon";

const STATS = [
  { num: "16+", label: "лет в ресторанной и барной индустрии", icon: "Clock" },
  { num: "50+", label: "заведений открыто и выведено в лидеры", icon: "Store" },
  { num: "100+", label: "аудитов ресторанов, кофеен и баров", icon: "ClipboardCheck" },
  { num: "25+", label: "убыточных объектов выведено на стабильную работу", icon: "TrendingUp" },
];

const BENEFITS = [
  {
    icon: "ChefHat",
    title: "Практик, а не теоретик",
    description: "Сам открывал заведения, управлял ими и спасал их в кризис. Знаю кухню, зал и бар изнутри.",
  },
  {
    icon: "Search",
    title: "Нахожу, где утекают деньги",
    description: "Закупки, фудкост, расходы, блюда, которые продаются в ноль. Показываю конкретные точки потерь.",
  },
  {
    icon: "TrendingUp",
    title: "Вывожу убыточные заведения в плюс",
    description: "Опыт антикризисного управляющего: более 25 объектов выведено на стабильную позицию.",
  },
  {
    icon: "ListChecks",
    title: "Даю конкретный план действий",
    description: "Не общие советы, а шаги с приоритетами и сроками, которые можно внедрять сразу.",
  },
  {
    icon: "Layers",
    title: "Закрываю все задачи в одном месте",
    description: "Аудит, меню-инжиниринг, учёт и бюджет, обучение персонала, открытие под ключ, ХАССП и подготовка к проверкам.",
  },
  {
    icon: "Users",
    title: "Выстраиваю сильную команду",
    description: "Подготовил и сертифицировал более 150 специалистов и управленцев. Умею собирать команду и удерживать её.",
  },
  {
    icon: "Sparkles",
    title: "Индивидуальный подход",
    description: "Никаких шаблонов: у каждого заведения своя концепция, аудитория и точки роста.",
  },
  {
    icon: "Mic",
    title: "Делюсь опытом на сцене",
    description: "Спикер школы Upskill, более 70 вебинаров и 100 офлайн-мероприятий в разных городах России.",
  },
];

export default function BenefitsSection() {
  return (
    <section
      id="advantages"
      className="py-20 px-4 scroll-mt-14"
      style={{ background: "linear-gradient(180deg, #241a10 0%, #1A120B 100%)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4 bg-red-600 text-white shadow-[0_0_18px_rgba(220,38,38,0.55)]">
            <Icon name="Flame" size={14} />
            Преимущества
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-oswald uppercase">
            Почему стоит работать <span className="text-[#FF7A1A]">со мной</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Я помогаю открывать, развивать и спасать рестораны, кафе, бары и кофейни. Вот что вы получаете, когда мы работаем вместе.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-red-600/40 p-5 text-center"
              style={{ background: "linear-gradient(135deg, rgba(220,38,38,0.15), #1A120B)" }}
            >
              <Icon name={s.icon} size={20} className="text-red-500 mx-auto mb-2" />
              <div className="text-4xl font-black text-white mb-1">{s.num}</div>
              <div className="text-gray-300 text-xs leading-tight">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {BENEFITS.map((item) => (
            <div
              key={item.title}
              className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-red-500/50 hover:-translate-y-1"
            >
              <div className="w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center bg-red-600/20 text-red-400">
                <Icon name={item.icon} size={22} />
              </div>
              <div>
                <h3 className="text-white text-lg font-bold mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#consultation"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-[0_0_24px_rgba(220,38,38,0.5)] transition-colors"
          >
            <Icon name="MessageCircle" size={18} />
            Записаться на консультацию
          </a>
        </div>
      </div>
    </section>
  );
}
