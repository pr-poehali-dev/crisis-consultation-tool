import Icon from "@/components/ui/icon";

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