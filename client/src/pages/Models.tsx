import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModels } from "@/hooks/use-models";
import { PageTransition } from "@/components/PageTransition";
import { ModelDetail } from "@/components/ModelDetail";

type FilterType = 'All' | 'Women' | 'Men' | 'New Faces';

export default function Models() {
  const { data: models, isLoading } = useModels();
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [selectedModelId, setSelectedModelId] = useState<number | null>(null);

  const filteredModels = models?.filter(model => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'New Faces') return model.isNewFace;
    return model.gender === activeFilter;
  }) || [];

  const displayModels = filteredModels;

  return (
    <PageTransition>
      <AnimatePresence>
        {selectedModelId && (
          <ModelDetail id={selectedModelId} onClose={() => setSelectedModelId(null)} />
        )}
      </AnimatePresence>
      
      <div className="min-h-screen pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div>
              <h1 className="font-serif text-5xl md:text-7xl text-foreground mb-4">Our Talent</h1>
              <p className="font-sans text-sm tracking-[0.2em] text-muted-foreground uppercase max-w-md">
                Representing a diverse roster of extraordinary faces shaping the global fashion industry.
              </p>
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {(['All', 'Women', 'Men', 'New Faces'] as FilterType[]).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`
                    px-6 py-2 rounded-full text-xs uppercase tracking-widest transition-all duration-300 border
                    ${activeFilter === filter 
                      ? "bg-primary text-background border-primary font-bold" 
                      : "bg-transparent text-foreground border-white/10 hover:border-primary/50"}
                  `}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
            <AnimatePresence mode="popLayout">
              {isLoading ? (
                // Loading Skeletons
                [...Array(12)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-white/5 animate-pulse rounded-sm" />
                ))
              ) : displayModels.length > 0 ? (
                displayModels.map((model) => (
                  <motion.div
                    layout
                    key={model.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="group relative cursor-pointer"
                    onClick={() => setSelectedModelId(model.id)}
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-muted relative mb-4 border border-transparent group-hover:border-primary/50 transition-colors duration-500">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-6">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <p className="text-primary text-xs uppercase tracking-widest mb-1">{model.height} • {model.eyes} Eyes</p>
                          <p className="text-white text-xs uppercase tracking-widest">{model.location}</p>
                        </div>
                      </div>
                      
                      <img 
                        src={model.imageUrl} 
                        alt={model.name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      />
                      
                      {model.isNewFace && (
                        <div className="absolute top-3 right-3 bg-primary text-background text-[9px] font-bold uppercase px-2 py-1 tracking-wider z-20">
                          New
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-white/10 pb-2 group-hover:border-primary transition-colors duration-500">
                      <h3 className="font-serif text-2xl text-foreground">{model.name}</h3>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider group-hover:text-primary transition-colors">{model.category}</span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center text-muted-foreground">
                  <p>No models found matching this criteria.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
