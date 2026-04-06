"""Список заявок для личного кабинета. v4."""
import os
import json
import psycopg2
import psycopg2.extras


ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "")


def handler(event: dict, context) -> dict:
    """Возвращает список заявок для личного кабинета (требует пароль)."""
    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, X-Admin-Password",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    headers = event.get("headers") or {}
    params = event.get("queryStringParameters") or {}
    password = headers.get("X-Admin-Password", "") or params.get("p", "")
    print(f"[AUTH] env_pwd_set={bool(ADMIN_PASSWORD)} env_len={len(ADMIN_PASSWORD)} given_len={len(password)} match={password == ADMIN_PASSWORD}")
    if not ADMIN_PASSWORD or password != ADMIN_PASSWORD:
        return {
            "statusCode": 401,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"ok": False, "error": "Unauthorized"}),
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
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"ok": True, "leads": leads}),
    }