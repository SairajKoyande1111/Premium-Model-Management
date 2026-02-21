import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowRight, Star, Instagram, Maximize2, X, MessageSquare, Calendar, UserPlus, Share2 } from "lucide-react";
import { useModels } from "@/hooks/use-models";
import { PageTransition } from "@/components/PageTransition";
import heroVideo from "@assets/9218263-hd_1920_1080_30fps_1771689360650.mp4";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Typewriter = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayText}</span>;
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
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl overflow-y-auto pt-20"
    >
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <button 
          onClick={onClose}
          className="fixed top-8 right-8 z-[110] p-4 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-foreground"
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Main Image & Stats */}
          <div className="space-y-8">
            <div className="aspect-[3/4] relative overflow-hidden bg-muted group">
              <img src={model.imageUrl} alt={model.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h1 className="text-5xl md:text-7xl font-serif text-foreground mb-4">{model.name}</h1>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary px-4 py-1">
                    Professional Model
                  </Badge>
                  <span className="flex items-center gap-2 text-muted-foreground text-sm tracking-widest uppercase">
                    <Star size={14} className="text-primary" /> {model.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary text-background hover:bg-primary/90 px-8">
                <Calendar className="mr-2 h-4 w-4" /> Hire Me
              </Button>
              <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5">
                <MessageSquare className="mr-2 h-4 w-4" /> Message
              </Button>
              <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5">
                <UserPlus className="mr-2 h-4 w-4" /> Invite to casting
              </Button>
              <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Public Stats */}
            <div className="flex gap-8 py-8 border-y border-white/5 text-sm tracking-widest uppercase text-muted-foreground">
              <div>Photo loves <span className="text-foreground block text-lg font-serif mt-1">{model.stats?.loves || 0}</span></div>
              <div>Views <span className="text-foreground block text-lg font-serif mt-1">{model.stats?.views || 0}</span></div>
              <div>Followers <span className="text-foreground block text-lg font-serif mt-1">{model.stats?.followers || 0}</span></div>
            </div>

            {/* Instagram */}
            {model.instagram && (
              <a href={`https://instagram.com/${model.instagram}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors uppercase tracking-widest text-xs">
                <Instagram size={16} /> @{model.instagram}
              </a>
            )}
          </div>

          {/* Right: Details & Gallery */}
          <div className="space-y-12">
            <div className="flex gap-8 border-b border-white/5 pb-4">
              {['Photos', 'Videos', 'Tiktok', 'Reviews', 'About'].map((tab) => (
                <button key={tab} className={`text-sm tracking-widest uppercase pb-4 relative ${tab === 'Photos' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                  {tab}
                  {tab === 'Photos' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />}
                </button>
              ))}
            </div>

            {/* Measurements Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 bg-white/5 px-8">
              <div>
                <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] block mb-1">Height</span>
                <span className="text-xl font-serif">{model.height}</span>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] block mb-1">Eyes</span>
                <span className="text-xl font-serif">{model.eyes}</span>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] block mb-1">Waist</span>
                <span className="text-xl font-serif">{model.measurements?.waist || '-'}</span>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] block mb-1">Shoes</span>
                <span className="text-xl font-serif">{model.measurements?.shoes || '-'}</span>
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {model.gallery?.map((img, i) => (
                <div key={i} className="aspect-square bg-muted overflow-hidden group">
                  <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
              ))}
            </div>

            <div className="prose prose-invert max-w-none">
              <h3 className="font-serif text-2xl mb-4">Biography</h3>
              <p className="text-muted-foreground leading-relaxed font-light">{model.bio}</p>
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
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
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
          <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent" />
          <span className="text-[10px] tracking-widest text-primary uppercase">Scroll</span>
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
                <div className="relative overflow-hidden aspect-[3/4] mb-4 bg-muted">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <img 
                    src={model.imageUrl} 
                    alt={model.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
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
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Vogue_logo.svg/2560px-Vogue_logo.svg.png" alt="Vogue" className="h-6 md:h-8 object-contain brightness-0 invert" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Chanel_logo_intertwined.svg/2560px-Chanel_logo_intertwined.svg.png" alt="Chanel" className="h-6 md:h-8 object-contain brightness-0 invert" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Gucci_logo.svg/2560px-Gucci_logo.svg.png" alt="Gucci" className="h-6 md:h-8 object-contain brightness-0 invert" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Prada_logo.svg/1280px-Prada_logo.svg.png" alt="Prada" className="h-6 md:h-8 object-contain brightness-0 invert" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Yves_Saint_Laurent_Logo.svg/1280px-Yves_Saint_Laurent_Logo.svg.png" alt="YSL" className="h-8 md:h-10 object-contain brightness-0 invert" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Dior_logo.svg/2560px-Dior_logo.svg.png" alt="Dior" className="h-6 md:h-8 object-contain brightness-0 invert" />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}