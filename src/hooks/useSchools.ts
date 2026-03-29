import { useQuery } from "@tanstack/react-query";
import { externalSupabase, type ExternalSchool, type ExternalPackage } from "@/lib/externalSupabase";

export function useSchools(zip?: string, radius?: number) {
  return useQuery<ExternalSchool[]>({
    queryKey: ["external-schools", zip, radius],
    queryFn: async () => {
      // If radius and zip are provided, use the new PostGIS RPC
      if (zip && radius) {
        const { data, error } = await externalSupabase.rpc('get_schools_by_radius', {
          target_zip: zip,
          radius_miles: radius
        });
        if (error) throw error;
        // The RPC returns SETOF schools, sort them client-side by rating
        return (data ?? []).sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0));
      }

      // Fallback: fetch all or exact zip match
      let query = externalSupabase.from("schools").select("*").order("rating", { ascending: false });
      if (zip) {
        query = query.eq('zip_code', zip);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useSchool(id: string | undefined) {
  return useQuery<ExternalSchool | null>({
    queryKey: ["external-school", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await externalSupabase
        .from("schools")
        .select("*")
        .eq("id", id!)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}

export function usePackages(schoolId: string | undefined) {
  return useQuery<ExternalPackage[]>({
    queryKey: ["external-packages", schoolId],
    enabled: !!schoolId,
    queryFn: async () => {
      const { data, error } = await externalSupabase
        .from("packages")
        .select("*")
        .eq("school_id", schoolId!)
        .order("price", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useAllPackages() {
  return useQuery<ExternalPackage[]>({
    queryKey: ["external-packages-all"],
    queryFn: async () => {
      const { data, error } = await externalSupabase
        .from("packages")
        .select("*")
        .order("price", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });
}
