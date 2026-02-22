import anyaImg from "@assets/anya.jpg";
import marcusImg from "@assets/marcus.jpg";
import elenaImg from "@assets/elena.jpg";
import siennaImg from "@assets/sienna.jpg";
import laylaImg from "@assets/layla.jpg";
import zidanImg from "@assets/zidan.jpg";

// Gallery imports
import anyaG1 from "@assets/anya_g1.jpg";
import anyaG2 from "@assets/anya_g2.jpg";
import marcusG1 from "@assets/marcus_g1.jpg";
import marcusG2 from "@assets/marcus_g2.jpg";
import elenaG1 from "@assets/elena_g1.jpg";
import elenaG2 from "@assets/elena_g2.jpg";
import siennaG1 from "@assets/sienna_g1.jpg";
import siennaG2 from "@assets/sienna_g2.jpg";
import laylaG1 from "@assets/layla_g1.jpg";
import laylaG2 from "@assets/layla_g2.jpg";
import zidanG1 from "@assets/zidan_g1.jpg";
import zidanG2 from "@assets/zidan_g2.jpg";

export const LOCAL_MODELS = [
  {
    id: 1,
    name: "Anya Taylor",
    category: "Editorial",
    gender: "Women",
    height: "5'11\"",
    eyes: "Blue",
    location: "New York",
    imageUrl: anyaImg,
    isNewFace: true,
    bio: "Anya is a high-fashion editorial model known for her striking features and versatile look.",
    measurements: { chest: "32", waist: "24", hips: "34", shoes: "9" },
    gallery: [anyaG1, anyaG2],
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
    imageUrl: marcusImg,
    isNewFace: true,
    bio: "Marcus brings a strong, sophisticated presence to every commercial campaign.",
    measurements: { chest: "40", waist: "32", hips: "40", shoes: "11" },
    gallery: [marcusG1, marcusG2],
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
    imageUrl: elenaImg,
    isNewFace: true,
    bio: "Elena's runway walk is legendary, making her a favorite for top Parisian designers.",
    measurements: { chest: "31", waist: "23", hips: "33", shoes: "8.5" },
    gallery: [elenaG1, elenaG2],
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
    imageUrl: siennaImg,
    isNewFace: true,
    bio: "Sienna is the newest breakout star from Milan with a fresh and captivating look.",
    measurements: { chest: "33", waist: "25", hips: "35", shoes: "9.5" },
    gallery: [siennaG1, siennaG2],
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
    imageUrl: laylaImg,
    isNewFace: false,
    bio: "Layla's commanding presence and architectural features have made her a favorite for avant-garde runway shows across the Middle East and Europe.",
    measurements: { bust: "32", waist: "24", hips: "34", shoes: "39", chest: "32" },
    gallery: [laylaG1, laylaG2],
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
    imageUrl: zidanImg,
    isNewFace: false,
    bio: "Zidan represents the modern face of Middle Eastern luxury, blending traditional charm with international appeal.",
    measurements: { chest: "40", waist: "31", hips: "39", shoes: "44" },
    gallery: [zidanG1, zidanG2],
    instagram: "zidan_alfayed",
    stats: { loves: 2400, views: 8900, followers: 18500 }
  }
];