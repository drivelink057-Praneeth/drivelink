import { useState, useMemo } from "react";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import {
  CalendarCheck, Clock, Plus, Trash2, Upload, FileCheck, DollarSign,
  ChevronLeft, ChevronRight, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { generateAvailability, mockSchools } from "@/data/mockData";

const school = mockSchools[0];

const SchoolAdminPortal = () => {
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));

  const availability = useMemo(() => generateAvailability(school.id), []);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const earnings = [
    { student: "Emily R.", date: "Mar 22, 2026", amount: 85, status: "completed" },
    { student: "James T.", date: "Mar 21, 2026", amount: 85, status: "completed" },
    { student: "Sarah K.", date: "Mar 20, 2026", amount: 85, status: "completed" },
    { student: "Marcus L.", date: "Mar 25, 2026", amount: 85, status: "pending" },
    { student: "Ava P.", date: "Mar 26, 2026", amount: 85, status: "pending" },
  ];

  const compliance = [
    { name: "Certificate of Insurance 2026", date: "Jan 15, 2026", status: "approved" as const },
    { name: "DDS Business License", date: "Feb 1, 2026", status: "approved" as const },
    { name: "Vehicle Inspection Report", date: "Mar 1, 2026", status: "pending" as const },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1">
        <div className="border-b bg-primary py-6">
          <div className="container mx-auto px-4">
            <h1 className="font-heading text-2xl font-bold text-primary-foreground">School Portal</h1>
            <p className="text-sm text-primary-foreground/70">{school.business_name}</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          {/* Stats */}
          <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { label: "This Week", value: "8 lessons", icon: CalendarCheck },
              { label: "Open Slots", value: "12 available", icon: Clock },
              { label: "This Month", value: "$1,275", icon: DollarSign },
              { label: "Students", value: "23 total", icon: User },
            ].map(({ label, value, icon: Icon }) => (
              <Card key={label}>
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="font-heading text-sm font-semibold text-foreground">{value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="schedule">
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
            </TabsList>

            {/* Schedule Tab */}
            <TabsContent value="schedule" className="mt-6">
              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm" onClick={() => setWeekStart(addDays(weekStart, -7))}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="font-heading text-sm font-semibold text-foreground">
                  {format(weekDays[0], "MMM d")} – {format(weekDays[6], "MMM d, yyyy")}
                </span>
                <Button variant="outline" size="sm" onClick={() => setWeekStart(addDays(weekStart, 7))}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-4 space-y-3">
                {weekDays.map((day) => {
                  const daySlots = availability.filter((s) =>
                    isSameDay(new Date(s.start_time), day)
                  );
                  return (
                    <div key={day.toISOString()} className="rounded-lg border bg-card p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-heading text-sm font-semibold text-foreground">
                          {format(day, "EEEE, MMM d")}
                        </h4>
                        <Button variant="ghost" size="sm" className="text-accent">
                          <Plus className="mr-1 h-3.5 w-3.5" /> Add Slot
                        </Button>
                      </div>
                      {daySlots.length === 0 ? (
                        <p className="mt-2 text-sm text-muted-foreground">No slots</p>
                      ) : (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {daySlots.map((slot) => (
                            <div
                              key={slot.id}
                              className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm ${
                                slot.is_booked
                                  ? "border-accent/30 bg-accent/5 text-accent"
                                  : "border-border bg-secondary text-foreground"
                              }`}
                            >
                              <Clock className="h-3.5 w-3.5" />
                              {format(new Date(slot.start_time), "h:mm a")}
                              {slot.is_booked ? (
                                <Badge className="bg-accent/10 text-accent text-xs">Booked</Badge>
                              ) : (
                                <button className="text-muted-foreground hover:text-destructive">
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            {/* Compliance Tab */}
            <TabsContent value="compliance" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-lg">Upload Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border-2 border-dashed border-border p-8 text-center">
                    <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
                    <p className="mt-3 font-heading text-sm font-medium text-foreground">
                      Drag & drop your Certificate of Insurance (COI)
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">PDF, JPG, or PNG up to 10MB</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Browse Files
                    </Button>
                  </div>

                  <Separator className="my-6" />

                  <h4 className="font-heading text-sm font-semibold text-foreground">Uploaded Documents</h4>
                  <div className="mt-3 space-y-3">
                    {compliance.map((doc) => (
                      <div key={doc.name} className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <FileCheck className={`h-5 w-5 ${doc.status === "approved" ? "text-success" : "text-accent"}`} />
                          <div>
                            <p className="text-sm font-medium text-foreground">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">Uploaded {doc.date}</p>
                          </div>
                        </div>
                        <Badge className={doc.status === "approved" ? "bg-success/10 text-success" : "bg-accent/10 text-accent"}>
                          {doc.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Earnings Tab */}
            <TabsContent value="earnings" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-heading text-lg">Earnings</CardTitle>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Total Earnings</p>
                      <p className="font-heading text-2xl font-bold text-accent">$1,275</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {earnings.map((item, i) => (
                      <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
                            <User className="h-4 w-4 text-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{item.student}</p>
                            <p className="text-xs text-muted-foreground">{item.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-semibold text-foreground">${item.amount}</span>
                          <Badge className={item.status === "completed" ? "bg-success/10 text-success" : "bg-accent/10 text-accent"}>
                            {item.status === "completed" ? "Paid" : "Pending"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SchoolAdminPortal;
