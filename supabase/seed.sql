-- seed.sql
DO $$ 
DECLARE
  s_0 uuid := gen_random_uuid();
  s_1 uuid := gen_random_uuid();
  s_2 uuid := gen_random_uuid();
  s_3 uuid := gen_random_uuid();
BEGIN

  -- 1. Insert Schools (Autonomous Search Engine Data)
  INSERT INTO public.schools (id, business_name, description, zip_code, is_verified, rating, review_count, phone) VALUES
  (s_0, 'Driversed (Marietta)', 'Verified driving school fetched via autonomous search engine. Provides Joshua''s Law certification.', '30152', true, 4.8, 120, '(770) 429-3170'),
  (s_1, 'Teen Driver Ed (Alpharetta)', 'Verified driving school fetched via autonomous search engine. Provides Joshua''s Law certification.', '30004', true, 4.8, 120, '(770) 685-1600'),
  (s_2, 'Atlanta Driver’s Education Classes – Joshua’s Law – A (Alpharetta)', 'Verified driving school fetched via autonomous search engine. Provides Joshua''s Law certification.', '30004', true, 4.8, 120, '(770) 962-9555'),
  (s_3, 'Driving School Alpharetta (Alpharetta)', 'Verified driving school fetched via autonomous search engine. Provides Joshua''s Law certification.', '30041', true, 4.8, 120, '770.232.0900');

  -- 2. Insert Packages (Joshua's Law 30/6)
  INSERT INTO public.packages (school_id, title, description, type, hours_classroom, hours_behind_wheel, price) VALUES
  (s_0, 'Joshua''s Law 30/6 Driver Ed', 'Complete 30-hour classroom and 6-hour behind-the-wheel instruction.', 'joshuas-law-30-6', 30, 6, 549.00),
  (s_1, 'Joshua''s Law 30/6 Driver Ed', 'Complete 30-hour classroom and 6-hour behind-the-wheel instruction.', 'joshuas-law-30-6', 30, 6, 490.00),
  (s_2, 'Joshua''s Law 30/6 Driver Ed', 'Complete 30-hour classroom and 6-hour behind-the-wheel instruction.', 'joshuas-law-30-6', 30, 6, 555.00),
  (s_3, 'Joshua''s Law 30/6 Driver Ed', 'Complete 30-hour classroom and 6-hour behind-the-wheel instruction.', 'joshuas-law-30-6', 30, 6, 599.00);

END $$;
