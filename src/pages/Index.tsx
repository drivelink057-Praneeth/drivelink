import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ShieldCheck, CalendarCheck, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-driving.jpg";

const steps = [
  {
    icon: Search,
    title: "Search by Zip Code",
    description: "Enter your zip code to find certified instructors near you.",
  },
  {
    icon: CalendarCheck,
    title: "Pick a Time Slot",
    description: "Browse real-time availability and book a slot that fits your schedule.",
  },
  {
    icon: CreditCard,
    title: "Book & Pay Securely",
    description: "Confirm your lesson with secure online payment. Show up and drive!",
  },
];

const Homepage = () => {
  const [zip, setZip] = useState("30080");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (zip.trim()) navigate(`/search?zip=${zip.trim()}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Teen driver with instructor"
            className="h-full w-full object-cover opacity-20"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
        </div>

        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-1.5 text-sm font-medium text-accent">
              <ShieldCheck className="h-4 w-4" />
              All instructors DDS-certified
            </div>
            <h1 className="font-heading text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
              Find & Book Certified Driving Instructors{" "}
              <span className="text-accent">in Seconds</span>
            </h1>
            <p className="mt-5 text-lg text-primary-foreground/70 md:text-xl">
              Connect with top-rated local driving schools. Compare prices, read reviews,
              and book your first lesson — all in one place.
            </p>

            <form onSubmit={handleSearch} className="mt-8 flex max-w-md gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Enter zip code (e.g. 30080)"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="h-12 border-0 bg-card pl-11 text-card-foreground shadow-lg"
                  maxLength={10}
                />
              </div>
              <Button type="submit" className="h-12 bg-accent px-6 text-accent-foreground hover:bg-orange-dark">
                Search
              </Button>
            </form>

            <p className="mt-3 text-sm text-primary-foreground/50">
              Serving Smyrna, Marietta, and the greater Atlanta metro area
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              How It Works
            </h2>
            <p className="mt-3 text-muted-foreground">
              Getting on the road is easier than you think
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="relative rounded-xl border bg-card p-8 text-center shadow-sm animate-fade-in"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="absolute -top-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-accent font-heading text-lg font-bold text-accent-foreground">
                  {i + 1}
                </div>
                <step.icon className="mx-auto mt-2 h-10 w-10 text-primary" />
                <h3 className="mt-4 font-heading text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y bg-secondary py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 text-center md:grid-cols-4">
            {[
              { value: "500+", label: "Students Served" },
              { value: "50+", label: "Certified Schools" },
              { value: "4.8★", label: "Average Rating" },
              { value: "100%", label: "DDS Compliant" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-heading text-3xl font-bold text-accent">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            Ready to Hit the Road?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Whether you're a parent booking for your teen or a school looking to grow,
            DriveLink has you covered.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-orange-dark"
              onClick={() => navigate("/search?zip=30080")}
            >
              Find a School
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/admin")}
            >
              List Your School
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Homepage;
