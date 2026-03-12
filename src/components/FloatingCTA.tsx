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
      className={`fixed bottom-6 right-4 z-40 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      <button
        onClick={onClick}
        className="neon-btn text-white font-bold text-sm px-5 py-3.5 rounded-2xl flex items-center gap-2.5 shadow-2xl"
      >
        <Icon name="MessageCircle" size={20} />
        <span className="hidden sm:inline">Записаться на диагностику</span>
        <span className="sm:hidden">Записаться</span>
      </button>
    </div>
  );
}
