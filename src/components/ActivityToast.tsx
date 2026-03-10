import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const ACTIVITIES = [
  { name: "Алексей из Казани", action: "проходит диагностику прямо сейчас", icon: "ClipboardList", color: "text-blue-400" },
  { name: "Марина, Москва", action: "записалась на марафон", icon: "Zap", color: "text-amber-400" },
  { name: "Дмитрий из Екатеринбурга", action: "скачал чек-листы", icon: "Download", color: "text-green-400" },
  { name: "Ольга, Краснодар", action: "запросила консультацию", icon: "MessageCircle", color: "text-purple-400" },
  { name: "Сергей из Новосибирска", action: "проходит диагностику прямо сейчас", icon: "ClipboardList", color: "text-blue-400" },
  { name: "Ирина, Уфа", action: "записалась на марафон", icon: "Zap", color: "text-amber-400" },
  { name: "Андрей из Тюмени", action: "изучает кейсы", icon: "Star", color: "text-pink-400" },
  { name: "Наталья, СПб", action: "скачала чек-листы", icon: "Download", color: "text-green-400" },
  { name: "Роман из Ростова", action: "проходит диагностику прямо сейчас", icon: "ClipboardList", color: "text-blue-400" },
  { name: "Виктория, Самара", action: "запросила консультацию", icon: "MessageCircle", color: "text-purple-400" },
  { name: "Павел из Перми", action: "записался на марафон", icon: "Zap", color: "text-amber-400" },
  { name: "Елена, Воронеж", action: "изучает кейсы", icon: "Star", color: "text-pink-400" },
];

function getRandomDelay() {
  return 8000 + Math.random() * 12000;
}

export default function ActivityToast() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [showing, setShowing] = useState(false);

  useEffect(() => {
    let showTimer: ReturnType<typeof setTimeout>;
    let hideTimer: ReturnType<typeof setTimeout>;

    const cycle = (index: number) => {
      const delay = getRandomDelay();
      showTimer = setTimeout(() => {
        setCurrent(index % ACTIVITIES.length);
        setShowing(true);
        setVisible(true);
        hideTimer = setTimeout(() => {
          setShowing(false);
          setTimeout(() => setVisible(false), 400);
          cycle(index + 1);
        }, 4000);
      }, delay);
    };

    const initial = setTimeout(() => cycle(0), 3000);

    return () => {
      clearTimeout(initial);
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  const item = ACTIVITIES[current];

  return (
    <div
      className={`fixed bottom-6 left-4 z-50 transition-all duration-400 ${
        showing ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="flex items-center gap-3 bg-[#1a1a1a] border border-white/10 rounded-2xl px-4 py-3 shadow-2xl max-w-xs">
        <div className={`w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 ${item.color}`}>
          <Icon name={item.icon} size={16} />
        </div>
        <div>
          <div className="text-white text-sm font-medium leading-tight">{item.name}</div>
          <div className="text-gray-400 text-xs mt-0.5">{item.action}</div>
        </div>
        <div className="flex-shrink-0 ml-1">
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse" />
        </div>
      </div>
    </div>
  );
}
