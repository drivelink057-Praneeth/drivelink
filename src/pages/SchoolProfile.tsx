import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { BadgeCheck, Star, MapPin, Phone, Mail, Car, Clock, DollarSign, X, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockSchools, generateAvailability, type TimeSlot } from "@/data/mockData";

const PLATFORM_FEE = 15;

const SchoolProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const school = mockSchools.find((s) => s.id === id);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const availability = useMemo(() => (school ? generateAvailability(school.id) : []), [school]);

  if (!school) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">School not found.</p>
        </div>
      </div>
    );
  }

  const slotsForDate = selectedDate
    ? availability.filter((s) => {
        const slotDate = new Date(s.start_time);
        return (
          slotDate.toDateString() === selectedDate.toDateString() && !s.is_booked
        );
      })
    : [];

  const datesWithSlots = new Set(
    availability
      .filter((s) => !s.is_booked)
      .map((s) => new Date(s.start_time).toDateString())
  );

  const handleBookSlot = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setCheckoutOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1">
        {/* Header band */}
        <div className="bg-primary py-8">
          <div className="container mx-auto px-4">
            <Button
              variant="ghost"
              className="mb-4 text-primary-foreground/70 hover:text-primary-foreground"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="mr-1 h-4 w-4" /> Back to results
            </Button>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-heading text-3xl font-bold text-primary-foreground">
                    {school.business_name}
                  </h1>
                  {school.is_verified && (
                    <BadgeCheck className="h-6 w-6 text-accent" />
                  )}
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-primary-foreground/70">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    {school.rating} ({school.review_count} reviews)
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {school.zip_code}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    ${school.hourly_rate}/hr
                  </span>
                </div>
              </div>
              <div className="font-heading text-4xl font-bold text-accent">
                ${school.hourly_rate}
                <span className="text-lg font-normal text-primary-foreground/50">/hr</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left: Info */}
            <div className="space-y-8 lg:col-span-2">
              <section>
                <h2 className="font-heading text-xl font-semibold text-foreground">About</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{school.description}</p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-semibold text-foreground">Credentials</h2>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Badge variant="outline">DDS License</Badge>
                    {school.dds_license_number}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {school.lesson_types.map((t) => (
                      <Badge key={t} className="bg-accent/10 text-accent capitalize">{t} Lessons</Badge>
                    ))}
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-heading text-xl font-semibold text-foreground">Vehicles</h2>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {school.vehicles.map((v) => (
                    <div key={v} className="flex items-center gap-3 rounded-lg border bg-card p-4">
                      <Car className="h-5 w-5 text-accent" />
                      <span className="text-sm text-foreground">{v}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="font-heading text-xl font-semibold text-foreground">Contact</h2>
                <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> {school.phone}</div>
                  <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> {school.email}</div>
                </div>
              </section>
            </div>

            {/* Right: Booking Calendar */}
            <div>
              <div className="sticky top-24 rounded-xl border bg-card p-5 shadow-sm">
                <h3 className="font-heading text-lg font-semibold text-foreground">Book a Lesson</h3>
                <p className="mt-1 text-sm text-muted-foreground">Select a date to see available slots</p>

                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) =>
                    date < new Date() || !datesWithSlots.has(date.toDateString())
                  }
                  className="mt-4 pointer-events-auto"
                />

                {selectedDate && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-foreground">
                      Available on {format(selectedDate, "MMM d")}
                    </h4>
                    {slotsForDate.length === 0 ? (
                      <p className="mt-2 text-sm text-muted-foreground">No slots available</p>
                    ) : (
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {slotsForDate.map((slot) => (
                          <Button
                            key={slot.id}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => handleBookSlot(slot)}
                          >
                            <Clock className="h-3.5 w-3.5" />
                            {format(new Date(slot.start_time), "h:mm a")}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">Confirm Your Booking</DialogTitle>
          </DialogHeader>
          {selectedSlot && (
            <div className="space-y-4">
              <div className="rounded-lg bg-secondary p-4">
                <p className="font-heading font-semibold text-foreground">{school.business_name}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {format(new Date(selectedSlot.start_time), "EEEE, MMMM d, yyyy")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(selectedSlot.start_time), "h:mm a")} – {format(new Date(selectedSlot.end_time), "h:mm a")}
                </p>
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lesson (1 hr)</span>
                  <span className="text-foreground">${school.hourly_rate}.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Platform fee</span>
                  <span className="text-foreground">${PLATFORM_FEE}.00</span>
                </div>
                <Separator />
                <div className="flex justify-between font-heading font-semibold">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">${school.hourly_rate + PLATFORM_FEE}.00</span>
                </div>
              </div>

              {/* Stripe placeholder */}
              <div className="rounded-lg border-2 border-dashed border-border p-6 text-center">
                <CreditCardIcon className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">Stripe Payment Form</p>
                <p className="text-xs text-muted-foreground">Payment integration coming soon</p>
              </div>

              <Button className="w-full bg-accent text-accent-foreground hover:bg-orange-dark">
                Confirm & Pay ${school.hourly_rate + PLATFORM_FEE}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

const CreditCardIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);

export default SchoolProfile;
