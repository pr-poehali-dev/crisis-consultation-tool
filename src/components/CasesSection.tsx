import Icon from "@/components/ui/icon";

interface CaseItem {
  name: string;
  location?: string;
  type: string;
  icon: string;
  photo?: string;
}

const CASES: CaseItem[] = [
  { name: "Grizzly", location: "Мясницкая", type: "Гастробар", icon: "Beer", photo: "https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/bucket/f6d20972-9e87-4556-a231-dd04df2c079c.png" },
  { name: "«Рецептор»", location: "Патриаршие пруды", type: "Кафе", icon: "Coffee", photo: "https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/bucket/5a7142ee-c6ee-41ca-8413-b5562b1b777b.png" },
  { name: "Luciano", type: "Ресторан", icon: "UtensilsCrossed", photo: "https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/bucket/d34d71d9-fe96-4614-a538-fc5abde90c55.png" },
  { name: "Dolce Far Niente", type: "Ресторан", icon: "UtensilsCrossed", photo: "https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/bucket/d451ce07-70f6-4a0e-98f2-6281a9d20d8d.png" },
  { name: "Bar & Sheff", type: "Кафе-бар", icon: "Wine", photo: "https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/bucket/5b7e9feb-d812-4471-bc7c-510cb6e5ab60.png" },
  { name: "Эрато", type: "Ресторан", icon: "UtensilsCrossed", photo: "https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/bucket/130232da-4120-4626-ada7-584c14528770.png" },
  { name: "Мечта", type: "Ресторан", icon: "UtensilsCrossed", photo: "https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/bucket/4f83666c-251a-49b0-a098-2dc7a9a96929.png" },
  { name: "ГастроПаб 31", location: "Шаболовка", type: "Гастропаб", icon: "Beer", photo: "https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/bucket/8d254c92-885d-4a96-a082-d9606a3fcf09.png" },
  { name: "PANE & OLIO", type: "Итальянская кухня", icon: "UtensilsCrossed", photo: "https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/bucket/548dd55f-749a-4f28-a287-c66dcba64998.png" },
  { name: "Хачапури", type: "Ресторан", icon: "UtensilsCrossed", photo: "https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/bucket/dfbcd22b-61ab-40e9-801b-2556bfa08db7.png" },
  { name: "Сезам", type: "Ресто-бар", icon: "Wine", photo: "https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/bucket/f15279ee-3f05-4c16-81d6-a4977e6ac63d.png" },
  { name: "Баракат", type: "Кафе", icon: "Coffee", photo: "https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/bucket/21ebac16-26fc-45f2-b824-01cf86a19213.png" },
  { name: "Saikō", type: "Азиатская кухня", icon: "UtensilsCrossed", photo: "https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/bucket/6788d11f-5290-48d4-beda-6fb80273eec1.png" },
  { name: "Чифанька", type: "Азиатская кухня", icon: "UtensilsCrossed", photo: "https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/bucket/deacefc3-5808-4309-b43b-0d71c421247a.png" },
  { name: "Вход с улицы", type: "Ресторан", icon: "UtensilsCrossed", photo: "https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/bucket/f2bc5231-4a9e-406a-be9c-c9c81ac73fde.png" },
  { name: "Giallo", type: "Ресторан", icon: "UtensilsCrossed", photo: "https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/bucket/8d5d6a08-6e86-48fe-94b5-e917f69955c3.png" },
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