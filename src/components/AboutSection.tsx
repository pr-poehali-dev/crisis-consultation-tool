import Icon from "@/components/ui/icon";

const TIMELINE = [
  { year: "2008", label: "Официант", desc: "Первый шаг в индустрию — с нуля, изнутри" },
  { year: "2009", label: "Бармен", desc: "1,5 года практики, эксперименты с коктейлями и техниками" },
  { year: "2011", label: "Старший бармен → Шеф-бармен", desc: "Разработка барных и ресторанных меню для разных проектов" },
  { year: "2013", label: "Бар-менеджер → Управляющий", desc: "Полное операционное управление заведениями" },
  { year: "2016+", label: "Консультант и аудитор", desc: "50+ заведений, 100+ аудитов, 150+ обученных специалистов" },
];

export default function AboutSection() {
  return (
    <section className="py-20 px-4" style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #0d0800 100%)" }}>
      <div className="max-w-6xl mx-auto">

        {/* Заголовок */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#ff6a00]/10 border border-[#ff6a00]/30 text-[#ff8c00] text-xs font-semibold px-3 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            История эксперта
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Знаю изнутри каждую<br />
            <span className="text-[#ff8c00]">точку вашего бизнеса</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Я не теоретик. Я прошёл путь от официанта до управляющего — и только потом стал консультировать
          </p>
        </div>

        {/* Два фото + цитата */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          <div className="relative rounded-3xl overflow-hidden aspect-[3/4] group">
            <img
              src="https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/bucket/6162d9bf-e57b-4fca-b056-b7d25680bfcb.jpg"
              alt="Руслан Фатуллаев — портрет"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="inline-flex items-center gap-2 bg-[#ff6a00]/90 text-white text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wide">
                <Icon name="Award" size={14} />
                16+ лет в индустрии
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="relative rounded-3xl overflow-hidden flex-1 group" style={{ minHeight: 240 }}>
              <img
                src="https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/bucket/5b187ba6-5198-42f6-a810-6890b2dac4a6.jpg"
                alt="Руслан Фатуллаев за барной стойкой"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Цитата */}
            <div className="rounded-2xl border border-[#ff6a00]/25 p-6"
              style={{ background: "linear-gradient(135deg, #1a0f00, #120a00)" }}>
              <Icon name="Quote" size={28} className="text-[#ff6a00] mb-3 opacity-80" />
              <p className="text-white/80 leading-relaxed italic text-sm md:text-base">
                «Каждое заведение — это целый мир. Чтобы оно было прибыльным, нужно знать его изнутри. Именно поэтому я начинал с самых низов — и теперь вижу то, что другие консультанты просто не замечают.»
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-0.5 bg-[#ff6a00]" />
                <span className="text-[#ff8c00] font-semibold text-sm">Руслан Фатуллаев</span>
              </div>
            </div>
          </div>
        </div>

        {/* Путь — таймлайн */}
        <div className="rounded-3xl border border-white/8 p-8 md:p-10 mb-10"
          style={{ background: "linear-gradient(135deg, #111111, #0d0800)" }}>
          <h3 className="text-white text-xl font-bold mb-8 flex items-center gap-3">
            <Icon name="TrendingUp" size={20} className="text-[#ff6a00]" />
            Путь от официанта до эксперта
          </h3>
          <div className="space-y-0">
            {TIMELINE.map((item, i) => (
              <div key={i} className="flex gap-4 md:gap-6 group">
                {/* Линия */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full border-2 border-[#ff6a00] bg-[#ff6a00]/15 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#ff6a00]/30 transition-colors">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff6a00]" />
                  </div>
                  {i < TIMELINE.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-[#ff6a00]/40 to-[#ff6a00]/10 my-1" style={{ minHeight: 32 }} />
                  )}
                </div>
                {/* Контент */}
                <div className="pb-7">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[#ff8c00] text-sm font-bold font-mono">{item.year}</span>
                    <span className="text-white font-semibold">{item.label}</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Итоговые цифры */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { num: "16+", label: "лет в индустрии", icon: "Clock" },
            { num: "50+", label: "заведений открыто", icon: "Store" },
            { num: "100+", label: "аудитов проведено", icon: "ClipboardList" },
            { num: "150+", label: "специалистов обучено", icon: "Users" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-[#ff6a00]/20 p-5 text-center hover:border-[#ff6a00]/40 transition-colors"
              style={{ background: "linear-gradient(135deg, #1a0f00, #0d0800)" }}
            >
              <Icon name={stat.icon} size={20} className="text-[#ff6a00] mx-auto mb-2 opacity-70" />
              <div className="text-3xl font-black text-white mb-1">{stat.num}</div>
              <div className="text-gray-400 text-xs leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
