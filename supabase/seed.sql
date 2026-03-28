-- seed.sql

-- Define UUID variables for schools to link instructors and packages
DO $$ 
DECLARE
  school1 uuid := gen_random_uuid();
  school2 uuid := gen_random_uuid();
  school3 uuid := gen_random_uuid();
  school4 uuid := gen_random_uuid();
BEGIN

  -- 1. Insert Schools (Real Smyrna & Cobb County Data)
  INSERT INTO public.schools (id, business_name, description, zip_code, dds_license_number, is_verified, rating, review_count) VALUES
  (school1, 'Taggart''s Driving School', 'Serving Metro Atlanta since 1957. State-Licensed Driver Education for Teens and Adults. Specializes in Joshua''s Law compliance.', '30080', 'DDS-TAG-1957', true, 4.8, 412),
  (school2, 'A1 Driving School (Marietta)', 'Top-tier driving instruction in Marietta/Smyrna. Comprehensive Joshua''s Law bundles and defensive driving courses.', '30062', 'DDS-A1-2042', true, 4.7, 320),
  (school3, 'Nathan''s Driving School', 'Licensed by the State of Georgia since 1986. We offer comprehensive pickup and drop-off services across Smyrna (30080/30082) for your convenience.', '30082', 'DDS-NAT-1986', true, 4.9, 510),
  (school4, 'West Metro Driving School', 'Top-Rated Georgia Driving School Since 2007. Highly qualified, state-licensed instructors with one-on-one behind-the-wheel training.', '30132', 'DT-427', true, 4.8, 280);

  -- 2. Insert Instructors
  INSERT INTO public.instructors (school_id, name, dds_certification_number) VALUES
  (school1, 'James Taggart', 'INST-TAG-A'),
  (school1, 'Sarah Jenkins', 'INST-TAG-B'),
  (school2, 'Robert Miller', 'INST-A1-A'),
  (school3, 'Rachel Marie Lewit', 'INST-NAT-A'),
  (school3, 'Jason Lewit', 'INST-NAT-B'),
  (school4, 'Kyle Anderson', 'INST-WM-A');

  -- 3. Insert Packages (Joshua's Law 30/6 and 6-hour Behind The Wheel)
  INSERT INTO public.packages (school_id, title, description, type, hours_classroom, hours_behind_wheel, price) VALUES
  -- Taggart's
  (school1, 'Joshua''s Law 30/6 Complete Package', '30 hours of online/classroom instruction and 6 hours behind the wheel. Meets GA DDS requirements.', 'joshuas-law-30-6', 30, 6, 495.00),
  (school1, '6-Hour Behind The Wheel', '6 hours of dedicated driving practice with a certified instructor.', 'behind-the-wheel', 0, 6, 340.00),
  
  -- A1 Driving School
  (school2, '30/6 Joshua''s Law Bundle', 'Competitive Joshua''s Law program covering all DDS requirements for teens.', 'joshuas-law-30-6', 30, 6, 485.00),
  (school2, '6-Hour In-Car Training', 'Focused behind-the-wheel instruction in dual-control vehicles.', 'behind-the-wheel', 0, 6, 330.00),
  
  -- Nathan's Driving School
  (school3, 'Joshua''s Law 30/6 (With Pickup/Drop-off)', 'State-approved 30/6 course including convenient pickup and drop-off in Smyrna (30080/30082).', 'joshuas-law-30-6', 30, 6, 510.00),
  (school3, '6-Hour Driving Package (Smyrna Pickup)', 'Essential road practice with door-to-door service in Cobb County.', 'behind-the-wheel', 0, 6, 360.00),
  
  -- West Metro Driving School
  (school4, 'Joshua''s Law 30-Hour Online + 6-Hour BTW', 'Highly competitive online classroom and hands-on driving package. Free ADAP certificate included.', 'joshuas-law-30-6', 30, 6, 450.00),
  (school4, '6-Hour Behind the Wheel Intensive', 'One-on-one training with detailed feedback and local at-home pickup.', 'behind-the-wheel', 0, 6, 320.00);

END $$;