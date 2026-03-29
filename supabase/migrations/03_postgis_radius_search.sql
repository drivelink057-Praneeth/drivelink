-- 03_postgis_radius_search.sql

-- Enable the PostGIS extension (required for advanced geographic calculations)
CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA extensions;

-- Add a GEOMETRY column to store the latitude and longitude of each school
ALTER TABLE public.schools 
ADD COLUMN IF NOT EXISTS location extensions.geometry(Point, 4326);

-- Create a lookup table for Zip Codes to get the center coordinates of any target zip
CREATE TABLE IF NOT EXISTS public.zip_codes (
  zip_code text PRIMARY KEY,
  lat numeric,
  lng numeric,
  location extensions.geometry(Point, 4326)
);

-- Index the geometry columns for fast spatial querying
CREATE INDEX IF NOT EXISTS schools_location_gix ON public.schools USING GIST (location);
CREATE INDEX IF NOT EXISTS zip_codes_location_gix ON public.zip_codes USING GIST (location);

-- Create the RPC function to find schools within a given radius
CREATE OR REPLACE FUNCTION public.get_schools_by_radius(
  target_zip text,
  radius_miles numeric
)
RETURNS SETOF public.schools
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  target_loc extensions.geometry;
  radius_meters numeric;
BEGIN
  -- Convert miles to meters (1 mile = 1609.34 meters)
  radius_meters := radius_miles * 1609.34;
  
  -- Step 1: Find the center coordinates of the target ZIP code
  SELECT location INTO target_loc 
  FROM public.zip_codes 
  WHERE zip_code = target_zip 
  LIMIT 1;
  
  -- Fallback: If we don't have the zip code in our lookup table yet,
  -- try to use an existing school in that zip code as the center point
  IF target_loc IS NULL THEN
    SELECT location INTO target_loc 
    FROM public.schools 
    WHERE zip_code = target_zip 
    AND location IS NOT NULL 
    LIMIT 1;
  END IF;
  
  -- If we absolutely cannot find the coordinates for the zip, return empty
  IF target_loc IS NULL THEN
    RETURN;
  END IF;
  
  -- Step 2: Return all schools within the radius
  -- We cast to geography for accurate distance calculation over the Earth's curve
  RETURN QUERY
  SELECT *
  FROM public.schools s
  WHERE s.location IS NOT NULL
  AND extensions.ST_DWithin(
    s.location::extensions.geography, 
    target_loc::extensions.geography, 
    radius_meters
  );
END;
$$;
