import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

function getDeadline() {
  const key = "countdown_deadline";
  const stored = localStorage.getItem(key);
  if (stored) {
    const ts = parseInt(stored, 10);
    if (ts > Date.now()) return ts;
  }
  const deadline = Date.now() + 24 * 60 * 60 * 1000;
  localStorage.setItem(key, String(deadline));
  return deadline;
}

export default function CountdownTimer() {
  const [deadline] = useState(getDeadline);
  const [timeLeft, setTimeLeft] = useState(deadline - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(Math.max(0, deadline - Date.now()));
    }, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="w-full bg-gradient-to-r from-[#1a0a00] to-[#0d0d0d] border-b border-[rgba(255,107,0,0.3)] py-2.5 px-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
        <div className="flex items-center gap-2">
          <Icon name="Zap" size={16} className="text-[#FF6B00]" />
          <span className="text-white text-sm font-medium">
            Цена <span className="text-[#FF6B00] font-bold">1 499 ₽</span> действует только:
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {[
            { value: pad(hours), label: "ч" },
            { value: pad(minutes), label: "мин" },
            { value: pad(seconds), label: "сек" },
          ].map((unit, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="bg-[#FF6B00] text-white font-oswald font-bold text-lg px-2.5 py-0.5 rounded-lg min-w-[44px] text-center tabular-nums">
                {unit.value}
              </div>
              <span className="text-gray-400 text-xs">{unit.label}</span>
              {i < 2 && <span className="text-[#FF6B00] font-bold text-lg">:</span>}
            </div>
          ))}
        </div>
        <span className="text-gray-500 text-xs">Потом цена вырастет до 9 900 ₽</span>
      </div>
    </div>
  );
}
