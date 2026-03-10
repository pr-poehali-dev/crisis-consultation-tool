import os
import json
import urllib.request
import urllib.error
import smtplib
import psycopg2
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

CHAT_ID = "7728954739"


def send_email(to_email: str, subject: str, html_body: str):
    """Отправляет HTML-письмо через SMTP."""
    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = os.environ["SMTP_USER"]
    msg["To"] = to_email
    msg.attach(MIMEText(html_body, "html", "utf-8"))

    with smtplib.SMTP_SSL(os.environ["SMTP_HOST"], 465) as server:
        server.login(os.environ["SMTP_USER"], os.environ["SMTP_PASSWORD"])
        server.sendmail(os.environ["SMTP_USER"], to_email, msg.as_string())


def build_quiz_email(name: str, percent: int, result_label: str, answers: dict) -> str:
    """Формирует персонализированный HTML-отчёт после квиза."""
    if percent >= 75:
        color = "#22c55e"
        emoji = "💚"
        headline = "Ваш бизнес в хорошей форме — есть куда расти!"
        cta_text = "Хотите масштабироваться и выйти на новый уровень? Давайте обсудим."
    elif percent >= 45:
        color = "#f59e0b"
        emoji = "⚠️"
        headline = "Есть серьёзные зоны риска — пора их закрыть"
        cta_text = "Несколько процессов работают против вас. Давайте разберём их вместе."
    else:
        color = "#ef4444"
        emoji = "🔴"
        headline = "Критическое состояние — нужно действовать сейчас"
        cta_text = "Ваш бизнес теряет деньги каждый день. Я помогу остановить это быстро."

    problem_map = {
        "q1": ("Себестоимость блюд", "Нет точных расчётов — значит вы не контролируете маржу. Это один из главных источников потерь."),
        "q2": ("Наценка на блюда", "Низкая наценка = работа в ноль. Нужно пересчитать ценообразование."),
        "q3": ("Динамика выручки", "Выручка падает или скачет — это сигнал системной проблемы, не сезонности."),
        "q4": ("Текучка персонала", "Постоянная замена людей стоит 30–50% их оклада каждый раз. Решается за 2–3 недели."),
        "q5": ("Стандарты сервиса", "Без стандартов каждый делает по-своему — гости это чувствуют и не возвращаются."),
        "q6": ("Анализ меню", "Меню без ABC-анализа — это деньги в убыточных позициях. Можно исправить за неделю."),
        "q7": ("Работа с гостями", "Без программы лояльности вы постоянно привлекаете новых вместо того чтобы удерживать своих."),
        "q8": ("Маркетинг", "Только сарафанное радио — рост невозможен. Нужна минимальная система привлечения."),
        "q9": ("Система учёта", "Ручной учёт = недостача, ошибки, воровство. Автоматизация окупается за 1–2 месяца."),
        "q10": ("Точка безубыточности", "Без финансовой модели вы не знаете реального состояния бизнеса."),
        "q11": ("Поставщики", "Один поставщик — это риск. Цены растут, а вы не можете их остановить."),
        "q12": ("Аренда", "Аренда выше 20% от выручки — критично. Нужно либо пересматривать договор, либо поднимать выручку."),
    }

    weak_items = []
    for q_id, score in answers.items():
        if score == 0 and q_id in problem_map:
            weak_items.append(problem_map[q_id])

    problems_html = ""
    if weak_items:
        items_html = "".join(
            f'<li style="margin-bottom:12px;padding:12px 16px;background:#1a1a1a;border-left:3px solid #ff6a00;border-radius:4px;">'
            f'<strong style="color:#ff8c00;">{title}</strong><br>'
            f'<span style="color:#999;font-size:14px;">{desc}</span></li>'
            for title, desc in weak_items[:4]
        )
        problems_html = f"""
        <h3 style="color:#fff;margin:32px 0 16px;">🎯 Ключевые точки роста для вас:</h3>
        <ul style="list-style:none;padding:0;margin:0;">{items_html}</ul>
        """

    return f"""<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#111;font-family:Arial,sans-serif;color:#fff;">
  <div style="max-width:600px;margin:0 auto;padding:32px 20px;">

    <div style="background:#1a1a1a;border-radius:16px;padding:32px;margin-bottom:24px;">
      <p style="color:#999;font-size:14px;margin:0 0 8px;">Персональный отчёт диагностики</p>
      <h1 style="color:#ff8c00;font-size:28px;margin:0 0 8px;">{emoji} {headline}</h1>
      <p style="color:#ccc;margin:0;">Здравствуйте, {name}!</p>
    </div>

    <div style="background:#1a1a1a;border-radius:16px;padding:32px;margin-bottom:24px;text-align:center;">
      <p style="color:#999;font-size:14px;margin:0 0 8px;">Ваш результат диагностики</p>
      <div style="font-size:64px;font-weight:900;color:{color};line-height:1;">{percent}%</div>
      <p style="color:{color};font-size:18px;font-weight:bold;margin:8px 0 0;">{result_label}</p>
    </div>

    {problems_html}

    <div style="background:linear-gradient(135deg,#1a0f00,#2d1a00);border:1px solid #ff6a00;border-radius:16px;padding:32px;margin-top:24px;">
      <h3 style="color:#ff8c00;margin:0 0 12px;">💬 Что дальше?</h3>
      <p style="color:#ccc;margin:0 0 20px;">{cta_text}</p>
      <a href="https://t.me/FatullayevRuslan" style="display:inline-block;background:#ff6a00;color:#fff;font-weight:bold;padding:14px 28px;border-radius:10px;text-decoration:none;font-size:16px;">
        Написать Руслану в Telegram →
      </a>
    </div>

    <p style="color:#555;font-size:12px;text-align:center;margin-top:32px;">
      Это письмо отправлено автоматически после прохождения диагностики на сайте.<br>
      Руслан Фатуллаев · Эксперт по ресторанному бизнесу
    </p>
  </div>
</body>
</html>"""


def handle_marathon(body: dict) -> dict:
    """Обрабатывает запись на марафон: уведомляет владельца в Telegram."""
    name = body.get("name", "—")
    mode = body.get("mode", "—")
    telegram = body.get("telegram", "")
    email = body.get("email", "")

    contact_line = f"@{telegram}" if telegram else email

    text = (
        f"🏃 <b>Новая запись на марафон!</b>\n\n"
        f"👤 <b>Имя:</b> {name}\n"
        f"📬 <b>Способ:</b> {mode}\n"
        f"📞 <b>Контакт:</b> {contact_line}"
    )

    token = os.environ["TELEGRAM_BOT_TOKEN"]
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = json.dumps({"chat_id": CHAT_ID, "text": text, "parse_mode": "HTML"}).encode()
    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
    try:
        urllib.request.urlopen(req)
    except urllib.error.HTTPError:
        pass

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"ok": True}),
    }


def handler(event: dict, context) -> dict:
    """Уведомления: новая заявка (диагностика) или запись на марафон. Отправляет персонализированный email участнику."""
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

    if body.get("type") == "marathon":
        return handle_marathon(body)

    name = body.get("name", "—")
    contact = body.get("contact", "—")
    city = body.get("city", "—")
    project = body.get("project", "—")
    staff = body.get("staff", "—")
    problem = body.get("problem", "—")
    score = body.get("score")
    result_label = body.get("result_label", "—")
    revenue_change = body.get("revenue_change", "")
    avg_check = body.get("avg_check", "")
    peak_load = body.get("peak_load", "")
    cost_control = body.get("cost_control", "")
    staff_turnover = body.get("staff_turnover", "")
    service_standards = body.get("service_standards", "")
    menu_relevance = body.get("menu_relevance", "")
    main_costs = body.get("main_costs", "")
    crisis_cases = body.get("crisis_cases", "")
    tracked_metrics = body.get("tracked_metrics", "")
    quiz_answers = body.get("quiz_answers", {})

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO t_p93544965_crisis_consultation_.leads "
        "(name, contact, city, project, staff, problem, score, result_label, "
        "revenue_change, avg_check, peak_load, cost_control, staff_turnover, "
        "service_standards, menu_relevance, main_costs, crisis_cases, tracked_metrics) "
        "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
        (name, contact, city, project, staff, problem, score, result_label,
         revenue_change, avg_check, peak_load, cost_control, staff_turnover,
         service_standards, menu_relevance, main_costs, crisis_cases, tracked_metrics),
    )
    conn.commit()
    cur.close()
    conn.close()

    score_display = f"{score}%" if score is not None else "—"

    def fld(label, val):
        return f"\n<b>{label}:</b> {val}" if val and val != "—" else ""

    text = (
        f"🔔 <b>Новая заявка с сайта!</b>\n\n"
        f"👤 <b>Имя:</b> {name}\n"
        f"📞 <b>Контакт:</b> {contact}\n"
        f"🏙 <b>Город:</b> {city}\n"
        f"🍽 <b>Заведение:</b> {project}\n"
        f"👥 <b>Персонал:</b> {staff}\n"
        f"❗️ <b>Проблема:</b> {problem}\n"
        f"📊 <b>Результат:</b> {score_display} — {result_label}"
        f"{fld('📈 Выручка (6 мес.)', revenue_change)}"
        f"{fld('🧾 Средний чек', avg_check)}"
        f"{fld('🪑 Заполненность в пик', peak_load)}"
        f"{fld('📦 Учёт себестоимости', cost_control)}"
        f"{fld('🔄 Текучесть персонала', staff_turnover)}"
        f"{fld('📋 Стандарты сервиса', service_standards)}"
        f"{fld('🍽 Актуальность меню', menu_relevance)}"
        f"{fld('💸 Главные затраты', main_costs)}"
        f"{fld('🚨 Кризисные ситуации', crisis_cases)}"
        f"{fld('📉 Метрики', tracked_metrics)}"
    )

    token = os.environ["TELEGRAM_BOT_TOKEN"]
    tg_url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = json.dumps({"chat_id": CHAT_ID, "text": text, "parse_mode": "HTML"}).encode()

    req = urllib.request.Request(tg_url, data=payload, headers={"Content-Type": "application/json"})
    try:
        urllib.request.urlopen(req)
    except urllib.error.HTTPError as e:
        error_body = e.read().decode()
        return {
            "statusCode": 200,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"ok": False, "tg_error": error_body}),
        }

    if contact and "@" in contact and "." in contact:
        try:
            html = build_quiz_email(name, score or 0, result_label, quiz_answers)
            send_email(contact, f"Ваши результаты диагностики — {score_display}", html)
        except Exception:
            pass

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"ok": True}),
    }
