import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SchoolCard from "@/components/SchoolCard";
import { mockSchools } from "@/data/mockData";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const initialZip = searchParams.get("zip") || "30080";
  const [zip, setZip] = useState(initialZip);
  const [priceMax, setPriceMax] = useState("all");
  const [lessonType, setLessonType] = useState<string[]>([]);
  const [carType, setCarType] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return mockSchools.filter((s) => {
      if (priceMax !== "all" && s.hourly_rate > parseInt(priceMax)) return false;
      if (lessonType.length > 0 && !lessonType.some((t) => s.lesson_types.includes(t as 'teen' | 'adult'))) return false;
      if (carType !== "all" && s.car_type !== carType) return false;
      return true;
    });
  }, [priceMax, lessonType, carType]);

  const toggleLesson = (type: string) => {
    setLessonType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

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
            <SelectItem value="75">Under $75/hr</SelectItem>
            <SelectItem value="100">Under $100/hr</SelectItem>
            <SelectItem value="150">Under $150/hr</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="font-heading text-sm font-semibold">Lesson Type</Label>
        <div className="mt-2 space-y-2">
          {["teen", "adult"].map((type) => (
            <div key={type} className="flex items-center gap-2">
              <Checkbox
                id={type}
                checked={lessonType.includes(type)}
                onCheckedChange={() => toggleLesson(type)}
              />
              <label htmlFor={type} className="text-sm capitalize">{type} Lessons</label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Label className="font-heading text-sm font-semibold">Vehicle Type</Label>
        <Select value={carType} onValueChange={setCarType}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Any vehicle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any vehicle</SelectItem>
            <SelectItem value="sedan">Sedan</SelectItem>
            <SelectItem value="suv">SUV</SelectItem>
            <SelectItem value="dual-control">Dual Control</SelectItem>
          </SelectContent>
        </Select>
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
                {filtered.length} school{filtered.length !== 1 ? "s" : ""} found
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
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                {filtered.map((school, i) => (
                  <SchoolCard key={school.id} school={school} index={i} />
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="py-20 text-center text-muted-foreground">
                  No schools match your filters. Try adjusting your criteria.
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
