import { useState } from "react";
import Icon from "@/components/ui/icon";

interface BuyModalProps {
  open: boolean;
  onClose: () => void;
}

// После получения ссылки на оплату от Tinkoff — вставить сюда
const TINKOFF_PAYMENT_URL = "https://www.tbank.ru/kassa/pay"; // заменить на реальную ссылку магазина

export default function BuyModal({ open, onClose }: BuyModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      localStorage.setItem("checklist_email", email);
      const params = new URLSearchParams({
        amount: "199900",
        description: "Пакет чек-листов для ресторатора (16 документов)",
        email: email,
      });
      window.location.href = `${TINKOFF_PAYMENT_URL}?${params.toString()}`;
    } catch {
      setError("Ошибка. Попробуйте ещё раз.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative glass-card rounded-2xl p-8 max-w-md w-full border border-[rgba(255,107,0,0.3)] animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <Icon name="X" size={20} />
        </button>

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-[rgba(255,107,0,0.15)] flex items-center justify-center mx-auto mb-5">
          <Icon name="Package" size={32} className="text-[#FF6B00]" />
        </div>

        <h2 className="text-2xl font-oswald font-bold text-white text-center mb-2 uppercase">
          Получить все 16 чек-листов
        </h2>
        <p className="text-gray-400 text-center text-sm mb-6">
          Введите email — мы пришлём все чек-листы сразу после оплаты
        </p>

        {/* What's included */}
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

        {/* Email input */}
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

        {/* Price + button */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-3xl font-oswald font-bold text-white">1 999 ₽</span>
            <span className="text-gray-500 line-through text-base ml-2">9 900 ₽</span>
          </div>
          <span className="bg-[#FF2D55] text-white text-sm font-bold px-3 py-1 rounded-lg">Скидка 80%</span>
        </div>

        <button
          onClick={handleBuy}
          disabled={loading}
          className="neon-btn w-full text-white font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-3 disabled:opacity-60"
        >
          {loading ? (
            <Icon name="Loader2" size={22} className="animate-spin" />
          ) : (
            <Icon name="CreditCard" size={22} />
          )}
          {loading ? "Перенаправляем..." : "Оплатить через Tinkoff"}
        </button>

        <p className="text-gray-600 text-xs text-center mt-3">
          Безопасная оплата картой. Чек-листы придут на почту в течение нескольких минут.
        </p>
      </div>
    </div>
  );
}