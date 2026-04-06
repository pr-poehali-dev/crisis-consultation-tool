import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { sendLead } from "@/utils/sendLead";

interface ExitPopupProps {
  onClose?: () => void;
}

export default function ExitPopup({ onClose }: ExitPopupProps) {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("exit_popup_shown");
    if (alreadyShown) return;

    const timer = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem("exit_popup_shown", "1");
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setVisible(false);
    onClose?.();
  };

  const submit = async () => {
    if (!name.trim() || !contact.trim()) return;
    setLoading(true);
    try {
      await sendLead({ name, contact, source: "exit_popup" });
    } catch {
      // молча логируем, но всё равно показываем успех
    } finally {
      setSent(true);
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="glass-card rounded-2xl p-8 max-w-md w-full relative animate-fade-in border border-[rgba(255,107,0,0.3)]">
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <Icon name="X" size={20} />
        </button>

        {sent ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-[rgba(255,107,0,0.15)] flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={36} className="text-[#FF6B00]" />
            </div>
            <h3 className="text-xl font-oswald font-bold text-white mb-2">Отлично! Заявка принята</h3>
            <p className="text-gray-400 text-sm">Руслан свяжется с вами в ближайшее время</p>
            <button onClick={close} className="mt-6 text-gray-500 text-sm hover:text-white transition-colors">
              Закрыть
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="text-3xl mb-3">🎁</div>
              <h3 className="text-2xl font-oswald font-bold text-white mb-2">
                Подождите! Получите <span className="neon-text">бесплатную</span> диагностику
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Оставьте контакт — и Руслан лично разберёт главную проблему вашего заведения за 15 минут. Без оплаты.
              </p>
            </div>

            <div className="space-y-3 mb-4">
              <input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[rgba(255,107,0,0.5)] transition-colors"
              />
              <input
                type="text"
                placeholder="Телефон или Telegram"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[rgba(255,107,0,0.5)] transition-colors"
              />
            </div>

            <button
              onClick={submit}
              disabled={loading || !name.trim() || !contact.trim()}
              className="neon-btn w-full text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Icon name="Loader2" size={18} className="animate-spin" />
              ) : (
                <Icon name="Zap" size={18} />
              )}
              Получить бесплатную диагностику
            </button>

            <button onClick={close} className="w-full mt-3 text-gray-600 text-xs hover:text-gray-400 transition-colors">
              Нет, спасибо — мне не нужна прибыль
            </button>
          </>
        )}
      </div>
    </div>
  );
}