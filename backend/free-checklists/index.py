"""Шаг 1: принимает имя+email, сохраняет в БД, возвращает deeplink на бота.
Шаг 2 (webhook): бот проверяет подписку на канал, отправляет email если подписан. v5
"""
import os
import json
import smtplib
import urllib.request
import urllib.error
import psycopg2
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.header import Header
import hashlib

CHANNEL_USERNAME = "@Ruslan_Management"
BOT_USERNAME = "Tancredoblack91_bot"
OWNER_CHAT_ID = "7728954739"

CHECKLIST_NAMES = [
    "Операционный старт кафе — 30 дней",
    "Шаблон KPI и дашборд для кафе",
    "Гайд «Аудит склада за один день»",
    "Набор готовых регламентов — 5 документов",
    "Портрет гостя и анализ меню по маржинальности",
    "План экономии закупок — 60 дней",
    "Чек-листы и сценарии обслуживания для бариста/официанта",
    "Промоплан: календарь акций на 3 месяца",
    "Кейс: Увеличение оборачиваемости на 25%",
    "Идеальный сотрудник — профиль по ролям",
    "ABC-анализ для общепита",
    "Финансовая модель для запуска ресторана/бара/кофейни",
    "Бизнес-план для открытия кофейни/бара/ресторана",
    "Тренинги для сотрудников: повара, официанты, бармены",
    "Нормы хранения продукции на кухне",
    "Аттестация сотрудников зала и кухни",
]

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
}


def get_db():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def get_checklist_url(num: int) -> str:
    key_id = os.environ["AWS_ACCESS_KEY_ID"]
    return f"https://cdn.poehali.dev/projects/{key_id}/bucket/checklists/checklist_{num:02d}.html"


def make_token(name: str, email: str) -> str:
    raw = f"{name}:{email}:{os.environ.get('TELEGRAM_BOT_TOKEN','')[:10]}"
    return hashlib.md5(raw.encode()).hexdigest()[:12]


def tg_api(method: str, payload: dict):
    token = os.environ.get("TELEGRAM_BOT_TOKEN", "")
    url = f"https://api.telegram.org/bot{token}/{method}"
    data = json.dumps(payload).encode()
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        return {"ok": False, "error": str(e)}


def check_subscription(chat_id: int) -> bool:
    result = tg_api("getChatMember", {"chat_id": CHANNEL_USERNAME, "user_id": chat_id})
    status = result.get("result", {}).get("status", "")
    return status in ("member", "administrator", "creator")


def send_email(to_email: str, name: str):
    smtp_host = os.environ.get("SMTP_HOST", "smtp.mail.ru")
    smtp_user = os.environ.get("SMTP_USER", "")
    smtp_password = os.environ.get("SMTP_PASSWORD", "")

    links_html = ""
    for i, title in enumerate(CHECKLIST_NAMES, 1):
        url = get_checklist_url(i)
        links_html += f"""
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;">
            <span style="color:#FF6B00;font-weight:bold;margin-right:8px;">#{i}</span>
            <span style="color:#333;font-size:14px;">{title}</span>
          </td>
          <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;text-align:right;">
            <a href="{url}" style="background:#FF6B00;color:#fff;padding:6px 14px;border-radius:6px;
               text-decoration:none;font-size:12px;font-weight:bold;">Открыть →</a>
          </td>
        </tr>"""

    greeting = f"Здравствуйте, {name}!" if name else "Здравствуйте!"
    html = f"""<!DOCTYPE html>
<html lang="ru"><head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;background:#f9f9f9;padding:20px;margin:0;">
  <div style="max-width:620px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1);">
    <div style="background:linear-gradient(135deg,#FF6B00,#FF2D55);padding:36px 40px;text-align:center;">
      <h1 style="color:#fff;margin:0 0 8px;font-size:26px;">🎁 Ваши 16 чек-листов</h1>
      <p style="color:rgba(255,255,255,0.9);margin:0;font-size:15px;">Руслан Фатуллаев — эксперт по ресторанному бизнесу</p>
    </div>
    <div style="padding:36px 40px;">
      <p style="color:#333;font-size:16px;margin:0 0 20px;">{greeting}<br>
        Держите все <strong>16 профессиональных чек-листов</strong> — как и обещал.
      </p>
      <div style="background:#FFF8F0;border:1px solid #FF6B00;border-radius:8px;padding:16px 20px;margin-bottom:28px;">
        <p style="margin:0;color:#FF6B00;font-weight:bold;font-size:14px;">📌 Нажмите «Открыть →» рядом с каждым чек-листом</p>
        <p style="margin:6px 0 0;color:#666;font-size:13px;">Документы откроются в браузере. Сохраните письмо, чтобы вернуться в любой момент.</p>
      </div>
      <table style="width:100%;border-collapse:collapse;background:#fafafa;border-radius:8px;overflow:hidden;border:1px solid #eee;">{links_html}</table>
      <div style="margin-top:32px;padding-top:24px;border-top:1px solid #eee;">
        <p style="color:#555;font-size:14px;line-height:1.7;margin:0;">
          Вопросы — пишите в Telegram <a href="https://t.me/FatullayevRuslan" style="color:#FF6B00;">@FatullayevRuslan</a>.<br><br>
          С уважением,<br><strong>Руслан Фатуллаев</strong>
        </p>
      </div>
    </div>
    <div style="background:#f5f5f5;padding:16px 40px;text-align:center;">
      <p style="color:#aaa;font-size:12px;margin:0;">© 2026 Руслан Фатуллаев · Эксперт по ресторанному бизнесу</p>
    </div>
  </div>
</body></html>"""

    msg = MIMEMultipart("alternative")
    msg["Subject"] = Header("Ваши 16 бесплатных чек-листов для ресторатора", "utf-8")
    msg["From"] = f"{Header('Руслан Фатуллаев', 'utf-8').encode()} <{smtp_user}>"
    msg["To"] = to_email
    msg.attach(MIMEText(html, "html", "utf-8"))
    with smtplib.SMTP_SSL(smtp_host, 465) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, to_email, msg.as_string())


def tg_notify_owner(name: str, email: str):
    tg_api("sendMessage", {
        "chat_id": OWNER_CHAT_ID,
        "text": f"📩 <b>Новый подписчик получил чек-листы</b>\n\n👤 {name or '—'}\n📧 {email}",
        "parse_mode": "HTML"
    })


def handle_webhook(body: dict) -> dict:
    """Обрабатывает сообщения от бота."""
    message = body.get("message") or {}
    callback = body.get("callback_query") or {}

    # Обработка callback "Я подписался"
    if callback:
        chat_id = callback.get("from", {}).get("id")
        cb_data = callback.get("data", "")
        tg_api("answerCallbackQuery", {"callback_query_id": callback["id"]})

        if cb_data == "check_sub" and chat_id:
            _process_subscription_check(chat_id)
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": "ok"}

    # Обработка /start с payload
    text = message.get("text", "")
    chat_id = message.get("from", {}).get("id")
    first_name = message.get("from", {}).get("first_name", "")

    if not chat_id:
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": "ok"}

    if text.startswith("/start"):
        parts = text.split(" ", 1)
        payload = parts[1] if len(parts) > 1 else ""

        # Если есть payload — сохраняем email из БД по токену
        if payload:
            conn = get_db()
            try:
                cur = conn.cursor()
                cur.execute(
                    "UPDATE checklist_subscribers SET chat_id = %s WHERE token = %s",
                    (chat_id, payload)
                )
                conn.commit()
            finally:
                conn.close()

        _send_subscribe_prompt(chat_id, first_name)

    return {"statusCode": 200, "headers": CORS_HEADERS, "body": "ok"}


def _send_subscribe_prompt(chat_id: int, first_name: str):
    """Отправляет просьбу подписаться на канал."""
    name_part = f"{first_name}, п" if first_name else "П"
    tg_api("sendMessage", {
        "chat_id": chat_id,
        "text": (
            f"👋 {name_part}одпишись на мой канал <b>@Ruslan_Management</b> — "
            f"там разборы кейсов, советы и инсайты из практики.\n\n"
            f"После подписки нажми кнопку ниже и я сразу пришлю твои чек-листы на почту 👇"
        ),
        "parse_mode": "HTML",
        "reply_markup": {
            "inline_keyboard": [[
                {"text": "📢 Подписаться на канал", "url": "https://t.me/Ruslan_Management"},
                {"text": "✅ Я подписался!", "callback_data": "check_sub"}
            ]]
        }
    })


def _process_subscription_check(chat_id: int):
    """Проверяет подписку и отправляет email если подписан."""
    if not check_subscription(chat_id):
        tg_api("sendMessage", {
            "chat_id": chat_id,
            "text": "❌ Похоже, вы ещё не подписались на канал. Подпишитесь и нажмите кнопку снова 👆",
        })
        return

    conn = get_db()
    try:
        cur = conn.cursor()
        cur.execute(
            "SELECT name, email, email_sent FROM checklist_subscribers WHERE chat_id = %s",
            (chat_id,)
        )
        row = cur.fetchone()
        if not row:
            tg_api("sendMessage", {
                "chat_id": chat_id,
                "text": "⚠️ Не нашёл ваш email. Вернитесь на сайт и введите email заново.",
            })
            return

        name, email, email_sent = row
        if email_sent:
            tg_api("sendMessage", {
                "chat_id": chat_id,
                "text": f"✅ Чек-листы уже были отправлены на {email}. Проверьте почту (и папку Спам).",
            })
            return

        send_email(email, name)
        cur.execute(
            "UPDATE checklist_subscribers SET email_sent = TRUE WHERE chat_id = %s",
            (chat_id,)
        )
        conn.commit()
        tg_notify_owner(name, email)

        tg_api("sendMessage", {
            "chat_id": chat_id,
            "text": (
                f"🎉 Готово! Все 16 чек-листов отправлены на <b>{email}</b>\n\n"
                f"Если не видите — проверьте папку «Спам».\n\n"
                f"Если нужна личная консультация — пишите @FatullayevRuslan"
            ),
            "parse_mode": "HTML"
        })
    finally:
        conn.close()


def handle_register(body: dict) -> dict:
    """Шаг 1: сохраняет email, возвращает deeplink на бота."""
    name = body.get("name", "").strip()
    email = body.get("email", "").strip()

    if not email or "@" not in email:
        return {
            "statusCode": 400,
            "headers": CORS_HEADERS,
            "body": json.dumps({"error": "Укажите корректный email"}, ensure_ascii=False),
        }

    token = make_token(name, email)
    conn = get_db()
    try:
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO checklist_subscribers (chat_id, name, email, token)
            VALUES (0, %s, %s, %s)
            ON CONFLICT DO NOTHING
        """, (name, email, token))
        conn.commit()
    finally:
        conn.close()

    bot_link = f"https://t.me/{BOT_USERNAME}?start={token}"
    return {
        "statusCode": 200,
        "headers": CORS_HEADERS,
        "body": json.dumps({"ok": True, "bot_link": bot_link}),
    }


def handler(event: dict, context) -> dict:
    """Регистрация email (POST /) и webhook бота (POST /webhook). POST /setup — регистрирует webhook."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    path = event.get("path", "/")
    body = json.loads(event.get("body") or "{}")

    if path.endswith("/webhook"):
        return handle_webhook(body)

    qs = event.get("queryStringParameters") or {}
    if qs.get("action") == "setup":
        webhook_url = "https://functions.poehali.dev/733d4042-b125-4eeb-ade2-b7225c6503bb"
        result = tg_api("setWebhook", {"url": webhook_url})
        return {
            "statusCode": 200,
            "headers": CORS_HEADERS,
            "body": json.dumps(result),
        }

    return handle_register(body)