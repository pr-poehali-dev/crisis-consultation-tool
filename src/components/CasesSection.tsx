import Icon from "@/components/ui/icon";

interface CaseItem {
  name: string;
  location?: string;
  type: string;
  icon: string;
  photo?: string;
}

const CASES: CaseItem[] = [
  { name: "Grizzly", location: "Мясницкая", type: "Гастробар", icon: "Beer" },
  { name: "«Рецептор»", location: "Патриаршие пруды", type: "Кафе", icon: "Coffee" },
  { name: "Luciano", type: "Ресторан", icon: "UtensilsCrossed" },
  { name: "Dolce Far Niente", type: "Ресторан", icon: "UtensilsCrossed" },
  { name: "Bar & Sheff", type: "Кафе-бар", icon: "Wine" },
  { name: "Эрато", type: "Ресторан", icon: "UtensilsCrossed" },
  { name: "Мечта", type: "Ресторан", icon: "UtensilsCrossed" },
  { name: "ГастроПаб 31", location: "Шаболовка", type: "Гастропаб", icon: "Beer" },
  { name: "PANE & OLIO", type: "Итальянская кухня", icon: "UtensilsCrossed" },
  { name: "Хачапури", type: "Ресторан", icon: "UtensilsCrossed" },
  { name: "Сезам", type: "Ресто-бар", icon: "Wine" },
  { name: "Баракат", type: "Кафе", icon: "Coffee" },
  { name: "Saikō", type: "Азиатская кухня", icon: "UtensilsCrossed" },
  { name: "Чифанька", type: "Азиатская кухня", icon: "UtensilsCrossed" },
  { name: "Вход с улицы", type: "Ресторан", icon: "UtensilsCrossed" },
  { name: "Giallo", type: "Ресторан", icon: "UtensilsCrossed" },
];

export default function CasesSection() {
  return (
    <section className="py-20 px-4 bg-[#1A120B]" id="cases">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[rgba(255,122,26,0.1)] border border-[rgba(255,122,26,0.3)] rounded-full px-4 py-2 mb-6">
            <Icon name="Award" size={16} className="text-[#FF7A1A]" />
            <span className="text-[#FF7A1A] text-sm font-medium uppercase tracking-wider">Реальные проекты</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-oswald font-bold text-white mb-4 uppercase">
            Заведения, <span className="neon-text">с которыми я работал</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Рестораны, бары и кофейни Москвы, где я лично проводил аудит, выстраивал процессы, открывал заведение под ключ или сопровождал команду.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CASES.map((item) => (
            <div
              key={item.name}
              className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-[rgba(255,122,26,0.4)] transition-all duration-200 group"
            >
              <div className="aspect-square relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#2B2015] to-[#1A120B]">
                {item.photo ? (
                  <img src={item.photo} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <Icon name={item.icon} size={36} className="text-[#FF7A1A]/40 group-hover:text-[#FF7A1A]/60 transition-colors" />
                )}
              </div>
              <div className="p-3">
                <h3 className="text-white font-oswald font-bold text-sm uppercase leading-tight mb-1">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-xs">
                  {item.type}
                  {item.location && ` · ${item.location}`}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Полные истории с деталями и результатами по каждому проекту — скоро здесь. Хотите узнать подробности прямо сейчас — спросите лично.
          </p>
        </div>
      </div>
    </section>
  );
}
