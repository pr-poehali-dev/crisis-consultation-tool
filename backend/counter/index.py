"""Счётчик пройденных диагностик. GET — получить значение, POST — увеличить на 1."""
import json
import os
import psycopg2

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()

    method = event.get("httpMethod", "GET")

    if method == "POST":
        cur.execute(
            "UPDATE t_p93544965_crisis_consultation_.diagnostics_counter SET count = count + 1, updated_at = NOW() WHERE id = 1 RETURNING count"
        )
        row = cur.fetchone()
        conn.commit()
        count = row[0] if row else 247
    else:
        cur.execute("SELECT count FROM t_p93544965_crisis_consultation_.diagnostics_counter WHERE id = 1")
        row = cur.fetchone()
        count = row[0] if row else 247

    cur.close()
    conn.close()

    return {
        "statusCode": 200,
        "headers": {**CORS, "Content-Type": "application/json"},
        "body": json.dumps({"count": count}),
    }
