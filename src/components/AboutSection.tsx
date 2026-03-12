import Icon from "@/components/ui/icon";

export default function AboutSection() {
  return (
    <section className="py-20 px-4" style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #0d0800 100%)" }}>
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#ff6a00]/10 border border-[#ff6a00]/30 text-[#ff8c00] text-xs font-semibold px-3 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            Об эксперте
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Руслан Фатуллаев
          </h2>
          <p className="text-[#ff8c00] text-lg font-semibold">Антикризисный управляющий · Эксперт в сфере HoReCa</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-14">

          {/* Фото */}
          <div className="relative rounded-3xl overflow-hidden group" style={{ aspectRatio: "3/4" }}>
            <img
              src="https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/bucket/6b01a2cf-6b28-421c-878b-c4ef3f45cfe0.png"
              alt="Руслан Фатуллаев"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5">
              <div className="inline-flex items-center gap-2 bg-[#ff6a00]/90 text-white text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wide">
                <Icon name="Award" size={14} />
                16+ лет в индустрии
              </div>
            </div>
          </div>

          {/* Текст */}
          <div className="flex flex-col gap-6">

            {/* Основной текст */}
            <div className="rounded-2xl border border-white/8 p-6 space-y-3 text-gray-300 leading-relaxed"
              style={{ background: "linear-gradient(135deg, #111111, #0d0800)" }}>
              <p>Более 16-ти лет работаю в индустрии ресторанного гостеприимства и барной индустрии. Открыл и вывел на лидирующие позиции <span className="text-white font-semibold">50+ заведений</span>.</p>
              <p>Эксперт по развитию бизнеса: свыше <span className="text-white font-semibold">600 часов</span> профильной консультационной поддержки. Бизнес-тренер: подготовил и сертифицировал команду из <span className="text-white font-semibold">150+ специалистов</span> и управленцев.</p>
              <p>Провёл <span className="text-white font-semibold">100+ аудитов</span> в сегментах общепита: рестораны, кофейни, бары. Провёл <span className="text-white font-semibold">70+ вебинаров</span> и 100 офлайн-мероприятий с выступлениями в Саратове, Оренбурге, Мытищах, Москве, Астрахани, Владимире, Тюменской области и др.</p>
              <p>Помогал выводить на стабильную позицию более <span className="text-white font-semibold">25 стабильно убыточных объектов</span>. Спикер школы Upskill.</p>
            </div>

            {/* Философия */}
            <div className="rounded-2xl border border-[#ff6a00]/25 p-6"
              style={{ background: "linear-gradient(135deg, #1a0f00, #120a00)" }}>
              <Icon name="Quote" size={28} className="text-[#ff6a00] mb-3 opacity-80" />
              <p className="text-white/90 leading-relaxed italic text-base">
                «Каждое заведение должно создавать уникальный опыт для гостей и при этом быть прибыльным. Я не даю шаблонных решений — каждый проект индивидуален.»
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-0.5 bg-[#ff6a00]" />
                <span className="text-[#ff8c00] font-semibold text-sm">Моя философия</span>
              </div>
            </div>

            <p className="text-[#ff8c00] font-semibold text-center">
              С радостью помогу открыть, развить и вывести в ТОП ваше заведение!
            </p>
          </div>
        </div>

        {/* Итоговые цифры */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { num: "16+", label: "лет опыта", icon: "Clock" },
            { num: "50+", label: "заведений открыто", icon: "Store" },
            { num: "600+", label: "часов консультаций", icon: "ClipboardList" },
            { num: "150+", label: "специалистов", icon: "Users" },
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