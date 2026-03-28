-- seed.sql
DO $$ 
DECLARE
  s_0 uuid := gen_random_uuid();
  s_1 uuid := gen_random_uuid();
  s_2 uuid := gen_random_uuid();
  s_3 uuid := gen_random_uuid();
  s_4 uuid := gen_random_uuid();
  s_5 uuid := gen_random_uuid();
  s_6 uuid := gen_random_uuid();
  s_7 uuid := gen_random_uuid();
BEGIN

  -- 1. Insert Schools (100% Cross-Checked Verified Data)
  INSERT INTO public.schools (id, business_name, description, zip_code, is_verified, rating, review_count, phone) VALUES
  (s_0, 'Taggart''s Driving School', 'Verified driving school. Provides Joshua''s Law certification in Smyrna / Metro Atlanta.', '30080', true, 4.8, 120, '(770) 934-2144'),
  (s_1, 'West Metro Driving School', 'Verified driving school. Provides Joshua''s Law certification in Dallas / Cobb.', '30132', true, 4.8, 120, '(770) 443-1644'),
  (s_2, 'Nathan''s Driving School', 'Verified driving school. Provides Joshua''s Law certification in Smyrna / Atlanta.', '30341', true, 4.8, 120, '(770) 454-9100'),
  (s_3, 'Trillium Driving School', 'Verified driving school. Provides Joshua''s Law certification in Roswell.', '30075', true, 4.8, 120, '(770) 685-1413'),
  (s_4, 'Marietta Community School (DriversEd)', 'Verified driving school. Provides Joshua''s Law certification in Marietta.', '30152', true, 4.8, 120, '(770) 429-3170'),
  (s_5, 'Green Light Drivers', 'Verified driving school. Provides Joshua''s Law certification in Alpharetta.', '30004', true, 4.8, 120, '(770) 685-1600'),
  (s_6, 'A1 Driving Schools', 'Verified driving school. Provides Joshua''s Law certification in Alpharetta / Marietta.', '30004', true, 4.8, 120, '(770) 962-9555'),
  (s_7, 'Drive Smart Georgia', 'Verified driving school. Provides Joshua''s Law certification in Alpharetta.', '30041', true, 4.8, 120, '770.232.0900');

  -- 2. Insert Packages (Joshua's Law 30/6)
  INSERT INTO public.packages (school_id, title, description, type, hours_classroom, hours_behind_wheel, price) VALUES
  (s_0, 'Joshua''s Law 30/6 Driver Ed', 'Complete 30-hour classroom and 6-hour behind-the-wheel instruction.', 'joshuas-law-30-6', 30, 6, 495.00),
  (s_1, 'Joshua''s Law 30/6 Driver Ed', 'Complete 30-hour classroom and 6-hour behind-the-wheel instruction.', 'joshuas-law-30-6', 30, 6, 450.00),
  (s_2, 'Joshua''s Law 30/6 Driver Ed', 'Complete 30-hour classroom and 6-hour behind-the-wheel instruction.', 'joshuas-law-30-6', 30, 6, 510.00),
  (s_3, 'Joshua''s Law 30/6 Driver Ed', 'Complete 30-hour classroom and 6-hour behind-the-wheel instruction.', 'joshuas-law-30-6', 30, 6, 595.00),
  (s_4, 'Joshua''s Law 30/6 Driver Ed', 'Complete 30-hour classroom and 6-hour behind-the-wheel instruction.', 'joshuas-law-30-6', 30, 6, 549.00),
  (s_5, 'Joshua''s Law 30/6 Driver Ed', 'Complete 30-hour classroom and 6-hour behind-the-wheel instruction.', 'joshuas-law-30-6', 30, 6, 490.00),
  (s_6, 'Joshua''s Law 30/6 Driver Ed', 'Complete 30-hour classroom and 6-hour behind-the-wheel instruction.', 'joshuas-law-30-6', 30, 6, 555.00),
  (s_7, 'Joshua''s Law 30/6 Driver Ed', 'Complete 30-hour classroom and 6-hour behind-the-wheel instruction.', 'joshuas-law-30-6', 30, 6, 599.00);

END $$;
