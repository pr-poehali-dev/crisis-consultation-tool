import { useState } from "react";
import Icon from "@/components/ui/icon";

const slides = [1, 2, 3, 4, 5].map((n) => `/carousel3/slide-${n}.png`);

const caption = `Гостей вроде хватает, выручка есть, а денег всё равно нет? Скорее всего, они утекают там, где вы не смотрите.

Аудит заведения — это не мнение со стороны, а разбор по цифрам: касса, меню, закупки, отзывы, команда.

В карусели разобрал:
— четыре вопроса, на которые отвечает аудит
— шесть этапов: от диагностики до ответственных
— что вы получите на выходе: приоритетные шаги, цели по выручке и прибыли, план внедрения со сроками

Сохраните пост, чтобы не потерять.

Хотите такой аудит для своего заведения? Напишите мне в директ слово «АУДИТ». Задам несколько вопросов и скажу, с чего начнём. Или переходите на сайт по ссылке в шапке профиля и записывайтесь на консультацию.

16 лет в индустрии. Без теории, из практики.

#аудитресторана #аудитзаведения #ресторанныйбизнес #общепит #фудкост #рестораны #кафе #ресторатор #консалтингобщепит #прибыльресторана`;

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
        <h1 className="font-unbounded font-black text-2xl md:text-4xl uppercase mb-2">Карусель: аудит заведения</h1>
        <p className="text-white/60 mb-8">5 слайдов 1080×1350. Нажми на «Скачать» под каждым или сохрани картинку долгим нажатием.</p>

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
