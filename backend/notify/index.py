import os
import json
import urllib.request
import urllib.error
import psycopg2

CHAT_ID = "7728954739"


def handle_marathon(body: dict) -> dict:
    """Обрабатывает запись на марафон: уведомляет владельца в Telegram."""
    name = body.get("name", "—")
    mode = body.get("mode", "—")
    telegram = body.get("telegram", "")
    email = body.get("email", "")

    contact_line = f"@{telegram}" if telegram else email

    text = (
        f"🏃 <b>Новая запись на марафон!</b>\n\n"
        f"👤 <b>Имя:</b> {name}\n"
        f"📬 <b>Способ:</b> {mode}\n"
        f"📞 <b>Контакт:</b> {contact_line}"
    )

    token = os.environ["TELEGRAM_BOT_TOKEN"]
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = json.dumps({"chat_id": CHAT_ID, "text": text, "parse_mode": "HTML"}).encode()
    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
    try:
        urllib.request.urlopen(req)
    except urllib.error.HTTPError:
        pass

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"ok": True}),
    }


def handler(event: dict, context) -> dict:
    """Уведомления: новая заявка (диагностика) или запись на марафон."""
    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    body = json.loads(event.get("body") or "{}")

    if body.get("type") == "marathon":
        return handle_marathon(body)
    name = body.get("name", "—")
    contact = body.get("contact", "—")
    city = body.get("city", "—")
    project = body.get("project", "—")
    staff = body.get("staff", "—")
    problem = body.get("problem", "—")
    score = body.get("score")
    result_label = body.get("result_label", "—")
    revenue_change = body.get("revenue_change", "")
    avg_check = body.get("avg_check", "")
    peak_load = body.get("peak_load", "")
    cost_control = body.get("cost_control", "")
    staff_turnover = body.get("staff_turnover", "")
    service_standards = body.get("service_standards", "")
    menu_relevance = body.get("menu_relevance", "")
    main_costs = body.get("main_costs", "")
    crisis_cases = body.get("crisis_cases", "")
    tracked_metrics = body.get("tracked_metrics", "")

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO t_p93544965_crisis_consultation_.leads "
        "(name, contact, city, project, staff, problem, score, result_label, "
        "revenue_change, avg_check, peak_load, cost_control, staff_turnover, "
        "service_standards, menu_relevance, main_costs, crisis_cases, tracked_metrics) "
        "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
        (name, contact, city, project, staff, problem, score, result_label,
         revenue_change, avg_check, peak_load, cost_control, staff_turnover,
         service_standards, menu_relevance, main_costs, crisis_cases, tracked_metrics),
    )
    conn.commit()
    cur.close()
    conn.close()

    score_display = f"{score}%" if score is not None else "—"

    def fld(label, val):
        return f"\n<b>{label}:</b> {val}" if val and val != "—" else ""

    text = (
        f"🔔 <b>Новая заявка с сайта!</b>\n\n"
        f"👤 <b>Имя:</b> {name}\n"
        f"📞 <b>Контакт:</b> {contact}\n"
        f"🏙 <b>Город:</b> {city}\n"
        f"🍽 <b>Заведение:</b> {project}\n"
        f"👥 <b>Персонал:</b> {staff}\n"
        f"❗️ <b>Проблема:</b> {problem}\n"
        f"📊 <b>Результат:</b> {score_display} — {result_label}"
        f"{fld('📈 Выручка (6 мес.)', revenue_change)}"
        f"{fld('🧾 Средний чек', avg_check)}"
        f"{fld('🪑 Заполненность в пик', peak_load)}"
        f"{fld('📦 Учёт себестоимости', cost_control)}"
        f"{fld('🔄 Текучесть персонала', staff_turnover)}"
        f"{fld('📋 Стандарты сервиса', service_standards)}"
        f"{fld('🍽 Актуальность меню', menu_relevance)}"
        f"{fld('💸 Главные затраты', main_costs)}"
        f"{fld('🚨 Кризисные ситуации', crisis_cases)}"
        f"{fld('📉 Метрики', tracked_metrics)}"
    )

    token = os.environ["TELEGRAM_BOT_TOKEN"]
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = json.dumps({"chat_id": CHAT_ID, "text": text, "parse_mode": "HTML"}).encode()

    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
    try:
        urllib.request.urlopen(req)
    except urllib.error.HTTPError as e:
        error_body = e.read().decode()
        return {
            "statusCode": 200,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"ok": False, "tg_error": error_body}),
        }

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"ok": True}),
    }