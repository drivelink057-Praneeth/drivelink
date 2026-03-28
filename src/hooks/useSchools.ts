import { useQuery } from "@tanstack/react-query";
import { externalSupabase, type ExternalSchool, type ExternalPackage } from "@/lib/externalSupabase";

export function useSchools() {
  return useQuery<ExternalSchool[]>({
    queryKey: ["external-schools"],
    queryFn: async () => {
      const { data, error } = await externalSupabase
        .from("schools")
        .select("*")
        .order("rating", { ascending: false });
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
