"""
Единая функция для покупки чек-листов через Telegram:
- POST / — принимает email покупателя, сохраняет заявку, отправляет уведомление владельцу
- POST /webhook — обрабатывает callback от бота (кнопка подтверждения оплаты, отправка email)
- POST /setup — загружает все 16 чек-листов в S3 (вызвать один раз после деплоя)
"""
import os
import json
import urllib.request
import urllib.error
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

OWNER_CHAT_ID = "7728954739"
CARD_NUMBER = "4377 7278 0412 1940"
CARD_NAME = "Руслан Фатуллаев"
AMOUNT = "1 999 ₽"

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
}

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


def get_s3_client():
    import boto3
    return boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )


def get_checklist_url(num: int) -> str:
    key_id = os.environ["AWS_ACCESS_KEY_ID"]
    return f"https://cdn.poehali.dev/projects/{key_id}/bucket/checklists/checklist_{num:02d}.html"


def upload_checklists_to_s3():
    from checklists_content import CHECKLISTS_HTML, make_html
    s3 = get_s3_client()
    uploaded = []
    for num, title, body_html in CHECKLISTS_HTML:
        html = make_html(num, title, body_html)
        key = f"checklists/checklist_{num:02d}.html"
        s3.put_object(
            Bucket="files",
            Key=key,
            Body=html.encode("utf-8"),
            ContentType="text/html; charset=utf-8",
        )
        uploaded.append(f"#{num} {title}")
    return uploaded


def tg_send(token: str, chat_id: str, text: str, reply_markup: dict = None):
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = {"chat_id": chat_id, "text": text, "parse_mode": "HTML"}
    if reply_markup:
        payload["reply_markup"] = reply_markup
    data = json.dumps(payload).encode()
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    try:
        urllib.request.urlopen(req)
    except urllib.error.HTTPError:
        pass


def tg_answer_callback(token: str, callback_query_id: str, text: str):
    url = f"https://api.telegram.org/bot{token}/answerCallbackQuery"
    payload = {"callback_query_id": callback_query_id, "text": text}
    data = json.dumps(payload).encode()
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    try:
        urllib.request.urlopen(req)
    except urllib.error.HTTPError:
        pass


def send_email(to_email: str, order_id: str):
    smtp_host = os.environ.get("SMTP_HOST", "smtp.mail.ru")
    smtp_user = os.environ.get("SMTP_USER", "")
    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    smtp_port = int(os.environ.get("SMTP_PORT", "465"))

    links_html = ""
    for i, name in enumerate(CHECKLIST_NAMES, 1):
        url = get_checklist_url(i)
        links_html += f"""
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f0f0f0;">
            <span style="color: #FF6B00; font-weight: bold; margin-right: 8px;">#{i}</span>
            <a href="{url}" style="color: #333; text-decoration: none; font-size: 14px;">{name}</a>
          </td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f0f0f0; text-align: right;">
            <a href="{url}" style="background: #FF6B00; color: #fff; padding: 6px 14px; border-radius: 6px;
               text-decoration: none; font-size: 12px; font-weight: bold;">Открыть →</a>
          </td>
        </tr>"""

    html = f"""<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px; margin: 0;">
  <div style="max-width: 620px; margin: 0 auto; background: #fff; border-radius: 12px;
       overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">

    <div style="background: linear-gradient(135deg, #FF6B00, #FF2D55); padding: 36px 40px; text-align: center;">
      <h1 style="color: #fff; margin: 0 0 8px; font-size: 26px;">🎉 Ваши чек-листы готовы!</h1>
      <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 15px;">
        Руслан Фатуллаев — антикризисный управляющий для общепита
      </p>
    </div>

    <div style="padding: 36px 40px;">
      <p style="color: #333; font-size: 16px; margin: 0 0 8px;">
        Спасибо за покупку! Вы получили полный пакет из
        <strong>16 профессиональных чек-листов</strong>.
      </p>
      <p style="color: #888; font-size: 13px; margin: 0 0 28px;">Заказ № {order_id}</p>

      <div style="background: #FFF8F0; border: 1px solid #FF6B00; border-radius: 8px;
           padding: 16px 20px; margin-bottom: 28px;">
        <p style="margin: 0; color: #FF6B00; font-weight: bold; font-size: 14px;">
          📌 Нажмите «Открыть →» рядом с каждым чек-листом для просмотра
        </p>
        <p style="margin: 6px 0 0; color: #666; font-size: 13px;">
          Все документы откроются в браузере. Рекомендуем сохранить это письмо.
        </p>
      </div>

      <table style="width: 100%; border-collapse: collapse; background: #fafafa;
             border-radius: 8px; overflow: hidden; border: 1px solid #eee;">
        {links_html}
      </table>

      <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #eee;">
        <p style="color: #555; font-size: 14px; line-height: 1.7; margin: 0;">
          Если есть вопросы — пишите в Telegram
          <a href="https://t.me/Roko_Tiis" style="color: #FF6B00;">@Roko_Tiis</a>.<br>
          С уважением,<br>
          <strong>Руслан Фатуллаев</strong>
        </p>
      </div>
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
    msg["Subject"] = "Ваши 16 чек-листов для ресторатора — все ссылки внутри"
    msg["From"] = f"Руслан Фатуллаев <{smtp_user}>"
    msg["To"] = to_email
    msg.attach(MIMEText(html, "html", "utf-8"))

    print(f"[EMAIL] Connecting to {smtp_host}:{smtp_port} as {smtp_user}")
    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, to_email, msg.as_string())
    print(f"[EMAIL] Sent to {to_email}")


def handle_setup(body: dict) -> dict:
    secret = body.get("secret", "")
    if secret != os.environ.get("TELEGRAM_BOT_TOKEN", "")[:10]:
        return {
            "statusCode": 403,
            "headers": CORS_HEADERS,
            "body": json.dumps({"error": "forbidden"}),
        }
    uploaded = upload_checklists_to_s3()
    return {
        "statusCode": 200,
        "headers": CORS_HEADERS,
        "body": json.dumps({"ok": True, "uploaded": len(uploaded), "files": uploaded}, ensure_ascii=False),
    }


def handle_buy(body: dict, token: str) -> dict:
    import psycopg2
    email = body.get("email", "").strip()
    if not email or "@" not in email:
        return {
            "statusCode": 400,
            "headers": CORS_HEADERS,
            "body": json.dumps({"error": "Некорректный email"}, ensure_ascii=False),
        }

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO checklist_orders (email, status) VALUES (%s, 'pending') RETURNING id",
        (email,),
    )
    order_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    owner_text = (
        f"🛒 <b>Новая заявка на чек-листы!</b>\n\n"
        f"📧 <b>Email покупателя:</b> {email}\n"
        f"🔢 <b>Заказ №:</b> {order_id}\n"
        f"💰 <b>Сумма:</b> {AMOUNT}\n\n"
        f"Переведи на карту <b>{CARD_NUMBER}</b>\n"
        f"Как получишь деньги — нажми кнопку 👇"
    )
    markup = {
        "inline_keyboard": [[
            {"text": "✅ Оплата получена — отправить чек-листы", "callback_data": f"confirm_{order_id}_{email}"}
        ]]
    }
    tg_send(token, OWNER_CHAT_ID, owner_text, markup)

    return {
        "statusCode": 200,
        "headers": CORS_HEADERS,
        "body": json.dumps({
            "ok": True,
            "order_id": order_id,
            "card": CARD_NUMBER,
            "card_name": CARD_NAME,
            "amount": AMOUNT,
        }, ensure_ascii=False),
    }


def handle_webhook(body: dict, token: str) -> dict:
    import psycopg2
    callback_query = body.get("callback_query")
    if not callback_query:
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": json.dumps({"ok": True})}

    callback_id = callback_query.get("id")
    data = callback_query.get("data", "")

    if not data.startswith("confirm_"):
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": json.dumps({"ok": True})}

    parts = data.split("_", 2)
    if len(parts) < 3:
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": json.dumps({"ok": True})}

    order_id = parts[1]
    email = parts[2]

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute("SELECT status FROM checklist_orders WHERE id = %s", (order_id,))
    row = cur.fetchone()

    if row and row[0] == "paid":
        tg_answer_callback(token, callback_id, "Уже отправлено ранее!")
        cur.close()
        conn.close()
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": json.dumps({"ok": True})}

    cur.execute("UPDATE checklist_orders SET status = 'paid' WHERE id = %s", (order_id,))
    conn.commit()
    cur.close()
    conn.close()

    try:
        send_email(email, order_id)
        tg_answer_callback(token, callback_id, "✅ Чек-листы отправлены!")
        tg_send(token, str(callback_query["from"]["id"]),
                f"✅ Готово! Письмо с 16 чек-листами отправлено на <b>{email}</b>")
    except Exception as e:
        print(f"[EMAIL ERROR] {e}")
        tg_answer_callback(token, callback_id, "❌ Ошибка отправки письма!")
        tg_send(token, str(callback_query["from"]["id"]),
                f"❌ Ошибка отправки письма на <b>{email}</b>:\n<code>{e}</code>")

    return {
        "statusCode": 200,
        "headers": CORS_HEADERS,
        "body": json.dumps({"ok": True}),
    }


def handler(event: dict, context) -> dict:
    """Покупка чек-листов: приём заявки, webhook бота, загрузка файлов в S3."""

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    path = event.get("path", "/")
    body = json.loads(event.get("body") or "{}")
    token = os.environ["TELEGRAM_BOT_TOKEN"]

    if path.endswith("/setup") or body.get("action") == "setup":
        return handle_setup(body)

    if "callback_query" in body or "message" in body or "update_id" in body:
        return handle_webhook(body, token)

    return handle_buy(body, token)