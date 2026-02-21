import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { AnimatePresence } from "framer-motion";

// Pages
import Home from "@/pages/Home";
import Models from "@/pages/Models";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location}>
        <Route path="/" component={Home} />
        <Route path="/models" component={Models} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-background min-h-screen text-foreground relative selection:bg-primary selection:text-black">
        {/* Grain Overlay */}
        <div className="bg-grain" />
        
        {/* Custom Cursor */}
        <CustomCursor />
        
        {/* Navigation */}
        <Navigation />
        
        {/* Main Content */}
        <main>
          <Router />
        </main>
        
        {/* Footer */}
        <Footer />
        
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
