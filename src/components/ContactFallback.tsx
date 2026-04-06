export default function ContactFallback() {
  return (
    <div className="mt-5 border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3 text-center">
      <p className="text-gray-500 text-xs mb-1">Если не получили ответ в течение 2 часов —</p>
      <p className="text-gray-300 text-sm">напишите напрямую в любой мессенджер:</p>
      <a
        href="https://wa.me/79773908720"
        className="inline-block mt-2 text-[#FF6B00] font-semibold text-base hover:underline"
      >
        +7 977 390-87-20
      </a>
    </div>
  );
}
