import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface FloatingCTAProps {
  onClick: () => void;
}

export default function FloatingCTA({ onClick }: FloatingCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0 pointer-events-none"
      }`}
      style={{ display: visible ? "block" : "none" }}
    >
      <div className="bg-[#0f0500]/95 backdrop-blur-md border-t border-[#FF6B00]/30 px-4 py-3">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FF6B00]/15 border border-[#FF6B00]/30 flex items-center justify-center flex-shrink-0">
              <Icon name="TrendingDown" size={16} className="text-[#FF6B00]" />
            </div>
            <p className="text-gray-300 text-sm">
              <span className="text-white font-semibold">Посчитай свои потери →</span>
              {" "}Узнай, сколько уходит из твоей кассы прямо сейчас
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="#calculator"
              className="neon-btn text-white font-bold text-sm px-5 py-2.5 rounded-xl flex items-center gap-2 whitespace-nowrap"
            >
              <Icon name="Calculator" size={16} />
              Посчитать бесплатно
            </a>
            <button
              onClick={onClick}
              className="text-gray-500 hover:text-white text-xs underline whitespace-nowrap transition-colors"
            >
              Записаться
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
