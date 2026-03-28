import { Star, BadgeCheck, MapPin, DollarSign, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ExternalSchool } from "@/lib/externalSupabase";
import { hasPickupDropoff } from "@/lib/externalSupabase";

interface SchoolCardProps {
  school: ExternalSchool;
  lowestPrice?: number;
  index?: number;
}

const SchoolCard = ({ school, lowestPrice, index = 0 }: SchoolCardProps) => (
  <div
    className="group overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md"
    style={{ animationDelay: `${index * 80}ms` }}
  >
    {/* Color band */}
    <div className="h-2 bg-gradient-to-r from-primary to-accent" />
    <div className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-heading text-lg font-semibold text-foreground">
              {school.business_name}
            </h3>
            {school.is_verified && (
              <BadgeCheck className="h-5 w-5 shrink-0 text-accent" />
            )}
          </div>
          <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {school.zip_code}
            </span>
            {school.rating != null && (
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                {school.rating} ({school.review_count ?? 0})
              </span>
            )}
          </div>
        </div>
        {lowestPrice != null && (
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-0.5 font-heading text-2xl font-bold text-foreground">
              <DollarSign className="h-5 w-5" />
              {lowestPrice}
            </div>
            <span className="text-xs text-muted-foreground">from</span>
          </div>
        )}
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
        {school.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {hasPickupDropoff(school) && (
          <Badge className="bg-accent/15 text-accent border-accent/30 text-xs gap-1">
            <Truck className="h-3 w-3" />
            Pickup / Drop-off
          </Badge>
        )}
        {school.dds_license_number && (
          <Badge variant="outline" className="text-xs">
            DDS Licensed
          </Badge>
        )}
      </div>

      <div className="mt-4">
        <Link to={`/school/${school.id}`}>
          <Button className="w-full bg-primary text-primary-foreground hover:bg-navy-light">
            View Profile
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

export default SchoolCard;
