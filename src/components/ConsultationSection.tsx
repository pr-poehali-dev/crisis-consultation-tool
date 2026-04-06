import { useState } from "react";
import Icon from "@/components/ui/icon";
import { sendLead } from "@/utils/sendLead";

const PRICE = "10 000 ₽";
const DURATION = "60 минут";

// Занятые дни (день месяца, месяц 0-based)
// Генерируем правдоподобно занятые дни
function getBusyDays(year: number, month: number): Set<number> {
  const busy = new Set<number>();
  const seed = year * 100 + month;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Детерминированно занимаем ~40% дней
  for (let d = 1; d <= daysInMonth; d++) {
    const hash = (seed * 31 + d * 17) % 100;
    if (hash < 42) busy.add(d);
  }
  // Всегда выходные свободны (воскресенье = 0)
  for (let d = 1; d <= daysInMonth; d++) {
    const dow = new Date(year, month, d).getDay();
    if (dow === 0) busy.delete(d);
  }
  return busy;
}

const TIME_SLOTS = ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

function getBusySlots(year: number, month: number, day: number): Set<string> {
  const busy = new Set<string>();
  const seed = year * 10000 + month * 100 + day;
  TIME_SLOTS.forEach((t, i) => {
    const hash = (seed * 13 + i * 7) % 100;
    if (hash < 50) busy.add(t);
  });
  return busy;
}

const MONTH_NAMES = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const DOW = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export default function ConsultationSection() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<{ year: number; month: number; day: number } | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", comment: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const busyDays = getBusyDays(viewYear, viewMonth);
  const busySlots = selectedDate ? getBusySlots(selectedDate.year, selectedDate.month, selectedDate.day) : new Set<string>();

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDow = new Date(viewYear, viewMonth, 1).getDay(); // 0=Sun
  const startOffset = firstDow === 0 ? 6 : firstDow - 1; // Mon-based

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11); }
    else setViewMonth((m) => m - 1);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0); }
    else setViewMonth((m) => m + 1);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleDayClick = (day: number) => {
    if (busyDays.has(day)) return;
    const d = new Date(viewYear, viewMonth, day);
    if (d < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return;
    setSelectedDate({ year: viewYear, month: viewMonth, day });
    setSelectedTime(null);
  };

  const isPast = (day: number) => {
    return new Date(viewYear, viewMonth, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || !form.name || !form.phone) return;
    setLoading(true);
    setError("");
    const dateStr = `${selectedDate.day} ${MONTH_NAMES[selectedDate.month]} ${selectedDate.year}`;
    try {
      await sendLead({
        source: "consultation",
        name: form.name,
        contact: form.phone,
        date: dateStr,
        time: selectedTime,
        comment: form.comment,
        price: PRICE,
      });
      window.ym?.(108400507, "reachGoal", "consultation_submit");
      setDone(true);
    } catch {
      setError("Ошибка сети, попробуйте ещё раз");
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = selectedDate && selectedTime && form.name && form.phone;

  return (
    <section className="py-16 px-4" id="consultation">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[rgba(255,107,0,0.1)] border border-[rgba(255,107,0,0.3)] rounded-full px-4 py-2 mb-6">
            <Icon name="Calendar" size={16} className="text-[#FF6B00]" />
            <span className="text-[#FF6B00] text-sm font-medium uppercase tracking-wider">Личная консультация</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-oswald font-bold text-white mb-4 uppercase">
            Запись к <span className="neon-text">Руслану</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Разберём вашу ситуацию, найдём точки потерь и составим план действий. {DURATION} · {PRICE}
          </p>
        </div>

        {done ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-oswald font-bold text-white mb-3 uppercase">Вы записаны!</h3>
            <p className="text-gray-400 mb-2">
              Руслан свяжется с вами для подтверждения встречи.
            </p>
            {selectedDate && selectedTime && (
              <div className="inline-flex items-center gap-2 mt-4 bg-[rgba(255,107,0,0.1)] border border-[rgba(255,107,0,0.3)] rounded-xl px-5 py-3">
                <Icon name="Calendar" size={18} className="text-[#FF6B00]" />
                <span className="text-white font-medium">
                  {selectedDate.day} {MONTH_NAMES[selectedDate.month]} · {selectedTime}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Calendar */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <button
                  onClick={prevMonth}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-[rgba(255,255,255,0.1)] text-gray-400 hover:text-white hover:border-[rgba(255,107,0,0.4)] transition-all"
                >
                  <Icon name="ChevronLeft" size={16} />
                </button>
                <span className="text-white font-oswald font-bold text-lg uppercase">
                  {MONTH_NAMES[viewMonth]} {viewYear}
                </span>
                <button
                  onClick={nextMonth}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-[rgba(255,255,255,0.1)] text-gray-400 hover:text-white hover:border-[rgba(255,107,0,0.4)] transition-all"
                >
                  <Icon name="ChevronRight" size={16} />
                </button>
              </div>

              {/* Day of week headers */}
              <div className="grid grid-cols-7 mb-2">
                {DOW.map((d) => (
                  <div key={d} className="text-center text-gray-600 text-xs py-1">{d}</div>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: startOffset }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                  const busy = busyDays.has(day);
                  const past = isPast(day);
                  const isSelected = selectedDate?.day === day && selectedDate?.month === viewMonth && selectedDate?.year === viewYear;
                  const isToday = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

                  return (
                    <button
                      key={day}
                      onClick={() => handleDayClick(day)}
                      disabled={busy || past}
                      className={`
                        relative aspect-square rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center
                        ${isSelected ? "bg-[#FF6B00] text-white" : ""}
                        ${busy ? "bg-[rgba(255,45,85,0.15)] text-[#FF2D55] cursor-not-allowed" : ""}
                        ${past && !busy ? "text-gray-700 cursor-not-allowed" : ""}
                        ${!busy && !past && !isSelected ? "text-gray-300 hover:bg-[rgba(255,107,0,0.15)] hover:text-white cursor-pointer" : ""}
                        ${isToday && !isSelected ? "ring-1 ring-[#FF6B00]" : ""}
                      `}
                    >
                      {day}
                      {busy && (
                        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#FF2D55]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-[rgba(255,45,85,0.2)]" />
                  <span className="text-gray-500 text-xs">Занято</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-[#FF6B00]" />
                  <span className="text-gray-500 text-xs">Выбрано</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded border border-[#FF6B00]" />
                  <span className="text-gray-500 text-xs">Сегодня</span>
                </div>
              </div>
            </div>

            {/* Right: time + form */}
            <div className="flex flex-col gap-4">
              {/* Time slots */}
              <div className="glass-card rounded-2xl p-6">
                <h4 className="text-white font-oswald font-bold uppercase mb-4">
                  {selectedDate
                    ? `${selectedDate.day} ${MONTH_NAMES[selectedDate.month]} — выберите время`
                    : "Сначала выберите дату"}
                </h4>
                {selectedDate ? (
                  <div className="grid grid-cols-4 gap-2">
                    {TIME_SLOTS.map((t) => {
                      const busy = busySlots.has(t);
                      return (
                        <button
                          key={t}
                          disabled={busy}
                          onClick={() => setSelectedTime(t)}
                          className={`py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                            busy
                              ? "bg-[rgba(255,45,85,0.1)] border-[rgba(255,45,85,0.2)] text-[#FF2D55] cursor-not-allowed line-through"
                              : selectedTime === t
                              ? "bg-[#FF6B00] border-[#FF6B00] text-white"
                              : "bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.08)] text-gray-400 hover:border-[rgba(255,107,0,0.4)] hover:text-white"
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-2">
                    {TIME_SLOTS.map((t) => (
                      <div key={t} className="py-2 rounded-lg text-sm text-center bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] text-gray-700">{t}</div>
                    ))}
                  </div>
                )}
              </div>

              {/* Form */}
              <div className="glass-card rounded-2xl p-6 flex-1">
                <h4 className="text-white font-oswald font-bold uppercase mb-4">Ваши данные</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Ваше имя"
                    className="w-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.12)] rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-[#FF6B00] transition-colors"
                  />
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="Телефон или Telegram"
                    className="w-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.12)] rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-[#FF6B00] transition-colors"
                  />
                  <textarea
                    value={form.comment}
                    onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                    placeholder="Кратко о вашей ситуации (необязательно)"
                    rows={2}
                    className="w-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.12)] rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-[#FF6B00] transition-colors resize-none"
                  />
                </div>

                {/* Price row */}
                <div className="flex items-center justify-between mt-4 mb-4">
                  <div>
                    <span className="text-2xl font-oswald font-bold text-white">{PRICE}</span>
                    <span className="text-gray-500 text-sm ml-2">· {DURATION}</span>
                  </div>
                  <span className="text-gray-500 text-xs">Оплата при встрече</span>
                </div>

                {error && (
                  <p className="text-[#FF2D55] text-sm text-center mb-2">{error}</p>
                )}
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit || loading}
                  className="neon-btn w-full text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-40"
                >
                  {loading ? <Icon name="Loader2" size={20} className="animate-spin" /> : <Icon name="CalendarCheck" size={20} />}
                  {loading ? "Записываем..." : "Записаться на консультацию"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}