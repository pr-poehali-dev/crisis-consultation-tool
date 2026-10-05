const NUMBERS = Array.from({ length: 16 }, (_, i) => String(i + 1).padStart(2, "0"));

export default function ChecklistPreviews() {
  return (
    <div className="min-h-screen bg-[#1A120B] py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-10">
        <h1 className="text-white text-2xl font-bold text-center">Чек-листы: 16 картинок</h1>
        {NUMBERS.map((n) => (
          <div key={n}>
            <div className="text-[#FFA64D] font-bold mb-2">Чек-лист {n}</div>
            <img
              src={`/checklist-previews/checklist-${n}.png`}
              alt={`Чек-лист ${n}`}
              className="w-full rounded-xl border border-white/10"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
