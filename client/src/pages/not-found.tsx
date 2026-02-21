import { Link } from "wouter";
import { PageTransition } from "@/components/PageTransition";

export default function NotFound() {
  return (
    <PageTransition>
      <div className="min-h-screen w-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-serif text-9xl text-white/5 font-bold absolute z-0 select-none">404</h1>
        
        <div className="relative z-10 space-y-6">
          <h2 className="font-serif text-4xl text-primary">Page Not Found</h2>
          <p className="text-muted-foreground font-light tracking-wide max-w-md mx-auto">
            The page you are looking for has been moved or does not exist.
          </p>
          
          <Link href="/">
            <button className="mt-8 px-8 py-3 border border-white/20 hover:border-primary hover:text-primary transition-colors duration-300 text-xs uppercase tracking-[0.2em]">
              Return Home
            </button>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
