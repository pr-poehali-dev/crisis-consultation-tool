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


MARATHON_EMAIL_HTML = """<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#111;font-family:Arial,sans-serif;color:#fff;">
  <div style="max-width:620px;margin:0 auto;padding:32px 20px;">

    <div style="background:#1a1a1a;border-radius:16px;padding:32px;margin-bottom:24px;">
      <h1 style="color:#ff8c00;font-size:26px;margin:0 0 8px;">🏃 15-дневный марафон для ресторатора</h1>
      <p style="color:#ccc;margin:0;">Здравствуйте, {name}!<br>Ваш марафон готов. Начинайте прямо сегодня.</p>
    </div>

    <div style="background:#1a1a1a;border-radius:16px;padding:28px;margin-bottom:16px;">
      <h2 style="color:#fff;font-size:18px;margin:0 0 16px;">📦 Неделя 1 — Склад и учёт (дни 1–5)</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr style="background:#222;"><td style="padding:10px 12px;color:#ff8c00;font-weight:bold;border-radius:6px 0 0 6px;">День 1</td><td style="padding:10px 12px;color:#fff;">Выявляем «дырки» — пересчитайте 30 ключевых товаров, заполните аудит-файл</td></tr>
        <tr><td style="padding:10px 12px;color:#ff8c00;font-weight:bold;">День 2</td><td style="padding:10px 12px;color:#ccc;">Убираем хаос — промаркируйте 10 товаров наклейками (дата / открытие / срок)</td></tr>
        <tr style="background:#222;"><td style="padding:10px 12px;color:#ff8c00;font-weight:bold;">День 3</td><td style="padding:10px 12px;color:#fff;">Инвентаризация — проведите по 10 позициям, зафиксируйте результат</td></tr>
        <tr><td style="padding:10px 12px;color:#ff8c00;font-weight:bold;">День 4</td><td style="padding:10px 12px;color:#ccc;">Контроль температур — ведите журнал 2 смены</td></tr>
        <tr style="background:#222;"><td style="padding:10px 12px;color:#ff8c00;font-weight:bold;border-radius:0 0 0 6px;">День 5</td><td style="padding:10px 12px;color:#fff;">Списания — выгрузите за 30 дней, найдите ТОП-3 причины</td></tr>
      </table>
    </div>

    <div style="background:#1a1a1a;border-radius:16px;padding:28px;margin-bottom:16px;">
      <h2 style="color:#fff;font-size:18px;margin:0 0 16px;">🚚 Неделя 2 — Закупки и поставки (дни 6–10)</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr style="background:#222;"><td style="padding:10px 12px;color:#3b82f6;font-weight:bold;">День 6</td><td style="padding:10px 12px;color:#fff;">Поставщики — составьте карточки 5 ключевых поставщиков</td></tr>
        <tr><td style="padding:10px 12px;color:#3b82f6;font-weight:bold;">День 7</td><td style="padding:10px 12px;color:#ccc;">Попросите скидку — подготовьте запрос по 3 товарам, отправьте поставщику</td></tr>
        <tr style="background:#222;"><td style="padding:10px 12px;color:#3b82f6;font-weight:bold;">День 8</td><td style="padding:10px 12px;color:#fff;">Считаем партии — рассчитайте выгодный объём закупки для 1 товара</td></tr>
        <tr><td style="padding:10px 12px;color:#3b82f6;font-weight:bold;">День 9</td><td style="padding:10px 12px;color:#ccc;">Оцениваем поставщиков — заполните KPI по 3 поставщикам</td></tr>
        <tr style="background:#222;"><td style="padding:10px 12px;color:#3b82f6;font-weight:bold;">День 10</td><td style="padding:10px 12px;color:#fff;">План экономии — 3 меры снижения затрат с расчётом эффекта</td></tr>
      </table>
    </div>

    <div style="background:#1a1a1a;border-radius:16px;padding:28px;margin-bottom:24px;">
      <h2 style="color:#fff;font-size:18px;margin:0 0 16px;">⚙️ Неделя 3 — Процессы и внедрение (дни 11–15)</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr style="background:#222;"><td style="padding:10px 12px;color:#22c55e;font-weight:bold;">День 11</td><td style="padding:10px 12px;color:#fff;">Регламент приёмки — стандартизируйте приёмку и примените на практике</td></tr>
        <tr><td style="padding:10px 12px;color:#22c55e;font-weight:bold;">День 12</td><td style="padding:10px 12px;color:#ccc;">Мини-дашборд — 5 ключевых показателей за 14 дней</td></tr>
        <tr style="background:#222;"><td style="padding:10px 12px;color:#22c55e;font-weight:bold;">День 13</td><td style="padding:10px 12px;color:#fff;">Мотивация команды — формула бонуса для одной смены</td></tr>
        <tr><td style="padding:10px 12px;color:#22c55e;font-weight:bold;">День 14</td><td style="padding:10px 12px;color:#ccc;">Тайная проверка — одна внезапная проверка по чек-листу</td></tr>
        <tr style="background:#222;"><td style="padding:10px 12px;color:#22c55e;font-weight:bold;">День 15</td><td style="padding:10px 12px;color:#fff;">Финал — упакуйте все результаты и отправьте в Telegram на разбор</td></tr>
      </table>
    </div>

    <div style="background:linear-gradient(135deg,#1a0f00,#2d1a00);border:1px solid #ff6a00;border-radius:16px;padding:28px;text-align:center;">
      <h3 style="color:#ff8c00;margin:0 0 10px;">🎁 После финала — разбор лично со мной</h3>
      <p style="color:#ccc;margin:0 0 20px;">Отправьте финальный пакет — разберём результаты вместе на звонке.</p>
      <a href="https://t.me/FatullayevRuslan" style="display:inline-block;background:#ff6a00;color:#fff;font-weight:bold;padding:14px 28px;border-radius:10px;text-decoration:none;font-size:16px;">
        Написать Руслану в Telegram →
      </a>
    </div>

    <p style="color:#555;font-size:12px;text-align:center;margin-top:28px;">
      Руслан Фатуллаев · Эксперт по ресторанному бизнесу · 16 лет · 50+ заведений
    </p>
  </div>
</body>
</html>"""


def send_tg_message(chat_id: str, text: str, token: str):
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = json.dumps({"chat_id": chat_id, "text": text, "parse_mode": "HTML"}).encode()
    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
    try:
        urllib.request.urlopen(req)
    except urllib.error.HTTPError:
        pass


def handle_marathon(body: dict) -> dict:
    """Обрабатывает запись на марафон: отправляет марафон участнику (email или Telegram) и уведомляет владельца."""
    name = body.get("name", "—")
    mode = body.get("mode", "—")
    telegram = body.get("telegram", "").strip().lstrip("@")
    email = body.get("email", "").strip()
    token = os.environ["TELEGRAM_BOT_TOKEN"]

    if mode == "email" and email:
        try:
            html = MARATHON_EMAIL_HTML.replace("{name}", name)
            send_email(email, "Ваш 15-дневный марафон для ресторатора — Руслан Фатуллаев", html)
        except Exception as e:
            return {
                "statusCode": 200,
                "headers": {"Access-Control-Allow-Origin": "*"},
                "body": json.dumps({"ok": False, "error": str(e)}),
            }

    owner_text = (
        f"🏃 <b>Новая запись на марафон!</b>\n\n"
        f"👤 <b>Имя:</b> {name}\n"
        f"📬 <b>Способ:</b> {mode}\n"
        f"📞 <b>Контакт:</b> {'@' + telegram if telegram else email}"
    )
    send_tg_message(CHAT_ID, owner_text, token)

    if mode == "telegram" and telegram:
        marathon_text = (
            f"🏃 <b>Привет, {name}!</b>\n\n"
            f"Вот твой 15-дневный марафон для ресторатора от Руслана Фатуллаева.\n\n"
            f"<b>📦 Неделя 1 — Склад и учёт</b>\n"
            f"День 1: Выявляем «дырки» — пересчитайте 30 ключевых товаров\n"
            f"День 2: Убираем хаос — промаркируйте 10 товаров наклейками\n"
            f"День 3: Инвентаризация — проведите по 10 позициям\n"
            f"День 4: Контроль температур — ведите журнал 2 смены\n"
            f"День 5: Списания — найдите ТОП-3 причины за 30 дней\n\n"
            f"<b>🚚 Неделя 2 — Закупки и поставки</b>\n"
            f"День 6: Карточки 5 ключевых поставщиков\n"
            f"День 7: Попросите скидку по 3 товарам\n"
            f"День 8: Рассчитайте выгодный объём закупки\n"
            f"День 9: KPI по 3 поставщикам\n"
            f"День 10: 3 меры экономии с расчётом\n\n"
            f"<b>⚙️ Неделя 3 — Процессы и внедрение</b>\n"
            f"День 11: Регламент приёмки — внедрите стандарт\n"
            f"День 12: Мини-дашборд из 5 показателей\n"
            f"День 13: Схема мотивации для одной смены\n"
            f"День 14: Тайная проверка по чек-листу\n"
            f"День 15: Финал — упакуйте всё и пришлите на разбор\n\n"
            f"🎁 <b>После финала</b> — персональный разбор со мной лично.\n"
            f"Пиши: @FatullayevRuslan"
        )
        send_tg_message("@" + telegram, marathon_text, token)

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