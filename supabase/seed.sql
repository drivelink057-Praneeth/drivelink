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
  s_8 uuid := gen_random_uuid();
  s_9 uuid := gen_random_uuid();
  s_10 uuid := gen_random_uuid();
  s_11 uuid := gen_random_uuid();
  s_12 uuid := gen_random_uuid();
  s_13 uuid := gen_random_uuid();
  s_14 uuid := gen_random_uuid();
  s_15 uuid := gen_random_uuid();
BEGIN

  -- 1. Insert Schools (Full List per requirements)
  INSERT INTO public.schools (id, business_name, description, zip_code, is_verified, rating, review_count, phone) VALUES
  (s_0, 'A1 Driving School (Marietta)', 'Price TBD', '30062', true, 4.8, 120, '(770) 962-9555'),
  (s_1, 'Marietta Driving Academy', 'Price TBD - Fetch Failed (ENOTFOUND)', '30060', false, 4.8, 120, null),
  (s_2, 'Newnan Driving School', 'Price TBD - Fetch Failed (ENOTFOUND)', '30067', false, 4.8, 120, null),
  (s_3, 'Drive Smart Georgia (Alpharetta)', 'Verified', '30005', true, 4.8, 120, '770.232.0900'),
  (s_4, 'NSH Driving Academy', 'Price TBD - Fetch Failed (ENOTFOUND)', '30004', false, 4.8, 120, null),
  (s_5, 'All Star Driver Ed (Alpharetta)', 'Price TBD - Fetch Failed (ENOTFOUND)', '30022', false, 4.8, 120, null),
  (s_6, '1 ACT Driving Schools (Lawrenceville)', 'Price TBD - Fetch Failed (404)', '30043', false, 4.8, 120, null),
  (s_7, 'Jireh Driving School', 'Price TBD - Fetch Failed (ENOTFOUND)', '30046', false, 4.8, 120, null),
  (s_8, 'Social Circle Driving School', 'Price TBD - Fetch Failed (ENOTFOUND)', '30044', false, 4.8, 120, null),
  (s_9, 'A1 Driving School (Smyrna)', 'Price TBD - Fetch Failed (404)', '30080', false, 4.8, 120, null),
  (s_10, 'South Cobb Driving School', 'Price TBD - Fetch Failed (ENOTFOUND)', '30082', false, 4.8, 120, null),
  (s_11, 'Taggart''s Driving School', 'Verified from Phase 1', '30080', true, 4.8, 120, '(770) 934-2144'),
  (s_12, 'Trillium Driving School', 'Price TBD - Requires Manual Verification', '30075', true, 4.8, 120, '(770) 685-1413'),
  (s_13, 'Sandy Springs Driving School', 'Price TBD - Fetch Failed (ENOTFOUND)', '30328', false, 4.8, 120, null),
  (s_14, 'West Metro Driving School', 'Verified from Phase 1', '30132', true, 4.8, 120, '(770) 443-1644'),
  (s_15, 'Nathan''s Driving School', 'Verified from Phase 1', '30082', true, 4.8, 120, '(770) 454-9100');

  -- 2. Insert Packages (Joshua's Law 30/6)
  INSERT INTO public.packages (school_id, title, description, type, hours_classroom, hours_behind_wheel, price) VALUES
  (s_0, 'Joshua''s Law 30/6 Driver Ed', 'Price TBD', 'joshuas-law-30-6', 30, 6, 0.00),
  (s_1, 'Joshua''s Law 30/6 Driver Ed', 'Price TBD - Fetch Failed (ENOTFOUND)', 'joshuas-law-30-6', 30, 6, 0.00),
  (s_2, 'Joshua''s Law 30/6 Driver Ed', 'Price TBD - Fetch Failed (ENOTFOUND)', 'joshuas-law-30-6', 30, 6, 0.00),
  (s_3, 'Joshua''s Law 30/6 Driver Ed', 'Verified', 'joshuas-law-30-6', 30, 6, 599.00),
  (s_4, 'Joshua''s Law 30/6 Driver Ed', 'Price TBD - Fetch Failed (ENOTFOUND)', 'joshuas-law-30-6', 30, 6, 0.00),
  (s_5, 'Joshua''s Law 30/6 Driver Ed', 'Price TBD - Fetch Failed (ENOTFOUND)', 'joshuas-law-30-6', 30, 6, 0.00),
  (s_6, 'Joshua''s Law 30/6 Driver Ed', 'Price TBD - Fetch Failed (404)', 'joshuas-law-30-6', 30, 6, 0.00),
  (s_7, 'Joshua''s Law 30/6 Driver Ed', 'Price TBD - Fetch Failed (ENOTFOUND)', 'joshuas-law-30-6', 30, 6, 0.00),
  (s_8, 'Joshua''s Law 30/6 Driver Ed', 'Price TBD - Fetch Failed (ENOTFOUND)', 'joshuas-law-30-6', 30, 6, 0.00),
  (s_9, 'Joshua''s Law 30/6 Driver Ed', 'Price TBD - Fetch Failed (404)', 'joshuas-law-30-6', 30, 6, 0.00),
  (s_10, 'Joshua''s Law 30/6 Driver Ed', 'Price TBD - Fetch Failed (ENOTFOUND)', 'joshuas-law-30-6', 30, 6, 0.00),
  (s_11, 'Joshua''s Law 30/6 Driver Ed', 'Verified from Phase 1', 'joshuas-law-30-6', 30, 6, 495.00),
  (s_12, 'Joshua''s Law 30/6 Driver Ed', 'Price TBD - Requires Manual Verification', 'joshuas-law-30-6', 30, 6, 0.00),
  (s_13, 'Joshua''s Law 30/6 Driver Ed', 'Price TBD - Fetch Failed (ENOTFOUND)', 'joshuas-law-30-6', 30, 6, 0.00),
  (s_14, 'Joshua''s Law 30/6 Driver Ed', 'Verified from Phase 1', 'joshuas-law-30-6', 30, 6, 450.00),
  (s_15, 'Joshua''s Law 30/6 Driver Ed', 'Verified from Phase 1', 'joshuas-law-30-6', 30, 6, 510.00);

END $$;
