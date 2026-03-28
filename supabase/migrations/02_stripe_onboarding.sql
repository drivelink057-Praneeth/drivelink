-- 02_stripe_onboarding.sql

ALTER TABLE public.schools
ADD COLUMN IF NOT EXISTS stripe_account_id text,
ADD COLUMN IF NOT EXISTS is_onboarded boolean DEFAULT false;