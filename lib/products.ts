export type Product = {
  id: string;
  label: string;
  price: string;
  color: string;
  link?: string;
};

export type SelectedItems = Partial<Record<string, Product>>;

export type StyleId = "girls" | "boys" | "neutral" | "aesthetic";

export const STYLES: Record<StyleId, { label: string; emoji: string; items: SelectedItems }> = {
  girls: {
    label: "Girls",
    emoji: "🌸",
    items: {
      Comforters:      { id: "comforter-blush",    label: "Blush Pink",    price: "$42", color: "#e8b4b8" },
      Sheets:          { id: "sheets-pink",         label: "Blush",         price: "$32", color: "#e8c0c4" },
      Rugs:            { id: "rug-blush",           label: "Blush Boucle",  price: "$79", color: "#d4a8a8" },
      Posters:         { id: "poster-botanical",    label: "Botanical",     price: "$18", color: "#7a9e7e" },
      "String Lights": { id: "lights-warm",         label: "Warm White",    price: "$22", color: "#ffd080" },
      "Desk Lamps":    { id: "lamp-pink",           label: "Rose Pink",     price: "$35", color: "#d4808c" },
      "LED Strips":    { id: "led-pink",            label: "Pink",          price: "$25", color: "#ff60a0" },
    },
  },
  boys: {
    label: "Boys",
    emoji: "🏀",
    items: {
      Comforters:      { id: "comforter-navy",      label: "Navy Blue",     price: "$42", color: "#1e3a5f" },
      Sheets:          { id: "sheets-blue",         label: "Sky Blue",      price: "$32", color: "#9cc0d8" },
      Rugs:            { id: "rug-navy",            label: "Navy Stripe",   price: "$65", color: "#2a3f5f" },
      Posters:         { id: "poster-city",         label: "City Skyline",  price: "$15", color: "#2a2a3a" },
      "String Lights": { id: "lights-cool",         label: "Cool White",    price: "$22", color: "#e8f4ff" },
      "Desk Lamps":    { id: "lamp-black",          label: "Matte Black",   price: "$38", color: "#303030" },
      "LED Strips":    { id: "led-blue",            label: "Blue",          price: "$25", color: "#4080ff" },
    },
  },
  neutral: {
    label: "Neutral",
    emoji: "🤍",
    items: {
      Comforters:      { id: "comforter-white",     label: "Classic White", price: "$39", color: "#f4f2ee" },
      Sheets:          { id: "sheets-white",        label: "Crisp White",   price: "$29", color: "#f8f6f2" },
      Rugs:            { id: "rug-cream",           label: "Ivory Shag",    price: "$68", color: "#e8e0d0" },
      Posters:         { id: "poster-minimal",      label: "Minimalist",    price: "$16", color: "#d8c8b8" },
      "String Lights": { id: "lights-warm",         label: "Warm White",    price: "$22", color: "#ffd080" },
      "Desk Lamps":    { id: "lamp-white",          label: "Modern White",  price: "$35", color: "#e8e5e0" },
      "LED Strips":    { id: "led-none",            label: "None",          price: "—",   color: "#cccccc" },
    },
  },
  aesthetic: {
    label: "Aesthetic",
    emoji: "✨",
    items: {
      Comforters:      { id: "comforter-lavender",  label: "Lavender",      price: "$44", color: "#b4a0cc" },
      Sheets:          { id: "sheets-pink",         label: "Blush",         price: "$32", color: "#e8c0c4" },
      Rugs:            { id: "rug-sage",            label: "Sage Abstract", price: "$85", color: "#8aaa84" },
      Posters:         { id: "poster-abstract",     label: "Abstract Art",  price: "$18", color: "#6a7ec8" },
      "String Lights": { id: "lights-warm",         label: "Warm White",    price: "$22", color: "#ffd080" },
      "Desk Lamps":    { id: "lamp-gold",           label: "Brass Gold",    price: "$45", color: "#c8a040" },
      "LED Strips":    { id: "led-purple",          label: "Purple",        price: "$25", color: "#9060e0" },
    },
  },
};

export const PRODUCTS: Record<string, Product[]> = {
  Comforters: [
    { id: "comforter-white",    label: "Classic White", price: "$39", color: "#f4f2ee" },
    { id: "comforter-navy",     label: "Navy Blue",     price: "$42", color: "#1e3a5f" },
    { id: "comforter-sage",     label: "Sage Green",    price: "$42", color: "#7d9b76" },
    { id: "comforter-blush",    label: "Blush Pink",    price: "$42", color: "#e8b4b8" },
    { id: "comforter-gray",     label: "Storm Gray",    price: "$39", color: "#8a8a8a" },
    { id: "comforter-lavender", label: "Lavender",      price: "$44", color: "#b4a0cc" },
  ],
  Sheets: [
    { id: "sheets-white", label: "Crisp White", price: "$29", color: "#f8f6f2" },
    { id: "sheets-gray",  label: "Light Gray",  price: "$29", color: "#c0bebb" },
    { id: "sheets-blue",  label: "Sky Blue",    price: "$32", color: "#9cc0d8" },
    { id: "sheets-pink",  label: "Blush",       price: "$32", color: "#e8c0c4" },
    { id: "sheets-sage",  label: "Sage",        price: "$32", color: "#a0b89a" },
  ],
  Rugs: [
    { id: "rug-cream", label: "Ivory Shag",    price: "$68", color: "#e8e0d0" },
    { id: "rug-gray",  label: "Gray Woven",    price: "$72", color: "#9a9890" },
    { id: "rug-blush", label: "Blush Boucle",  price: "$79", color: "#d4a8a8" },
    { id: "rug-navy",  label: "Navy Stripe",   price: "$65", color: "#2a3f5f" },
    { id: "rug-sage",  label: "Sage Abstract", price: "$85", color: "#8aaa84" },
  ],
  Posters: [
    { id: "poster-botanical", label: "Botanical",    price: "$18", color: "#7a9e7e" },
    { id: "poster-abstract",  label: "Abstract Art", price: "$18", color: "#6a7ec8" },
    { id: "poster-city",      label: "City Skyline", price: "$15", color: "#2a2a3a" },
    { id: "poster-vintage",   label: "Vintage",      price: "$20", color: "#c87840" },
    { id: "poster-minimal",   label: "Minimalist",   price: "$16", color: "#d8c8b8" },
  ],
  "String Lights": [
    { id: "lights-warm", label: "Warm White", price: "$22", color: "#ffd080" },
    { id: "lights-cool", label: "Cool White", price: "$22", color: "#e8f4ff" },
    { id: "lights-none", label: "None",       price: "—",   color: "#aaaaaa" },
  ],
  "Desk Lamps": [
    { id: "lamp-white", label: "Modern White", price: "$35", color: "#e8e5e0" },
    { id: "lamp-black", label: "Matte Black",  price: "$38", color: "#303030" },
    { id: "lamp-gold",  label: "Brass Gold",   price: "$45", color: "#c8a040" },
    { id: "lamp-pink",  label: "Rose Pink",    price: "$35", color: "#d4808c" },
  ],
  "LED Strips": [
    { id: "led-none",   label: "None",       price: "—",   color: "#cccccc" },
    { id: "led-warm",   label: "Warm White", price: "$25", color: "#ffb050" },
    { id: "led-purple", label: "Purple",     price: "$25", color: "#9060e0" },
    { id: "led-blue",   label: "Blue",       price: "$25", color: "#4080ff" },
    { id: "led-pink",   label: "Pink",       price: "$25", color: "#ff60a0" },
  ],
};
