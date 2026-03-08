CREATE TABLE IF NOT EXISTS downloads_counter (
    id SERIAL PRIMARY KEY,
    download_date DATE NOT NULL DEFAULT CURRENT_DATE,
    count INTEGER NOT NULL DEFAULT 0,
    UNIQUE(download_date)
);

INSERT INTO downloads_counter (download_date, count) VALUES (CURRENT_DATE, 0) ON CONFLICT DO NOTHING;
