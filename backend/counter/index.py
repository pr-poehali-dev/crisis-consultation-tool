"""Счётчик скачиваний чек-листов. GET — сколько скачали сегодня, POST — +1 к сегодняшнему счётчику."""
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
        cur.execute("""
            INSERT INTO downloads_counter (download_date, count)
            VALUES (CURRENT_DATE, 1)
            ON CONFLICT (download_date) DO UPDATE
            SET count = downloads_counter.count + 1
            RETURNING count
        """)
        row = cur.fetchone()
        conn.commit()
        count = row[0] if row else 1
    else:
        cur.execute("SELECT count FROM downloads_counter WHERE download_date = CURRENT_DATE")
        row = cur.fetchone()
        count = row[0] if row else 0

    cur.close()
    conn.close()

    return {
        "statusCode": 200,
        "headers": {**CORS, "Content-Type": "application/json"},
        "body": json.dumps({"count": count}),
    }
