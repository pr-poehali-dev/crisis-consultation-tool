import { useState } from "react";
import Icon from "@/components/ui/icon";
type IconName = Parameters<typeof Icon>[0]["name"];

const slides = [
  { id: 0, type: "cover", section: "Введение" },
  { id: 1, type: "anatomy", section: "Анатомия" },
  { id: 2, type: "indications", section: "Показания к ЛГ" },
  { id: 3, type: "exercises", section: "Комплекс упражнений" },
  { id: 4, type: "technique", section: "Техника выполнения" },
  { id: 5, type: "contraindications", section: "Противопоказания" },
  { id: 6, type: "results", section: "Ожидаемые результаты" },
  { id: 7, type: "conclusion", section: "Заключение" },
];

const HipJointSVG = () => (
  <svg viewBox="0 0 300 260" className="w-full h-full" fill="none">
    <ellipse cx="150" cy="72" rx="108" ry="50" fill="#e8f4f8" stroke="#4a85b8" strokeWidth="2.5"/>
    <ellipse cx="150" cy="72" rx="75" ry="32" fill="#d0e9f5" stroke="#4a85b8" strokeWidth="1.5"/>
    <circle cx="90" cy="110" r="30" fill="#b8d9ee" stroke="#2c6fa0" strokeWidth="2.5"/>
    <circle cx="90" cy="110" r="20" fill="#daeef8" stroke="#2c6fa0" strokeWidth="1.5"/>
    <circle cx="210" cy="110" r="30" fill="#b8d9ee" stroke="#2c6fa0" strokeWidth="2.5"/>
    <circle cx="210" cy="110" r="20" fill="#daeef8" stroke="#2c6fa0" strokeWidth="1.5"/>
    <line x1="90" y1="130" x2="72" y2="195" stroke="#4a6fa5" strokeWidth="13" strokeLinecap="round"/>
    <circle cx="90" cy="110" r="16" fill="#f0f8ff" stroke="#2c6fa0" strokeWidth="2"/>
    <circle cx="90" cy="110" r="8" fill="#fff" stroke="#2c6fa0" strokeWidth="1" opacity="0.6"/>
    <line x1="210" y1="130" x2="228" y2="195" stroke="#4a6fa5" strokeWidth="13" strokeLinecap="round"/>
    <circle cx="210" cy="110" r="16" fill="#f0f8ff" stroke="#2c6fa0" strokeWidth="2"/>
    <circle cx="210" cy="110" r="8" fill="#fff" stroke="#2c6fa0" strokeWidth="1" opacity="0.6"/>
    <line x1="108" y1="98" x2="138" y2="78" stroke="#d0522a" strokeWidth="1" strokeDasharray="3,2"/>
    <circle cx="108" cy="98" r="3" fill="#d0522a"/>
    <text x="141" y="76" fontSize="10" fill="#d0522a" fontFamily="Golos Text, sans-serif">хрящ</text>
    <line x1="152" y1="110" x2="152" y2="140" stroke="#4a8a1e" strokeWidth="1" strokeDasharray="3,2"/>
    <text x="130" y="153" fontSize="10" fill="#4a8a1e" fontFamily="Golos Text, sans-serif">связка</text>
    <text x="120" y="48" fontSize="11" fill="#1c4f7a" fontFamily="Golos Text, sans-serif" fontWeight="600">Тазовая кость</text>
    <text x="48" y="128" fontSize="9" fill="#1c4f7a" fontFamily="Golos Text, sans-serif">вертлужная</text>
    <text x="52" y="139" fontSize="9" fill="#1c4f7a" fontFamily="Golos Text, sans-serif">впадина</text>
    <text x="56" y="210" fontSize="9" fill="#3a5f95" fontFamily="Golos Text, sans-serif">головка</text>
    <text x="52" y="221" fontSize="9" fill="#3a5f95" fontFamily="Golos Text, sans-serif">бедренной</text>
    <text x="58" y="232" fontSize="9" fill="#3a5f95" fontFamily="Golos Text, sans-serif">кости</text>
    <defs>
      <marker id="arr1" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
        <path d="M 0 0 L 5 2.5 L 0 5 z" fill="#d0522a"/>
      </marker>
    </defs>
  </svg>
);

const FigureSVG = ({ type }: { type: string }) => {
  if (type === "flex") return (
    <svg viewBox="0 0 200 150" className="w-full h-full">
      <line x1="10" y1="125" x2="190" y2="125" stroke="#c5d5e8" strokeWidth="2"/>
      <ellipse cx="88" cy="120" rx="72" ry="7" fill="#daeef8" stroke="#5b8db8" strokeWidth="1.5"/>
      <circle cx="18" cy="113" r="11" fill="#f5c5a3" stroke="#d4956a" strokeWidth="1.5"/>
      <rect x="26" y="108" width="58" height="14" rx="6" fill="#e8d5f0" stroke="#9b6dc0" strokeWidth="1.5"/>
      <line x1="84" y1="114" x2="115" y2="80" stroke="#f5c5a3" strokeWidth="8" strokeLinecap="round"/>
      <line x1="115" y1="80" x2="140" y2="95" stroke="#f5c5a3" strokeWidth="7" strokeLinecap="round"/>
      <line x1="84" y1="118" x2="152" y2="118" stroke="#f5c5a3" strokeWidth="8" strokeLinecap="round"/>
      <path d="M 96 115 Q 105 97 114 82" stroke="#d0522a" strokeWidth="1.5" fill="none" strokeDasharray="3,2"/>
      <text x="112" y="74" fontSize="12" fill="#d0522a" fontFamily="Golos Text, sans-serif" fontWeight="600">90°</text>
    </svg>
  );
  if (type === "abduct") return (
    <svg viewBox="0 0 200 150" className="w-full h-full">
      <line x1="10" y1="125" x2="190" y2="125" stroke="#c5d5e8" strokeWidth="2"/>
      <ellipse cx="88" cy="120" rx="72" ry="7" fill="#daeef8" stroke="#5b8db8" strokeWidth="1.5"/>
      <circle cx="18" cy="113" r="11" fill="#f5c5a3" stroke="#d4956a" strokeWidth="1.5"/>
      <rect x="26" y="108" width="58" height="14" rx="6" fill="#e8d5f0" stroke="#9b6dc0" strokeWidth="1.5"/>
      <line x1="84" y1="114" x2="160" y2="103" stroke="#f5c5a3" strokeWidth="8" strokeLinecap="round"/>
      <line x1="84" y1="118" x2="152" y2="125" stroke="#f5c5a3" strokeWidth="8" strokeLinecap="round"/>
      <path d="M 118 123 Q 132 114 148 106" stroke="#d0522a" strokeWidth="1.5" fill="none" strokeDasharray="3,2"/>
      <text x="148" y="100" fontSize="12" fill="#d0522a" fontFamily="Golos Text, sans-serif" fontWeight="600">30°</text>
    </svg>
  );
  if (type === "rotate") return (
    <svg viewBox="0 0 200 150" className="w-full h-full">
      <line x1="10" y1="125" x2="190" y2="125" stroke="#c5d5e8" strokeWidth="2"/>
      <ellipse cx="88" cy="120" rx="72" ry="7" fill="#daeef8" stroke="#5b8db8" strokeWidth="1.5"/>
      <circle cx="18" cy="113" r="11" fill="#f5c5a3" stroke="#d4956a" strokeWidth="1.5"/>
      <rect x="26" y="108" width="58" height="14" rx="6" fill="#e8d5f0" stroke="#9b6dc0" strokeWidth="1.5"/>
      <line x1="84" y1="116" x2="152" y2="114" stroke="#f5c5a3" strokeWidth="8" strokeLinecap="round"/>
      <path d="M 147 104 Q 162 114 147 126" stroke="#d0522a" strokeWidth="2" fill="none"/>
      <path d="M 132 104 Q 117 114 132 126" stroke="#4a8a1e" strokeWidth="2" fill="none"/>
      <text x="150" y="140" fontSize="9" fill="#d0522a" fontFamily="Golos Text, sans-serif">нар.</text>
      <text x="118" y="140" fontSize="9" fill="#4a8a1e" fontFamily="Golos Text, sans-serif">внутр.</text>
    </svg>
  );
  return (
    <svg viewBox="0 0 200 150" className="w-full h-full">
      <line x1="10" y1="125" x2="190" y2="125" stroke="#c5d5e8" strokeWidth="2"/>
      <ellipse cx="88" cy="120" rx="72" ry="7" fill="#daeef8" stroke="#5b8db8" strokeWidth="1.5"/>
      <circle cx="18" cy="113" r="11" fill="#f5c5a3" stroke="#d4956a" strokeWidth="1.5"/>
      <rect x="26" y="108" width="58" height="14" rx="6" fill="#e8d5f0" stroke="#9b6dc0" strokeWidth="1.5"/>
      <line x1="84" y1="116" x2="152" y2="114" stroke="#f5c5a3" strokeWidth="8" strokeLinecap="round"/>
      <line x1="152" y1="114" x2="172" y2="100" stroke="#f5c5a3" strokeWidth="7" strokeLinecap="round"/>
      <path d="M 105 116 Q 130 116 150 114 Q 158 110 165 104" stroke="#d0522a" strokeWidth="1.5" fill="none" strokeDasharray="3,2"/>
      <text x="160" y="96" fontSize="11" fill="#d0522a" fontFamily="Golos Text, sans-serif" fontWeight="600">15°</text>
    </svg>
  );
};

const CoverSlide = () => (
  <div className="flex flex-col items-center justify-center h-full text-center px-12 relative overflow-hidden bg-gradient-to-br from-[#f5f9fd] to-[#e0f0fa]">
    <div className="absolute top-6 left-6 opacity-10">
      <svg viewBox="0 0 100 100" className="w-24 h-24" fill="none">
        <circle cx="50" cy="50" r="48" stroke="#2c6fa0" strokeWidth="2"/>
        <path d="M50 10 V90 M10 50 H90" stroke="#2c6fa0" strokeWidth="2"/>
        <circle cx="50" cy="50" r="18" fill="#d0e9f5" stroke="#2c6fa0" strokeWidth="1.5"/>
      </svg>
    </div>
    <div className="absolute bottom-6 right-6 opacity-10">
      <svg viewBox="0 0 80 80" className="w-20 h-20" fill="none">
        <circle cx="40" cy="22" r="15" stroke="#2c6fa0" strokeWidth="2"/>
        <path d="M28 37 Q40 62 52 37" stroke="#2c6fa0" strokeWidth="2" fill="none"/>
        <line x1="33" y1="55" x2="28" y2="78" stroke="#2c6fa0" strokeWidth="2"/>
        <line x1="47" y1="55" x2="52" y2="78" stroke="#2c6fa0" strokeWidth="2"/>
      </svg>
    </div>

    <div className="relative z-10 max-w-2xl">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="h-px w-14 bg-[#2c6fa0]" />
        <span className="text-[#2c6fa0] text-xs font-golos tracking-widest uppercase font-semibold">Методическое пособие</span>
        <div className="h-px w-14 bg-[#2c6fa0]" />
      </div>

      <div className="flex justify-center mb-5">
        <div className="w-20 h-20">
          <svg viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="36" fill="#e8f4f8" stroke="#2c6fa0" strokeWidth="2"/>
            <circle cx="40" cy="40" r="22" fill="#d0e9f5" stroke="#2c6fa0" strokeWidth="1.5"/>
            <circle cx="40" cy="40" r="12" fill="#fff" stroke="#2c6fa0" strokeWidth="1"/>
            <circle cx="40" cy="40" r="4" fill="#2c6fa0"/>
          </svg>
        </div>
      </div>

      <h1 className="font-cormorant text-5xl md:text-6xl text-[#1a3a5c] font-semibold leading-tight mb-4">
        Лечебная гимнастика<br/>
        <em className="text-[#2c6fa0]">тазобедренного</em> сустава
      </h1>
      <p className="font-golos text-[#5a7a9a] text-base mt-3 max-w-lg mx-auto leading-relaxed">
        Комплекс упражнений для восстановления функции и укрепления периартикулярных мышц
      </p>

      <div className="mt-10 flex gap-10 justify-center">
        {[["8", "разделов"], ["12+", "упражнений"], ["6–8", "недель курса"]].map(([n, l]) => (
          <div key={l} className="flex flex-col items-center">
            <span className="font-cormorant text-4xl text-[#2c6fa0] font-semibold">{n}</span>
            <span className="font-golos text-[10px] text-[#7a9ab8] uppercase tracking-wider mt-1">{l}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AnatomySlide = () => (
  <div className="grid grid-cols-2 h-full">
    <div className="flex flex-col justify-center px-12 py-8">
      <h2 className="font-cormorant text-4xl text-[#1a3a5c] font-semibold mb-1">Анатомия тазобедренного сустава</h2>
      <p className="font-cormorant italic text-xl text-[#7a9ab8] mb-7">Articulatio coxae</p>
      <div className="space-y-4">
        {[
          { c: "#2c6fa0", label: "Тип сустава", val: "Шаровидный (энартроз) — 3 оси движения" },
          { c: "#7b52ab", label: "Суставные поверхности", val: "Головка бедра + вертлужная впадина" },
          { c: "#3d8a2a", label: "Хрящевое покрытие", val: "Гиалиновый хрящ 1,5–3 мм толщиной" },
          { c: "#c0522a", label: "Укрепляющий аппарат", val: "3 связки + капсула + периартикулярные мышцы" },
        ].map(i => (
          <div key={i.label} className="flex items-start gap-3">
            <div className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: i.c }} />
            <div>
              <span className="font-golos text-sm font-semibold text-[#1a3a5c]">{i.label}: </span>
              <span className="font-golos text-sm text-[#5a7a9a]">{i.val}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-[#f0f7fd] rounded-xl border border-[#c8dff0]">
        <p className="font-golos text-sm text-[#2c6fa0] font-semibold mb-2">Диапазон движений в норме</p>
        <div className="grid grid-cols-2 gap-y-1 gap-x-4">
          {[["Сгибание", "0–120°"], ["Разгибание", "0–15°"], ["Отведение", "0–45°"], ["Приведение", "0–30°"], ["Нар. ротация", "0–45°"], ["Внутр. ротация", "0–40°"]].map(([m, d]) => (
            <div key={m} className="flex justify-between">
              <span className="font-golos text-xs text-[#5a7a9a]">{m}</span>
              <span className="font-golos text-xs font-bold text-[#1a3a5c]">{d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="flex items-center justify-center bg-gradient-to-br from-[#eef6fc] to-[#d8edf8] p-8">
      <div className="w-full max-w-xs h-64">
        <HipJointSVG />
      </div>
    </div>
  </div>
);

const IndicationsSlide = () => (
  <div className="flex flex-col h-full px-12 py-8">
    <h2 className="font-cormorant text-4xl text-[#1a3a5c] font-semibold mb-1">Показания к лечебной гимнастике</h2>
    <p className="font-cormorant italic text-lg text-[#7a9ab8] mb-6">Назначается лечащим врачом</p>
    <div className="grid grid-cols-2 gap-4 flex-1">
      {[
        { icon: "Activity", title: "Дегенеративные заболевания", c: "#2c6fa0", bg: "#eef6fd", border: "#b8d9f0",
          items: ["Коксартроз I–II стадии", "Асептический некроз головки (ранние стадии)", "Хондромаляция суставного хряща"] },
        { icon: "Zap", title: "Последствия травм и операций", c: "#7b52ab", bg: "#f5f0fc", border: "#d4beee",
          items: ["Реабилитация после перелома шейки бедра", "После эндопротезирования (поздний период)", "Вывихи и подвывихи в анамнезе"] },
        { icon: "Heart", title: "Воспалительные состояния", c: "#3d8a2a", bg: "#f0f9ee", border: "#b8ddb2",
          items: ["Коксит в стадии ремиссии", "Ревматоидный артрит (вне обострения)", "Анкилозирующий спондилит"] },
        { icon: "Shield", title: "Профилактика и реабилитация", c: "#c0522a", bg: "#fdf4f0", border: "#f0c8b0",
          items: ["Снижение мышечного тонуса", "Гиподинамия и избыточный вес", "Профилактика падений у пожилых"] },
      ].map(card => (
        <div key={card.title} className="rounded-xl p-5 border-l-4 flex flex-col gap-2" style={{ backgroundColor: card.bg, borderLeftColor: card.c, borderTopColor: card.border, borderRightColor: card.border, borderBottomColor: card.border, borderWidth: '1px', borderLeftWidth: '4px' }}>
          <div className="flex items-center gap-2 mb-1">
            <Icon name={card.icon as IconName} size={16} style={{ color: card.c }} />
            <h3 className="font-golos font-semibold text-[#1a3a5c] text-sm">{card.title}</h3>
          </div>
          <ul className="space-y-1.5">
            {card.items.map(item => (
              <li key={item} className="font-golos text-xs text-[#4a6a8a] flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: card.c }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

const ExercisesSlide = () => (
  <div className="flex flex-col h-full px-12 py-8">
    <h2 className="font-cormorant text-4xl text-[#1a3a5c] font-semibold mb-5">Комплекс упражнений</h2>
    <div className="grid grid-cols-2 gap-4 flex-1">
      {[
        { num: "01", title: "Сгибание в т/б суставе", phase: "Начальный период", svg: "flex", reps: "10–12 повт.", sets: "2–3 подхода", note: "До 90°" },
        { num: "02", title: "Отведение ноги лёжа", phase: "Основной период", svg: "abduct", reps: "10–15 повт.", sets: "3 подхода", note: "30–45°" },
        { num: "03", title: "Ротация бедра", phase: "Основной период", svg: "rotate", reps: "8–10 повт.", sets: "2 подхода", note: "Медленно" },
        { num: "04", title: "Разгибание бедра", phase: "Усиленный период", svg: "extend", reps: "10–12 повт.", sets: "3 подхода", note: "Без рывков" },
      ].map(ex => (
        <div key={ex.num} className="rounded-xl border border-[#d0e8f5] bg-white shadow-sm flex gap-3 p-4">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-[#2c6fa0] flex items-center justify-center">
              <span className="font-golos text-xs font-bold text-white">{ex.num}</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-golos font-semibold text-[#1a3a5c] text-sm">{ex.title}</h3>
              <span className="flex-shrink-0 text-[10px] font-golos text-[#2c6fa0] bg-[#eef6fd] px-2 py-0.5 rounded-full whitespace-nowrap">{ex.phase}</span>
            </div>
            <div className="h-20 mb-2 bg-gradient-to-br from-[#eef6fd] to-[#d8edf8] rounded-lg overflow-hidden">
              <FigureSVG type={ex.svg} />
            </div>
            <div className="flex gap-3 text-xs font-golos text-[#5a7a9a]">
              <span>🔁 {ex.reps}</span>
              <span>📋 {ex.sets}</span>
              <span>📐 {ex.note}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TechniqueSlide = () => (
  <div className="grid grid-cols-2 h-full">
    <div className="flex flex-col justify-center px-12 py-8">
      <h2 className="font-cormorant text-4xl text-[#1a3a5c] font-semibold mb-6">Техника выполнения</h2>
      <div className="space-y-4">
        {[
          { s: "1", title: "Разминка", desc: "5–7 мин ходьбы, самомассаж бедра и ягодиц", icon: "Timer" },
          { s: "2", title: "Исходное положение", desc: "Лёжа на спине/боку, поясница прижата к полу", icon: "AlignCenter" },
          { s: "3", title: "Дыхание", desc: "Выдох на усилие, вдох при возврате в ИП", icon: "Wind" },
          { s: "4", title: "Амплитуда", desc: "Начинать с малой, увеличивать постепенно в безболевой зоне", icon: "TrendingUp" },
          { s: "5", title: "Заминка", desc: "Растяжка сгибателей и отводящих мышц, 20–30 сек", icon: "Smile" },
        ].map(item => (
          <div key={item.s} className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2c6fa0] text-white flex items-center justify-center font-golos font-bold text-sm">
              {item.s}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <Icon name={item.icon as IconName} size={14} className="text-[#4a9ed0]" />
                <span className="font-golos font-semibold text-[#1a3a5c] text-sm">{item.title}</span>
              </div>
              <p className="font-golos text-sm text-[#5a7a9a]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="bg-gradient-to-br from-[#eef6fc] to-[#d5e8f5] flex flex-col justify-center px-10 py-8 gap-3">
      <h3 className="font-golos font-semibold text-[#1a3a5c] text-sm mb-1">Ключевые принципы</h3>
      {[
        { c: "#2c6fa0", t: "Регулярность — не менее 5 раз в неделю" },
        { c: "#3d8a2a", t: "«Не навреди» — боль = стоп-сигнал" },
        { c: "#7b52ab", t: "Постепенность нагрузки (не более 10% в неделю)" },
        { c: "#c0522a", t: "Симметричность — работать с обеими ногами" },
        { c: "#2c6fa0", t: "Контроль дыхания на протяжении всей тренировки" },
      ].map((item, i) => (
        <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-3 shadow-sm">
          <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: item.c }} />
          <p className="font-golos text-sm text-[#1a3a5c]">{item.t}</p>
        </div>
      ))}
      <div className="mt-2 p-4 bg-white rounded-xl border border-red-100 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="AlertTriangle" size={15} className="text-red-500" />
          <span className="font-golos font-semibold text-red-600 text-sm">Прекратить при:</span>
        </div>
        {["Усилении болей в суставе", "Отёке или покраснении области", "Резком ограничении амплитуды"].map(w => (
          <p key={w} className="font-golos text-xs text-[#5a7a9a] flex items-center gap-2 mb-1">
            <span className="w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
            {w}
          </p>
        ))}
      </div>
    </div>
  </div>
);

const ContraindicationsSlide = () => (
  <div className="flex flex-col h-full px-12 py-8">
    <h2 className="font-cormorant text-4xl text-[#1a3a5c] font-semibold mb-1">Противопоказания</h2>
    <p className="font-cormorant italic text-lg text-[#7a9ab8] mb-6">Обязательна консультация специалиста</p>
    <div className="grid grid-cols-3 gap-4 flex-1">
      {[
        { type: "Абсолютные", c: "#b91c1c", bg: "#fef2f2", border: "#fecaca", icon: "XCircle",
          items: ["Острый период воспаления", "Острая травма (перелом, вывих)", "Онкологические поражения костей", "Тромбозы и тромбоэмболии", "Декомпенсированная ХСН", "Лихорадка выше 37,5°C"] },
        { type: "Относительные", c: "#b45309", bg: "#fffbeb", border: "#fde68a", icon: "AlertCircle",
          items: ["Коксартроз III стадии", "Ранний послеоперационный период", "Выраженный болевой синдром", "Нарушения ритма сердца", "Тяжёлая АГ III степени", "Остеопороз с риском перелома"] },
        { type: "Временные", c: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe", icon: "Clock",
          items: ["Острые ОРВИ и инфекции", "Обострение хронических болезней", "Выраженная усталость", "Приём антикоагулянтов (корректировать)", "Менструальный период (ограничить)", "Беременность (спец. программа)"] },
      ].map(card => (
        <div key={card.type} className="rounded-xl p-5 flex flex-col" style={{ backgroundColor: card.bg, border: `1px solid ${card.border}` }}>
          <div className="flex items-center gap-2 mb-4">
            <Icon name={card.icon as IconName} size={18} style={{ color: card.c }} />
            <h3 className="font-golos font-bold text-sm" style={{ color: card.c }}>{card.type}</h3>
          </div>
          <ul className="space-y-2 flex-1">
            {card.items.map((item, i) => (
              <li key={i} className="font-golos text-xs text-[#1a3a5c] flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: card.c }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

const ResultsSlide = () => (
  <div className="grid grid-cols-2 h-full">
    <div className="flex flex-col justify-center px-12 py-8">
      <h2 className="font-cormorant text-4xl text-[#1a3a5c] font-semibold mb-1">Ожидаемые результаты</h2>
      <p className="font-cormorant italic text-lg text-[#7a9ab8] mb-7">Курс регулярных занятий 6–8 недель</p>
      <div className="space-y-3">
        {[
          { period: "2–3 неделя", result: "Снижение болевого синдрома", icon: "TrendingDown", c: "#2c6fa0" },
          { period: "3–4 неделя", result: "Увеличение объёма движений", icon: "Move", c: "#3d8a2a" },
          { period: "4–6 неделя", result: "Укрепление периартикулярных мышц", icon: "Zap", c: "#7b52ab" },
          { period: "6–8 неделя", result: "Улучшение функционального статуса", icon: "Award", c: "#c0522a" },
        ].map(item => (
          <div key={item.period} className="flex items-center gap-4 p-3 rounded-xl bg-[#f0f7fd] border border-[#c8dff0]">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: item.c + "20" }}>
              <Icon name={item.icon as IconName} size={18} style={{ color: item.c }} />
            </div>
            <div>
              <span className="font-golos text-xs font-bold" style={{ color: item.c }}>{item.period}</span>
              <p className="font-golos text-sm text-[#1a3a5c] font-medium">{item.result}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="bg-gradient-to-br from-[#eef6fc] to-[#d5e8f5] flex flex-col justify-center px-10 py-8">
      <h3 className="font-golos font-semibold text-[#1a3a5c] text-sm mb-5">Количественные показатели</h3>
      <div className="space-y-4">
        {[
          { label: "Снижение боли (ВАШ)", before: "7–8 баллов", after: "2–3 балла", pct: 70 },
          { label: "Объём сгибания", before: "60–70°", after: "100–110°", pct: 80 },
          { label: "Сила мышц бедра", before: "3 балла", after: "4–5 баллов", pct: 85 },
        ].map(item => (
          <div key={item.label} className="bg-white rounded-xl p-4 shadow-sm">
            <p className="font-golos text-sm font-medium text-[#1a3a5c] mb-2">{item.label}</p>
            <div className="flex gap-2 items-center text-xs font-golos text-[#5a7a9a] mb-2">
              <span className="text-red-500 font-medium">До: {item.before}</span>
              <span>→</span>
              <span className="text-green-600 font-medium">После: {item.after}</span>
            </div>
            <div className="w-full h-2 bg-[#e8f0f8] rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-[#5aaae0] to-[#2c6fa0]" style={{ width: `${item.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ConclusionSlide = () => (
  <div className="flex flex-col h-full px-12 py-8">
    <h2 className="font-cormorant text-4xl text-[#1a3a5c] font-semibold mb-5">Заключение и рекомендации</h2>
    <div className="grid grid-cols-3 gap-4 flex-1">
      <div className="col-span-2 flex flex-col gap-4">
        <div className="p-5 rounded-xl bg-[#eef6fd] border border-[#c0d8ee] flex-1">
          <h3 className="font-golos font-semibold text-[#1a3a5c] text-sm mb-3">Общие рекомендации</h3>
          <ul className="space-y-2">
            {["Проводить занятия в одно и то же время, лучше утром", "Вести дневник боли и объёма движений", "Ортопедическая обувь и стельки при необходимости", "Нормализация массы тела (снижение нагрузки на сустав)", "Рациональное питание, богатое кальцием и коллагеном", "Избегать переохлаждения области сустава"].map((r, i) => (
              <li key={i} className="flex items-start gap-2 font-golos text-sm text-[#1a3a5c]">
                <Icon name="CheckCircle" size={14} className="text-[#2c6fa0] mt-0.5 flex-shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-5 rounded-xl bg-[#f0f9ee] border border-[#b0d8a8]">
          <h3 className="font-golos font-semibold text-[#1a3a5c] text-sm mb-3">Поддерживающий режим (после курса)</h3>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[{ icon: "Calendar", l: "3–4 раза", s: "в неделю" }, { icon: "Clock", l: "30–45 мин", s: "длительность" }, { icon: "RefreshCw", l: "Раз в 3 мес", s: "к врачу" }].map(item => (
              <div key={item.l} className="bg-white rounded-xl p-3 shadow-sm">
                <Icon name={item.icon as IconName} size={18} className="text-[#3d8a2a] mx-auto mb-1" />
                <p className="font-golos font-bold text-[#1a3a5c] text-sm">{item.l}</p>
                <p className="font-golos text-xs text-[#5a7a9a]">{item.s}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="p-5 rounded-xl bg-[#1a3a5c] text-white flex-1">
          <Icon name="BookOpen" size={20} className="text-[#8ab8d8] mb-3" />
          <h3 className="font-golos font-semibold text-sm mb-2">Эффективность ЛГ</h3>
          <p className="font-golos text-xs text-[#9ac0d8] leading-relaxed">Является основой консервативного лечения и доказала свою эффективность в многочисленных клинических исследованиях</p>
        </div>
        <div className="p-5 rounded-xl bg-gradient-to-br from-[#2c6fa0] to-[#1a4a78] text-white flex-1">
          <Icon name="Heart" size={20} className="text-[#8ab8d8] mb-3" />
          <h3 className="font-golos font-semibold text-sm mb-2">Помните</h3>
          <p className="font-golos text-xs text-[#a0c8e0] leading-relaxed">Успех реабилитации зависит от совместной работы пациента и специалиста. Только регулярность даёт устойчивый результат</p>
        </div>
      </div>
    </div>
  </div>
);

const components: Record<string, React.FC> = {
  cover: CoverSlide,
  anatomy: AnatomySlide,
  indications: IndicationsSlide,
  exercises: ExercisesSlide,
  technique: TechniqueSlide,
  contraindications: ContraindicationsSlide,
  results: ResultsSlide,
  conclusion: ConclusionSlide,
};

export default function Index() {
  const [cur, setCur] = useState(0);
  const slide = slides[cur];
  const Slide = components[slide.type];

  return (
    <div className="min-h-screen bg-[#ebf3fa] flex flex-col items-center justify-center p-4" style={{ fontFamily: "'Golos Text', sans-serif" }}>
      {/* Top bar */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#2c6fa0" strokeWidth="1.5"/>
            <path d="M12 5V19M5 12H19" stroke="#2c6fa0" strokeWidth="1.5"/>
            <circle cx="12" cy="12" r="4" fill="#d0e9f5" stroke="#2c6fa0" strokeWidth="1"/>
          </svg>
          <span className="text-[10px] text-[#7a9ab8] uppercase tracking-widest font-semibold">ЛГ · Тазобедренный сустав</span>
        </div>
        <span className="text-xs text-[#7a9ab8]">{cur + 1} / {slides.length}</span>
      </div>

      {/* Slide */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden" style={{ minHeight: 520 }}>
        <Slide />
      </div>

      {/* Dots navigation */}
      <div className="w-full max-w-5xl mt-4 flex items-center gap-3">
        <button
          onClick={() => setCur(c => Math.max(0, c - 1))}
          disabled={cur === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#c8dff0] bg-white text-[#1a3a5c] text-sm hover:bg-[#eef6fd] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <Icon name="ChevronLeft" size={16} /> Назад
        </button>

        <div className="flex-1 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCur(i)}
              className="rounded-full transition-all duration-300"
              style={{ height: 8, width: i === cur ? 28 : 8, backgroundColor: i === cur ? "#2c6fa0" : "#c8dff0" }}
            />
          ))}
        </div>

        <button
          onClick={() => setCur(c => Math.min(slides.length - 1, c + 1))}
          disabled={cur === slides.length - 1}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2c6fa0] text-white text-sm hover:bg-[#1a4a78] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          Далее <Icon name="ChevronRight" size={16} />
        </button>
      </div>

      {/* Section tabs */}
      <div className="w-full max-w-5xl mt-3 flex gap-1.5 flex-wrap justify-center">
        {slides.map((s, i) => (
          <button key={s.id} onClick={() => setCur(i)}
            className="px-3 py-1 rounded-lg text-xs transition-all"
            style={{
              backgroundColor: i === cur ? "#2c6fa0" : "white",
              color: i === cur ? "white" : "#5a7a9a",
              border: `1px solid ${i === cur ? "#2c6fa0" : "#c8dff0"}`
            }}
          >
            {s.section}
          </button>
        ))}
      </div>
    </div>
  );
}