import Icon from "@/components/ui/icon";

const covers = [
  { n: 1, title: "Ваш ресторан доживёт до 2027-го?" },
  { n: 2, title: "Точка безубыточности" },
  { n: 3, title: "Новый СанПиН вступил в силу" },
  { n: 4, title: "Почему ваш капучино стоит 400 рублей?" },
  { n: 5, title: "Шеф тиран" },
  { n: 6, title: "Первые секунды" },
  { n: 7, title: "Тренды убивают" },
];

export default function CoversDownload() {
  return (
    <div className="min-h-screen bg-[#0E0B09] text-white font-manrope p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-unbounded font-black text-2xl md:text-4xl uppercase mb-2">Обложки для рилсов</h1>
        <p className="text-white/60 mb-8">7 обложек 1080×1920. Нажми «Скачать» под каждой.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {covers.map((c) => {
            const src = `/covers/cover-${c.n}.jpg?v=2`;
            return (
              <div key={c.n} className="space-y-2">
                <img src={src} alt={c.title} className="w-full rounded-xl" />
                <p className="text-xs text-white/70 min-h-[2rem]">{c.title}</p>
                <a
                  href={src}
                  download={`cover-${c.n}.jpg`}
                  className="flex items-center justify-center gap-2 rounded-full bg-red-600 hover:bg-red-700 py-2 text-sm font-bold transition-colors"
                >
                  <Icon name="Download" size={16} />
                  Скачать {c.n}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
