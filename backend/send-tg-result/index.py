import os
import json
import urllib.request
import urllib.error


def handler(event: dict, context) -> dict:
    """Отправляет результат диагностики пользователю в Telegram по его username или chat_id."""
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
    tg_username = body.get("tg_username", "").strip().lstrip("@")
    chat_id = body.get("chat_id", "")
    name = body.get("name", "")
    score = body.get("score")
    result_label = body.get("result_label", "")
    project = body.get("project", "")

    if not tg_username and not chat_id:
        return {
            "statusCode": 200,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"ok": False, "error": "no_tg_target"}),
        }

    score_display = f"{score}%" if score is not None else "—"

    if score is not None:
        if score >= 70:
            emoji = "💚"
            advice = "Ваш бизнес в хорошей форме! Есть возможности для роста — наш эксперт поможет найти точки масштабирования."
        elif score >= 40:
            emoji = "🟡"
            advice = "Есть серьёзные зоны риска. Без корректировки ситуация может ухудшиться. Рекомендуем консультацию с антикризисником."
        else:
            emoji = "🔴"
            advice = "Критическое состояние. Нужны срочные меры. Запишитесь на консультацию — первый шаг к выходу из кризиса."
    else:
        emoji = "📊"
        advice = "Запишитесь на консультацию, чтобы разобрать вашу ситуацию подробнее."

    project_line = f"\n🍽 <b>Заведение:</b> {project}" if project else ""

    text = (
        f"📊 <b>Ваши результаты диагностики</b>\n\n"
        f"👤 <b>Участник:</b> {name}{project_line}\n\n"
        f"{emoji} <b>Рентабельность бизнеса:</b> {score_display}\n"
        f"📌 <b>Итог:</b> {result_label}\n\n"
        f"💡 {advice}\n\n"
        f"👇 Записаться на <b>бесплатную консультацию</b> с антикризисником:\n"
        f"https://t.me/crisis_consultant_bot"
    )

    token = os.environ["TELEGRAM_BOT_TOKEN"]
    recipient = f"@{tg_username}" if tg_username else chat_id
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = json.dumps({
        "chat_id": recipient,
        "text": text,
        "parse_mode": "HTML"
    }).encode()

    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
    try:
        urllib.request.urlopen(req)
    except urllib.error.HTTPError as e:
        error_body = e.read().decode()
        return {
            "statusCode": 200,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"ok": False, "tg_error": error_body}),
        }

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"ok": True}),
    }
