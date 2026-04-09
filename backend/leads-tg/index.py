"""Универсальный приём заявок: Telegram + Email владельцу + сохранение в БД. v7."""
import os
import json
import smtplib
import urllib.request
import psycopg2
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

CHAT_ID = "7728954739"
OWNER_EMAIL = "r.fatullaew@yandex.ru"
SCHEMA = "t_p93544965_crisis_consultation_"

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
}


def tg_send(token: str, chat_id: str, text: str) -> bool:
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = json.dumps({"chat_id": chat_id, "text": text, "parse_mode": "HTML"}).encode()
    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
    try:
        urllib.request.urlopen(req, timeout=10)
        print(f"[TG OK] sent to {chat_id}")
        return True
    except Exception as e:
        print(f"[TG ERROR] {e}")
        return False


def email_send(subject: str, body_html: str) -> bool:
    try:
        smtp_host = os.environ.get("SMTP_HOST", "smtp.mail.ru")
        smtp_user = os.environ.get("SMTP_USER", "")
        smtp_pass = os.environ.get("SMTP_PASSWORD", "")
        print(f"[EMAIL] host={smtp_host} user={smtp_user[:5]}*** to={OWNER_EMAIL}")
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = smtp_user
        msg["To"] = OWNER_EMAIL
        msg.attach(MIMEText(body_html, "html", "utf-8"))
        with smtplib.SMTP_SSL(smtp_host, 465, timeout=15) as server:
            server.login(smtp_user, smtp_pass)
            server.sendmail(smtp_user, OWNER_EMAIL, msg.as_string())
        print(f"[EMAIL OK] sent to {OWNER_EMAIL}")
        return True
    except Exception as e:
        print(f"[EMAIL ERROR] {type(e).__name__}: {e}")
        return False


def save_lead(name: str, contact: str, source: str, extra: str = "",
              notify_tg: bool = False, notify_email: bool = False, notify_error: str = None) -> int:
    try:
        conn = psycopg2.connect(os.environ["DATABASE_URL"])
        cur = conn.cursor()
        cur.execute(
            f"INSERT INTO {SCHEMA}.leads (name, contact, problem, notify_tg, notify_email, notify_error) "
            f"VALUES (%s, %s, %s, %s, %s, %s) RETURNING id",
            (name[:200], contact[:200], f"[{source}] {extra}"[:500],
             notify_tg, notify_email, notify_error)
        )
        lead_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        print(f"[DB OK] lead saved id={lead_id} source={source} tg={notify_tg} email={notify_email}")
        return lead_id
    except Exception as e:
        print(f"[DB ERROR] {e}")
        return 0


def handler(event: dict, context) -> dict:
    """Принимает заявки с сайта, отправляет уведомления в Telegram и на email владельца. Сохраняет статус доставки."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    try:
        body = json.loads(event.get("body") or "{}")
    except Exception:
        body = {}

    source = body.get("source", body.get("type", "unknown"))
    token = os.environ.get("TELEGRAM_BOT_TOKEN", "")
    print(f"[LEAD] source={source} body_keys={list(body.keys())}")

    tg_ok = False
    email_ok = False
    errors = []

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
        email_html = f"<h2>🏃 Новая запись на марафон!</h2><p><b>Имя:</b> {name}</p><p><b>Способ:</b> {mode}</p><p><b>Контакт:</b> {contact}</p>"
        tg_ok = tg_send(token, CHAT_ID, tg_text)
        email_ok = email_send("🏃 Новая запись на марафон — сайт", email_html)

    elif source == "buy_checklist":
        name = body.get("email", "—")
        contact = body.get("email", "—")
        order_id = body.get("order_id", "—")
        tg_text = (
            f"💳 <b>Новая заявка на чек-листы!</b>\n\n"
            f"📧 <b>Email покупателя:</b> {contact}\n"
            f"🔖 <b>Заказ №:</b> {order_id}\n\n"
            f"⚡️ Отправь чек-листы после получения оплаты на карту 4377 7278 0412 1940"
        )
        email_html = (
            f"<h2>💳 Новая заявка на чек-листы!</h2>"
            f"<p><b>Email покупателя:</b> {contact}</p>"
            f"<p><b>Заказ №:</b> {order_id}</p>"
            f"<p><b>Карта для оплаты:</b> 4377 7278 0412 1940</p>"
        )
        tg_ok = tg_send(token, CHAT_ID, tg_text)
        email_ok = email_send(f"💳 Заявка на чек-листы №{order_id}", email_html)

    elif source in ("exit_popup", "service"):
        name = body.get("name", "—")
        contact = body.get("contact", body.get("phone", "—"))
        service = body.get("service", "")
        extra_str = f" | Услуга: {service}" if service else ""
        tg_text = (
            f"🔔 <b>Новая заявка с сайта!</b>\n\n"
            f"👤 <b>Имя:</b> {name}\n"
            f"📞 <b>Контакт:</b> {contact}\n"
            f"📌 <b>Источник:</b> {source}{extra_str}"
        )
        email_html = (
            f"<h2>🔔 Новая заявка с сайта!</h2>"
            f"<p><b>Имя:</b> {name}</p><p><b>Контакт:</b> {contact}</p>"
            f"<p><b>Источник:</b> {source}{extra_str}</p>"
        )
        tg_ok = tg_send(token, CHAT_ID, tg_text)
        email_ok = email_send(f"🔔 Новая заявка — {source}", email_html)

    elif source == "audit":
        name = body.get("name", "—")
        contact = body.get("contact", body.get("phone", "—"))
        venue_type = body.get("type", "—")
        city = body.get("city", "—")
        main_problem = body.get("main_problem", "—")
        answers_text = body.get("answers_text", "")
        tg_text = (
            f"🔍 <b>Новая заявка на онлайн-аудит!</b>\n\n"
            f"👤 <b>Имя:</b> {name}\n"
            f"📞 <b>Контакт:</b> {contact}\n"
            f"🏪 <b>Тип:</b> {venue_type} · {city}\n"
            f"⚡️ <b>Главная боль:</b> {main_problem}\n\n"
            f"📋 <b>Ответы:</b>\n{answers_text[:1500]}"
        )
        if len(tg_text) > 4096:
            tg_text = tg_text[:4090] + "\n..."
        email_html = (
            f"<h2>🔍 Новая заявка на онлайн-аудит!</h2>"
            f"<p><b>Имя:</b> {name}</p><p><b>Контакт:</b> {contact}</p>"
            f"<p><b>Тип заведения:</b> {venue_type}</p><p><b>Город:</b> {city}</p>"
            f"<p><b>Главная боль:</b> {main_problem}</p>"
            f"<hr/><p><b>Все ответы:</b></p><pre style='background:#f5f5f5;padding:12px;border-radius:6px;'>{answers_text}</pre>"
        )
        tg_ok = tg_send(token, CHAT_ID, tg_text)
        email_ok = email_send(f"🔍 Онлайн-аудит — {name} ({venue_type}, {city})", email_html)

    elif source == "consultation":
        name = body.get("name", "—")
        contact = body.get("contact", body.get("phone", "—"))
        date = body.get("date", "—")
        time_slot = body.get("time", "—")
        comment = body.get("comment", "")
        price = body.get("price", "—")
        tg_text = (
            f"📅 <b>Новая запись на консультацию!</b>\n\n"
            f"👤 <b>Имя:</b> {name}\n"
            f"📞 <b>Контакт:</b> {contact}\n"
            f"🗓 <b>Дата:</b> {date} в {time_slot}\n"
            f"💰 <b>Стоимость:</b> {price}\n"
            + (f"💬 <b>Комментарий:</b> {comment}" if comment else "")
        )
        email_html = (
            f"<h2>📅 Новая запись на консультацию!</h2>"
            f"<p><b>Имя:</b> {name}</p><p><b>Контакт:</b> {contact}</p>"
            f"<p><b>Дата:</b> {date} в {time_slot}</p><p><b>Стоимость:</b> {price}</p>"
            + (f"<p><b>Комментарий:</b> {comment}</p>" if comment else "")
        )
        tg_ok = tg_send(token, CHAT_ID, tg_text)
        email_ok = email_send(f"📅 Консультация — {name} на {date} в {time_slot}", email_html)

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
            f"📋 <b>О проекте:</b>\n{info_text[:500]}\n\n"
            f"📝 <b>Ответы:</b>\n{answers_text[:800]}"
        )
        if len(tg_text) > 4096:
            tg_text = tg_text[:4090] + "\n..."
        email_html = (
            f"<h2>📊 Новая диагностика с сайта!</h2>"
            f"<p><b>Имя:</b> {name}</p><p><b>Контакт:</b> {contact}</p>"
            f"<p><b>Рентабельность:</b> {profitability}</p>"
            f"<hr/><p><b>О проекте:</b></p><p>{info_text.replace(chr(10), '<br/>')}</p>"
            f"<hr/><p><b>Ответы:</b></p><p>{answers_text.replace(chr(10), '<br/>')}</p>"
        )
        tg_ok = tg_send(token, CHAT_ID, tg_text)
        email_ok = email_send(f"📊 Диагностика — {name} ({profitability})", email_html)

    if not tg_ok:
        errors.append("TG_FAIL")
    if not email_ok:
        errors.append("EMAIL_FAIL")
    notify_error = "; ".join(errors) if errors else None

    # Определяем имя/контакт для записи
    _name = body.get("name") or body.get("email") or "—"
    _contact = body.get("contact") or body.get("phone") or body.get("telegram") or body.get("email") or "—"
    _extra = ""

    save_lead(_name, _contact, source, _extra, notify_tg=tg_ok, notify_email=email_ok, notify_error=notify_error)

    return {
        "statusCode": 200,
        "headers": {**CORS, "Content-Type": "application/json"},
        "body": json.dumps({"ok": True, "tg": tg_ok, "email": email_ok}),
    }