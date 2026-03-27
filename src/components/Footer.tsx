import { Car } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
              <Car className="h-4 w-4 text-accent-foreground" />
            </div>
            <span className="font-heading text-lg font-bold">DriveLink</span>
          </Link>
          <p className="mt-3 text-sm text-primary-foreground/70">
            Connecting families with certified driving instructors across the Atlanta metro area.
          </p>
        </div>
        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-primary-foreground/50">For Students</h4>
          <ul className="mt-3 space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/search" className="hover:text-accent">Find Schools</Link></li>
            <li><Link to="/dashboard" className="hover:text-accent">My Lessons</Link></li>
            <li>How It Works</li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-primary-foreground/50">For Schools</h4>
          <ul className="mt-3 space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/admin" className="hover:text-accent">School Portal</Link></li>
            <li>List Your School</li>
            <li>Pricing</li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-primary-foreground/50">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-primary-foreground/70">
            <li>About</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>
      <div className="mt-10 border-t border-primary-foreground/10 pt-6 text-center text-xs text-primary-foreground/40">
        © {new Date().getFullYear()} DriveLink. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
