"""Универсальный приём заявок: Telegram + Email владельцу + сохранение в БД. v3."""
import os
import json
import smtplib
import urllib.request
import psycopg2
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

CHAT_ID = "7728954739"
OWNER_EMAIL = "r.fatullaew@yandex.ru"

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
        print(f"[TG OK] sent to {chat_id}")
    except Exception as e:
        print(f"[TG ERROR] {e}")


def email_send(subject: str, body_html: str):
    try:
        smtp_host = os.environ.get("SMTP_HOST", "smtp.mail.ru")
        smtp_user = os.environ["SMTP_USER"]
        smtp_pass = os.environ["SMTP_PASSWORD"]

        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = smtp_user
        msg["To"] = OWNER_EMAIL
        msg.attach(MIMEText(body_html, "html", "utf-8"))

        with smtplib.SMTP_SSL(smtp_host, 465, timeout=15) as server:
            server.login(smtp_user, smtp_pass)
            server.sendmail(smtp_user, OWNER_EMAIL, msg.as_string())
        print(f"[EMAIL OK] sent to {OWNER_EMAIL}")
    except Exception as e:
        print(f"[EMAIL ERROR] {e}")


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
        print(f"[DB OK] lead saved source={source}")
    except Exception as e:
        print(f"[DB ERROR] {e}")


def handler(event: dict, context) -> dict:
    """Принимает заявки с сайта, отправляет уведомления в Telegram и на email владельца."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    try:
        body = json.loads(event.get("body") or "{}")
    except Exception:
        body = {}

    source = body.get("source", body.get("type", "unknown"))
    token = os.environ.get("TELEGRAM_BOT_TOKEN", "")

    print(f"[LEAD] source={source} body_keys={list(body.keys())}")

    if source == "marathon":
        name = body.get("name", "—")
        mode = body.get("mode", "—")
        telegram = body.get("telegram", "")
        email = body.get("email", "")
        contact = f"@{telegram}" if telegram else email or "—"

        tg_text = (
            f"🏃 <b>Новая запись на марафон!</b>\n\n"
            f"👤 <b>Имя:</b> {name}\n"
            f"📬 <b>Способ доставки:</b> {mode}\n"
            f"📞 <b>Контакт:</b> {contact}"
        )
        email_html = f"<h2>🏃 Новая запись на марафон!</h2><p><b>Имя:</b> {name}</p><p><b>Способ доставки:</b> {mode}</p><p><b>Контакт:</b> {contact}</p>"

        tg_send(token, CHAT_ID, tg_text)
        email_send("🏃 Новая запись на марафон — сайт", email_html)
        save_lead(name, contact, "marathon")

    elif source == "buy_checklist":
        email = body.get("email", "—")
        order_id = body.get("order_id", "—")

        tg_text = (
            f"💳 <b>Новая заявка на чек-листы!</b>\n\n"
            f"📧 <b>Email покупателя:</b> {email}\n"
            f"🔖 <b>Заказ №:</b> {order_id}\n\n"
            f"⚡️ Отправь чек-листы после получения оплаты на карту 4377 7278 0412 1940"
        )
        email_html = (
            f"<h2>💳 Новая заявка на чек-листы!</h2>"
            f"<p><b>Email покупателя:</b> {email}</p>"
            f"<p><b>Заказ №:</b> {order_id}</p>"
            f"<p><b>Карта для оплаты:</b> 4377 7278 0412 1940</p>"
            f"<p>Отправь чек-листы после получения оплаты!</p>"
        )

        tg_send(token, CHAT_ID, tg_text)
        email_send(f"💳 Заявка на чек-листы №{order_id}", email_html)
        save_lead(email, email, "buy_checklist", f"order_id={order_id}")

    elif source in ("exit_popup", "service"):
        name = body.get("name", "—")
        contact = body.get("contact", body.get("phone", "—"))
        service = body.get("service", "")
        extra = f" | Услуга: {service}" if service else ""

        tg_text = (
            f"🔔 <b>Новая заявка с сайта!</b>\n\n"
            f"👤 <b>Имя:</b> {name}\n"
            f"📞 <b>Контакт:</b> {contact}\n"
            f"📌 <b>Источник:</b> {source}{extra}"
        )
        email_html = (
            f"<h2>🔔 Новая заявка с сайта!</h2>"
            f"<p><b>Имя:</b> {name}</p>"
            f"<p><b>Контакт:</b> {contact}</p>"
            f"<p><b>Источник:</b> {source}{extra}</p>"
        )

        tg_send(token, CHAT_ID, tg_text)
        email_send(f"🔔 Новая заявка — {source}", email_html)
        save_lead(name, contact, source, service)

    else:
        name = body.get("name", "—")
        contact = body.get("contact", body.get("phone", "—"))
        profitability = body.get("profitability", "—")
        info_text = body.get("info", "")
        answers_text = body.get("answers", "")

        tg_text = (
            f"📊 <b>Новая диагностика с сайта!</b>\n\n"
            f"👤 <b>Имя:</b> {name}\n"
            f"📞 <b>Контакт:</b> {contact}\n"
            f"💹 <b>Рентабельность:</b> {profitability}\n\n"
            f"📋 <b>О проекте:</b>\n{info_text}\n\n"
            f"💬 <b>Ответы:</b>\n{answers_text}"
        )
        if len(tg_text) > 4096:
            tg_text = tg_text[:4090] + "\n..."

        email_html = (
            f"<h2>📊 Новая диагностика с сайта!</h2>"
            f"<p><b>Имя:</b> {name}</p>"
            f"<p><b>Контакт:</b> {contact}</p>"
            f"<p><b>Рентабельность:</b> {profitability}</p>"
            f"<hr/><p><b>О проекте:</b></p><p>{info_text.replace(chr(10), '<br/>')}</p>"
            f"<hr/><p><b>Ответы:</b></p><p>{answers_text.replace(chr(10), '<br/>')}</p>"
        )

        tg_send(token, CHAT_ID, tg_text)
        email_send(f"📊 Диагностика — {name} ({profitability})", email_html)
        save_lead(name, contact, "diagnostic_quiz", profitability)

    return {
        "statusCode": 200,
        "headers": {**CORS, "Content-Type": "application/json"},
        "body": json.dumps({"ok": True}),
    }