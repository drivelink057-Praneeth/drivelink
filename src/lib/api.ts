import { supabase } from './supabase';

/**
 * Fetch schools within a specific mileage radius of a target zip code.
 * Requires the `get_schools_by_radius` Postgres function and PostGIS enabled in Supabase.
 * 
 * @param targetZip The 5-digit US zip code (e.g., "30062")
 * @param radiusMiles The radius to search within (e.g., 20)
 * @returns Array of school profiles within the radius
 */
export async function fetchSchoolsByRadius(targetZip: string, radiusMiles: number) {
  const { data, error } = await supabase.rpc('get_schools_by_radius', {
    target_zip: targetZip,
    radius_miles: radiusMiles
  });

  if (error) {
    console.error('Error fetching schools by radius:', error.message);
    throw new Error(error.message);
  }

  return data;
}
