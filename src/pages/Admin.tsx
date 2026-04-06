import { useState } from "react";
import Icon from "@/components/ui/icon";

const ADMIN_LEADS_URL = "https://functions.poehali.dev/93ceb604-c90c-428f-8e00-ab5b08257ecf";

interface Lead {
  id: number;
  created_at: string;
  name: string;
  contact: string;
  city: string | null;
  project: string | null;
  staff: string | null;
  problem: string | null;
  score: number | null;
  result_label: string | null;
}

function parseSource(problem: string | null): { label: string; color: string; icon: string } {
  if (!problem) return { label: "Заявка", color: "bg-gray-100 text-gray-600", icon: "FileText" };
  if (problem.includes("[consultation]")) return { label: "Консультация", color: "bg-orange-100 text-orange-700", icon: "Calendar" };
  if (problem.includes("[audit]")) return { label: "Аудит", color: "bg-blue-100 text-blue-700", icon: "Search" };
  if (problem.includes("[diagnostic_quiz]")) return { label: "Диагностика", color: "bg-purple-100 text-purple-700", icon: "BarChart2" };
  if (problem.includes("[exit_popup]")) return { label: "Поп-ап", color: "bg-yellow-100 text-yellow-700", icon: "Zap" };
  if (problem.includes("[service]")) return { label: "Услуга", color: "bg-green-100 text-green-700", icon: "Briefcase" };
  if (problem.includes("[marathon]")) return { label: "Марафон", color: "bg-pink-100 text-pink-700", icon: "Trophy" };
  if (problem.includes("[buy_checklist]")) return { label: "Чек-лист", color: "bg-teal-100 text-teal-700", icon: "ShoppingCart" };
  return { label: "Заявка", color: "bg-gray-100 text-gray-600", icon: "FileText" };
}

function parseProblemDetails(problem: string | null): string {
  if (!problem) return "—";
  return problem.replace(/^\[[\w_]+\]\s*/, "").trim() || "—";
}

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const login = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(ADMIN_LEADS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ p: password }),
      });
      const data = await res.json();
      if (data.ok) {
        setAuthed(true);
        setLeads(data.leads);
      } else {
        setError("Неверный пароль");
      }
    } catch {
      setError("Ошибка подключения, попробуйте снова");
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await fetch(ADMIN_LEADS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ p: password }),
      });
      const data = await res.json();
      if (data.ok) setLeads(data.leads);
    } finally {
      setLoading(false);
    }
  };

  const FILTERS = [
    { id: "all", label: "Все" },
    { id: "consultation", label: "Консультации" },
    { id: "audit", label: "Аудиты" },
    { id: "diagnostic_quiz", label: "Диагностики" },
    { id: "service", label: "Услуги" },
    { id: "exit_popup", label: "Поп-ап" },
    { id: "marathon", label: "Марафон" },
    { id: "buy_checklist", label: "Чек-листы" },
  ];

  const filtered = leads.filter((l) => {
    const q = search.toLowerCase();
    const matchSearch =
      l.name.toLowerCase().includes(q) ||
      l.contact.toLowerCase().includes(q) ||
      (l.problem || "").toLowerCase().includes(q);
    const matchFilter =
      filter === "all" || (l.problem || "").includes(`[${filter}]`);
    return matchSearch && matchFilter;
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

  const contactHref = (contact: string) => {
    if (contact.startsWith("+") || /^\d/.test(contact)) return `tel:${contact}`;
    if (contact.includes("@") && !contact.startsWith("@")) return `mailto:${contact}`;
    return `https://t.me/${contact.replace("@", "")}`;
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center mb-5">
            <Icon name="Lock" size={24} className="text-orange-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Личный кабинет</h1>
          <p className="text-gray-500 text-sm mb-6">Заявки с сайта ruslan-consult.ru</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            placeholder="Введите пароль"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 mb-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <button
            onClick={login}
            disabled={loading || !password}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl py-3 transition-colors disabled:opacity-50"
          >
            {loading ? "Проверка..." : "Войти"}
          </button>
        </div>
      </div>
    );
  }

  const consultCount = leads.filter(l => (l.problem || "").includes("[consultation]")).length;
  const auditCount = leads.filter(l => (l.problem || "").includes("[audit]")).length;
  const newToday = leads.filter(l => {
    const d = new Date(l.created_at);
    const today = new Date();
    return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
  }).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Заявки с сайта</h1>
            <p className="text-sm text-gray-500">ruslan-consult.ru</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-sm text-gray-500 hover:text-gray-700 py-2">← На сайт</a>
            <button
              onClick={refresh}
              disabled={loading}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-xl transition-colors"
            >
              <Icon name="RefreshCw" size={16} className={loading ? "animate-spin" : ""} />
              Обновить
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Всего заявок", value: leads.length, icon: "Inbox", color: "text-gray-700" },
            { label: "Сегодня", value: newToday, icon: "Clock", color: "text-orange-600" },
            { label: "Консультаций", value: consultCount, icon: "Calendar", color: "text-orange-600" },
            { label: "Аудитов", value: auditCount, icon: "Search", color: "text-blue-600" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4">
              <Icon name={s.icon as Parameters<typeof Icon>[0]["name"]} size={20} className={`${s.color} mb-2`} />
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по имени, контакту..."
              className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                  filter === f.id
                    ? "bg-orange-500 text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-orange-300"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Leads list */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Icon name="Inbox" size={48} className="mx-auto mb-3 opacity-40" />
            <p>Заявок пока нет</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((lead) => {
              const src = parseSource(lead.problem);
              const details = parseProblemDetails(lead.problem);
              return (
                <div key={lead.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${src.color}`}>
                        <Icon name={src.icon as Parameters<typeof Icon>[0]["name"]} size={12} />
                        {src.label}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-base">{lead.name}</p>
                        <a
                          href={contactHref(lead.contact)}
                          className="text-orange-600 hover:underline text-sm font-medium"
                        >
                          {lead.contact}
                        </a>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{formatDate(lead.created_at)}</span>
                  </div>

                  {details !== "—" && (
                    <div className="bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-700">
                      {details}
                    </div>
                  )}

                  {lead.score !== null && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        lead.score >= 70 ? "bg-green-100 text-green-700" :
                        lead.score >= 40 ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {lead.score}%
                      </span>
                      {lead.result_label && <span className="text-xs text-gray-500">{lead.result_label}</span>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}