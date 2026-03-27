import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";
import CountdownTimer from "@/components/CountdownTimer";
import FloatingCTA from "@/components/FloatingCTA";
import GuaranteeSection from "@/components/GuaranteeSection";
import ExitPopup from "@/components/ExitPopup";
import AboutSection from "@/components/AboutSection";
import PainsSection from "@/components/PainsSection";
import CalculatorSection from "@/components/CalculatorSection";
import ServicesSection from "@/components/ServicesSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import CasesSection from "@/components/CasesSection";
import ReviewsSection from "@/components/ReviewsSection";
import ChecklistsSection from "@/components/ChecklistsSection";
import MarathonSection from "@/components/MarathonSection";
import TipsSection from "@/components/TipsSection";
import FaqSection from "@/components/FaqSection";
import CookieConsent from "@/components/CookieConsent";
import ActivityToast from "@/components/ActivityToast";
import BuyModal from "@/components/BuyModal";
import DiagnosticQuiz from "@/components/DiagnosticQuiz";
import ContactsSection from "@/components/ContactsSection";

const positionStyles: Record<string, string> = {
  "top-left": "-top-4 -left-6",
  "top-right": "top-10 -right-6",
  "bottom-left": "top-1/2 -left-6",
};

const CYCLE = 9;

function FloatingPain({ text, delay, position }: { text: string; delay: number; position: string }) {
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const cycle = CYCLE * 1000;
    const offset = delay * 1000;

    const tick = () => {
      setHidden(false);
      setVisible(false);
      const t1 = setTimeout(() => setVisible(true), offset % cycle);
      const t2 = setTimeout(() => setVisible(false), (offset % cycle) + 3500);
      const t3 = setTimeout(() => setHidden(true), (offset % cycle) + 4200);
      return [t1, t2, t3];
    };

    let timers = tick();
    const interval = setInterval(() => {
      timers.forEach(clearTimeout);
      timers = tick();
    }, cycle);

    return () => { timers.forEach(clearTimeout); clearInterval(interval); };
  }, [delay]);

  return (
    <div
      className={`absolute z-20 max-w-[185px] ${positionStyles[position]} transition-all duration-600 ${
        visible && !hidden ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-3 scale-95 pointer-events-none"
      }`}
    >
      <div className="bg-black/90 backdrop-blur-sm border border-[#FF6B00]/70 rounded-xl px-3 py-2.5 shadow-2xl">
        <p className="text-white text-xs font-bold leading-snug">{text}</p>
        <div className="absolute -bottom-1.5 left-4 w-2.5 h-2.5 bg-[#FF6B00] rounded-full animate-ping opacity-80" />
      </div>
    </div>
  );
}

export default function Restaurant() {
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const diagRef = useRef<HTMLElement>(null);

  const scrollToDiag = () => {
    diagRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Telegram channel banner */}
      <a
        href="https://t.me/Ruslan_Management"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium text-white transition-opacity hover:opacity-90"
        style={{ background: "#229ED9" }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white" className="flex-shrink-0">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
        <span>Мой Telegram-канал — <strong>Руслан Фатуллаев | Эксперт по ресторанам</strong></span>
        <span className="opacity-70">→</span>
      </a>

      <CountdownTimer />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2a1000] via-[#1a0800] to-[#0a0a0a]" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 80% 20%, #FF6B00 0%, transparent 70%)" }} />

        <div className="max-w-6xl mx-auto px-4 py-20 relative z-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

            {/* Левая колонка — текст */}
            <div>
              <h1 className="text-5xl md:text-7xl font-oswald font-black text-white uppercase leading-none mb-2">
                ЭКСПЕРТ И<br />
                <span className="text-[#FF6B00]">КОНСУЛЬТАНТ</span><br />
                В СФЕРЕ HORECA
              </h1>
              <h2 className="text-xl md:text-2xl font-oswald font-bold text-white uppercase mb-8">
                ДЛЯ РЕСТОРАНОВ, БАРОВ И КОФЕЕН
              </h2>

              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Найду скрытые потери, выстрою процессы и дам конкретный план — без воды и шаблонных советов
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button onClick={scrollToDiag} className="neon-btn text-white font-bold text-lg px-8 py-4 rounded-xl flex items-center gap-3">
                  <Icon name="ClipboardList" size={22} />
                  Бесплатная диагностика
                </button>
                <a href="#cases" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium px-2">
                  <Icon name="ChevronRight" size={16} />
                  Смотреть кейсы с цифрами
                </a>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "16+", label: "лет в индустрии" },
                  { value: "50+", label: "заведений прошли аудит" },
                  { value: "100+", label: "аудитов проведено" },
                  { value: "+30%", label: "средний рост прибыли" },
                ].map((stat) => (
                  <div key={stat.label} className="glass-card rounded-xl p-4">
                    <div className="text-2xl font-oswald font-bold text-[#FF6B00] mb-0.5">{stat.value}</div>
                    <div className="text-gray-500 text-xs leading-snug">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Правая колонка — фото */}
            <div className="flex justify-center md:justify-end">
              <div className="relative w-72 md:w-96">
                <div className="absolute -inset-3 rounded-3xl bg-[rgba(255,107,0,0.15)] blur-2xl" />
                <img
                  src="https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/bucket/ee99e909-4bd8-48c5-bcae-461615ec5bb0.jpg"
                  alt="Руслан Фатуллаев"
                  className="relative w-full rounded-3xl object-cover object-top shadow-2xl"
                  style={{ aspectRatio: "3/4" }}
                />
                <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-2xl p-3 text-center">
                  <div className="text-white font-oswald font-bold text-lg">Руслан Фатуллаев</div>
                  <div className="text-[#FF6B00] text-sm">Антикризисный управляющий · 16 лет опыта</div>
                </div>

                {/* Всплывающие фразы-боли */}
                <FloatingPain text="Твой зал снова пустой в пятницу?" delay={1.2} position="top-left" />
                <FloatingPain text="Ресторан работает, но денег нет?" delay={3.5} position="top-right" />
                <FloatingPain text="3 ошибки, которые убивают выручку кафе" delay={6.0} position="bottom-left" />
              </div>
            </div>

          </div>
        </div>
      </section>

      <PainsSection />
      <CalculatorSection />

      <DiagnosticQuiz diagRef={diagRef} />

      <HowWeWorkSection />
      <GuaranteeSection onDiagnosticClick={scrollToDiag} />
      <ServicesSection />

      <div id="cases">
        <CasesSection />
      </div>

      <ReviewsSection />
      <AboutSection />
      <ChecklistsSection onBuyClick={() => setBuyModalOpen(true)} />
      <MarathonSection />
      <TipsSection />
      <FaqSection />
      <ContactsSection />

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-600 text-sm">© 2024 Руслан Фатуллаев · Консультант для рестораторов</div>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="text-gray-600 hover:text-gray-400 text-sm transition-colors">Политика конфиденциальности</a>
          </div>
        </div>
      </footer>

      <FloatingCTA onClick={scrollToDiag} />
      <ActivityToast />
      <ExitPopup />
      <CookieConsent />
      <BuyModal open={buyModalOpen} onClose={() => setBuyModalOpen(false)} />
    </div>
  );
}