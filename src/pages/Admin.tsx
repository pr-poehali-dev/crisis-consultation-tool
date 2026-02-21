import { useState } from "react";
import Icon from "@/components/ui/icon";

const ADMIN_LEADS_URL = "https://functions.poehali.dev/93ceb604-c90c-428f-8e00-ab5b08257ecf";

interface Lead {
  id: number;
  created_at: string;
  name: string;
  contact: string;
  city: string;
  project: string;
  staff: string;
  problem: string;
  score: number | null;
  result_label: string;
  revenue_change?: string;
  avg_check?: string;
  peak_load?: string;
  cost_control?: string;
  staff_turnover?: string;
  service_standards?: string;
  menu_relevance?: string;
  main_costs?: string;
  crisis_cases?: string;
  tracked_metrics?: string;
}

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const login = async () => {
    setLoading(true);
    setError("");
    const res = await fetch(ADMIN_LEADS_URL, {
      headers: { "X-Admin-Password": password },
    });
    const data = await res.json();
    setLoading(false);
    if (data.ok) {
      setAuthed(true);
      setLeads(data.leads);
    } else {
      setError("Неверный пароль");
    }
  };

  const refresh = async () => {
    setLoading(true);
    const res = await fetch(ADMIN_LEADS_URL, {
      headers: { "X-Admin-Password": password },
    });
    const data = await res.json();
    setLoading(false);
    if (data.ok) setLeads(data.leads);
  };

  const filtered = leads.filter((l) => {
    const q = search.toLowerCase();
    return (
      l.name.toLowerCase().includes(q) ||
      l.contact.toLowerCase().includes(q) ||
      (l.city || "").toLowerCase().includes(q) ||
      (l.project || "").toLowerCase().includes(q)
    );
  });

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const scoreColor = (score: number | null) => {
    if (score === null) return "bg-gray-100 text-gray-600";
    if (score >= 70) return "bg-green-100 text-green-700";
    if (score >= 40) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Личный кабинет</h1>
          <p className="text-gray-500 text-sm mb-6">Введите пароль для доступа к заявкам</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            placeholder="Пароль"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 mb-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <button
            onClick={login}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl py-3 transition-colors disabled:opacity-50"
          >
            {loading ? "Проверка..." : "Войти"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Заявки с сайта</h1>
          <p className="text-sm text-gray-500">{leads.length} заявок всего</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" className="text-sm text-gray-500 hover:text-gray-700 py-2 px-1">← На сайт</a>
          <button
            onClick={refresh}
            disabled={loading}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-xl transition-colors"
          >
            <Icon name="RefreshCw" size={16} />
            Обновить
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-4 relative">
          <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по имени, контакту, городу..."
            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Icon name="Inbox" size={48} className="mx-auto mb-3 opacity-40" />
            <p>Заявок пока нет</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((lead) => (
              <div key={lead.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900 text-lg">{lead.name}</span>
                      {lead.score !== null && (
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${scoreColor(lead.score)}`}>
                          {lead.score}%
                        </span>
                      )}
                    </div>
                    <a
                      href={lead.contact.startsWith("http") || lead.contact.startsWith("@") ? `https://t.me/${lead.contact.replace("@", "")}` : `tel:${lead.contact}`}
                      className="text-red-600 hover:underline text-sm font-medium"
                    >
                      {lead.contact}
                    </a>
                  </div>
                  <span className="text-xs text-gray-400">{formatDate(lead.created_at)}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div>
                    <p className="text-gray-400 text-xs mb-0.5">Город</p>
                    <p className="text-gray-700">{lead.city || "—"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-0.5">Заведение</p>
                    <p className="text-gray-700">{lead.project || "—"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-0.5">Персонал</p>
                    <p className="text-gray-700">{lead.staff || "—"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-0.5">Результат</p>
                    <p className="text-gray-700">{lead.result_label || "—"}</p>
                  </div>
                </div>

                {lead.problem && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-gray-400 text-xs mb-0.5">Проблема</p>
                    <p className="text-gray-700 text-sm">{lead.problem}</p>
                  </div>
                )}

                {[
                  { key: "revenue_change", label: "Выручка (6 мес.)" },
                  { key: "avg_check", label: "Средний чек" },
                  { key: "peak_load", label: "Заполненность в пик" },
                  { key: "cost_control", label: "Учёт себестоимости" },
                  { key: "staff_turnover", label: "Текучесть персонала" },
                  { key: "service_standards", label: "Стандарты сервиса" },
                  { key: "menu_relevance", label: "Актуальность меню" },
                  { key: "main_costs", label: "Главные затраты" },
                  { key: "crisis_cases", label: "Кризисные ситуации" },
                  { key: "tracked_metrics", label: "Метрики" },
                ].filter(({ key }) => !!(lead as Record<string, unknown>)[key]).length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      { key: "revenue_change", label: "Выручка (6 мес.)" },
                      { key: "avg_check", label: "Средний чек" },
                      { key: "peak_load", label: "Заполненность в пик" },
                      { key: "cost_control", label: "Учёт себестоимости" },
                      { key: "staff_turnover", label: "Текучесть персонала" },
                      { key: "service_standards", label: "Стандарты сервиса" },
                      { key: "menu_relevance", label: "Актуальность меню" },
                      { key: "main_costs", label: "Главные затраты" },
                      { key: "crisis_cases", label: "Кризисные ситуации" },
                      { key: "tracked_metrics", label: "Метрики" },
                    ].filter(({ key }) => !!(lead as Record<string, unknown>)[key]).map(({ key, label }) => (
                      <div key={key}>
                        <p className="text-gray-400 text-xs mb-0.5">{label}</p>
                        <p className="text-gray-700 text-sm">{(lead as Record<string, string>)[key]}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}