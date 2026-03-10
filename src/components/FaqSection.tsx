import { useState } from "react";
import Icon from "@/components/ui/icon";

const FAQS = [
  {
    q: "Сколько стоит консультация?",
    a: "Консультация стоит 10 000 ₽. Это разовая сессия 60–90 минут, где мы разбираем конкретную проблему вашего заведения и выходим с чётким планом действий. Никаких скрытых платежей.",
  },
  {
    q: "Подойдёт ли мне, если у меня небольшое кафе или кофейня?",
    a: "Да. Большинство моих клиентов — небольшие заведения от 10 до 60 мест. Чем раньше выстроить процессы, тем меньше денег потеряно. Формат и масштаб не важны — важна готовность меняться.",
  },
  {
    q: "Я нахожусь в другом городе — это проблема?",
    a: "Нет. Работаю онлайн с ресторанами по всей России. Диагностика, разбор и сопровождение — всё через видеосвязь. Результат не зависит от географии.",
  },
  {
    q: "Как быстро будет результат?",
    a: "Первые изменения заметны уже через 2–4 недели. Это не магия — это конкретные шаги, которые вы внедряете сразу после разбора. Глубокая трансформация процессов занимает 2–3 месяца.",
  },
  {
    q: "Что если я пройду диагностику, а покупать ничего не буду?",
    a: "Диагностика бесплатна и ни к чему не обязывает. Даже без дальнейшей работы со мной вы получите чёткую картину состояния бизнеса и поймёте, где теряете деньги.",
  },
  {
    q: "Чем вы отличаетесь от бизнес-тренеров и коучей?",
    a: "Я не даю теорию и не провожу мотивационные сессии. 16 лет работы в ресторанном бизнесе — я сам прошёл всё изнутри. Работаю с цифрами, процессами и конкретными результатами. Только практика.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 px-4 bg-[#0d0d0d]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Частые вопросы</h2>
          <p className="text-gray-400">Отвечаю честно — без продажных формулировок</p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/3 overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-white font-medium text-base leading-snug">{faq.q}</span>
                <Icon
                  name={open === i ? "ChevronUp" : "ChevronDown"}
                  size={18}
                  className="text-gray-500 flex-shrink-0 transition-transform duration-200"
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-gray-300 text-sm leading-relaxed border-t border-white/5 pt-4">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
