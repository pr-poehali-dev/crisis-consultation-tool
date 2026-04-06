ALTER TABLE t_p93544965_crisis_consultation_.leads
  ADD COLUMN IF NOT EXISTS notify_tg boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS notify_email boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS notify_error text DEFAULT NULL;
