import { useState } from "react";
import Icon from "@/components/ui/icon";

const CASES = [
  {
    city: "Саратов",
    year: 2021,
    type: "Ресторан «Перк»",
    title: "Средний чек вырос на 31% за 8 недель",
    problem: "Гости тратили мало, допродажи не было. Меню не структурировано, персонал не мотивирован на повышение чека.",
    solution: "Перестроили меню по методу инженерии: убрали 6 убыточных позиций, добавили комбо-предложения. Ввели систему мотивации для официантов.",
    result: "Средний чек вырос с 680 до 890 ₽. Выручка за месяц выросла на 112 000 ₽ без привлечения новых гостей.",
    metrics: [
      { label: "Средний чек", before: "680 ₽", after: "890 ₽" },
      { label: "Экономия/мес", before: "—", after: "112 000 ₽" },
    ],
    weeks: 8,
    icon: "Utensils",
    color: "from-amber-900/40 to-amber-800/20",
    accent: "text-amber-400",
  },
  {
    city: "Москва",
    year: 2021,
    type: "Ресторан-кафе «Мечта»",
    title: "Остановили убытки и вышли в плюс за 2 месяца",
    problem: "Заполненность зала упала до 35%. Владелец не понимал куда уходят деньги — выручка есть, прибыли нет.",
    solution: "Провёл полный аудит: нашли 4 точки утечки выручки. Ввели систему KPI для персонала, пересмотрели закупки и себестоимость блюд.",
    result: "Через 2 месяца заполняемость выросла до 58%. Вышли на первую чистую прибыль 54 000 ₽/мес.",
    metrics: [
      { label: "Заполняемость", before: "35%", after: "58%" },
      { label: "Экономия/мес", before: "—", after: "54 000 ₽" },
    ],
    weeks: 9,
    icon: "Store",
    color: "from-blue-900/40 to-blue-800/20",
    accent: "text-blue-400",
  },
  {
    city: "Москва",
    year: 2024,
    type: "Ресторан «Эрато»",
    title: "Снизили себестоимость на 19% без потери качества",
    problem: "Себестоимость блюд достигла 52%. Закупки росли, маржа падала. Меню было перегружено — 80+ позиций.",
    solution: "Провёл ABC-анализ всего меню. Убрали 22 позиции с нулевой маржой. Переговоры с поставщиками, новые условия доставки.",
    result: "Себестоимость снизилась с 52% до 33%. Экономия на закупках — 183 000 ₽ за первые 3 месяца.",
    metrics: [
      { label: "Себестоимость", before: "52%", after: "33%" },
      { label: "Экономия/3 мес", before: "—", after: "183 000 ₽" },
    ],
    weeks: 10,
    icon: "ChefHat",
    color: "from-purple-900/40 to-purple-800/20",
    accent: "text-purple-400",
  },
  {
    city: "Москва",
    year: 2022,
    type: "Бар-кафе «Bar&Sheff»",
    title: "Бар стал прибыльным после 1 года убытков",
    problem: "Выручка была, но деньги постоянно заканчивались. Недостача по алкоголю — никто не считал. Бариста и бармены работали без стандартов.",
    solution: "Внедрили складской учёт, нашли недостачу 21% по алкоголю. Пересчитали себестоимость коктейлей, переписали барную карту, ввели регламенты.",
    result: "Первая чистая прибыль — 71 000 ₽ в третий месяц после аудита. Недостача снизилась до 4%.",
    metrics: [
      { label: "Недостача", before: "21%", after: "4%" },
      { label: "Экономия/мес", before: "—", after: "71 000 ₽" },
    ],
    weeks: 11,
    icon: "Wine",
    color: "from-red-900/40 to-red-800/20",
    accent: "text-red-400",
  },
  {
    city: "Саранск",
    year: 2023,
    type: "Ресторан «Big Pig»",
    title: "Увеличили оборачиваемость столов на 28%",
    problem: "В выходные — очереди и недовольные гости. В будни — пустой зал. Выручка не росла, хотя спрос был.",
    solution: "Переработали планировку зала, ввели тайминг сервиса в час-пик. Запустили бизнес-ланч по будням с обновлённым меню.",
    result: "Оборачиваемость выросла с 1,6 до 2,05 раза за вечер. Выручка по выходным выросла на 34%.",
    metrics: [
      { label: "Оборачиваемость", before: "1,6×", after: "2,05× за вечер" },
      { label: "Выручка в пик", before: "базовая", after: "+34%" },
    ],
    weeks: 8,
    icon: "TrendingUp",
    color: "from-orange-900/40 to-orange-800/20",
    accent: "text-orange-400",
  },
  {
    city: "Москва",
    year: 2020,
    type: "Ресторан «Dolce Far Niente»",
    title: "Снизили себестоимость на 21% в работающем ресторане",
    problem: "Ресторан работал, гости были — но деньги утекали. Себестоимость держалась на 49%, меню разрослось до 90+ позиций, часть блюд давно не заказывали.",
    solution: "Провёл ABC-анализ меню, убрал 18 нерентабельных позиций. Пересмотрел закупки, нашёл альтернативных поставщиков по 4 ключевым позициям.",
    result: "Себестоимость снизилась с 49% до 28%. Операционная прибыль выросла на 134 000 ₽ в месяц без изменения концепции.",
    metrics: [
      { label: "Себестоимость", before: "49%", after: "28%" },
      { label: "Экономия/мес", before: "—", after: "134 000 ₽" },
    ],
    weeks: 14,
    icon: "Star",
    color: "from-green-900/40 to-green-800/20",
    accent: "text-green-400",
  },
  {
    city: "Саратов",
    year: 2021,
    type: "Кофейня «Кофе и шоколад»",
    title: "Средний чек вырос на 38%, текучка кадров упала вдвое",
    problem: "Гости брали только кофе и уходили. Бариста менялись каждые 2 месяца. Собственник тратил всё время на операционку.",
    solution: "Перестроили меню: убрали 9 позиций, добавили 4 комбо-сета. Написали регламенты и скрипты для бариста. Внедрили систему адаптации.",
    result: "Средний чек: 260 → 358 ₽. Текучка снизилась с 6 до 3 человек в год. Собственник освободил 4 часа в день.",
    metrics: [
      { label: "Средний чек", before: "260 ₽", after: "358 ₽" },
      { label: "Текучка/год", before: "6 чел.", after: "3 чел." },
    ],
    weeks: 7,
    icon: "Coffee",
    color: "from-teal-900/40 to-teal-800/20",
    accent: "text-teal-400",
  },
  {
    city: "Марий Эл",
    year: 2025,
    type: "Ресторан «Камелот»",
    title: "Вернули 45% постоянных гостей и подняли выручку",
    problem: "Гости перестали возвращаться. Выручка падала 5 месяцев подряд, жалоб не поступало — не понимали в чём причина.",
    solution: "Провели тайного гостя, выявили 7 системных проблем в сервисе. Ввели чек-листы, стандарты обслуживания, программу лояльности.",
    result: "Через 6 недель повторные визиты выросли на 45%. Выручка вернулась к уровню годичной давности и продолжила рост.",
    metrics: [
      { label: "Повторные визиты", before: "падение", after: "+45%" },
      { label: "Выручка", before: "−5 мес подряд", after: "рост 6 нед" },
    ],
    weeks: 6,
    icon: "Users",
    color: "from-pink-900/40 to-pink-800/20",
    accent: "text-pink-400",
  },
  {
    city: "Пенза",
    year: 2023,
    type: "Кофейня «По любви»",
    title: "Навели порядок в процессах и вышли в прибыль",
    problem: "Кофейня работала в минус несколько месяцев подряд. Учёта не было, сотрудники действовали кто во что горазд, себестоимость никто не считал.",
    solution: "Выстроили операционку: ввели учёт, прописали регламенты, рассчитали реальную себестоимость каждой позиции. Сократили меню, убрали убыточные напитки.",
    result: "Через 2 месяца вышли на первую чистую прибыль 38 000 ₽. Собственник понял куда уходили деньги и взял финансы под контроль.",
    metrics: [
      { label: "Экономия/мес", before: "—", after: "38 000 ₽" },
      { label: "Учёт расходов", before: "не велся", after: "полный контроль" },
    ],
    weeks: 12,
    icon: "Coffee",
    color: "from-indigo-900/40 to-indigo-800/20",
    accent: "text-indigo-400",
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
                      <div className="text-xs text-gray-400">{c.type} · {c.city}</div>
                      <div className="text-xs text-gray-500">{c.year} г.</div>
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