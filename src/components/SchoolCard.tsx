import { Star, BadgeCheck, MapPin, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { School } from "@/data/mockData";

interface SchoolCardProps {
  school: School;
  index?: number;
}

const SchoolCard = ({ school, index = 0 }: SchoolCardProps) => (
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
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" />
              {school.rating} ({school.review_count})
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-0.5 font-heading text-2xl font-bold text-foreground">
            <DollarSign className="h-5 w-5" />
            {school.hourly_rate}
          </div>
          <span className="text-xs text-muted-foreground">/hour</span>
        </div>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
        {school.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {school.lesson_types.map((type) => (
          <Badge key={type} variant="secondary" className="text-xs capitalize">
            {type} Lessons
          </Badge>
        ))}
        <Badge variant="outline" className="text-xs capitalize">
          {school.car_type}
        </Badge>
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
