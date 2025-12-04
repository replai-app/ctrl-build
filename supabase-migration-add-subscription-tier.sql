ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS subscription_tier VARCHAR(10) DEFAULT 'free';

