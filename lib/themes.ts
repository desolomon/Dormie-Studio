export type ThemeColors = {
  wall: string;
  floor: string;
  floorRoughness: number;
  floorIsMarble: boolean;
  bedFrame: string;
  bedding: string;
  pillow1: string;
  pillow2: string;
  desk: string;
  chair: string;
  dresser: string;
  dresserFace: string;
  bookshelf: string;
  rug: string;
  accent: string;
};

export type ThemeLighting = {
  ambientColor: string;
  ambientIntensity: number;
  dirColor: string;
  dirIntensity: number;
  dirFromRight: boolean;
};

export type KitItem = {
  name: string;
  description: string;
  price: number;
};

export type Theme = {
  id: string;
  name: string;
  description: string;
  gender: "girls" | "boys";
  palette: string[];
  colors: ThemeColors;
  lighting: ThemeLighting;
  kit: KitItem[];
};

function baseKit(comforterName: string, chairName: string): KitItem[] {
  return [
    { name: "Dorm Bed Frame", description: "Sturdy and stylish, fits standard twin XL", price: 129 },
    { name: comforterName, description: "Includes comforter and 2 pillowcases", price: 89 },
    { name: "Dorm Desk", description: "Spacious surface with cable management", price: 149 },
    { name: chairName, description: "Adjustable height, lumbar support", price: 119 },
    { name: "3-Drawer Dresser", description: "Compact storage for small spaces", price: 99 },
    { name: "3-Shelf Bookcase", description: "Perfect for books, decor, and storage bins", price: 69 },
    { name: "Area Rug 5x7", description: "Soft underfoot, easy to clean", price: 59 },
    { name: "Desk Lamp", description: "LED, adjustable arm", price: 39 },
  ];
}

export const THEMES: Record<string, Theme> = {
  floral: {
    id: "floral",
    name: "Floral",
    description: "Soft botanicals and warm neutrals for a cozy, garden-inspired room",
    gender: "girls",
    palette: ["#F5F0E8", "#F2C4CE", "#9CAF88", "#C9A84C"],
    colors: {
      wall: "#F5F0E8",
      floor: "#D4B896",
      floorRoughness: 0.8,
      floorIsMarble: false,
      bedFrame: "#FFFFFF",
      bedding: "#F2C4CE",
      pillow1: "#F2C4CE",
      pillow2: "#FAF7F2",
      desk: "#FFFFFF",
      chair: "#9CAF88",
      dresser: "#FFFFFF",
      dresserFace: "#D4B896",
      bookshelf: "#FFFFFF",
      rug: "#D4909A",
      accent: "#C9A84C",
    },
    lighting: {
      ambientColor: "#FFF8F0",
      ambientIntensity: 0.65,
      dirColor: "#FFE8D0",
      dirIntensity: 1.8,
      dirFromRight: false,
    },
    kit: baseKit("Botanical Floral Twin XL Set", "Sage Green Accent Chair"),
  },

  pink: {
    id: "pink",
    name: "Pink",
    description: "Bold blush tones and gold accents for a glam, Pinterest-worthy space",
    gender: "girls",
    palette: ["#FADADD", "#FF69B4", "#FFFFFF", "#C9A84C"],
    colors: {
      wall: "#FADADD",
      floor: "#F0EDE8",
      floorRoughness: 0.4,
      floorIsMarble: true,
      bedFrame: "#FFFFFF",
      bedding: "#FF69B4",
      pillow1: "#FFFFFF",
      pillow2: "#FF69B4",
      desk: "#FFFFFF",
      chair: "#FFFFFF",
      dresser: "#FFFFFF",
      dresserFace: "#C9A84C",
      bookshelf: "#FFFFFF",
      rug: "#FAD4DA",
      accent: "#C9A84C",
    },
    lighting: {
      ambientColor: "#FFF8FF",
      ambientIntensity: 0.7,
      dirColor: "#FFFFFF",
      dirIntensity: 2.2,
      dirFromRight: true,
    },
    kit: baseKit("Blush Glam Twin XL Set", "White & Gold Vanity Chair"),
  },

  blue: {
    id: "blue",
    name: "Blue",
    description: "Clean navy and white for a sharp, timeless look",
    gender: "boys",
    palette: ["#F0F4F8", "#1B2A4A", "#FFFFFF", "#2563EB"],
    colors: {
      wall: "#F0F4F8",
      floor: "#8B7355",
      floorRoughness: 0.85,
      floorIsMarble: false,
      bedFrame: "#2C2C2C",
      bedding: "#1B2A4A",
      pillow1: "#1B2A4A",
      pillow2: "#FFFFFF",
      desk: "#2C2C2C",
      chair: "#1B2A4A",
      dresser: "#2C2C2C",
      dresserFace: "#3A3A3A",
      bookshelf: "#2C2C2C",
      rug: "#1B2A4A",
      accent: "#2563EB",
    },
    lighting: {
      ambientColor: "#F0F8FF",
      ambientIntensity: 0.55,
      dirColor: "#E8F0FF",
      dirIntensity: 2.0,
      dirFromRight: false,
    },
    kit: baseKit("Navy Stripe Twin XL Set", "Navy Performance Chair"),
  },

  sports: {
    id: "sports",
    name: "Sports",
    description: "Bold colors and athletic energy for the ultimate game-day room",
    gender: "boys",
    palette: ["#F2F2F2", "#CC0000", "#1A1A1A", "#FFFFFF"],
    colors: {
      wall: "#F2F2F2",
      floor: "#3D2B1F",
      floorRoughness: 0.9,
      floorIsMarble: false,
      bedFrame: "#1A1A1A",
      bedding: "#CC0000",
      pillow1: "#CC0000",
      pillow2: "#FFFFFF",
      desk: "#1A1A1A",
      chair: "#CC0000",
      dresser: "#1A1A1A",
      dresserFace: "#2A2A2A",
      bookshelf: "#1A1A1A",
      rug: "#3A3A3A",
      accent: "#CC0000",
    },
    lighting: {
      ambientColor: "#F0F0F0",
      ambientIntensity: 0.45,
      dirColor: "#FFFFFF",
      dirIntensity: 2.5,
      dirFromRight: true,
    },
    kit: baseKit("Game Day Color Block Set", "Red Sport Racing Chair"),
  },
};
