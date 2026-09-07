import Icon from "@/components/ui/icon";

const BENEFITS = [
  {
    icon: "Search",
    title: "Найдём, где утекают деньги",
    description: "Разберём закупки, себестоимость и расходы — покажу конкретные точки, где заведение теряет прибыль каждый месяц.",
    color: "#D0585E",
  },
  {
    icon: "Users",
    title: "Наведём порядок в команде",
    description: "Разберёмся с текучкой, мотивацией и распределением ролей — от администратора до кухни.",
    color: "#DB8084",
  },
  {
    icon: "TrendingUp",
    title: "Поднимем средний чек",
    description: "Пересоберём меню и внедрим рабочие техники допродаж, которые не раздражают гостей.",
    color: "#D0585E",
  },
  {
    icon: "ClipboardCheck",
    title: "Выстроим систему учёта",
    description: "Дам понятные инструменты контроля: что считать, как часто и на что реагировать в первую очередь.",
    color: "#DB8084",
  },
  {
    icon: "Repeat",
    title: "Вернём постоянных гостей",
    description: "Разберём, почему гости не возвращаются, и настроим простую систему удержания без сложных CRM.",
    color: "#D0585E",
  },
  {
    icon: "ShieldCheck",
    title: "Дадим чёткий план действий",
    description: "После разбора — не абстрактные советы, а конкретные шаги с приоритетами и сроками.",
    color: "#DB8084",
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-16 px-4" style={{ background: "linear-gradient(180deg, #182334 0%, #121926 100%)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4"
            style={{ background: "rgba(208,88,94,0.15)", color: "#DB8084" }}>
            Что вы получите
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            С чем я помогаю заведениям
          </h2>
          <p className="text-gray-400 text-lg">Конкретные результаты, а не общие рекомендации</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/3 p-6 transition-all hover:border-[#D0585E]/40 hover:-translate-y-1"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: item.color + "22", color: item.color }}
              >
                <Icon name={item.icon} size={22} />
              </div>
              <h3 className="text-white text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
