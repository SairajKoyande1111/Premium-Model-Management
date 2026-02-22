import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { LOCAL_MODELS } from "@/lib/models-data";

// GET /api/models
export function useModels() {
  return useQuery({
    queryKey: [api.models.list.path],
    queryFn: async () => {
      // Return local data directly for Netlify compatibility
      return LOCAL_MODELS as any[];
    },
  });
}

// GET /api/models/:id
export function useModel(id: number) {
  return useQuery({
    queryKey: [api.models.get.path, id],
    queryFn: async () => {
      const model = LOCAL_MODELS.find(m => m.id === id);
      return (model as any) || null;
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
