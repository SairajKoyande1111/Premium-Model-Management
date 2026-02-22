import { motion, AnimatePresence } from "framer-motion";
import { X, Instagram, Maximize2, Play, Film } from "lucide-react";
import { useModels } from "@/hooks/use-models";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ModelDetail({ id, onClose }: { id: number, onClose: () => void }) {
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
                 <span className="text-muted-foreground tracking-[0.3em] uppercase text-[10px] font-sans">{model.location}</span>
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
                <div className="flex items-center gap-8 border-y border-white/5 py-6 font-sans">
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
            <div className="grid grid-cols-3 gap-12 font-sans">
              <div className="group">
                <span className="text-[9px] text-muted-foreground uppercase tracking-[0.4em] block mb-2 group-hover:text-primary transition-colors">Digital Loves</span>
                <span className="text-4xl font-light leading-none">{(model.stats as any)?.loves?.toLocaleString() || 0}</span>
              </div>
              <div className="group">
                <span className="text-[9px] text-muted-foreground uppercase tracking-[0.4em] block mb-2 group-hover:text-primary transition-colors">Profile Views</span>
                <span className="text-4xl font-light leading-none">{(model.stats as any)?.views?.toLocaleString() || 0}</span>
              </div>
              <div className="group">
                <span className="text-[9px] text-muted-foreground uppercase tracking-[0.4em] block mb-2 group-hover:text-primary transition-colors">Global Reach</span>
                <span className="text-4xl font-light leading-none">{(model.stats as any)?.followers?.toLocaleString() || 0}</span>
              </div>
            </div>

            {/* Professional Measurements */}
            <div className="space-y-8 font-sans">
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
                    <span className="text-xl font-light">{stat.value || '--'}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio Gallery */}
            <div className="space-y-8">
               <div className="flex justify-between items-end">
                 <h3 className="text-xs tracking-[0.5em] uppercase text-primary font-bold">Portfolio</h3>
                 <span className="text-[9px] text-muted-foreground uppercase tracking-widest italic font-sans">Spring / Summer 2026</span>
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

            {/* Video Preview - Placeholder for Rich Content */}
            <div className="space-y-8">
              <h3 className="text-xs tracking-[0.5em] uppercase text-primary font-bold">Motion</h3>
              <div className="aspect-video bg-muted relative group overflow-hidden border border-white/5">
                <img src={model.imageUrl} alt="Video cover" className="w-full h-full object-cover opacity-40 blur-sm" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="p-6 rounded-full border border-primary/20 bg-primary/10 group-hover:bg-primary group-hover:text-background transition-all duration-500">
                    <Play fill="currentColor" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-sans">Request Runway Reel</span>
                </div>
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
                  <span className="text-xs uppercase tracking-[0.3em] font-bold font-sans">@{model.instagram}</span>
                </a>
              )}
              <Button size="lg" className="bg-primary text-background hover:bg-white transition-colors px-12 rounded-none h-14 uppercase tracking-[0.3em] text-[10px] font-bold font-sans">
                Book Talent
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
