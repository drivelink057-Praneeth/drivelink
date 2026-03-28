-- 01_initial_tables.sql

CREATE TABLE IF NOT EXISTS public.schools (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name text NOT NULL,
  description text,
  zip_code text NOT NULL,
  dds_license_number text UNIQUE,
  is_verified boolean DEFAULT false,
  rating numeric DEFAULT 0,
  review_count integer DEFAULT 0,
  owner_name text,
  phone text,
  email text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.instructors (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id uuid REFERENCES public.schools(id) ON DELETE CASCADE,
  name text NOT NULL,
  dds_certification_number text UNIQUE,
  bio text,
  rating numeric DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.packages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id uuid REFERENCES public.schools(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  type text NOT NULL, -- e.g., 'behind-the-wheel', 'joshuas-law-30-6', 'classroom-only'
  hours_classroom integer DEFAULT 0,
  hours_behind_wheel integer DEFAULT 0,
  price numeric NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Basic indexes for common queries
CREATE INDEX idx_schools_zip_code ON public.schools(zip_code);
CREATE INDEX idx_packages_school_id ON public.packages(school_id);
CREATE INDEX idx_instructors_school_id ON public.instructors(school_id);