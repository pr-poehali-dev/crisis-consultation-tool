"""Универсальный приём заявок: отправка уведомления владельцу в Telegram + сохранение в БД."""
import os
import json
import urllib.request
import urllib.error
import psycopg2

CHAT_ID = "7728954739"

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
}


def tg_send(token: str, chat_id: str, text: str):
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = json.dumps({"chat_id": chat_id, "text": text, "parse_mode": "HTML"}).encode()
    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
    try:
        urllib.request.urlopen(req, timeout=10)
    except Exception as e:
        print(f"[TG ERROR] {e}")


def save_lead(name: str, contact: str, source: str, extra: str = ""):
    try:
        conn = psycopg2.connect(os.environ["DATABASE_URL"])
        cur = conn.cursor()
        schema = os.environ.get("MAIN_DB_SCHEMA", "t_p93544965_crisis_consultation_")
        cur.execute(
            f"INSERT INTO {schema}.leads (name, contact, problem) VALUES (%s, %s, %s)",
            (name[:200], contact[:200], f"[{source}] {extra}"[:500])
        )
        conn.commit()
        cur.close()
        conn.close()
    except Exception as e:
        print(f"[DB ERROR] {e}")


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    body = json.loads(event.get("body") or "{}")
    source = body.get("source", body.get("type", "unknown"))
    token = os.environ["TELEGRAM_BOT_TOKEN"]

    if source == "marathon":
        name = body.get("name", "—")
        mode = body.get("mode", "—")
        telegram = body.get("telegram", "")
        email = body.get("email", "")
        contact = f"@{telegram}" if telegram else email or "—"

        text = (
            f"🏃 <b>Новая запись на марафон!</b>\n\n"
            f"👤 <b>Имя:</b> {name}\n"
            f"📬 <b>Способ доставки:</b> {mode}\n"
            f"📞 <b>Контакт:</b> {contact}"
        )
        tg_send(token, CHAT_ID, text)
        save_lead(name, contact, "marathon")

    elif source == "buy_checklist":
        email = body.get("email", "—")
        order_id = body.get("order_id", "—")

        text = (
            f"💳 <b>Новая заявка на чек-листы!</b>\n\n"
            f"📧 <b>Email:</b> {email}\n"
            f"🔖 <b>Заказ №:</b> {order_id}\n\n"
            f"⚡️ Отправь чек-листы после получения оплаты!"
        )
        tg_send(token, CHAT_ID, text)
        save_lead(email, email, "buy_checklist", f"order_id={order_id}")

    elif source in ("exit_popup", "service"):
        name = body.get("name", "—")
        contact = body.get("contact", "—")
        service = body.get("service", "")
        extra = f" | Услуга: {service}" if service else ""

        text = (
            f"🔔 <b>Новая заявка с сайта!</b>\n\n"
            f"👤 <b>Имя:</b> {name}\n"
            f"📞 <b>Контакт:</b> {contact}\n"
            f"📌 <b>Источник:</b> {source}{extra}"
        )
        tg_send(token, CHAT_ID, text)
        save_lead(name, contact, source, service)

    else:
        name = body.get("name", "—")
        contact = body.get("contact", "—")
        profitability = body.get("profitability", "—")
        info_text = body.get("info", "")
        answers_text = body.get("answers", "")

        text = (
            f"📊 <b>Новая диагностика с сайта!</b>\n\n"
            f"👤 <b>Имя:</b> {name}\n"
            f"📞 <b>Контакт:</b> {contact}\n"
            f"💹 <b>Рентабельность:</b> {profitability}\n\n"
            f"📋 <b>О проекте:</b>\n{info_text}\n\n"
            f"💬 <b>Ответы:</b>\n{answers_text}"
        )
        if len(text) > 4096:
            text = text[:4090] + "\n..."

        tg_send(token, CHAT_ID, text)
        save_lead(name, contact, "diagnostic_quiz", profitability)

    return {
        "statusCode": 200,
        "headers": {**CORS, "Content-Type": "application/json"},
        "body": json.dumps({"ok": True}),
    }