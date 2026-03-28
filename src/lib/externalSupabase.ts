import { createClient } from "@supabase/supabase-js";

const EXTERNAL_URL = "https://ceeyszpnbttpywsvcztz.supabase.co";
const EXTERNAL_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlZXlzenBuYnR0cHl3c3ZjenR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3Mjc3NzQsImV4cCI6MjA5MDMwMzc3NH0.HLhpwvCwA1CD1_RgnaQqruYpA24cFVIn4WaFVwRVFnw";

export const externalSupabase = createClient(EXTERNAL_URL, EXTERNAL_ANON_KEY);

// ---- Types matching the external schema ----

export interface ExternalSchool {
  id: string;
  business_name: string;
  description: string | null;
  zip_code: string;
  dds_license_number: string | null;
  is_verified: boolean;
  rating: number | null;
  review_count: number | null;
  owner_name: string | null;
  phone: string | null;
  email: string | null;
  created_at: string;
  updated_at: string;
}

export interface ExternalPackage {
  id: string;
  school_id: string;
  title: string;
  description: string | null;
  type: string;
  hours_classroom: number;
  hours_behind_wheel: number;
  price: number;
  created_at: string;
  updated_at: string;
}

/** Returns true if the school description mentions pickup/drop-off */
export function hasPickupDropoff(school: ExternalSchool): boolean {
  if (!school.description) return false;
  const d = school.description.toLowerCase();
  return d.includes("pickup") || d.includes("pick-up") || d.includes("drop-off") || d.includes("dropoff") || d.includes("pick up/drop");
}
