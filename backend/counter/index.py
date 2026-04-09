"""Счётчик посетителей сайта. POST — +1 визит и сразу возвращает счётчик. v2 оптимизирован."""
import json
import os
import datetime
import psycopg2

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}

# Базовые значения по дням недели (пн=0 ... вс=6), стартуют от 150
BASE_BY_WEEKDAY = [162, 178, 155, 191, 183, 210, 197]

def get_day_multiplier():
    """Каждый день счётчик чуть растёт — имитируем рост аудитории."""
    start = datetime.date(2026, 1, 1)
    today = datetime.date.today()
    days = (today - start).days
    return max(0, days // 7)  # +1 к базе каждую неделю

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
        real = row[0] if row else 1
    else:
        cur.execute("SELECT count FROM downloads_counter WHERE download_date = CURRENT_DATE")
        row = cur.fetchone()
        real = row[0] if row else 0

    cur.close()
    conn.close()

    today = datetime.date.today()
    base = BASE_BY_WEEKDAY[today.weekday()] + get_day_multiplier()
    count = base + real

    return {
        "statusCode": 200,
        "headers": {**CORS, "Content-Type": "application/json"},
        "body": json.dumps({"count": count, "real": real}),
    }