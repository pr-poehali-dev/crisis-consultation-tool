"""Бесплатная отправка 16 чек-листов на email + уведомление владельцу в Telegram."""
import os
import json
import smtplib
import urllib.request
import urllib.error
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.header import Header

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


def get_checklist_url(num: int) -> str:
    key_id = os.environ["AWS_ACCESS_KEY_ID"]
    return f"https://cdn.poehali.dev/projects/{key_id}/bucket/checklists/checklist_{num:02d}.html"


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
<html lang="ru">
<head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;background:#f9f9f9;padding:20px;margin:0;">
  <div style="max-width:620px;margin:0 auto;background:#fff;border-radius:12px;
       overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1);">

    <div style="background:linear-gradient(135deg,#FF6B00,#FF2D55);padding:36px 40px;text-align:center;">
      <h1 style="color:#fff;margin:0 0 8px;font-size:26px;">🎁 Ваши 16 чек-листов</h1>
      <p style="color:rgba(255,255,255,0.9);margin:0;font-size:15px;">
        Руслан Фатуллаев — эксперт по ресторанному бизнесу
      </p>
    </div>

    <div style="padding:36px 40px;">
      <p style="color:#333;font-size:16px;margin:0 0 20px;">{greeting}<br>
        Держите все <strong>16 профессиональных чек-листов</strong> — бесплатно, как и обещал.
      </p>

      <div style="background:#FFF8F0;border:1px solid #FF6B00;border-radius:8px;
           padding:16px 20px;margin-bottom:28px;">
        <p style="margin:0;color:#FF6B00;font-weight:bold;font-size:14px;">
          📌 Нажмите «Открыть →» рядом с каждым чек-листом
        </p>
        <p style="margin:6px 0 0;color:#666;font-size:13px;">
          Документы откроются в браузере. Сохраните это письмо, чтобы вернуться в любой момент.
        </p>
      </div>

      <table style="width:100%;border-collapse:collapse;background:#fafafa;
             border-radius:8px;overflow:hidden;border:1px solid #eee;">
        {links_html}
      </table>

      <div style="margin-top:32px;padding-top:24px;border-top:1px solid #eee;">
        <p style="color:#555;font-size:14px;line-height:1.7;margin:0;">
          Если есть вопросы или хотите разобрать ситуацию в вашем заведении —
          пишите в Telegram <a href="https://t.me/FatullayevRuslan" style="color:#FF6B00;">@FatullayevRuslan</a>.<br><br>
          С уважением,<br>
          <strong>Руслан Фатуллаев</strong>
        </p>
      </div>
    </div>

    <div style="background:#f5f5f5;padding:16px 40px;text-align:center;">
      <p style="color:#aaa;font-size:12px;margin:0;">
        © 2026 Руслан Фатуллаев · Эксперт по ресторанному бизнесу
      </p>
    </div>
  </div>
</body>
</html>"""

    msg = MIMEMultipart("alternative")
    msg["Subject"] = Header("Ваши 16 бесплатных чек-листов для ресторатора", "utf-8")
    msg["From"] = f"{Header('Руслан Фатуллаев', 'utf-8').encode()} <{smtp_user}>"
    msg["To"] = to_email
    msg.attach(MIMEText(html, "html", "utf-8"))

    with smtplib.SMTP_SSL(smtp_host, 465) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, to_email, msg.as_string())


def tg_notify(name: str, email: str):
    token = os.environ.get("TELEGRAM_BOT_TOKEN", "")
    if not token:
        return
    text = (
        f"📩 <b>Новый подписчик получил чек-листы</b>\n\n"
        f"👤 Имя: {name or '—'}\n"
        f"📧 Email: {email}"
    )
    payload = json.dumps({
        "chat_id": OWNER_CHAT_ID,
        "text": text,
        "parse_mode": "HTML"
    }).encode()
    req = urllib.request.Request(
        f"https://api.telegram.org/bot{token}/sendMessage",
        data=payload,
        headers={"Content-Type": "application/json"}
    )
    try:
        urllib.request.urlopen(req)
    except urllib.error.HTTPError:
        pass


def handler(event: dict, context) -> dict:
    """Принимает имя и email, отправляет 16 чек-листов и уведомляет владельца в Telegram."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    try:
        body = json.loads(event.get("body") or "{}")
        name = body.get("name", "").strip()
        email = body.get("email", "").strip()

        if not email or "@" not in email:
            return {
                "statusCode": 400,
                "headers": CORS_HEADERS,
                "body": json.dumps({"error": "Укажите корректный email"}, ensure_ascii=False),
            }

        send_email(email, name)
        tg_notify(name, email)

        return {
            "statusCode": 200,
            "headers": CORS_HEADERS,
            "body": json.dumps({"ok": True}),
        }
    except Exception as e:
        print(f"[ERROR] {e}")
        return {
            "statusCode": 500,
            "headers": CORS_HEADERS,
            "body": json.dumps({"error": str(e)}),
        }