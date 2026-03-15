import { useState } from "react";
import Icon from "@/components/ui/icon";

interface BuyModalProps {
  open: boolean;
  onClose: () => void;
}

const TG_BUY_URL = "https://functions.poehali.dev/dfce89ef-d515-41f3-ba64-9917db793829";

type Step = "email" | "card" | "done";

export default function BuyModal({ open, onClose }: BuyModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<Step>("email");
  const [cardInfo, setCardInfo] = useState({ card: "", card_name: "", amount: "", order_id: "" });

  if (!open) return null;

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleBuy = async () => {
    if (!isValid) {
      setError("Введите корректный email");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch(TG_BUY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.ok) {
        setCardInfo({
          card: data.card,
          card_name: data.card_name,
          amount: data.amount,
          order_id: String(data.order_id),
        });
        setStep("card");
      } else {
        setError("Ошибка. Попробуйте ещё раз.");
      }
    } catch {
      setError("Ошибка соединения. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep("email");
    setEmail("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={handleClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative glass-card rounded-2xl p-8 max-w-md w-full border border-[rgba(255,107,0,0.3)] animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <Icon name="X" size={20} />
        </button>

        {step === "email" && (
          <>
            <div className="w-16 h-16 rounded-2xl bg-[rgba(255,107,0,0.15)] flex items-center justify-center mx-auto mb-5">
              <Icon name="Package" size={32} className="text-[#FF6B00]" />
            </div>
            <h2 className="text-2xl font-oswald font-bold text-white text-center mb-2 uppercase">
              Получить все 16 чек-листов
            </h2>
            <p className="text-gray-400 text-center text-sm mb-6">
              Введите email — мы пришлём все чек-листы сразу после оплаты
            </p>
            <div className="bg-[rgba(255,255,255,0.03)] rounded-xl p-4 mb-6 space-y-2">
              {[
                "16 профессиональных чек-листов",
                "Готовые таблицы с формулами",
                "Скрипты, регламенты и шаблоны",
                "Мгновенная доставка на email",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Icon name="Check" size={16} className="text-[#FF6B00] flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div className="mb-4">
              <label className="text-gray-400 text-sm mb-2 block">Ваш email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="example@mail.ru"
                className="w-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.12)] rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-[#FF6B00] transition-colors"
              />
              {error && <p className="text-[#FF2D55] text-sm mt-1">{error}</p>}
            </div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-3xl font-oswald font-bold text-white">999 ₽</span>
                <span className="text-gray-500 line-through text-base ml-2">9 900 ₽</span>
              </div>
              <span className="bg-[#FF2D55] text-white text-sm font-bold px-3 py-1 rounded-lg">Акция</span>
            </div>
            <button
              onClick={handleBuy}
              disabled={loading}
              className="neon-btn w-full text-white font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-3 disabled:opacity-60"
            >
              {loading ? (
                <Icon name="Loader2" size={22} className="animate-spin" />
              ) : (
                <Icon name="Send" size={22} />
              )}
              {loading ? "Отправляем..." : "Получить реквизиты для оплаты"}
            </button>
            <p className="text-gray-600 text-xs text-center mt-3">
              Реквизиты придут на следующем шаге. Чек-листы — сразу после оплаты.
            </p>
          </>
        )}

        {step === "card" && (
          <>
            <div className="w-16 h-16 rounded-2xl bg-[rgba(255,107,0,0.15)] flex items-center justify-center mx-auto mb-5">
              <Icon name="CreditCard" size={32} className="text-[#FF6B00]" />
            </div>
            <h2 className="text-2xl font-oswald font-bold text-white text-center mb-2 uppercase">
              Переведите оплату
            </h2>
            <p className="text-gray-400 text-center text-sm mb-6">
              Переведите <strong className="text-white">{cardInfo.amount}</strong> на карту ниже
            </p>

            <div className="bg-[rgba(255,107,0,0.08)] border border-[rgba(255,107,0,0.3)] rounded-xl p-5 mb-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Карта</span>
                <span className="text-white font-bold text-lg tracking-widest">{cardInfo.card}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Получатель</span>
                <span className="text-white font-medium">{cardInfo.card_name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Сумма</span>
                <span className="text-[#FF6B00] font-bold text-xl">{cardInfo.amount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Заказ №</span>
                <span className="text-gray-300 text-sm">{cardInfo.order_id}</span>
              </div>
            </div>

            <div className="bg-[rgba(255,255,255,0.03)] rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={16} className="text-[#FF6B00] flex-shrink-0 mt-0.5" />
                <p className="text-gray-400 text-sm">
                  После перевода Руслан получит уведомление и отправит чек-листы на <strong className="text-white">{email}</strong> в течение нескольких минут.
                </p>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full border border-[rgba(255,255,255,0.15)] text-gray-300 hover:text-white hover:border-white py-3 rounded-xl transition-colors text-sm"
            >
              Закрыть — жду чек-листы на почту
            </button>
          </>
        )}
      </div>
    </div>
  );
}