CREATE TABLE IF NOT EXISTS public.guest_activity (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  guest_id VARCHAR(16) NOT NULL,
  activity_date date NOT NULL,
  word_count integer DEFAULT 0,
  refinement_count integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT guest_activity_pkey PRIMARY KEY (id),
  CONSTRAINT guest_activity_guest_date_unique UNIQUE (guest_id, activity_date)
);

CREATE INDEX IF NOT EXISTS guest_activity_guest_date_idx ON public.guest_activity(guest_id, activity_date);

