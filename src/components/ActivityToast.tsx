import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const MESSAGES = [
  { text: "Сейчас 3 человека проходят диагностику", icon: "ClipboardList", color: "text-blue-400" },
  { text: "2 ресторатора записались на марафон сегодня", icon: "Zap", color: "text-amber-400" },
  { text: "5 человек изучают кейсы прямо сейчас", icon: "Star", color: "text-pink-400" },
  { text: "Сейчас 4 человека проходят диагностику", icon: "ClipboardList", color: "text-blue-400" },
  { text: "1 ресторатор записался на марафон только что", icon: "Zap", color: "text-amber-400" },
  { text: "7 человек на сайте прямо сейчас", icon: "Users", color: "text-green-400" },
];

export default function ActivityToast() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [showing, setShowing] = useState(false);

  useEffect(() => {
    let showTimer: ReturnType<typeof setTimeout>;
    let hideTimer: ReturnType<typeof setTimeout>;

    const cycle = (index: number) => {
      const delay = 10000 + Math.random() * 15000;
      showTimer = setTimeout(() => {
        setCurrent(index % MESSAGES.length);
        setShowing(true);
        setVisible(true);
        hideTimer = setTimeout(() => {
          setShowing(false);
          setTimeout(() => setVisible(false), 400);
          cycle(index + 1);
        }, 4000);
      }, delay);
    };

    const initial = setTimeout(() => cycle(0), 5000);

    return () => {
      clearTimeout(initial);
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  const item = MESSAGES[current];

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
        <div className="text-white text-sm leading-tight">{item.text}</div>
        <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse flex-shrink-0" />
      </div>
    </div>
  );
}
