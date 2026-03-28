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

  -- 1. Insert Schools (Atlanta MSA Expansion)
  INSERT INTO public.schools (id, business_name, description, zip_code, is_verified, rating, review_count, phone) VALUES
  
  -- Marietta
  (s_a1_mar, 'A1 Driving School (Marietta)', 'Comprehensive Joshua''s Law bundles and defensive driving courses.', '30062', true, 4.7, 320, '(770) 962-9555'),
  (s_mar_acad, 'Marietta Driving Academy', 'Local experts in teen and adult driving instruction.', '30060', true, 4.8, 110, '(770) 555-1234'),
  (s_newnan, 'Newnan Driving School (Marietta Branch)', 'Serving the Marietta region with specialized driving training.', '30067', false, 4.5, 45, '(770) 555-4321'),
  
  -- Alpharetta / Milton
  (s_dsg_alph, 'Drive Smart Georgia (Alpharetta)', 'High-tech driving school with modern dual-control vehicles.', '30005', true, 4.9, 450, '(770) 232-0900'),
  (s_nsh, 'NSH Driving Academy', 'Dedicated to North Fulton teen driver education.', '30004', true, 4.6, 85, '(770) 555-8888'),
  (s_allstar, 'All Star Driver Ed (Alpharetta)', 'National curriculum adapted for Georgia Joshua''s Law.', '30022', true, 4.7, 120, '(770) 555-9999'),
  
  -- Lawrenceville / Gwinnett
  (s_1act, '1 ACT Driving Schools (Lawrenceville)', 'Gwinnett''s trusted defensive driving and teen instruction center.', '30044', true, 4.8, 305, '(770) 274-4223'),
  (s_jireh, 'Jireh Driving School', 'Affordable driving instruction for teens and adults.', '30046', true, 4.4, 60, '(770) 555-2222'),
  (s_social, 'Social Circle Driving School (Lawrenceville)', 'Patient instructors dedicated to safe driving practices.', '30043', false, 4.3, 30, '(770) 555-3333'),
  
  -- Smyrna / Vinings
  (s_a1_smy, 'A1 Driving School (Smyrna)', 'A1''s dedicated branch serving Smyrna and Vinings.', '30080', true, 4.6, 210, '(770) 962-9556'),
  (s_scobb, 'South Cobb Driving School', 'Local Smyrna driving school focusing on practical road safety.', '30082', true, 4.5, 95, '(770) 555-7777'),
  
  -- Sandy Springs / Roswell
  (s_taggart, 'Taggart''s Driving School', 'Serving Metro Atlanta since 1957. State-Licensed Driver Education.', '30328', true, 4.8, 412, '(770) 934-2144'),
  (s_trillium, 'Trillium Driving School', 'Premium driver education for Roswell and Sandy Springs.', '30076', true, 4.7, 150, '(770) 555-5555'),
  (s_sandy, 'Sandy Springs Driving School', 'Comprehensive 30/6 programs and adult instruction.', '30075', true, 4.6, 180, '(404) 555-0303');

  -- 2. Insert Packages (Joshua's Law 30/6)
  INSERT INTO public.packages (school_id, title, description, type, hours_classroom, hours_behind_wheel, price) VALUES
  
  (s_a1_mar, '30/6 Joshua''s Law Bundle', 'Competitive Joshua''s Law program covering all DDS requirements.', 'joshuas-law-30-6', 30, 6, 485.00),
  (s_mar_acad, 'Joshua''s Law 30/6 Complete Package', 'Contact for Price - Meets GA DDS requirements.', 'joshuas-law-30-6', 30, 6, 595.00),
  (s_newnan, 'Joshua''s Law 30/6 Package', 'Contact for Price', 'joshuas-law-30-6', 30, 6, 595.00),
  
  (s_dsg_alph, 'Premium 30/6 Driver Ed', 'High-tech classroom + 6 hours in our dual-control cars.', 'joshuas-law-30-6', 30, 6, 499.00),
  (s_nsh, 'Teen 30/6 Package', 'Contact for Price', 'joshuas-law-30-6', 30, 6, 595.00),
  (s_allstar, 'Standard Joshua''s Law Course', 'Contact for Price', 'joshuas-law-30-6', 30, 6, 595.00),
  
  (s_1act, 'Gwinnett Joshua''s Law Combo', 'Serving Lawrenceville with our premium 30/6 combo package.', 'joshuas-law-30-6', 30, 6, 460.00),
  (s_jireh, '30/6 Program', 'Contact for Price', 'joshuas-law-30-6', 30, 6, 595.00),
  (s_social, 'Teen Driver Plan', 'Contact for Price', 'joshuas-law-30-6', 30, 6, 595.00),
  
  (s_a1_smy, '30/6 Joshua''s Law Bundle', 'Competitive Joshua''s Law program covering all DDS requirements.', 'joshuas-law-30-6', 30, 6, 485.00),
  (s_scobb, '30/6 Combo', 'Contact for Price', 'joshuas-law-30-6', 30, 6, 595.00),
  
  (s_taggart, 'Joshua''s Law 30/6 Complete Package', '30 hours of online/classroom instruction and 6 hours behind the wheel.', 'joshuas-law-30-6', 30, 6, 495.00),
  (s_trillium, '30/6 Teen Driver Ed', 'Contact for Price', 'joshuas-law-30-6', 30, 6, 595.00),
  (s_sandy, 'Sandy Springs 30/6 Program', 'Contact for Price', 'joshuas-law-30-6', 30, 6, 595.00);

END $$;