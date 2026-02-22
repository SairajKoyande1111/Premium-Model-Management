import { useQuery, useMutation } from "@tanstack/react-query";
import type { Model } from "@shared/schema";
import { models } from "../data/models";

// GET /api/models
export function useModels() {
  return useQuery({
    queryKey: ["/api/models"],
    queryFn: async () => {
      return models;
    },
  });
}

// GET /api/models/:id
export function useModel(id: number) {
  return useQuery({
    queryKey: ["/api/models", id],
    queryFn: async () => {
      const model = models.find(m => m.id === id);
      if (!model) return null;
      return model;
    },
    enabled: !!id,
  });
}

// Contact Form Mutation
// Simulated for static site
export function useContactSubmission() {
  return useMutation({
    mutationFn: async (data: any) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Contact form submitted (static mode):", data);
      return { success: true };
    },
  });
}
