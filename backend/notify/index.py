import os
import json
import urllib.request
import urllib.error
import psycopg2

CHAT_ID = "7728954739"


def handler(event: dict, context) -> dict:
    """Отправляет уведомление о новой заявке в Telegram и сохраняет в БД."""
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
    name = body.get("name", "—")
    contact = body.get("contact", "—")
    city = body.get("city", "—")
    project = body.get("project", "—")
    staff = body.get("staff", "—")
    problem = body.get("problem", "—")
    score = body.get("score")
    result_label = body.get("result_label", "—")

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO t_p93544965_crisis_consultation_.leads "
        "(name, contact, city, project, staff, problem, score, result_label) "
        "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
        (name, contact, city, project, staff, problem, score, result_label),
    )
    conn.commit()
    cur.close()
    conn.close()

    score_display = f"{score}%" if score is not None else "—"
    text = (
        f"🔔 <b>Новая заявка с сайта!</b>\n\n"
        f"👤 <b>Имя:</b> {name}\n"
        f"📞 <b>Контакт:</b> {contact}\n"
        f"🏙 <b>Город:</b> {city}\n"
        f"🍽 <b>Заведение:</b> {project}\n"
        f"👥 <b>Персонал:</b> {staff}\n"
        f"❗️ <b>Проблема:</b> {problem}\n\n"
        f"📊 <b>Результат диагностики:</b> {score_display} — {result_label}"
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
