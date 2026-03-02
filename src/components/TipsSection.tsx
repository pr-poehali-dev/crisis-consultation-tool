import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Tip {
  image: string;
  tag: string;
  title: string;
  shortDesc: string;
  content: string[];
}

const TIPS: Tip[] = [
  {
    image: "https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/files/2b9d198c-1b0f-465b-a49c-90ac8a0f5dc2.jpg",
    tag: "Прибыль",
    title: "Как поднять средний чек без повышения цен",
    shortDesc: "Простые приёмы, которые работают уже в первую неделю.",
    content: [
      "**Обучите персонал технике допродаж.** Каждый официант должен знать, что предложить к основному блюду: напиток, закуску, десерт. Одна допродажа в каждом чеке — это +10–15% к выручке.",
      "**Пересмотрите структуру меню.** Разместите высокомаржинальные позиции на первой странице и выделите их визуально. Гость берёт то, что видит первым.",
      "**Введите «якорные» позиции.** Поставьте в меню дорогое блюдо — оно не будет продаваться само, но сделает соседние позиции привлекательнее по цене.",
      "**Создайте комбо и сеты.** Объедините позиции в выгодный набор — гость чувствует экономию, а вы продаёте больше за один заказ.",
      "**Тренируйте язык меню.** «Нежная телятина с трюфельным соусом» продаётся лучше, чем «телятина с соусом». Описания работают.",
    ],
  },
  {
    image: "https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/files/963bb37e-9983-4763-a947-58878ef4328e.jpg",
    tag: "Кофейня",
    title: "5 ошибок, которые убивают кофейню в первый год",
    shortDesc: "Разбираю самые частые провалы и как их избежать.",
    content: [
      "**Ошибка 1: Открытие без концепции.** «Просто кофейня» — это не концепция. Кто ваш гость? Чем вы отличаетесь от соседа? Без ответа на эти вопросы маркетинг не работает.",
      "**Ошибка 2: Экономия на баристе.** Новичок за стойкой убивает повторные визиты. Хороший бариста — это инвестиция, а не статья расходов.",
      "**Ошибка 3: Раздутое меню.** 40 позиций в кофейне — это хаос. Сфокусируйтесь на 12–15 позициях, но делайте их идеально.",
      "**Ошибка 4: Игнорирование себестоимости.** Многие не считают фудкост до открытия. В итоге продают в ноль или минус, не понимая почему.",
      "**Ошибка 5: Нет плана на первые 3 месяца.** Первые месяцы — самые сложные. Без финансовой подушки и плана действий большинство закрываются, так и не раскрутившись.",
    ],
  },
  {
    image: "https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/files/5555d946-2585-4404-9293-6b9c97d447bd.jpg",
    tag: "Команда",
    title: "Почему уходит персонал и как это остановить",
    shortDesc: "Текучка — это симптом. Разбираем причины и лечение.",
    content: [
      "**Причина 1: Нет ощущения роста.** Персонал уходит туда, где есть перспектива. Введите грейды, обучение, повышения — даже небольшие.",
      "**Причина 2: Токсичная атмосфера.** Крики, унижения, непоследовательные решения руководства — люди терпят до первого хорошего оффера.",
      "**Причина 3: Серые схемы оплаты.** Непрозрачные чаевые, задержки зарплаты, непонятные штрафы — всё это разрушает доверие.",
      "**Что реально работает:** Проводите короткие еженедельные разборы — что хорошо, что плохо. Слушайте команду. Хвалите публично, разбирайте ошибки приватно.",
      "**Бонус:** Введите систему наставничества — опытный сотрудник ведёт нового. Это снижает стресс при адаптации и формирует культуру передачи знаний.",
    ],
  },
  {
    image: "https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/files/32d3c2a6-195b-417a-a160-033e66b73fc5.jpg",
    tag: "Меню",
    title: "Меню-инжиниринг: как меню само продаёт",
    shortDesc: "Как расставить позиции, чтобы гость брал то, что выгодно вам.",
    content: [
      "**Матрица BCG для меню.** Каждое блюдо попадает в одну из 4 категорий: «звёзды» (популярные и маржинальные), «рабочие лошадки» (популярные, но низкомаржинальные), «загадки» (маржинальные, но непопулярные), «собаки» (убрать).",
      "**Визуальные зоны взгляда.** Правый верхний угол страницы меню — зона максимального внимания. Туда ставьте самое выгодное блюдо.",
      "**Эффект якоря.** Поставьте рядом дорогое и среднее блюдо — среднее начнут брать активнее, потому что оно выглядит «разумным» выбором.",
      "**Убирайте знаки рублей.** Исследования показывают: когда цена написана без «₽», гость меньше думает о деньгах и чаще выбирает дорогие позиции.",
      "**Обновляйте регулярно.** Меню, которое не менялось год — это потеря интереса постоянных гостей. Сезонные позиции держат внимание.",
    ],
  },
  {
    image: "https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/files/add62878-9ab6-4d25-8aa7-c90a8e27f122.jpg",
    tag: "Бар",
    title: "Как превратить бар из убыточного в прибыльный",
    shortDesc: "Разбираю ключевые рычаги, которые меняют ситуацию за 4–6 недель.",
    content: [
      "**Пересчитайте фудкост на каждый коктейль.** У большинства баров нет точного расчёта себестоимости напитков. Часто выясняется, что «хиты продаж» продаются в ноль.",
      "**Введите барное меню с историей.** Гость должен хотеть попробовать коктейль. Название, описание, история — всё это увеличивает продажи без скидок.",
      "**Контролируйте налив.** Без мерного стакана бармен может перелить на 20–30%. Это прямые потери. Стандартизируйте рецептуру.",
      "**Создайте «быстрые» позиции.** В час пик бармен не успевает — гость уходит. Введите 3–4 простых коктейля, которые готовятся за 30 секунд.",
      "**Работайте с сезонностью.** Летние коктейли, зимние глинтвейны, праздничные специальные предложения — это повод для гостя вернуться и попробовать новое.",
    ],
  },
];

export default function TipsSection() {
  const [selected, setSelected] = useState<Tip | null>(null);

  return (
    <>
      <div className="py-6 px-2 w-full">
        <p className="font-oswald text-2xl font-bold text-white uppercase tracking-wide mb-5 px-1">
          СОВЕТЫ ДЛЯ <span style={{ color: "#ff8c00" }}>БИЗНЕСА</span>
        </p>
        <div className="flex flex-col gap-3">
          {TIPS.map((tip, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden flex gap-4 cursor-pointer group transition-all duration-200 hover:scale-[1.02]"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,106,0,0.25)" }}
              onClick={() => setSelected(tip)}
            >
              <img
                src={tip.image}
                alt={tip.title}
                className="w-20 h-20 object-cover flex-shrink-0"
              />
              <div className="flex flex-col justify-center py-2 pr-4 gap-1">
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#ff6a00" }}>{tip.tag}</span>
                <p className="text-white text-sm font-semibold leading-tight line-clamp-2">{tip.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.8)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
            style={{ background: "#1a1a1a", border: "1px solid rgba(255,106,0,0.3)" }}
            onClick={e => e.stopPropagation()}
          >
            <div className="relative h-48 overflow-hidden rounded-t-2xl">
              <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,26,26,1) 0%, rgba(0,0,0,0.3) 100%)" }} />
              <div className="absolute bottom-0 left-0 px-7 pb-5">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2 inline-block" style={{ background: "#ff6a00", color: "#fff" }}>{selected.tag}</span>
                <h2 className="font-oswald text-2xl font-bold text-white uppercase leading-tight mt-1">{selected.title}</h2>
              </div>
              <button
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
                style={{ background: "rgba(0,0,0,0.5)" }}
                onClick={() => setSelected(null)}
              >
                <Icon name="X" size={16} />
              </button>
            </div>

            <div className="px-7 py-6 flex flex-col gap-4">
              {selected.content.map((para, i) => {
                const parts = para.split(/\*\*(.*?)\*\*/g);
                return (
                  <p key={i} className="text-gray-300 text-sm leading-relaxed">
                    {parts.map((part, j) =>
                      j % 2 === 1
                        ? <strong key={j} className="text-white">{part}</strong>
                        : part
                    )}
                  </p>
                );
              })}

              <div className="pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <p className="text-gray-500 text-xs">Хотите разобрать эту тему применительно к вашему заведению?</p>
                <p className="text-sm font-semibold mt-1" style={{ color: "#ff6a00" }}>Запишитесь на консультацию с Русланом →</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}