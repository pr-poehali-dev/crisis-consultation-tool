import { useState } from "react";
import Icon from "@/components/ui/icon";

const PAINS = [
  {
    icon: "CircleDollarSign",
    text: "Деньги в кассе есть, а прибыли нет — куда уходит, непонятно",
  },
  {
    icon: "Users",
    text: "Персонал постоянно меняется, обучаю снова и снова",
  },
  {
    icon: "ChefHat",
    text: "Себестоимость блюд растёт, а поднимать цены боюсь — уйдут гости",
  },
  {
    icon: "Clock",
    text: "Нахожусь в заведении с утра до ночи — без меня всё рассыпается",
  },
  {
    icon: "TrendingDown",
    text: "Выручка не растёт месяцами, пробую акции — не помогает",
  },
  {
    icon: "ShoppingCart",
    text: "Поставщики диктуют цены, закупки не контролирую",
  },
  {
    icon: "FileText",
    text: "Учёта нет — работаю вслепую, решения принимаю на интуиции",
  },
  {
    icon: "Star",
    text: "Гости приходят один раз и не возвращаются, не знаю почему",
  },
];

export default function PainsSection() {
  const [checked, setChecked] = useState<number[]>([]);

  const toggle = (i: number) => {
    setChecked((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  const scrollToForm = () => {
    const el = document.getElementById("diagnostics");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 px-4 bg-[#0d0d0d]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-1.5 mb-4">
            <Icon name="AlertCircle" size={14} className="text-orange-400" />
            <span className="text-orange-400 text-sm font-medium">Узнаёте себя?</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Отметьте, что актуально для вашего заведения
          </h2>
          <p className="text-gray-400 text-lg">
            Если хотя бы 3 пункта про вас — пора разобраться
          </p>
        </div>

        <div className="space-y-3 mb-8">
          {PAINS.map((pain, i) => {
            const active = checked.includes(i);
            return (
              <button
                key={i}
                onClick={() => toggle(i)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl border text-left transition-all duration-200 ${
                  active
                    ? "border-[#FF2D55]/50 bg-[#FF2D55]/10"
                    : "border-white/10 bg-white/3 hover:border-white/20"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    active ? "border-[#FF2D55] bg-[#FF2D55]" : "border-white/20"
                  }`}
                >
                  {active && <Icon name="Check" size={14} className="text-white" />}
                </div>
                <div className={`flex items-center gap-3 ${active ? "text-white" : "text-gray-300"}`}>
                  <Icon name={pain.icon} size={18} className={active ? "text-[#FF2D55]" : "text-gray-500"} />
                  <span className="text-sm leading-snug">{pain.text}</span>
                </div>
              </button>
            );
          })}
        </div>

        {checked.length >= 3 && (
          <div className="bg-[#FF2D55]/10 border border-[#FF2D55]/30 rounded-2xl p-6 text-center animate-fade-in">
            <p className="text-white font-semibold text-lg mb-1">
              Вы отметили {checked.length} из {PAINS.length} пунктов
            </p>
            <p className="text-gray-400 text-sm mb-4">
              Это не случайность — это система. На диагностике разберём каждый пункт и найдём причины.
            </p>
            <button
              onClick={scrollToForm}
              className="bg-[#FF2D55] hover:bg-[#e0253d] text-white font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Записаться на бесплатную диагностику
            </button>
          </div>
        )}

        {checked.length > 0 && checked.length < 3 && (
          <p className="text-center text-gray-500 text-sm">
            Отметьте ещё {3 - checked.length} пункта, чтобы увидеть результат
          </p>
        )}
      </div>
    </section>
  );
}
