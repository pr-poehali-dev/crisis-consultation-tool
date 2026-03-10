import { useState } from "react";
import Icon from "@/components/ui/icon";

const CASES = [
  {
    city: "Казань",
    type: "Кофейня, 12 мест",
    title: "Средний чек вырос на 34% за 6 недель",
    problem: "Гости брали только кофе и уходили. Никакого допродажи, никаких десертов.",
    solution: "Перестроили меню по методу инженерии: убрали 8 убыточных позиций, добавили 3 «магнитных» комбо. Обучили бариста одной фразе для допродажи.",
    result: "Средний чек: 320 → 430 ₽. Выручка за месяц выросла на 89 000 ₽ без привлечения новых гостей.",
    metrics: [
      { label: "Средний чек", before: "320 ₽", after: "430 ₽" },
      { label: "Выручка/мес", before: "264 000 ₽", after: "353 000 ₽" },
    ],
    weeks: 6,
    icon: "Coffee",
    color: "from-amber-900/40 to-amber-800/20",
    accent: "text-amber-400",
  },
  {
    city: "Москва",
    type: "Ресторан, 60 мест",
    title: "Остановили отток гостей и сократили персонал на 20%",
    problem: "Заполненность зала упала с 70% до 40% за полгода. Текучка персонала — каждые 2 месяца новые люди.",
    solution: "Провёл полный аудит: нашли 3 точки утечки выручки. Ввели систему KPI для официантов, убрали 2 дублирующие должности, прописали стандарты сервиса.",
    result: "Через 2 месяца заполненность вернулась к 65%. ФОТ сократился на 42 000 ₽/мес.",
    metrics: [
      { label: "Заполненность", before: "40%", after: "65%" },
      { label: "Экономия ФОТ", before: "—", after: "−42 000 ₽/мес" },
    ],
    weeks: 8,
    icon: "Utensils",
    color: "from-blue-900/40 to-blue-800/20",
    accent: "text-blue-400",
  },
  {
    city: "Екатеринбург",
    type: "Бар, 40 мест",
    title: "Бар стал прибыльным после 1,5 лет убытков",
    problem: "Владелец вкладывал деньги каждый месяц. Выручка была, но прибыли — ноль. Не понимал куда уходят деньги.",
    solution: "Внедрили складской учёт, нашли недостачу 18% по алкоголю. Пересчитали себестоимость коктейлей, подняли цены на 12% и изменили барную карту.",
    result: "Первая чистая прибыль — 67 000 ₽ в третий месяц после аудита. Недостача снизилась до 3%.",
    metrics: [
      { label: "Недостача", before: "18%", after: "3%" },
      { label: "Прибыль/мес", before: "−35 000 ₽", after: "+67 000 ₽" },
    ],
    weeks: 10,
    icon: "Wine",
    color: "from-purple-900/40 to-purple-800/20",
    accent: "text-purple-400",
  },
  {
    city: "Санкт-Петербург",
    type: "Кафе, 35 мест",
    title: "Открылись без долгов и вышли в плюс на 2-й месяц",
    problem: "Запускали кафе впервые. Не понимали сколько нужно денег, боялись ошибиться с концепцией и меню.",
    solution: "Разработал финансовую модель с нуля: точка безубыточности, план меню, нормы закупок, штатное расписание. Открытие прошло строго по плану.",
    result: "Открылись в бюджет 1,8 млн ₽. На 2-й месяц — первая прибыль 43 000 ₽. Сейчас работают 1,5 года.",
    metrics: [
      { label: "Бюджет открытия", before: "план: 2,1 млн", after: "факт: 1,8 млн" },
      { label: "Выход в плюс", before: "прогноз: 4 мес", after: "факт: 2 мес" },
    ],
    weeks: 12,
    icon: "Store",
    color: "from-green-900/40 to-green-800/20",
    accent: "text-green-400",
  },
  {
    city: "Новосибирск",
    type: "Столовая при офисе, 50 мест",
    title: "Сократили себестоимость питания на 23%",
    problem: "Закупки шли через одного поставщика, цены росли каждый квартал. Себестоимость обеда достигла 68%.",
    solution: "Провёл ABC-анализ меню, нашёл 12 позиций с нулевой маржой. Подключили 3 новых поставщика, провели тендер. Убрали 4 блюда из меню.",
    result: "Себестоимость снизилась с 68% до 45%. Экономия на закупках — 156 000 ₽ за первые 3 месяца.",
    metrics: [
      { label: "Себестоимость", before: "68%", after: "45%" },
      { label: "Экономия/3 мес", before: "—", after: "156 000 ₽" },
    ],
    weeks: 5,
    icon: "ChefHat",
    color: "from-orange-900/40 to-orange-800/20",
    accent: "text-orange-400",
  },
  {
    city: "Краснодар",
    type: "Пиццерия, 2 точки",
    title: "Масштабировали бизнес без потери качества",
    problem: "Хотели открыть вторую точку, но первая работала на интуиции владельца — без регламентов и стандартов.",
    solution: "Описали все процессы первой точки: рецептуры, стандарты выдачи, регламенты работы кухни. Создали операционный учебник. Открыли вторую точку по нему.",
    result: "Вторая точка вышла в ноль за 6 недель. Владелец теперь не присутствует на точках каждый день.",
    metrics: [
      { label: "Выход в ноль", before: "прогноз: 3 мес", after: "факт: 6 недель" },
      { label: "Время владельца", before: "12 ч/день", after: "3 ч/день" },
    ],
    weeks: 14,
    icon: "Pizza",
    color: "from-red-900/40 to-red-800/20",
    accent: "text-red-400",
  },
  {
    city: "Уфа",
    type: "Суши-бар, 25 мест",
    title: "Вернули 40% потерянных постоянных гостей",
    problem: "Гости перестали ходить, хотя жалоб не было. Владелец не понимал причину. Выручка падала 4 месяца подряд.",
    solution: "Провели тайного гостя, выявили 6 системных проблем в сервисе. Ввели чек-листы для официантов, внедрили программу лояльности через WhatsApp.",
    result: "Через 7 недель количество повторных визитов выросло на 40%. Выручка вернулась к уровню годичной давности.",
    metrics: [
      { label: "Повторные визиты", before: "−40%", after: "+40% (возврат)" },
      { label: "Выручка", before: "падение 4 мес", after: "рост 7 нед" },
    ],
    weeks: 7,
    icon: "Star",
    color: "from-pink-900/40 to-pink-800/20",
    accent: "text-pink-400",
  },
  {
    city: "Тюмень",
    type: "Ресторан, 80 мест",
    title: "Увеличили оборачиваемость столов на 25%",
    problem: "В пятницу и субботу — очереди и недовольные гости. В будни — пустой зал. Выручка не росла несмотря на спрос.",
    solution: "Переработали планировку зала, ввели тайминг сервиса (45 мин на стол в пик), запустили бизнес-ланч по будням с новым меню.",
    result: "Оборачиваемость выросла с 1,8 до 2,3 раза за вечер. Выручка по пятницам выросла на 31%.",
    metrics: [
      { label: "Оборачиваемость", before: "1,8×", after: "2,3× за вечер" },
      { label: "Пятничная выручка", before: "базовая", after: "+31%" },
    ],
    weeks: 9,
    icon: "TrendingUp",
    color: "from-teal-900/40 to-teal-800/20",
    accent: "text-teal-400",
  },
];

export default function CasesSection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section className="py-16 px-4 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
            <span className="text-green-400 text-sm font-medium">Реальные результаты клиентов</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Кейсы: что изменилось после работы со мной
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Только цифры — до и после. Без приукрашивания.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CASES.map((c, i) => (
            <div
              key={i}
              className={`relative rounded-2xl border border-white/10 bg-gradient-to-br ${c.color} overflow-hidden transition-all duration-300 cursor-pointer hover:border-white/20`}
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${c.accent}`}>
                      <Icon name={c.icon} size={20} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">{c.city} · {c.type}</div>
                      <div className="text-xs text-gray-500">{c.weeks} недель работы</div>
                    </div>
                  </div>
                  <Icon
                    name={expanded === i ? "ChevronUp" : "ChevronDown"}
                    size={16}
                    className="text-gray-500 mt-1 flex-shrink-0"
                  />
                </div>

                <h3 className="text-white font-semibold text-base leading-snug mb-3">
                  {c.title}
                </h3>

                <div className="flex gap-3">
                  {c.metrics.map((m, j) => (
                    <div key={j} className="flex-1 bg-black/30 rounded-xl p-3">
                      <div className="text-xs text-gray-500 mb-1">{m.label}</div>
                      <div className="text-xs text-gray-400 line-through mb-0.5">{m.before}</div>
                      <div className={`text-sm font-bold ${c.accent}`}>{m.after}</div>
                    </div>
                  ))}
                </div>
              </div>

              {expanded === i && (
                <div className="px-5 pb-5 border-t border-white/10 pt-4 space-y-3">
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Проблема</div>
                    <p className="text-gray-300 text-sm leading-relaxed">{c.problem}</p>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Что сделали</div>
                    <p className="text-gray-300 text-sm leading-relaxed">{c.solution}</p>
                  </div>
                  <div className={`rounded-xl p-3 bg-black/20 border border-white/5`}>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Итог</div>
                    <p className={`text-sm font-medium ${c.accent}`}>{c.result}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Хочешь такой же результат?{" "}
            <a
              href="#diagnostic"
              className="text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            >
              Пройди диагностику — это бесплатно
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}