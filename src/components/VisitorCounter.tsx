import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const COUNTER_URL = "https://functions.poehali.dev/466a7ae9-ffcb-4019-87a3-51ac4a629d27";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Регистрируем визит
    fetch(COUNTER_URL, { method: "POST" }).catch(() => {});

    // Получаем актуальное значение
    fetch(COUNTER_URL)
      .then((r) => r.json())
      .then((data) => {
        setCount(data.count);
        setTimeout(() => setAnimate(true), 300);
      })
      .catch(() => setCount(null));
  }, []);

  if (count === null) return null;

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-1.5">
      <div
        className={`bg-[#0a0a0a]/90 border border-[#FF6B00]/40 rounded-2xl px-3 py-4 flex flex-col items-center gap-1 shadow-2xl backdrop-blur-md transition-all duration-700 ${
          animate ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
        }`}
        style={{ boxShadow: "0 0 24px rgba(255,107,0,0.15)" }}
      >
        <Icon name="Users" size={16} className="text-[#FF6B00]" />
        <span
          className="text-white font-black leading-none"
          style={{ fontSize: "2rem", fontFamily: "Oswald, sans-serif" }}
        >
          {count.toLocaleString("ru-RU")}
        </span>
        <span className="text-[10px] text-gray-400 text-center leading-tight max-w-[60px]">
          сегодня на сайте
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse mt-0.5" />
      </div>
    </div>
  );
}
