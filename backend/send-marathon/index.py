import os
import json
import urllib.request
import urllib.error
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.header import Header

OWNER_CHAT_ID = "7728954739"

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
}


def tg_send(token: str, chat_id: str, text: str):
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = {"chat_id": chat_id, "text": text, "parse_mode": "HTML"}
    data = json.dumps(payload).encode()
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    try:
        urllib.request.urlopen(req)
    except urllib.error.HTTPError:
        pass


MARATHON_URL = "https://docs.google.com/document/d/1placeholder"


def get_marathon_url():
    key_id = os.environ.get("AWS_ACCESS_KEY_ID", "")
    return f"https://cdn.poehali.dev/projects/{key_id}/bucket/marathon/marathon.html"


def send_email_marathon(to_email: str, name: str):
    smtp_host = os.environ.get("SMTP_HOST", "smtp.mail.ru")
    smtp_user = os.environ.get("SMTP_USER", "")
    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    smtp_port = 465

    marathon_url = get_marathon_url()

    html = f"""<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px; margin: 0;">
  <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px;
       overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">

    <div style="background: linear-gradient(135deg, #FF6B00, #FF2D55); padding: 36px 40px; text-align: center;">
      <h1 style="color: #fff; margin: 0 0 8px; font-size: 24px;">🏆 Марафон «Операционный бустер»</h1>
      <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 15px;">
        3 недели · 15 рабочих заданий · Бесплатно
      </p>
    </div>

    <div style="padding: 36px 40px;">
      <p style="color: #333; font-size: 16px; margin: 0 0 20px;">
        Привет, <strong>{name}</strong>!<br><br>
        Ваш марафон готов. Выполняйте по одному заданию в день (30–60 минут)
        и пришлите финальный пакет — я лично разберу ваш кейс.
      </p>

      <div style="text-align: center; margin: 28px 0;">
        <a href="{marathon_url}"
           style="background: linear-gradient(135deg, #FF6B00, #FF2D55); color: #fff;
                  padding: 16px 36px; border-radius: 10px; text-decoration: none;
                  font-size: 16px; font-weight: bold; display: inline-block;">
          Открыть марафон →
        </a>
      </div>

      <div style="background: #FFF8F0; border: 1px solid #FF6B00; border-radius: 8px;
           padding: 16px 20px; margin-bottom: 24px;">
        <p style="margin: 0; color: #FF6B00; font-weight: bold; font-size: 14px;">
          📌 Как сдать финальный отчёт
        </p>
        <p style="margin: 8px 0 0; color: #666; font-size: 13px; line-height: 1.6;">
          Упакуйте все файлы и фото в архив, отправьте в Telegram
          <a href="https://t.me/Roko_Tiis" style="color: #FF6B00;">@Roko_Tiis</a>
          с темой: <strong>«Марафон — Название — Отчёт — ФИО»</strong>
        </p>
      </div>

      <p style="color: #555; font-size: 14px; line-height: 1.7; margin: 0;">
        Вопросы — пишите в Telegram
        <a href="https://t.me/Roko_Tiis" style="color: #FF6B00;">@Roko_Tiis</a>.<br>
        Удачи в марафоне!<br><br>
        <strong>Руслан Фатуллаев</strong><br>
        Антикризисный управляющий для общепита
      </p>
    </div>

    <div style="background: #f5f5f5; padding: 16px 40px; text-align: center;">
      <p style="color: #aaa; font-size: 12px; margin: 0;">
        © 2026 Руслан Фатуллаев · Антикризисный управляющий для общепита
      </p>
    </div>
  </div>
</body>
</html>"""

    msg = MIMEMultipart("alternative")
    msg["Subject"] = Header("Ваш марафон «Операционный бустер» — открывайте и начинайте!", "utf-8")
    msg["From"] = f"{Header('Руслан Фатуллаев', 'utf-8').encode()} <{smtp_user}>"
    msg["To"] = to_email
    msg.attach(MIMEText(html, "html", "utf-8"))

    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, to_email, msg.as_string())


def handler(event: dict, context) -> dict:
    """Принимает заявку на марафон: отправляет ссылку в Telegram или на почту и уведомляет владельца."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "—").strip()
    mode = body.get("mode", "email")
    telegram = body.get("telegram", "").strip().lstrip("@")
    email = body.get("email", "").strip()

    token = os.environ["TELEGRAM_BOT_TOKEN"]
    marathon_url = get_marathon_url()

    if mode == "telegram":
        if not telegram:
            return {
                "statusCode": 200,
                "headers": CORS_HEADERS,
                "body": json.dumps({"ok": False, "error": "Не указан Telegram"}, ensure_ascii=False),
            }
        user_text = (
            f"🏆 <b>Марафон «Операционный бустер»</b>\n\n"
            f"Привет, <b>{name}</b>!\n\n"
            f"Выполняйте по одному заданию в день (30–60 минут) и пришлите финальный пакет — "
            f"я лично разберу ваш кейс.\n\n"
            f"📎 <b>Ваш марафон:</b>\n{marathon_url}\n\n"
            f"📌 <b>Как сдать финал:</b> упакуйте все файлы в архив и отправьте мне "
            f"(@Roko_Tiis) с темой: «Марафон — Название — Отчёт — ФИО»\n\n"
            f"Удачи! 💪"
        )
        tg_send(token, f"@{telegram}", user_text)

        owner_text = (
            f"🏃 <b>Новый участник марафона!</b>\n\n"
            f"👤 <b>Имя:</b> {name}\n"
            f"📱 <b>Telegram:</b> @{telegram}\n"
            f"📬 <b>Способ:</b> Telegram"
        )
        tg_send(token, OWNER_CHAT_ID, owner_text)

    elif mode == "email":
        if not email or "@" not in email:
            return {
                "statusCode": 200,
                "headers": CORS_HEADERS,
                "body": json.dumps({"ok": False, "error": "Некорректный email"}, ensure_ascii=False),
            }
        send_email_marathon(email, name)

        owner_text = (
            f"🏃 <b>Новый участник марафона!</b>\n\n"
            f"👤 <b>Имя:</b> {name}\n"
            f"📧 <b>Email:</b> {email}\n"
            f"📬 <b>Способ:</b> Email"
        )
        tg_send(token, OWNER_CHAT_ID, owner_text)
    else:
        return {
            "statusCode": 200,
            "headers": CORS_HEADERS,
            "body": json.dumps({"ok": False, "error": "Неизвестный режим"}, ensure_ascii=False),
        }

    return {
        "statusCode": 200,
        "headers": CORS_HEADERS,
        "body": json.dumps({"ok": True}, ensure_ascii=False),
    }
