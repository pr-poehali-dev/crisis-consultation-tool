CREATE TABLE IF NOT EXISTS t_p93544965_crisis_consultation_.diagnostics_counter (
  id SERIAL PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 247,
  updated_at TIMESTAMP DEFAULT NOW()
);
INSERT INTO t_p93544965_crisis_consultation_.diagnostics_counter (count) VALUES (247);
