-- seed.sql

-- Define UUID variables for schools to link instructors and packages
DO $$ 
DECLARE
  s_a1_mar uuid := gen_random_uuid();
  s_mar_acad uuid := gen_random_uuid();
  s_newnan uuid := gen_random_uuid();
  
  s_dsg_alph uuid := gen_random_uuid();
  s_nsh uuid := gen_random_uuid();
  s_allstar uuid := gen_random_uuid();
  
  s_1act uuid := gen_random_uuid();
  s_jireh uuid := gen_random_uuid();
  s_social uuid := gen_random_uuid();
  
  s_a1_smy uuid := gen_random_uuid();
  s_scobb uuid := gen_random_uuid();
  
  s_taggart uuid := gen_random_uuid();
  s_trillium uuid := gen_random_uuid();
  s_sandy uuid := gen_random_uuid();
BEGIN

  -- 1. Insert Schools (Atlanta MSA Expansion - Verified Data Only)
  INSERT INTO public.schools (id, business_name, description, zip_code, is_verified, rating, review_count, phone) VALUES
  
  -- Marietta
  (s_a1_mar, 'A1 Driving School (Marietta)', 'Marietta location.', '30067', true, 4.7, 320, '(770) 962-9555'),
  (s_mar_acad, 'Marietta Driving Academy', 'Fetch Failed (ENOTFOUND). Requires manual update.', '30060', false, 0, 0, null),
  (s_newnan, 'Newnan Driving School', 'Fetch Failed (ENOTFOUND). Requires manual update.', '30062', false, 0, 0, null),
  
  -- Alpharetta / Milton
  (s_dsg_alph, 'Drive Smart Georgia (Alpharetta)', 'Alpharetta location.', '30041', true, 4.9, 450, '770.232.0900'),
  (s_nsh, 'NSH Driving Academy', 'Fetch Failed (ENOTFOUND). Requires manual update.', '30004', false, 0, 0, null),
  (s_allstar, 'All Star Driver Ed', 'Fetch Failed (ENOTFOUND). Requires manual update.', '30022', false, 0, 0, null),
  
  -- Lawrenceville / Gwinnett
  (s_1act, '1 ACT Driving Schools', 'Fetch Failed (404). Requires manual update.', '30044', false, 0, 0, null),
  (s_jireh, 'Jireh Driving School', 'Fetch Failed (ENOTFOUND). Requires manual update.', '30046', false, 0, 0, null),
  (s_social, 'Social Circle Driving School', 'Fetch Failed (ENOTFOUND). Requires manual update.', '30043', false, 0, 0, null),
  
  -- Smyrna / Vinings
  (s_a1_smy, 'A1 Driving School (Smyrna)', 'Fetch Failed (404). Requires manual update.', '30080', false, 0, 0, null),
  (s_scobb, 'South Cobb Driving School', 'Fetch Failed (ENOTFOUND). Requires manual update.', '30082', false, 0, 0, null),
  
  -- Sandy Springs / Roswell
  (s_taggart, 'Taggart''s Driving School', 'Fetch Failed (403 Forbidden). Requires manual update.', '30328', false, 0, 0, null),
  (s_trillium, 'Trillium Driving School', 'Roswell location.', '30075', true, 4.7, 150, '770-685-1413'),
  (s_sandy, 'Sandy Springs Driving School', 'Fetch Failed (ENOTFOUND). Requires manual update.', '30076', false, 0, 0, null);

  -- 2. Insert Packages (Joshua's Law 30/6)
  INSERT INTO public.packages (school_id, title, description, type, hours_classroom, hours_behind_wheel, price) VALUES
  
  (s_a1_mar, '30/6 Joshua''s Law Bundle', 'Price TBD - Requires Manual Verification', 'joshuas-law-30-6', 30, 6, 0.00),
  (s_mar_acad, 'Joshua''s Law 30/6', 'Price TBD - Fetch Failed', 'joshuas-law-30-6', 30, 6, 0.00),
  (s_newnan, 'Joshua''s Law 30/6', 'Price TBD - Fetch Failed', 'joshuas-law-30-6', 30, 6, 0.00),
  
  (s_dsg_alph, 'Joshua''s Law 30/6 Driver Ed', 'Verified 30/6 Package.', 'joshuas-law-30-6', 30, 6, 599.00),
  (s_nsh, 'Teen 30/6 Package', 'Price TBD - Fetch Failed', 'joshuas-law-30-6', 30, 6, 0.00),
  (s_allstar, 'Standard Joshua''s Law Course', 'Price TBD - Fetch Failed', 'joshuas-law-30-6', 30, 6, 0.00),
  
  (s_1act, 'Gwinnett Joshua''s Law Combo', 'Price TBD - Fetch Failed', 'joshuas-law-30-6', 30, 6, 0.00),
  (s_jireh, '30/6 Program', 'Price TBD - Fetch Failed', 'joshuas-law-30-6', 30, 6, 0.00),
  (s_social, 'Teen Driver Plan', 'Price TBD - Fetch Failed', 'joshuas-law-30-6', 30, 6, 0.00),
  
  (s_a1_smy, '30/6 Joshua''s Law Bundle', 'Price TBD - Fetch Failed', 'joshuas-law-30-6', 30, 6, 0.00),
  (s_scobb, '30/6 Combo', 'Price TBD - Fetch Failed', 'joshuas-law-30-6', 30, 6, 0.00),
  
  (s_taggart, 'Joshua''s Law 30/6 Complete Package', 'Price TBD - Fetch Failed', 'joshuas-law-30-6', 30, 6, 0.00),
  (s_trillium, '30/6 Teen Driver Ed', 'Price TBD - Requires Manual Verification', 'joshuas-law-30-6', 30, 6, 0.00),
  (s_sandy, 'Sandy Springs 30/6 Program', 'Price TBD - Fetch Failed', 'joshuas-law-30-6', 30, 6, 0.00);

END $$;