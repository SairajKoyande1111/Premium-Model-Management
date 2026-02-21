import { Link } from "wouter";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-primary/10 py-16 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <Link href="/">
            <div className="cursor-pointer mb-6">
              <span className="font-serif text-2xl font-bold tracking-widest text-foreground">
                VOSS
              </span>
            </div>
          </Link>
          <p className="text-muted-foreground font-sans font-light text-sm leading-relaxed max-w-xs">
            Representing the most unique faces in high fashion. VOSS is a global agency dedicated to discovery and development.
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <h4 className="font-sans text-xs tracking-[0.2em] text-primary uppercase mb-2">Agency</h4>
          <Link href="/models"><span className="text-foreground/60 hover:text-primary transition-colors cursor-pointer text-sm">Models</span></Link>
          <Link href="/about"><span className="text-foreground/60 hover:text-primary transition-colors cursor-pointer text-sm">About Us</span></Link>
          <Link href="/contact"><span className="text-foreground/60 hover:text-primary transition-colors cursor-pointer text-sm">Join VOSS</span></Link>
        </div>

        <div className="flex flex-col space-y-4">
          <h4 className="font-sans text-xs tracking-[0.2em] text-primary uppercase mb-2">Offices</h4>
          <div className="text-foreground/60 text-sm font-light">
            <p>12 Rue Saint-Honoré</p>
            <p>75001 Paris, France</p>
          </div>
          <div className="text-foreground/60 text-sm font-light">
            <p>45 Grand Street</p>
            <p>New York, NY 10013</p>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <h4 className="font-sans text-xs tracking-[0.2em] text-primary uppercase mb-2">Connect</h4>
          <div className="flex space-x-6">
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors"><Instagram size={20} strokeWidth={1} /></a>
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors"><Facebook size={20} strokeWidth={1} /></a>
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors"><Twitter size={20} strokeWidth={1} /></a>
          </div>
          <p className="text-muted-foreground text-xs font-light mt-4">
            &copy; {new Date().getFullYear()} Voss Model Management.<br/>All rights reserved.
          </p>
        </div>
      </div>
      
      {/* Decorative large text */}
      <div className="absolute -bottom-10 -right-10 pointer-events-none opacity-[0.02] select-none">
        <span className="font-serif text-[12rem] leading-none">VOSS</span>
      </div>
    </footer>
  );
}
