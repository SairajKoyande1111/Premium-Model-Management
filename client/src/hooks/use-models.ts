import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { z } from "zod";
import type { Model, InsertModel } from "@shared/schema";

// GET /api/models
export function useModels() {
  return useQuery({
    queryKey: [api.models.list.path],
    queryFn: async () => {
      const res = await fetch(api.models.list.path);
      if (!res.ok) throw new Error("Failed to fetch models");
      // Use the Zod schema from routes to validate response
      return api.models.list.responses[200].parse(await res.json());
    },
  });
}

// GET /api/models/:id
export function useModel(id: number) {
  return useQuery({
    queryKey: [api.models.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.models.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch model details");
      return api.models.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

// Contact Form Mutation
// POST /api/contact
export function useContactSubmission() {
  return useMutation({
    mutationFn: async (data: any) => {
      // Validate input against schema
      const validated = api.contact.submit.input.parse(data);
      
      const res = await fetch(api.contact.submit.path, {
        method: api.contact.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to submit form");
      }
      
      return api.contact.submit.responses[201].parse(await res.json());
    },
  });
}
