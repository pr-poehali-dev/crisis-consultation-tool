CREATE TABLE t_p93544965_crisis_consultation_.leads (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  contact TEXT NOT NULL,
  city TEXT,
  project TEXT,
  staff TEXT,
  problem TEXT,
  score INTEGER,
  result_label TEXT
);