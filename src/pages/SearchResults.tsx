import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SchoolCard from "@/components/SchoolCard";
import { useSchools, useAllPackages } from "@/hooks/useSchools";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const initialZip = searchParams.get("zip") || "30080";
  const [zip, setZip] = useState(initialZip);
  const [priceMax, setPriceMax] = useState("all");
  const [pickupOnly, setPickupOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const { data: schools = [], isLoading: loadingSchools } = useSchools();
  const { data: allPackages = [], isLoading: loadingPkgs } = useAllPackages();

  // Build a map of school_id → lowest price
  const lowestPriceMap = useMemo(() => {
    const map: Record<string, number> = {};
    for (const pkg of allPackages) {
      if (!(pkg.school_id in map) || pkg.price < map[pkg.school_id]) {
        map[pkg.school_id] = pkg.price;
      }
    }
    return map;
  }, [allPackages]);

  const filtered = useMemo(() => {
    return schools.filter((s) => {
      if (zip && s.zip_code !== zip) return false;
      if (priceMax !== "all") {
        const lowest = lowestPriceMap[s.id];
        if (lowest != null && lowest > parseInt(priceMax)) return false;
      }
      if (pickupOnly) {
        const d = (s.description ?? "").toLowerCase();
        const has = d.includes("pickup") || d.includes("pick-up") || d.includes("drop-off") || d.includes("dropoff");
        if (!has) return false;
      }
      return true;
    });
  }, [schools, zip, priceMax, pickupOnly, lowestPriceMap]);

  const isLoading = loadingSchools || loadingPkgs;

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <Label className="font-heading text-sm font-semibold">Max Price</Label>
        <Select value={priceMax} onValueChange={setPriceMax}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Any price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any price</SelectItem>
            <SelectItem value="300">Under $300</SelectItem>
            <SelectItem value="500">Under $500</SelectItem>
            <SelectItem value="750">Under $750</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="font-heading text-sm font-semibold">Features</Label>
        <div className="mt-2 space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="pickup"
              checked={pickupOnly}
              onCheckedChange={(v) => setPickupOnly(!!v)}
            />
            <label htmlFor="pickup" className="text-sm">Pickup / Drop-off</label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1">
        <div className="border-b bg-card py-6">
          <div className="container mx-auto flex flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="font-heading text-2xl font-bold text-foreground">
                Driving Schools near {zip}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isLoading ? "Loading…" : `${filtered.length} school${filtered.length !== 1 ? "s" : ""} found`}
              </p>
            </div>
            <div className="flex gap-2">
              <Input
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="Zip code"
                className="w-32"
              />
              <Button
                variant="outline"
                className="md:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="mr-1.5 h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Desktop sidebar */}
            <aside className="hidden w-64 shrink-0 md:block">
              <div className="sticky top-24 rounded-xl border bg-card p-5">
                <h3 className="font-heading text-sm font-semibold text-foreground">Filters</h3>
                <div className="mt-4">
                  <FilterPanel />
                </div>
              </div>
            </aside>

            {/* Mobile filters */}
            {showFilters && (
              <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden" onClick={() => setShowFilters(false)}>
                <div className="absolute bottom-0 left-0 right-0 max-h-[70vh] overflow-y-auto rounded-t-2xl border bg-card p-6" onClick={(e) => e.stopPropagation()}>
                  <h3 className="font-heading text-lg font-semibold">Filters</h3>
                  <div className="mt-4">
                    <FilterPanel />
                  </div>
                  <Button className="mt-6 w-full" onClick={() => setShowFilters(false)}>Apply Filters</Button>
                </div>
              </div>
            )}

            {/* Results */}
            <div className="flex-1">
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : filtered.length === 0 ? (
                <div className="py-20 text-center text-muted-foreground">
                  No schools match your filters. Try adjusting your criteria.
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                  {filtered.map((school, i) => (
                    <SchoolCard
                      key={school.id}
                      school={school}
                      lowestPrice={lowestPriceMap[school.id]}
                      index={i}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchResults;
