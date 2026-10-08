import { useState } from "react";
import Icon from "@/components/ui/icon";

const slides = [1, 2, 3, 4, 5, 6].map((n) => `/carousel/slide-${n}.png`);

const caption = `С 1 октября 2026 года для ресторанов изменилось сразу несколько правил. Если пропустить, можно получить штраф или потерять позиции в меню доставки.

Что нужно знать:
— обязательная маркировка колбасных изделий
— коды ОКПД2 для каждой позиции в Яндекс Еде
— переход на ТС ПиОТ при проверке кодов
— закон 289-ФЗ о платформенной экономике

Листайте карусель, внутри чек-лист, что сделать прямо сейчас. Сохраните пост, чтобы не потерять.

Хотите, чтобы я проверил ваше заведение? Переходите на сайт по ссылке в шапке профиля и записывайтесь на консультацию. Или напишите мне в директ слово «ПРОВЕРКА».

#рестораны #общепит #ресторанныйбизнес #маркировка #яндекседа #честныйзнак #тспиот #ресторатор #кафе #открытиересторана`;

export default function CarouselDownload() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0E0B09] text-white font-manrope p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <a href="/" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-6">
          <Icon name="ArrowLeft" size={16} />
          На главную
        </a>
        <h1 className="font-unbounded font-black text-2xl md:text-4xl uppercase mb-2">Карусель для Instagram</h1>
        <p className="text-white/60 mb-8">6 слайдов 1080×1350. Нажми на «Скачать» под каждым или сохрани картинку долгим нажатием.</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {slides.map((src, i) => (
            <div key={src} className="space-y-2">
              <img src={src} alt={`Слайд ${i + 1}`} className="w-full rounded-xl" />
              <a
                href={src}
                download={`slide-${i + 1}.png`}
                className="flex items-center justify-center gap-2 rounded-full bg-red-600 hover:bg-red-700 py-2 text-sm font-bold transition-colors"
              >
                <Icon name="Download" size={16} />
                Скачать {i + 1}
              </a>
            </div>
          ))}
        </div>

        <h2 className="font-unbounded font-bold text-lg mb-3">Подпись к посту</h2>
        <pre className="whitespace-pre-wrap font-manrope text-sm bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">{caption}</pre>
        <button
          onClick={copy}
          className="inline-flex items-center gap-2 rounded-full bg-red-600 hover:bg-red-700 px-6 py-3 font-bold transition-colors"
        >
          <Icon name={copied ? "Check" : "Copy"} size={18} />
          {copied ? "Скопировано" : "Скопировать подпись"}
        </button>
      </div>
    </div>
  );
}
