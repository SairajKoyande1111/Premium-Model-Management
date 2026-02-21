import type { Express } from "express";
import { type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

async function seedDatabase() {
  const existingModels = await storage.getModels();
  if (existingModels.length === 0) {
    const seedModels = [
      {
        name: "Anya Taylor",
        category: "Editorial",
        gender: "Women",
        height: "5'11\"",
        eyes: "Blue",
        location: "New York",
        imageUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop",
        isNewFace: true,
        bio: "Anya is a high-fashion editorial model known for her striking features and versatile look.",
        measurements: { chest: "32", waist: "24", hips: "34", shoes: "9" },
        gallery: [
          "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800",
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800"
        ],
        instagram: "anyat_official",
        stats: { loves: 1240, views: 5600, followers: 8900 }
      },
      {
        name: "Marcus Thorne",
        category: "Commercial",
        gender: "Men",
        height: "6'2\"",
        eyes: "Brown",
        location: "London",
        imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
        isNewFace: true,
        bio: "Marcus brings a strong, sophisticated presence to every commercial campaign.",
        measurements: { chest: "40", waist: "32", hips: "40", shoes: "11" },
        gallery: [
          "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800",
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800"
        ],
        instagram: "marcust_official",
        stats: { loves: 850, views: 3200, followers: 4500 }
      },
      {
        name: "Elena Rostova",
        category: "Runway",
        gender: "Women",
        height: "6'0\"",
        eyes: "Green",
        location: "Paris",
        imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
        isNewFace: true,
        bio: "Elena's runway walk is legendary, making her a favorite for top Parisian designers.",
        measurements: { chest: "31", waist: "23", hips: "33", shoes: "8.5" },
        gallery: [
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800",
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800"
        ],
        instagram: "elena_r",
        stats: { loves: 2100, views: 12000, followers: 15000 }
      },
      {
        name: "Sienna Luxe",
        category: "New Face",
        gender: "Women",
        height: "5'10\"",
        eyes: "Hazel",
        location: "Milan",
        imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
        isNewFace: true,
        bio: "Sienna is the newest breakout star from Milan with a fresh and captivating look.",
        measurements: { chest: "33", waist: "25", hips: "35", shoes: "9.5" },
        gallery: [
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800",
          "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=800"
        ],
        instagram: "siennaluxe",
        stats: { loves: 980, views: 4500, followers: 6700 }
      }
    ];

    for (const model of seedModels) {
      await storage.createModel(model);
    }
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Call seed on startup
  seedDatabase().catch(console.error);

  app.get(api.models.list.path, async (req, res) => {
    const models = await storage.getModels();
    res.json(models);
  });

  app.get(api.models.get.path, async (req, res) => {
    const model = await storage.getModel(Number(req.params.id));
    if (!model) {
      return res.status(404).json({ message: "Model not found" });
    }
    res.json(model);
  });

  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      await storage.createContactSubmission(input);
      res.status(201).json({ success: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}