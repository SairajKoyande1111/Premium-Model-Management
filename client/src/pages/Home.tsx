import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useModels } from "@/hooks/use-models";
import { PageTransition } from "@/components/PageTransition";
import heroVideo from "@assets/9218263-hd_1920_1080_30fps_1771689360650.mp4";
import reviewVideo from "@assets/3188991-hd_1920_1080_25fps_1771752824150.mp4";
import { useEffect, useState, useRef } from "react";
import { ModelDetail } from "@/components/ModelDetail";
import { Button } from "@/components/ui/button";

// Assets for the new sections
import gridImg1 from "@assets/Screenshot_2026-02-22_at_2.55.56_PM_1771752359672.png";
import gridImg2 from "@assets/Screenshot_2026-02-22_at_2.56.10_PM_1771752373485.png";

const Typewriter = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting && index < text.length) {
        setDisplayText(prev => prev + text[index]);
        setIndex(prev => prev + 1);
      } else if (isDeleting && index > 0) {
        setDisplayText(prev => prev.slice(0, -1));
        setIndex(prev => prev - 1);
      } else if (!isDeleting && index === text.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && index === 0) {
        setIsDeleting(false);
      }
    }, isDeleting ? 30 : 50);

    return () => clearTimeout(timeout);
  }, [index, isDeleting, text]);

  return (
    <span className="relative">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[2px] h-[1em] bg-primary ml-1 align-middle"
      />
    </span>
  );
};

const ReviewCarousel = () => {
  const reviews = [
    {
      text: "Was jumping from agency to agency - you guys are by far the best and finally my long-term team!!",
      author: "Gina R."
    },
    {
      text: "The professional approach and global network at VOSS is unmatched in the Middle East.",
      author: "Sarah J."
    },
    {
      text: "Found my home here. The support and career guidance have been life-changing.",
      author: "Michael K."
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden px-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.1, y: -20 }}
          transition={{ duration: 1, ease: "circOut" }}
          className="max-w-4xl text-center"
        >
          <div className="flex justify-center mb-8">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-primary fill-primary" />
              ))}
            </div>
          </div>
          
          <div className="relative mb-12">
            <Quote className="absolute -top-8 -left-8 text-primary/20 w-16 h-16 -rotate-12" />
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-serif text-white leading-tight italic">
              "{reviews[current].text}"
            </h3>
            <Quote className="absolute -bottom-8 -right-8 text-primary/20 w-16 h-16 rotate-180 rotate-12" />
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-12 h-[1px] bg-primary mb-2" />
            <span className="text-sm tracking-[0.4em] uppercase text-primary font-bold">{reviews[current].author}</span>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-12 flex gap-4">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${current === i ? "bg-primary w-8" : "bg-white/20"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const { data: models } = useModels();
  const [selectedModelId, setSelectedModelId] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  
  // Filter new faces
  const newFaces = models?.filter(m => m.isNewFace).slice(0, 4) || [];

  const brandLogos = [
    "VOGUE", "CHANEL", "GUCCI", "PRADA", "YSL", "DIOR", 
    "HERMES", "VALENTINO", "BALENCIAGA", "FENDI", "CELINE", "GIVENCHY"
  ];

  return (
    <PageTransition>
      <AnimatePresence>
        {selectedModelId && (
          <ModelDetail id={selectedModelId} onClose={() => setSelectedModelId(null)} />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Parallax */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 z-0"
        >
          {/* Hero Video */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/40" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "circOut", delay: 0.5 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl text-foreground mix-blend-screen tracking-tight leading-tight uppercase"
          >
            CRAFTED IN DUBAI.<br />
            RECOGNIZED <span className="text-primary">WORLDWIDE.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-8 font-sans text-sm md:text-base tracking-[0.2em] uppercase text-foreground/80 max-w-4xl mx-auto leading-relaxed lg:whitespace-nowrap h-6"
          >
            <Typewriter text="Elevating Talent from the Middle East to the Global Runway." />
          </motion.p>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="relative w-[1px] h-16 bg-white/10 overflow-hidden">
            <motion.div 
              animate={{ 
                y: ["-100%", "100%"],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-b from-transparent via-primary to-transparent"
            />
          </div>
          <motion.span 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[10px] tracking-widest text-primary uppercase"
          >
            Scroll
          </motion.span>
        </motion.div>
      </section>

      {/* Logo Carousel - Continuous Ticker */}
      <div className="py-16 border-y border-white/5 bg-background overflow-hidden whitespace-nowrap relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        
        <motion.div 
          animate={{ x: [0, -2000] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="flex items-center gap-24"
        >
          {[...brandLogos, ...brandLogos, ...brandLogos].map((logo, i) => (
            <span key={i} className="text-4xl md:text-6xl font-serif tracking-tighter text-foreground/20 hover:text-primary transition-colors duration-500 cursor-default uppercase">
              {logo}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Featured Models */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-primary text-xs tracking-[0.2em] uppercase block mb-4">Discovery</span>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground">New Faces</h2>
          </div>
          <Link href="/models">
            <span className="hidden md:flex items-center gap-2 text-sm tracking-widest uppercase hover:text-primary transition-colors cursor-pointer group">
              View All 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newFaces.length > 0 ? (
            newFaces.map((model, idx) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => setSelectedModelId(model.id)}
              >
                <div className="relative overflow-hidden aspect-[3/4] mb-4 bg-muted border border-white/5">
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <img 
                    src={model.imageUrl} 
                    alt={model.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {model.isNewFace && (
                    <div className="absolute top-4 left-4 z-20 bg-primary text-background text-[10px] uppercase tracking-widest px-2 py-1 font-bold">
                      New Face
                    </div>
                  )}
                </div>
                <h3 className="text-2xl font-serif text-foreground group-hover:text-primary transition-colors">{model.name}</h3>
                <p className="text-xs font-sans text-muted-foreground tracking-widest mt-1 uppercase">{model.location}</p>
              </motion.div>
            ))
          ) : (
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[3/4] bg-white/5 animate-pulse" />
            ))
          )}
        </div>
      </section>

      {/* Member Qualifications Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-white" />
        
        {/* Custom Zig-zag Divider Effect */}
        <div className="absolute top-0 left-0 w-full h-12 bg-background z-10" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 95% 40%, 90% 100%, 85% 40%, 80% 100%, 75% 40%, 70% 100%, 65% 40%, 60% 100%, 55% 40%, 50% 100%, 45% 40%, 40% 100%, 35% 40%, 30% 100%, 25% 40%, 20% 100%, 15% 40%, 10% 100%, 5% 40%, 0 100%)" }} />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-4">
              <h2 className="text-6xl md:text-7xl font-serif text-black leading-none mb-4">Member Qualifications</h2>
              <p className="text-sm tracking-widest text-black/60 uppercase">(unless exclusively invited by our team)</p>
            </div>
            
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-6">
                <h3 className="text-4xl font-serif italic text-black">1 Mio. Followers plus</h3>
                <p className="text-black/70 leading-relaxed">Members need to have at least a combined following of more than a million across all social media platforms.</p>
              </div>
              <div className="space-y-6">
                <h3 className="text-4xl font-serif italic text-black">5 % E.R. plus</h3>
                <p className="text-black/70 leading-relaxed">Members need to have an engagement rate of above 5% - 5 times above average.</p>
              </div>
              <div className="space-y-6">
                <h3 className="text-4xl font-serif italic text-black">Application approved</h3>
                <p className="text-black/70 leading-relaxed">Members need to be approved through our application process and Zoom interview call.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-12 bg-background z-10" style={{ clipPath: "polygon(0 100%, 0 0, 5% 60%, 10% 0, 15% 60%, 20% 0, 25% 60%, 30% 0, 35% 60%, 40% 0, 45% 60%, 50% 0, 55% 60%, 60% 0, 65% 60%, 70% 0, 75% 60%, 80% 0, 85% 60%, 90% 0, 95% 60%, 100% 0, 100% 100%)" }} />
      </section>

      {/* Trips/Grid Images Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 max-w-2xl mx-auto">
            <h2 className="text-6xl md:text-8xl font-serif text-foreground mb-6 leading-none tracking-tighter">Trips Around The World</h2>
            <p className="text-xl text-muted-foreground font-light leading-relaxed">
              Join Members <span className="text-white font-bold italic">around the world</span> for experiences you never thought <span className="italic">existed.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[1200px] md:h-[900px]">
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="md:col-span-4 rounded-3xl overflow-hidden relative group"
            >
              <img src={gridImg1} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Global Trip 1" />
            </motion.div>
            
            <div className="md:col-span-4 grid grid-rows-3 gap-6">
              <motion.div 
                whileHover={{ scale: 0.98 }}
                className="rounded-3xl overflow-hidden relative group"
              >
                <img src="https://images.unsplash.com/photo-1539109132382-381bb3f1cffb?q=80&w=800" className="w-full h-full object-cover" alt="Luxury Dinner" />
              </motion.div>
              <motion.div 
                whileHover={{ scale: 0.98 }}
                className="rounded-3xl overflow-hidden relative group"
              >
                <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800" className="w-full h-full object-cover" alt="Dubai Luxury" />
              </motion.div>
              <motion.div 
                whileHover={{ scale: 0.98 }}
                className="rounded-3xl overflow-hidden relative group"
              >
                <img src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=800" className="w-full h-full object-cover" alt="Fashion Show" />
              </motion.div>
            </div>

            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="md:col-span-4 rounded-3xl overflow-hidden relative group"
            >
              <img src={gridImg2} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Global Trip 2" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Review Section with Video Background */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src={reviewVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        
        <div className="relative z-10 h-full">
          <ReviewCarousel />
        </div>
      </section>

      {/* Footer Strip */}
      <footer className="py-20 border-t border-white/5 bg-background">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-8xl md:text-[12rem] font-serif text-foreground/5 tracking-tighter leading-none mb-12 select-none">VOSS CASTING</h2>
          <div className="flex justify-center gap-12 text-[10px] tracking-[0.5em] uppercase text-muted-foreground font-bold">
            <Link href="/models" className="hover:text-primary transition-colors">Talent</Link>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </PageTransition>
  );
}
