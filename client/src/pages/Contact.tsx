import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSubmissionSchema, type InsertContactSubmission } from "@shared/schema";
import { useContactSubmission } from "@/hooks/use-models";
import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const mutation = useContactSubmission();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      name: "",
      email: "",
      category: "Model Application",
      message: ""
    }
  });

  const onSubmit = (data: InsertContactSubmission) => {
    mutation.mutate(data, {
      onSuccess: () => {
        setSubmitted(true);
        toast({
          title: "Message Sent",
          description: "We have received your inquiry and will be in touch shortly.",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 flex flex-col items-center">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          
          {/* Contact Info Side */}
          <div className="space-y-12 order-2 md:order-1">
            <div>
              <h1 className="font-serif text-5xl md:text-7xl text-foreground mb-6">Contact Us</h1>
              <p className="font-sans text-muted-foreground font-light leading-relaxed max-w-sm">
                For booking inquiries, representation, or press, please contact our offices below or use the form.
              </p>
            </div>

            <div className="space-y-8">
              <div className="group">
                <h3 className="font-serif text-2xl text-primary mb-2 group-hover:translate-x-2 transition-transform duration-300">Paris</h3>
                <p className="text-sm font-sans text-foreground/80">12 Rue Saint-Honoré, 75001</p>
                <p className="text-sm font-sans text-foreground/80">+33 1 42 60 55 20</p>
                <a href="mailto:paris@vossmodels.com" className="text-xs uppercase tracking-widest text-muted-foreground mt-2 block hover:text-primary">paris@vossmodels.com</a>
              </div>
              
              <div className="group">
                <h3 className="font-serif text-2xl text-primary mb-2 group-hover:translate-x-2 transition-transform duration-300">New York</h3>
                <p className="text-sm font-sans text-foreground/80">45 Grand Street, NY 10013</p>
                <p className="text-sm font-sans text-foreground/80">+1 212 555 0199</p>
                <a href="mailto:ny@vossmodels.com" className="text-xs uppercase tracking-widest text-muted-foreground mt-2 block hover:text-primary">ny@vossmodels.com</a>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <p className="text-xs font-sans uppercase tracking-[0.2em] text-muted-foreground mb-4">Open Call</p>
              <p className="text-sm font-sans text-foreground">
                Every Wednesday 10am - 12pm<br/>
                Please bring no makeup and form-fitting clothes.
              </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="order-1 md:order-2 bg-white/5 p-8 md:p-12 border border-white/5">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20"
              >
                <CheckCircle className="w-16 h-16 text-primary" strokeWidth={1} />
                <h3 className="font-serif text-3xl text-foreground">Thank You</h3>
                <p className="text-muted-foreground font-light">Your message has been dispatched to our team.</p>
                <button 
                  onClick={() => { setSubmitted(false); form.reset(); }}
                  className="mt-8 text-xs uppercase tracking-widest text-primary border-b border-primary pb-1 hover:text-white hover:border-white transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div>
                  <h3 className="font-serif text-3xl text-foreground mb-8">Get in Touch</h3>
                </div>

                <div className="space-y-6">
                  <div className="relative">
                    <input
                      {...form.register("name")}
                      placeholder="Name"
                      className="w-full bg-transparent border-b border-white/20 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors duration-300"
                    />
                    {form.formState.errors.name && (
                      <span className="text-red-400 text-xs mt-1 block">{form.formState.errors.name.message}</span>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      {...form.register("email")}
                      placeholder="Email Address"
                      type="email"
                      className="w-full bg-transparent border-b border-white/20 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors duration-300"
                    />
                    {form.formState.errors.email && (
                      <span className="text-red-400 text-xs mt-1 block">{form.formState.errors.email.message}</span>
                    )}
                  </div>

                  <div className="relative">
                    <select
                      {...form.register("category")}
                      className="w-full bg-transparent border-b border-white/20 py-3 text-foreground focus:outline-none focus:border-primary transition-colors duration-300 appearance-none cursor-pointer"
                    >
                      <option className="bg-background text-foreground" value="Model Application">Model Application</option>
                      <option className="bg-background text-foreground" value="Booking Inquiry">Booking Inquiry</option>
                      <option className="bg-background text-foreground" value="Press">Press</option>
                      <option className="bg-background text-foreground" value="Other">Other</option>
                    </select>
                    <div className="absolute right-0 top-4 pointer-events-none opacity-50 text-xs">▼</div>
                  </div>

                  <div className="relative">
                    <textarea
                      {...form.register("message")}
                      placeholder="Message"
                      rows={4}
                      className="w-full bg-transparent border-b border-white/20 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors duration-300 resize-none"
                    />
                    {form.formState.errors.message && (
                      <span className="text-red-400 text-xs mt-1 block">{form.formState.errors.message.message}</span>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full bg-primary/10 border border-primary text-primary hover:bg-primary hover:text-background transition-all duration-300 py-4 font-sans text-xs uppercase tracking-[0.2em] font-bold flex justify-center items-center gap-2"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    "Submit Inquiry"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
