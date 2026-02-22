import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Star, Instagram, Maximize2, X, Calendar, Share2, MessageSquare, UserPlus } from "lucide-react";
import { useModels } from "@/hooks/use-models";
import { PageTransition } from "@/components/PageTransition";
import heroVideo from "@assets/9218263-hd_1920_1080_30fps_1771689360650.mp4";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

function ModelDetail({ id, onClose }: { id: number, onClose: () => void }) {
  const { data: models } = useModels();
  const model = models?.find(m => m.id === id);

  if (!model) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-2xl overflow-y-auto"
    >
      <div className="min-h-screen w-full relative">
        <button 
          onClick={onClose}
          className="fixed top-8 right-8 z-[110] p-4 bg-white/5 hover:bg-primary hover:text-background rounded-full transition-all duration-300 text-foreground backdrop-blur-md border border-white/10"
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Left: Cinematic Image Display */}
          <div className="relative h-[70vh] lg:h-screen lg:sticky lg:top-0 overflow-hidden">
            <motion.img 
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src={model.imageUrl} 
              alt={model.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-background/20" />
            
            <div className="absolute bottom-12 left-12 right-12 lg:hidden">
               <h1 className="text-6xl font-serif text-foreground mb-4 tracking-tighter">{model.name}</h1>
               <div className="flex items-center gap-4">
                 <Badge className="bg-primary text-background px-4 py-1 rounded-none uppercase tracking-[0.2em] text-[10px]">
                   {model.category}
                 </Badge>
                 <span className="text-muted-foreground tracking-[0.3em] uppercase text-[10px]">{model.location}</span>
               </div>
            </div>
          </div>

          {/* Right: Rich Editorial Content */}
          <div className="p-8 md:p-16 lg:p-24 space-y-20 bg-background/50">
            <div className="hidden lg:block space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-primary text-[10px] tracking-[0.5em] uppercase block mb-4">Elite Representation</span>
                <h1 className="text-8xl font-serif text-foreground leading-none tracking-tighter mb-8">{model.name}</h1>
                <div className="flex items-center gap-8 border-y border-white/5 py-6">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-muted-foreground uppercase tracking-[0.3em] mb-1">Status</span>
                    <span className="text-sm uppercase tracking-widest">{model.isNewFace ? 'New Face' : 'Mainboard'}</span>
                  </div>
                  <div className="w-[1px] h-8 bg-white/10" />
                  <div className="flex flex-col">
                    <span className="text-[9px] text-muted-foreground uppercase tracking-[0.3em] mb-1">Category</span>
                    <span className="text-sm uppercase tracking-widest">{model.category}</span>
                  </div>
                  <div className="w-[1px] h-8 bg-white/10" />
                  <div className="flex flex-col">
                    <span className="text-[9px] text-muted-foreground uppercase tracking-[0.3em] mb-1">Base</span>
                    <span className="text-sm uppercase tracking-widest">{model.location}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Statistics Section */}
            <div className="grid grid-cols-3 gap-12">
              <div className="group">
                <span className="text-[9px] text-muted-foreground uppercase tracking-[0.4em] block mb-2 group-hover:text-primary transition-colors">Digital Loves</span>
                <span className="text-4xl font-serif leading-none">{(model.stats as any)?.loves?.toLocaleString() || 0}</span>
              </div>
              <div className="group">
                <span className="text-[9px] text-muted-foreground uppercase tracking-[0.4em] block mb-2 group-hover:text-primary transition-colors">Profile Views</span>
                <span className="text-4xl font-serif leading-none">{(model.stats as any)?.views?.toLocaleString() || 0}</span>
              </div>
              <div className="group">
                <span className="text-[9px] text-muted-foreground uppercase tracking-[0.4em] block mb-2 group-hover:text-primary transition-colors">Global Reach</span>
                <span className="text-4xl font-serif leading-none">{(model.stats as any)?.followers?.toLocaleString() || 0}</span>
              </div>
            </div>

            {/* Professional Measurements */}
            <div className="space-y-8">
              <h3 className="text-xs tracking-[0.5em] uppercase text-primary font-bold">Measurements</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
                {[
                  { label: "Height", value: model.height },
                  { label: "Eyes", value: model.eyes },
                  { label: "Waist", value: (model.measurements as any)?.waist },
                  { label: "Shoes", value: (model.measurements as any)?.shoes },
                  { label: "Chest", value: (model.measurements as any)?.chest },
                  { label: "Hips", value: (model.measurements as any)?.hips }
                ].map((stat, i) => (
                  <div key={i} className="border-l border-white/10 pl-4">
                    <span className="text-[9px] text-muted-foreground uppercase tracking-[0.3em] block mb-1">{stat.label}</span>
                    <span className="text-xl font-serif">{stat.value || '--'}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio Gallery */}
            <div className="space-y-8">
               <div className="flex justify-between items-end">
                 <h3 className="text-xs tracking-[0.5em] uppercase text-primary font-bold">Portfolio</h3>
                 <span className="text-[9px] text-muted-foreground uppercase tracking-widest italic">Spring / Summer 2026</span>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 {model.gallery?.map((img, i) => (
                   <motion.div 
                     key={i} 
                     whileHover={{ scale: 0.98 }}
                     className="aspect-[3/4] bg-muted overflow-hidden relative group cursor-crosshair"
                   >
                     <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                     <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                     <Maximize2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100" />
                   </motion.div>
                 ))}
               </div>
            </div>

            {/* Biography */}
            <div className="space-y-8">
              <h3 className="text-xs tracking-[0.5em] uppercase text-primary font-bold">Narrative</h3>
              <p className="text-xl font-serif italic text-foreground/90 leading-relaxed max-w-2xl">
                "{model.bio}"
              </p>
            </div>

            {/* Social & Contact */}
            <div className="pt-12 border-t border-white/5 flex flex-wrap items-center gap-8">
              {model.instagram && (
                <a 
                  href={`https://instagram.com/${model.instagram}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-3 text-primary hover:text-white transition-all group"
                >
                  <div className="p-3 rounded-full border border-primary/20 group-hover:bg-primary group-hover:text-background transition-all">
                    <Instagram size={20} />
                  </div>
                  <span className="text-xs uppercase tracking-[0.3em] font-bold">@{model.instagram}</span>
                </a>
              )}
              <Button size="lg" className="bg-primary text-background hover:bg-white transition-colors px-12 rounded-none h-14 uppercase tracking-[0.3em] text-[10px] font-bold">
                Book Talent
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const { data: models } = useModels();
  const [selectedModelId, setSelectedModelId] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  
  // Filter new faces
  const newFaces = models?.filter(m => m.isNewFace).slice(0, 4) || [];

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

      {/* Scrolling Ticker */}
      <div className="py-8 border-y border-white/5 bg-background overflow-hidden whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex items-center gap-16 opacity-30"
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-4xl font-serif italic text-primary">VOSS</span>
              <Star className="w-4 h-4 text-foreground" fill="currentColor" />
              <span className="text-4xl font-serif text-foreground">CASTING</span>
              <Star className="w-4 h-4 text-foreground" fill="currentColor" />
            </div>
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

        {/* Asymmetric Grid */}
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
            // Skeletons if loading or empty
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[3/4] bg-white/5 animate-pulse" />
            ))
          )}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Link href="/models">
            <span className="inline-flex items-center gap-2 text-sm tracking-widest uppercase hover:text-primary transition-colors cursor-pointer">
              View All <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </section>

      {/* Brand Strip */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-12">Trusted Partners</p>
            <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
              <span className="text-2xl font-serif tracking-tighter text-foreground/80 hover:text-primary transition-colors cursor-default">VOGUE</span>
              <span className="text-2xl font-serif tracking-tighter text-foreground/80 hover:text-primary transition-colors cursor-default">CHANEL</span>
              <span className="text-2xl font-serif tracking-tighter text-foreground/80 hover:text-primary transition-colors cursor-default">GUCCI</span>
              <span className="text-2xl font-serif tracking-tighter text-foreground/80 hover:text-primary transition-colors cursor-default">PRADA</span>
              <span className="text-2xl font-serif tracking-tighter text-foreground/80 hover:text-primary transition-colors cursor-default">YSL</span>
              <span className="text-2xl font-serif tracking-tighter text-foreground/80 hover:text-primary transition-colors cursor-default">DIOR</span>
            </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <span className="text-primary text-xs tracking-[0.4em] uppercase block mb-6">Expertise</span>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-12">Full-Spectrum Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
              {[
                { title: "Editorial", desc: "High-concept fashion narratives for prestigious global publications." },
                { title: "Runway", desc: "Commanding presence for the world's most anticipated collections." },
                { title: "Commercial", desc: "Relatable, professional talent for premium brand campaigns." }
              ].map((service, i) => (
                <div key={i} className="group p-8 border border-white/5 hover:border-primary/20 transition-colors">
                  <h3 className="text-2xl font-serif mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground font-light leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
