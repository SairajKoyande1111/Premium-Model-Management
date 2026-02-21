import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function Navigation() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/models", label: "Models" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out px-6 md:px-12 py-6 flex items-center justify-between",
        scrolled ? "bg-background/80 backdrop-blur-md py-4 border-b border-primary/10" : "bg-transparent"
      )}
    >
      <Link href="/">
        <div className="flex flex-col items-start cursor-pointer group">
          <span className="font-serif text-2xl md:text-3xl font-bold tracking-widest text-foreground group-hover:text-primary transition-colors duration-300">
            VOSS
          </span>
        </div>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center space-x-12">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <span
              className={cn(
                "relative cursor-pointer text-sm tracking-[0.15em] uppercase font-light transition-colors duration-300 hover:text-primary",
                location === link.href ? "text-primary" : "text-foreground/80"
              )}
            >
              {link.label}
              {location === link.href && (
                <motion.div
                  layoutId="underline"
                  className="absolute -bottom-2 left-0 right-0 h-[1px] bg-primary"
                />
              )}
            </span>
          </Link>
        ))}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-foreground hover:text-primary transition-colors"
        onClick={() => setMobileMenuOpen(true)}
      >
        <Menu size={24} strokeWidth={1} />
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: "circOut" }}
            className="fixed inset-0 bg-background z-50 flex flex-col justify-center items-center"
          >
            <button
              className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} strokeWidth={1} />
            </button>

            <div className="flex flex-col space-y-8 text-center">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block text-3xl font-serif tracking-wide cursor-pointer hover:text-primary transition-colors",
                      location === link.href ? "text-primary italic" : "text-foreground"
                    )}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
            
            <div className="absolute bottom-12 flex flex-col items-center space-y-2 text-muted-foreground font-sans text-xs tracking-widest">
              <span>PARIS • NEW YORK • MILAN</span>
              <span className="text-primary">EST. 2024</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
