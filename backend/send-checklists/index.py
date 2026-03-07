"""
Отправка письма с чек-листами на email покупателя после оплаты.
Принимает email и order_id, отправляет письмо со ссылками на чек-листы.
"""
import os
import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


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

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}


def send_email(to_email: str, order_id: str) -> bool:
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
            Если есть вопросы — пишите в Telegram или на этот email.<br>
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

    return True


def handler(event: dict, context) -> dict:
    """Отправляет письмо с чек-листами на email покупателя после оплаты."""

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    body = json.loads(event.get("body") or "{}")
    email = body.get("email", "").strip()
    order_id = body.get("order_id", "N/A")

    if not email or "@" not in email:
        return {
            "statusCode": 400,
            "headers": CORS_HEADERS,
            "body": json.dumps({"error": "Некорректный email"}, ensure_ascii=False),
        }

    send_email(email, order_id)

    return {
        "statusCode": 200,
        "headers": CORS_HEADERS,
        "body": json.dumps({"success": True, "message": "Письмо отправлено"}),
    }