"""Список заявок для личного кабинета. v8 — доступ по секретному токену в URL."""
import os
import json
import psycopg2
import psycopg2.extras


SECRET_TOKEN = os.environ.get("ADMIN_PASSWORD", "ruslan2026")

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
}


def handler(event: dict, context) -> dict:
    """Возвращает список заявок для личного кабинета."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    params = event.get("queryStringParameters") or {}
    token = params.get("token", "")
    print(f"[AUTH] token_len={len(token)} secret_len={len(SECRET_TOKEN)} match={token == SECRET_TOKEN}")

    if token != SECRET_TOKEN:
        return {
            "statusCode": 403,
            "headers": {**CORS, "Content-Type": "application/json"},
            "body": json.dumps({"ok": False, "error": "Неверный токен доступа"}),
        }

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute(
        "SELECT id, created_at, name, contact, city, project, staff, problem, score, result_label "
        "FROM t_p93544965_crisis_consultation_.leads "
        "ORDER BY created_at DESC"
    )
    rows = cur.fetchall()
    cur.close()
    conn.close()

    leads = []
    for row in rows:
        r = dict(row)
        r["created_at"] = r["created_at"].isoformat() if r["created_at"] else None
        leads.append(r)

    return {
        "statusCode": 200,
        "headers": {**CORS, "Content-Type": "application/json"},
        "body": json.dumps({"ok": True, "leads": leads}),
    }