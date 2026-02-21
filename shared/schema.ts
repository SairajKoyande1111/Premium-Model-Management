import { pgTable, text, serial, boolean, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const models = pgTable("models", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // Commercial, Editorial, Runway
  gender: text("gender").notNull(), // Women, Men
  height: text("height").notNull(),
  eyes: text("eyes").notNull(),
  location: text("location").notNull(),
  imageUrl: text("image_url").notNull(),
  isNewFace: boolean("is_new_face").default(false),
  bio: text("bio"),
  measurements: jsonb("measurements"), // { chest: string, waist: string, hips: string, shoes: string }
  gallery: text("gallery").array(),
  instagram: text("instagram"),
  stats: jsonb("stats"), // { loves: number, views: number, followers: number }
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  category: text("category").notNull(), // Model / Brand / Press
  message: text("message").notNull(),
});

export const insertModelSchema = createInsertSchema(models).omit({ id: true });
export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({ id: true });

export type Model = typeof models.$inferSelect;
export type InsertModel = z.infer<typeof insertModelSchema>;

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;