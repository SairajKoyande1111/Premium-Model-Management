import { type Model } from "@shared/schema";

export const models: Model[] = [
  {
    id: 1,
    name: "Anya Taylor",
    category: "Editorial",
    gender: "Women",
    height: "5'11\"",
    eyes: "Blue",
    location: "New York",
    imageUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop",
    isNewFace: true,
    bio: "Anya is a high-fashion editorial model known for her striking features and versatile look.",
    measurements: { hips: "34", chest: "32", shoes: "9", waist: "24" },
    gallery: [
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800"
    ],
    instagram: "anyat_official",
    stats: { loves: 1240, views: 5600, followers: 8900 }
  },
  {
    id: 2,
    name: "Marcus Thorne",
    category: "Commercial",
    gender: "Men",
    height: "6'2\"",
    eyes: "Brown",
    location: "London",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
    isNewFace: true,
    bio: "Marcus brings a strong, sophisticated presence to every commercial campaign.",
    measurements: { hips: "40", chest: "40", shoes: "11", waist: "32" },
    gallery: [
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800"
    ],
    instagram: "marcust_official",
    stats: { loves: 850, views: 3200, followers: 4500 }
  },
  {
    id: 3,
    name: "Elena Rostova",
    category: "Runway",
    gender: "Women",
    height: "6'0\"",
    eyes: "Green",
    location: "Paris",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    isNewFace: true,
    bio: "Elena's runway walk is legendary, making her a favorite for top Parisian designers.",
    measurements: { hips: "33", chest: "31", shoes: "8.5", waist: "23" },
    gallery: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800"
    ],
    instagram: "elena_r",
    stats: { loves: 2100, views: 12000, followers: 15000 }
  },
  {
    id: 4,
    name: "Sienna Luxe",
    category: "New Face",
    gender: "Women",
    height: "5'10\"",
    eyes: "Hazel",
    location: "Milan",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
    isNewFace: true,
    bio: "Sienna is the newest breakout star from Milan with a fresh and captivating look.",
    measurements: { hips: "35", chest: "33", shoes: "9.5", waist: "25" },
    gallery: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800",
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=800"
    ],
    instagram: "siennaluxe",
    stats: { loves: 980, views: 4500, followers: 6700 }
  },
  {
    id: 5,
    name: "Layla Noor",
    category: "Runway",
    gender: "Women",
    height: "5'11\"",
    eyes: "Hazel",
    location: "Cairo",
    imageUrl: "https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?q=80&w=1974&auto=format&fit=crop",
    isNewFace: false,
    bio: "Layla's commanding presence and architectural features have made her a favorite for avant-garde runway shows across the Middle East and Europe.",
    measurements: { bust: "32", hips: "34", chest: "32", shoes: "39", waist: "24" },
    gallery: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1974&auto=format&fit=crop"
    ],
    instagram: "layla.noor",
    stats: { loves: 1850, views: 6200, followers: 12400 }
  },
  {
    id: 6,
    name: "Zidan Al-Fayed",
    category: "Editorial",
    gender: "Men",
    height: "6'3\"",
    eyes: "Dark Brown",
    location: "Dubai",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    isNewFace: false,
    bio: "Zidan represents the modern face of Middle Eastern luxury, blending traditional charm with international appeal.",
    measurements: { hips: "39", chest: "40", shoes: "44", waist: "31" },
    gallery: [
      "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=800",
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800"
    ],
    instagram: "zidan_alfayed",
    stats: { loves: 2400, views: 8900, followers: 18500 }
  }
];
