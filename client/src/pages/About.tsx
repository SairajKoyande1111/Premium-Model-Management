import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { ArrowDown } from "lucide-react";

export default function About() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Intro Banner */}
        <section className="h-[70vh] flex flex-col justify-center items-center px-6 text-center relative overflow-hidden">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="font-serif text-6xl md:text-8xl lg:text-9xl text-foreground z-10"
          >
            The Agency
          </motion.h1>
          <motion.div 
            initial={{ h: 0 }}
            animate={{ h: 100 }}
            className="w-[1px] h-24 bg-primary mt-8 z-10"
          />
          
          {/* Subtle background element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-primary/5 blur-3xl -z-0" />
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
            <div className="sticky top-32">
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-8 leading-tight">
                Redefining standards in high fashion management.
              </h2>
              <p className="font-sans text-lg text-muted-foreground font-light leading-relaxed">
                Founded in 2024, VOSS Model Management has quickly established itself as a boutique powerhouse. We don't just find faces; we build careers, craft identities, and shape the visual language of modern fashion.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mt-12 border-t border-white/10 pt-8">
                <div>
                  <span className="block text-4xl font-serif text-primary">50+</span>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">Global Campaigns</span>
                </div>
                <div>
                  <span className="block text-4xl font-serif text-primary">3</span>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">International Offices</span>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              {[
                {
                  title: "Philosophy",
                  content: "We believe in a tailored approach. Every model is a unique brand requiring a bespoke strategy. Our ratio of agent to talent is kept intentionally low to ensure maximum attention and development."
                },
                {
                  title: "Global Reach",
                  content: "With strong partnerships in Tokyo, London, and Los Angeles, alongside our main offices in Paris, Milan, and New York, our network is truly borderless."
                },
                {
                  title: "Diversity",
                  content: "Beauty has no single definition. VOSS is committed to representing a spectrum of beauty that reflects the real world, championing inclusivity across all our boards."
                }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 p-8 border border-white/5 hover:border-primary/30 transition-colors duration-500"
                >
                  <h3 className="font-serif text-2xl text-primary mb-4">{item.title}</h3>
                  <p className="font-sans text-foreground/80 font-light leading-relaxed">{item.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 bg-white/5 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <h2 className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-12 text-center">Leadership</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { name: "Elena Voss", role: "Founder & Director" },
                { name: "Marcus Thorne", role: "Head of Scouting" },
                { name: "Sarah Jenkins", role: "Booking Director" }
              ].map((person, i) => (
                <div key={i} className="group">
                  <div className="w-full aspect-square bg-background mb-6 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-500">
                    {/* Placeholder for team member */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
                    <div className="w-full h-full flex items-center justify-center text-primary/20 font-serif text-8xl opacity-20">
                      {person.name.charAt(0)}
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl text-foreground">{person.name}</h3>
                  <p className="text-xs uppercase tracking-widest text-primary mt-2">{person.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
