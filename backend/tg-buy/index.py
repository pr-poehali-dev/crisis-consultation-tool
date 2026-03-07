"""
Единая функция для покупки чек-листов через Telegram:
- POST / — принимает email покупателя, сохраняет заявку, отправляет уведомление владельцу
- POST /webhook — обрабатывает callback от бота (кнопка подтверждения оплаты, отправка email)
"""
import os
import json
import urllib.request
import urllib.error
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

OWNER_CHAT_ID = "7728954739"
CARD_NUMBER = "Укажи номер карты Тинькофф"
CARD_NAME = "Руслан Фатуллаев"
AMOUNT = "1 999 ₽"

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
}

CHECKLISTS = [
    "1. Операционный старт кафе — 30 дней",
    "2. Шаблон KPI и дашборд для кафе",
    "3. Гайд «Аудит склада за один день»",
    "4. Набор готовых регламентов — 5 документов",
    "5. Портрет гостя и анализ меню по маржинальности",
    "6. План экономии закупок — 60 дней",
    "7. Чек-листы и сценарии обслуживания для бариста/официанта",
    "8. Промоплан: календарь акций на 3 месяца",
    "9. Кейс: Увеличение оборачиваемости на 25%",
    "10. Идеальный сотрудник — профиль по ролям",
    "11. ABC-анализ для общепита",
    "12. Финансовая модель для запуска ресторана/бара/кофейни",
    "13. Бизнес-план для открытия кофейни/бара/ресторана",
    "14. Тренинги для сотрудников: повара, официанты, бармены",
    "15. Нормы хранения продукции на кухне",
    "16. Аттестация сотрудников зала и кухни",
]


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
    smtp_host = os.environ.get("SMTP_HOST", "smtp.yandex.ru")
    smtp_user = os.environ.get("SMTP_USER", "")
    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    smtp_port = int(os.environ.get("SMTP_PORT", "465"))

    msg = MIMEMultipart("alternative")
    msg["Subject"] = "Ваши чек-листы для ресторатора — 16 документов"
    msg["From"] = f"Руслан Фатуллаев <{smtp_user}>"
    msg["To"] = to_email

    checklists_html = "".join(
        f'<li style="padding: 6px 0; color: #333;">{item}</li>'
        for item in CHECKLISTS
    )

    html = f"""
    <html>
    <body style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(135deg, #FF6B00, #FF2D55); padding: 32px; text-align: center;">
          <h1 style="color: #fff; margin: 0; font-size: 24px;">Ваш пакет чек-листов готов!</h1>
          <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0;">Руслан Фатуллаев — антикризисный управляющий</p>
        </div>
        <div style="padding: 32px;">
          <p style="color: #333; font-size: 16px;">Спасибо за покупку! Вы получили полный пакет из <strong>16 профессиональных чек-листов</strong> для управления рестораном/баром/кофейней.</p>
          <p style="color: #666; font-size: 14px;">Номер заказа: <strong>{order_id}</strong></p>
          <h3 style="color: #FF6B00; border-bottom: 2px solid #FF6B00; padding-bottom: 8px;">Что входит в пакет:</h3>
          <ol style="color: #333; padding-left: 20px; line-height: 1.8;">
            {checklists_html}
          </ol>
          <div style="background: #FFF8F0; border: 1px solid #FF6B00; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <p style="margin: 0; color: #FF6B00; font-weight: bold;">📎 Чек-листы во вложении к этому письму</p>
            <p style="margin: 8px 0 0; color: #666; font-size: 14px;">Все 16 документов прикреплены в формате PDF. Сохраните письмо — в нём всё самое важное.</p>
          </div>
          <p style="color: #666; font-size: 14px; margin-top: 24px;">
            Если есть вопросы — пишите в Telegram.<br>
            С уважением,<br>
            <strong>Руслан Фатуллаев</strong>
          </p>
        </div>
        <div style="background: #f5f5f5; padding: 16px; text-align: center;">
          <p style="color: #999; font-size: 12px; margin: 0;">© 2026 Руслан Фатуллаев. Антикризисный управляющий для общепита.</p>
        </div>
      </div>
    </body>
    </html>
    """

    msg.attach(MIMEText(html, "html", "utf-8"))
    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, to_email, msg.as_string())


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

    send_email(email, order_id)
    tg_answer_callback(token, callback_id, "✅ Чек-листы отправлены!")
    tg_send(token, str(callback_query["from"]["id"]),
            f"✅ Готово! Чек-листы отправлены на <b>{email}</b>")

    return {
        "statusCode": 200,
        "headers": CORS_HEADERS,
        "body": json.dumps({"ok": True}),
    }


def handler(event: dict, context) -> dict:
    """Обрабатывает покупку чек-листов и webhook Telegram-бота."""

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    path = event.get("path", "/")
    body = json.loads(event.get("body") or "{}")
    token = os.environ["TELEGRAM_BOT_TOKEN"]

    if path.endswith("/webhook"):
        return handle_webhook(body, token)

    return handle_buy(body, token)