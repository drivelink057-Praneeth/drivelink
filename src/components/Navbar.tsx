import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Car, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Car className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-heading text-xl font-bold text-foreground">
            Drive<span className="text-accent">Link</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          <Link to="/search">
            <Button variant={isActive("/search") ? "secondary" : "ghost"} size="sm">
              Find Schools
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant={isActive("/dashboard") ? "secondary" : "ghost"} size="sm">
              My Lessons
            </Button>
          </Link>
          <Link to="/admin">
            <Button variant={isActive("/admin") ? "secondary" : "ghost"} size="sm">
              School Portal
            </Button>
          </Link>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="outline" size="sm">
            <User className="mr-1.5 h-4 w-4" />
            Sign In
          </Button>
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-orange-dark">
            Get Started
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t bg-card px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            <Link to="/search" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">Find Schools</Button>
            </Link>
            <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">My Lessons</Button>
            </Link>
            <Link to="/admin" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">School Portal</Button>
            </Link>
            <hr className="my-2" />
            <Button variant="outline" className="w-full">Sign In</Button>
            <Button className="w-full bg-accent text-accent-foreground hover:bg-orange-dark">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
