import { useState, useRef } from "react";
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

const NOTIFY_URL = "https://functions.poehali.dev/c328fb70-3615-4b46-8463-95a676ea3214";

export default function Restaurant() {
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [diagName, setDiagName] = useState("");
  const [diagContact, setDiagContact] = useState("");
  const [diagLoading, setDiagLoading] = useState(false);
  const [diagSent, setDiagSent] = useState(false);
  const diagRef = useRef<HTMLElement>(null);

  const scrollToDiag = () => {
    diagRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const submitDiag = async () => {
    if (!diagName.trim() || !diagContact.trim()) return;
    setDiagLoading(true);
    try {
      await fetch(NOTIFY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: diagName, contact: diagContact, source: "hero_form" }),
      });
      setDiagSent(true);
    } catch (_e) {
      setDiagLoading(false);
    } finally {
      setDiagLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
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
                <span className="text-[#FF6B00]">КОНСУЛЬТАНТ</span>
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
                  src="https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/bucket/6162d9bf-e57b-4fca-b056-b7d25680bfcb.jpg"
                  alt="Руслан Фатуллаев"
                  className="relative w-full rounded-3xl object-cover object-top shadow-2xl"
                  style={{ aspectRatio: "3/4" }}
                />
                <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-2xl p-3 text-center">
                  <div className="text-white font-oswald font-bold text-lg">Руслан Фатуллаев</div>
                  <div className="text-[#FF6B00] text-sm">Ресторанный консультант · 16 лет опыта</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <PainsSection />
      <CalculatorSection />

      {/* Diagnostic form */}
      <section ref={diagRef} id="diagnostics" className="py-16 px-4 bg-[#0d0d0d]">
        <div className="max-w-xl mx-auto">
          <div className="glass-card rounded-2xl p-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[rgba(255,107,0,0.15)] flex items-center justify-center mx-auto mb-4">
              <Icon name="ClipboardList" size={28} className="text-[#FF6B00]" />
            </div>
            <h2 className="text-2xl font-oswald font-bold text-white mb-2 uppercase">Бесплатная диагностика</h2>
            <p className="text-gray-400 text-sm mb-6">
              Оставьте контакт — Руслан лично разберёт главную проблему вашего заведения за 15 минут
            </p>

            {diagSent ? (
              <div className="py-4">
                <div className="w-12 h-12 rounded-full bg-[rgba(255,107,0,0.15)] flex items-center justify-center mx-auto mb-3">
                  <Icon name="CheckCircle" size={28} className="text-[#FF6B00]" />
                </div>
                <p className="text-white font-semibold">Заявка принята!</p>
                <p className="text-gray-400 text-sm mt-1">Руслан свяжется с вами в ближайшее время</p>
              </div>
            ) : (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={diagName}
                  onChange={(e) => setDiagName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[rgba(255,107,0,0.5)] transition-colors"
                />
                <input
                  type="text"
                  placeholder="Телефон или Telegram"
                  value={diagContact}
                  onChange={(e) => setDiagContact(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[rgba(255,107,0,0.5)] transition-colors"
                />
                <button
                  onClick={submitDiag}
                  disabled={diagLoading || !diagName.trim() || !diagContact.trim()}
                  className="neon-btn w-full text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {diagLoading ? (
                    <Icon name="Loader2" size={18} className="animate-spin" />
                  ) : (
                    <Icon name="Zap" size={18} />
                  )}
                  Записаться на диагностику
                </button>
                <p className="text-gray-600 text-xs">Бесплатно · Без обязательств · Ответ в течение часа</p>
              </div>
            )}
          </div>
        </div>
      </section>

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