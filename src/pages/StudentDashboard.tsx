import { format } from "date-fns";
import { CalendarCheck, Clock, MapPin, Phone, Mail, Car, XCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockBookings } from "@/data/mockData";

const StudentDashboard = () => {
  const upcoming = mockBookings.filter((b) => b.status !== "completed");
  const past = mockBookings.filter((b) => b.status === "completed");

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1">
        <div className="border-b bg-card py-6">
          <div className="container mx-auto px-4">
            <h1 className="font-heading text-2xl font-bold text-foreground">My Lessons</h1>
            <p className="text-sm text-muted-foreground">Manage your upcoming and past driving lessons</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="upcoming">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
              <TabsTrigger value="past">Past ({past.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="mt-6">
              {upcoming.length === 0 ? (
                <div className="py-16 text-center text-muted-foreground">No upcoming lessons</div>
              ) : (
                <div className="space-y-4">
                  {upcoming.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} showActions />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="past" className="mt-6">
              {past.length === 0 ? (
                <div className="py-16 text-center text-muted-foreground">No past lessons</div>
              ) : (
                <div className="space-y-4">
                  {past.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

function BookingCard({ booking, showActions }: { booking: typeof mockBookings[0]; showActions?: boolean }) {
  const statusColors: Record<string, string> = {
    pending: "bg-accent/10 text-accent",
    confirmed: "bg-success/10 text-success",
    completed: "bg-muted text-muted-foreground",
  };

  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="font-heading text-lg font-semibold text-foreground">
              {booking.school.business_name}
            </h3>
            <Badge className={statusColors[booking.status] + " capitalize"}>
              {booking.status}
            </Badge>
          </div>

          <div className="grid gap-1.5 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarCheck className="h-4 w-4" />
              {format(new Date(booking.slot.start_time), "EEEE, MMMM d, yyyy")}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {format(new Date(booking.slot.start_time), "h:mm a")} – {format(new Date(booking.slot.end_time), "h:mm a")}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {booking.school.zip_code}
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              {booking.school.phone}
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {booking.school.email}
            </div>
            <div className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              {booking.school.vehicles[0]}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="font-heading text-2xl font-bold text-foreground">
            ${booking.total_price}
          </div>
          {showActions && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-1 h-3.5 w-3.5" />
                Reschedule
              </Button>
              <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                <XCircle className="mr-1 h-3.5 w-3.5" />
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
