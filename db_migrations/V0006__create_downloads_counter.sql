CREATE TABLE IF NOT EXISTS downloads_counter (
    download_date DATE PRIMARY KEY,
    count INTEGER NOT NULL DEFAULT 0
);