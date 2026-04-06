import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const ADMIN_LEADS_URL = "https://functions.poehali.dev/93ceb604-c90c-428f-8e00-ab5b08257ecf";
const DEFAULT_TOKEN = "ruslan2026";

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
  notify_tg: boolean | null;
  notify_email: boolean | null;
  notify_error: string | null;
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

function NotifyBadge({ ok, label }: { ok: boolean | null; label: string }) {
  if (ok === null) return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-400">
      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 inline-block" />
      {label}
    </span>
  );
  if (ok) return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-green-50 text-green-600">
      <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
      {label} ✓
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-red-50 text-red-600">
      <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
      {label} ✗
    </span>
  );
}

export default function Admin() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [tokenInput, setTokenInput] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const getToken = () => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    if (urlToken) return urlToken;
    return sessionStorage.getItem("admin_token") || "";
  };

  const loadLeads = async (tok?: string) => {
    const t = tok || getToken();
    if (!t) { setShowLogin(true); setLoading(false); return; }
    setLoading(true);
    setError("");
    setShowLogin(false);
    try {
      const res = await fetch(`${ADMIN_LEADS_URL}?token=${encodeURIComponent(t)}`);
      const data = await res.json();
      if (data.ok) {
        setLeads(data.leads);
      } else {
        sessionStorage.removeItem("admin_token");
        setShowLogin(true);
        setError("Неверный пароль");
      }
    } catch {
      setError("Ошибка подключения к серверу");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    const t = tokenInput.trim() || DEFAULT_TOKEN;
    sessionStorage.setItem("admin_token", t);
    loadLeads(t);
  };

  useEffect(() => { loadLeads(); }, []);

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
    const matchFilter = filter === "all" || (l.problem || "").includes(`[${filter}]`);
    return matchSearch && matchFilter;
  });

  const formatDate = (iso: string) => new Date(iso).toLocaleString("ru-RU", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  const contactHref = (contact: string) => {
    if (contact.startsWith("+") || /^\d/.test(contact)) return `tel:${contact}`;
    if (contact.includes("@") && !contact.startsWith("@")) return `mailto:${contact}`;
    return `https://t.me/${contact.replace("@", "")}`;
  };

  const newToday = leads.filter(l => {
    const d = new Date(l.created_at);
    const t = new Date();
    return d.getDate() === t.getDate() && d.getMonth() === t.getMonth() && d.getFullYear() === t.getFullYear();
  }).length;

  const failedNotify = leads.filter(l => l.notify_tg === false || l.notify_email === false).length;

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Icon name="Loader2" size={40} className="animate-spin text-orange-500 mx-auto mb-3" />
        <p className="text-gray-500">Загружаем заявки...</p>
      </div>
    </div>
  );

  if (showLogin) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow p-8 text-center max-w-sm w-full">
        <Icon name="Lock" size={40} className="text-orange-500 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-gray-900 mb-1">Вход в админку</h2>
        <p className="text-gray-400 text-sm mb-4">Введите пароль для доступа</p>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <input
          type="password"
          value={tokenInput}
          onChange={e => setTokenInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleLogin()}
          placeholder="Пароль"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          autoFocus
        />
        <button
          onClick={handleLogin}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Войти
        </button>
        <p className="text-gray-400 text-xs mt-4">Или откройте: <code className="bg-gray-100 px-1 rounded">/admin?token=ruslan2026</code></p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Заявки с сайта</h1>
            <p className="text-sm text-gray-500">ruslan-consult.ru</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-sm text-gray-500 hover:text-gray-700 py-2">← На сайт</a>
            <button
              onClick={() => loadLeads()}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-xl transition-colors"
            >
              <Icon name="RefreshCw" size={16} />
              Обновить
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Всего заявок", value: leads.length, icon: "Inbox", color: "text-gray-700" },
            { label: "Сегодня", value: newToday, icon: "Clock", color: "text-orange-600" },
            { label: "Консультаций", value: leads.filter(l => (l.problem||"").includes("[consultation]")).length, icon: "Calendar", color: "text-orange-600" },
            { label: "Ошибки уведомлений", value: failedNotify, icon: "AlertTriangle", color: failedNotify > 0 ? "text-red-500" : "text-gray-400" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4">
              <Icon name={s.icon as Parameters<typeof Icon>[0]["name"]} size={20} className={`${s.color} mb-2`} />
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {failedNotify > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-2xl px-5 py-4 mb-5 flex items-start gap-3">
            <Icon name="AlertTriangle" size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-700 font-semibold text-sm">Есть {failedNotify} заявок с ошибкой уведомлений</p>
              <p className="text-red-500 text-xs mt-1">Отфильтруйте по нужному типу и свяжитесь с клиентами вручную</p>
            </div>
          </div>
        )}

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
                  filter === f.id ? "bg-orange-500 text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-orange-300"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

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
              const hasError = lead.notify_tg === false || lead.notify_email === false;
              return (
                <div key={lead.id} className={`bg-white rounded-2xl shadow-sm border p-5 ${hasError ? "border-red-200" : "border-gray-100"}`}>
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${src.color}`}>
                        <Icon name={src.icon as Parameters<typeof Icon>[0]["name"]} size={12} />
                        {src.label}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-base">{lead.name}</p>
                        <a href={contactHref(lead.contact)} className="text-orange-600 hover:underline text-sm font-medium">
                          {lead.contact}
                        </a>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs text-gray-400 whitespace-nowrap">{formatDate(lead.created_at)}</span>
                      <div className="flex gap-1.5">
                        <NotifyBadge ok={lead.notify_tg ?? null} label="TG" />
                        <NotifyBadge ok={lead.notify_email ?? null} label="Email" />
                      </div>
                    </div>
                  </div>
                  {details !== "—" && (
                    <div className="bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-700">{details}</div>
                  )}
                  {lead.notify_error && (
                    <div className="mt-2 bg-red-50 rounded-xl px-4 py-2 text-xs text-red-600 flex items-center gap-2">
                      <Icon name="AlertCircle" size={13} />
                      Ошибка уведомления: {lead.notify_error}
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
