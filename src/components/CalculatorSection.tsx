import { useState, useMemo } from "react";
import Icon from "@/components/ui/icon";

export default function CalculatorSection() {
  const [revenue, setRevenue] = useState(1000000);
  const [costPercent, setCostPercent] = useState(48);
  const [tables, setTables] = useState(20);
  const [turnover, setTurnover] = useState(1.5);
  const [workDays, setWorkDays] = useState(26);

  const result = useMemo(() => {
    const idealCost = 30;
    const idealTurnover = 2.5;

    const costLoss = ((costPercent - idealCost) / 100) * revenue;
    const revenuePerTable = revenue / (tables * turnover * workDays);
    const potentialRevenue = tables * idealTurnover * workDays * revenuePerTable;
    const turnoverLoss = Math.max(0, potentialRevenue - revenue);

    const totalLoss = Math.round(costLoss + turnoverLoss);
    const costLossRound = Math.round(costLoss);
    const turnoverLossRound = Math.round(turnoverLoss);

    return { totalLoss, costLossRound, turnoverLossRound };
  }, [revenue, costPercent, tables, turnover, workDays]);

  const formatNum = (n: number) =>
    n.toLocaleString("ru-RU") + " ₽";

  const scrollToForm = () => {
    const el = document.getElementById("diagnostics");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 px-4 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-1.5 mb-4">
            <Icon name="TrendingDown" size={14} className="text-red-400" />
            <span className="text-red-400 text-sm font-medium">Сколько вы теряете прямо сейчас</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Калькулятор потерь
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Введите данные вашего заведения — и узнайте, сколько денег уходит каждый месяц
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/3 border border-white/10 rounded-2xl p-6 space-y-6">
            <SliderField
              label="Ежемесячная выручка"
              value={revenue}
              min={200000}
              max={5000000}
              step={50000}
              display={formatNum(revenue)}
              onChange={setRevenue}
            />
            <SliderField
              label="Себестоимость продуктов (food cost)"
              value={costPercent}
              min={20}
              max={70}
              step={1}
              display={`${costPercent}%`}
              onChange={setCostPercent}
              hint="Норма — 28–35%"
              danger={costPercent > 40}
            />
            <SliderField
              label="Количество столов"
              value={tables}
              min={5}
              max={100}
              step={1}
              display={`${tables} стол.`}
              onChange={setTables}
            />
            <SliderField
              label="Оборачиваемость стола в вечер"
              value={turnover}
              min={0.5}
              max={5}
              step={0.1}
              display={`${turnover.toFixed(1)}×`}
              onChange={setTurnover}
              hint="Норма — 2,5× и выше"
              danger={turnover < 2}
            />
            <SliderField
              label="Рабочих дней в месяц"
              value={workDays}
              min={20}
              max={31}
              step={1}
              display={`${workDays} дн.`}
              onChange={setWorkDays}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-red-950/40 border border-red-500/30 rounded-2xl p-6 flex-1 flex flex-col justify-center">
              <p className="text-gray-400 text-sm mb-1">Вы теряете каждый месяц</p>
              <div className="text-4xl md:text-5xl font-bold text-red-400 mb-4">
                {result.totalLoss <= 0 ? "— отлично! —" : formatNum(result.totalLoss)}
              </div>

              <div className="space-y-3">
                {result.costLossRound > 0 && (
                  <LossLine
                    icon="ShoppingCart"
                    label="Завышенная себестоимость"
                    value={formatNum(result.costLossRound)}
                  />
                )}
                {result.turnoverLossRound > 0 && (
                  <LossLine
                    icon="Clock"
                    label="Низкая оборачиваемость столов"
                    value={formatNum(result.turnoverLossRound)}
                  />
                )}
              </div>
            </div>

            <div className="bg-white/3 border border-white/10 rounded-2xl overflow-hidden">
              <div className="flex items-end gap-4 p-4 pb-0">
                <img
                  src="https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/bucket/8fbcc73c-f4e2-499a-aafc-debec5c94519.jpg"
                  alt="Руслан Фатуллаев"
                  className="w-24 rounded-xl object-cover object-top flex-shrink-0"
                  style={{ height: "120px" }}
                />
                <p className="text-gray-300 text-sm leading-relaxed pb-3">
                  Это приблизительный расчёт. На бесплатной диагностике я разберу ваш реальный случай и назову точные цифры.
                </p>
              </div>
              <div className="p-4 pt-3">
                <button
                  onClick={scrollToForm}
                  className="w-full bg-[#FF2D55] hover:bg-[#e0253d] text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  Узнать точные потери — бесплатно
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SliderField({
  label, value, min, max, step, display, onChange, hint, danger,
}: {
  label: string; value: number; min: number; max: number; step: number;
  display: string; onChange: (v: number) => void; hint?: string; danger?: boolean;
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-300 text-sm">{label}</span>
        <span className={`font-bold text-sm ${danger ? "text-red-400" : "text-white"}`}>{display}</span>
      </div>
      {hint && <p className="text-xs text-gray-500 mb-1">{hint}</p>}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#FF2D55] cursor-pointer"
      />
    </div>
  );
}

function LossLine({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Icon name={icon} size={14} className="text-red-400 flex-shrink-0" />
        <span className="text-gray-400 text-xs">{label}</span>
      </div>
      <span className="text-red-300 text-sm font-semibold whitespace-nowrap">{value}</span>
    </div>
  );
}