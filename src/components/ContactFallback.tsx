interface ContactFallbackProps {
  isError?: boolean;
}

export default function ContactFallback({ isError = false }: ContactFallbackProps) {
  return (
    <div className={`mt-5 border rounded-xl px-4 py-4 text-center ${isError ? "border-[rgba(255,107,0,0.4)] bg-[rgba(255,107,0,0.06)]" : "border-[rgba(255,255,255,0.08)]"}`}>
      {isError ? (
        <>
          <p className="text-white text-sm font-semibold mb-1">Не удалось отправить форму</p>
          <p className="text-gray-400 text-xs mb-3">Свяжитесь со мной напрямую — отвечу в любом мессенджере:</p>
        </>
      ) : (
        <>
          <p className="text-gray-500 text-xs mb-1">Если не получили ответ в течение 2 часов —</p>
          <p className="text-gray-300 text-sm mb-2">напишите напрямую:</p>
        </>
      )}

      <a
        href="tel:+79773908720"
        className="block text-[#FF6B00] font-bold text-lg hover:underline mb-3"
      >
        +7 977 390-87-20
      </a>

      <div className="flex items-center justify-center gap-3 flex-wrap">
        <a
          href="https://t.me/Roko_Tiis"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-[rgba(0,136,204,0.15)] border border-[rgba(0,136,204,0.3)] rounded-lg px-3 py-1.5 text-[#29b6f6] text-sm font-medium hover:bg-[rgba(0,136,204,0.25)] transition-colors"
        >
          <span>✈️</span> Telegram
        </a>
        <a
          href="https://wa.me/79773908720"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-[rgba(37,211,102,0.15)] border border-[rgba(37,211,102,0.3)] rounded-lg px-3 py-1.5 text-[#25d366] text-sm font-medium hover:bg-[rgba(37,211,102,0.25)] transition-colors"
        >
          <span>💬</span> WhatsApp
        </a>
      </div>
    </div>
  );
}