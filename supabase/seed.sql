-- seed.sql

-- Define UUID variables for schools to link instructors and packages
DO $$ 
DECLARE
  school1 uuid := gen_random_uuid();
  school2 uuid := gen_random_uuid();
  school3 uuid := gen_random_uuid();
  school4 uuid := gen_random_uuid();
  school5 uuid := gen_random_uuid();
  school6 uuid := gen_random_uuid();
  school7 uuid := gen_random_uuid();
  school8 uuid := gen_random_uuid();
BEGIN

  -- 1. Insert Schools
  INSERT INTO public.schools (id, business_name, description, zip_code, dds_license_number, is_verified, rating, review_count) VALUES
  (school1, 'Marietta Driving School', 'Serving the Marietta and Smyrna area for over 20 years with DDS certified instructors.', '30060', 'DDS-MD-1001', true, 4.8, 120),
  (school2, 'A-1 Driving Clinic Smyrna', 'Specializing in Joshua''s Law 30/6 programs and defensive driving.', '30080', 'DDS-A1-2042', true, 4.6, 95),
  (school3, 'Drive Smart Georgia (Marietta)', 'Tech-forward driving school using modern dual-control vehicles.', '30062', 'DDS-DS-505', true, 4.9, 310),
  (school4, 'Smyrna Safe Driving Academy', 'Local Smyrna academy focused on teenage driving safety and adult beginners.', '30082', 'DDS-SDA-880', true, 4.5, 45),
  (school5, 'Cobb County Driver Ed', 'Affordable driver education courses compliant with all state laws.', '30080', 'DDS-CC-911', true, 4.4, 60),
  (school6, 'Georgia Driving Pros', 'Premier driving lessons for nervous adults and teens.', '30082', 'DDS-GDP-404', true, 4.7, 180),
  (school7, 'Peach State Driving Academy (Marietta)', 'Top-rated classroom and behind-the-wheel combo packages.', '30067', 'DDS-PS-112', false, 4.3, 20),
  (school8, 'East Cobb Driving Instruction', 'Dedicated instruction tailored to each student''s learning pace.', '30062', 'DDS-EC-303', true, 4.8, 200);

  -- 2. Insert Instructors
  INSERT INTO public.instructors (school_id, name, dds_certification_number) VALUES
  (school1, 'John Smith', 'INST-1001-A'),
  (school1, 'Maria Gonzalez', 'INST-1001-B'),
  (school2, 'Robert Johnson', 'INST-2042-C'),
  (school3, 'Emily Davis', 'INST-505-A'),
  (school3, 'Michael Brown', 'INST-505-B'),
  (school4, 'Sarah Wilson', 'INST-880-A'),
  (school5, 'David Lee', 'INST-911-A'),
  (school6, 'Jessica Taylor', 'INST-404-A'),
  (school7, 'Chris Anderson', 'INST-112-A'),
  (school8, 'Pat Thomas', 'INST-303-A');

  -- 3. Insert Packages (Joshua's Law 30/6 and 6-hour Behind The Wheel)
  INSERT INTO public.packages (school_id, title, description, type, hours_classroom, hours_behind_wheel, price) VALUES
  -- School 1
  (school1, 'Joshua''s Law 30/6 Complete Package', '30 hours of classroom instruction and 6 hours behind the wheel.', 'joshuas-law-30-6', 30, 6, 425.00),
  (school1, '6-Hour Behind The Wheel Only', '6 hours of dedicated driving practice with a certified instructor.', 'behind-the-wheel', 0, 6, 320.00),
  -- School 2
  (school2, '30/6 Joshua''s Law Program', 'Meets all DDS requirements for teens.', 'joshuas-law-30-6', 30, 6, 395.00),
  (school2, '6-Hour In-Car Training', 'Focused behind-the-wheel instruction.', 'behind-the-wheel', 0, 6, 290.00),
  -- School 3
  (school3, 'Premium 30/6 Driver Ed', 'High-tech classroom + 6 hours in our dual-control cars.', 'joshuas-law-30-6', 30, 6, 450.00),
  (school3, '6 Hours Driving Instruction', 'Private driving lessons.', 'behind-the-wheel', 0, 6, 350.00),
  -- School 4
  (school4, 'Teen 30/6 Package', 'Comprehensive teen driving package.', 'joshuas-law-30-6', 30, 6, 375.00),
  (school4, '6-Hour BTW Lessons', 'Standard driving practice package.', 'behind-the-wheel', 0, 6, 275.00),
  -- School 5
  (school5, 'Standard Joshua''s Law Course', 'State-approved 30/6 course.', 'joshuas-law-30-6', 30, 6, 350.00),
  (school5, 'Basic 6-Hour Driving Package', 'Essential road practice.', 'behind-the-wheel', 0, 6, 250.00),
  -- School 6
  (school6, 'Joshua''s Law 30/6 Combo', '30 hours online/in-person + 6 hours driving.', 'joshuas-law-30-6', 30, 6, 410.00),
  (school6, '6-Hour Road Ready Package', '6 hours behind the wheel.', 'behind-the-wheel', 0, 6, 310.00),
  -- School 7
  (school7, '30/6 Teen Driver Plan', 'Meets GA DDS standards.', 'joshuas-law-30-6', 30, 6, 399.00),
  (school7, '6-Hour Behind the Wheel', 'Hands-on instruction.', 'behind-the-wheel', 0, 6, 299.00),
  -- School 8
  (school8, 'East Cobb 30/6 Program', 'Includes certificate for insurance discount.', 'joshuas-law-30-6', 30, 6, 440.00),
  (school8, '6-Hour Driving Intensive', 'Fast-track behind the wheel training.', 'behind-the-wheel', 0, 6, 330.00);

END $$;