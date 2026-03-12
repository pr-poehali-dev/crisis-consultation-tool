import Icon from "@/components/ui/icon";

interface GuaranteeSectionProps {
  onDiagnosticClick: () => void;
}

export default function GuaranteeSection({ onDiagnosticClick }: GuaranteeSectionProps) {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card rounded-2xl p-8 md:p-10 border-2 border-[rgba(255,107,0,0.3)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[rgba(255,107,0,0.05)] rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full bg-[rgba(255,107,0,0.15)] border-2 border-[rgba(255,107,0,0.4)] flex items-center justify-center">
                <Icon name="ShieldCheck" size={48} className="text-[#FF6B00]" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-[rgba(255,107,0,0.1)] border border-[rgba(255,107,0,0.3)] rounded-full px-3 py-1 mb-3">
                <span className="text-[#FF6B00] text-xs font-medium uppercase tracking-wider">Гарантия результата</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-oswald font-bold text-white mb-3">
                Если не найдём точки роста — <span className="neon-text">вернём деньги</span>
              </h3>
              <p className="text-gray-400 text-base leading-relaxed mb-6">
                Я уверен в своей методике. Если после диагностики и разбора я не найду конкретных зон потерь или роста в вашем заведении — верну полную стоимость без вопросов. За 16 лет такого ещё ни разу не случалось.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={onDiagnosticClick}
                  className="neon-btn text-white font-bold px-8 py-3.5 rounded-xl flex items-center gap-2"
                >
                  <Icon name="ClipboardList" size={18} />
                  Пройти бесплатную диагностику
                </button>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Icon name="Lock" size={14} />
                  <span>Без предоплаты. Ни к чему не обязывает.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-8 pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: "Award", text: "16 лет в ресторанном бизнесе" },
              { icon: "Users", text: "50+ заведений прошли аудит" },
              { icon: "TrendingUp", text: "Средний рост прибыли +30%" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[rgba(255,107,0,0.1)] flex items-center justify-center flex-shrink-0">
                  <Icon name={item.icon} size={16} className="text-[#FF6B00]" />
                </div>
                <span className="text-gray-400 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
