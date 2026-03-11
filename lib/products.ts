// What the 3D room renderer reads from SelectedItems
export type Product = {
  id: string;
  label: string;
  description?: string;  // short subtitle shown under the name
  price: string;
  color: string;         // hex used for 3D rendering
  link?: string;
  thumbnail?: string;    // product image URL
};

export type SelectedItems = Partial<Record<string, Product>>;

// Kept for type compatibility
export type ColorGroup = {
  id: string;
  label: string;
  color: string;
  variants: Product[];
};

export const PRODUCTS: Record<string, Product[]> = {

  // ─────────────────────────────────────────────────────────────────
  //  BEDDING
  // ─────────────────────────────────────────────────────────────────

  Comforters: [
    {
      id: "comforter-bedsure-white",
      label: "Bedsure All-Season Comforter",
      description: "Twin XL · White · Duvet insert",
      price: "$30",
      color: "#f4f2ee",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B08CXS47QG.01.LZZZZZZZ.jpg",
      link: "https://www.amazon.com/dp/B08CXS47QG",
    },
    {
      id: "comforter-bedsure-blush",
      label: "Bedsure Reversible Blush Set",
      description: "Twin XL · Blush pink · 5-piece",
      price: "$40",
      color: "#e8b4b8",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B0BSFQCC8J.01.LZZZZZZZ.jpg",
      link: "https://www.amazon.com/dp/B0BSFQCC8J",
    },
    {
      id: "comforter-bedsure-navy",
      label: "Bedsure Navy Bed-in-Bag",
      description: "Twin XL · Navy blue · 5-piece",
      price: "$43",
      color: "#1e3a5f",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B0893B72QJ.01.LZZZZZZZ.jpg",
      link: "https://www.amazon.com/dp/B0893B72QJ",
    },
    {
      id: "comforter-bedsure-sage",
      label: "Bedsure Botanical Sage Set",
      description: "Twin XL · Sage green · Floral",
      price: "$30",
      color: "#7d9b76",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B08P4TBSWM.01.LZZZZZZZ.jpg",
      link: "https://www.amazon.com/dp/B08P4TBSWM",
    },
    {
      id: "comforter-bedsure-gray",
      label: "Bedsure Gray Pintuck Set",
      description: "Twin XL · Light gray · 5-piece",
      price: "$40",
      color: "#9a9890",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B09VSZL22V.01.LZZZZZZZ.jpg",
      link: "https://www.amazon.com/dp/B09VSZL22V",
    },
  ],

  Sheets: [
    {
      id: "sheets-mellanni-white",
      label: "Mellanni Iconic Sheet Set",
      description: "Twin XL · Bright white · 3-piece",
      price: "$35",
      color: "#f8f6f2",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B016P42X2W.01.LZZZZZZZ.jpg",
      link: "https://www.amazon.com/dp/B016P42X2W",
    },
    {
      id: "sheets-mellanni-blush",
      label: "Mellanni Blush Sheet Set",
      description: "Twin XL · Blush pink · 3-piece",
      price: "$35",
      color: "#e8c0c4",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B016P42E9E.01.LZZZZZZZ.jpg",
      link: "https://www.amazon.com/dp/B016P42E9E",
    },
    {
      id: "sheets-bedsure-blue",
      label: "Bedsure Cooling Sheet Set",
      description: "Twin XL · Light blue · Cationic",
      price: "$27",
      color: "#9cc0d8",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B0CBKLSXZH.01.LZZZZZZZ.jpg",
      link: "https://www.amazon.com/dp/B0CBKLSXZH",
    },
  ],

  Pillows: [
    {
      id: "pillow-utopia-2pack",
      label: "Utopia Bedding Pillows 2-Pack",
      description: "Queen · Medium fill · Soft",
      price: "$18",
      color: "#f0ece4",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B00EINBSJ2.01.LZZZZZZZ.jpg",
      link: "https://www.amazon.com/dp/B00EINBSJ2",
    },
    {
      id: "pillow-beckham-2pack",
      label: "Beckham Hotel Pillows 2-Pack",
      description: "Queen · Gel fiber fill · Fluffy",
      price: "$22",
      color: "#f8f6f2",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B0731LNH72.01.LZZZZZZZ.jpg",
      link: "https://www.amazon.com/dp/B0731LNH72",
    },
  ],

  "Mattress Toppers": [
    {
      id: "topper-linenspa-2in",
      label: "Linenspa 2\" Gel Memory Foam",
      description: "Twin XL · 2-inch · Cooling gel",
      price: "$45",
      color: "#e8e0d0",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B01MTO43LV.01.LZZZZZZZ.jpg",
      link: "https://www.amazon.com/dp/B01MTO43LV",
    },
    {
      id: "topper-linenspa-3in",
      label: "Linenspa 3\" Gel Memory Foam",
      description: "Twin XL · 3-inch · Cooling gel",
      price: "$52",
      color: "#d8d0c0",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B07MY2L58J.01.LZZZZZZZ.jpg",
      link: "https://www.amazon.com/dp/B07MY2L58J",
    },
    {
      id: "topper-perlecare-3in",
      label: "PERLECARE 3\" Cooling Topper",
      description: "Twin XL · 3-inch · CertiPUR-US",
      price: "$58",
      color: "#e0d8c8",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B0BYNGHY7N.01.LZZZZZZZ.jpg",
      link: "https://www.amazon.com/dp/B0BYNGHY7N",
    },
  ],

  // ─────────────────────────────────────────────────────────────────
  //  FURNITURE
  // ─────────────────────────────────────────────────────────────────

  "Desk Chairs": [
    {
      id: "chair-furmax-black",
      label: "Furmax Mid-Back Mesh Chair",
      description: "Black · Ergonomic · Armrests",
      price: "$64",
      color: "#222222",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B074YMGTCX.01.LZZZZZZZ.jpg",
      link: "https://www.amazon.com/dp/B074YMGTCX",
    },
    {
      id: "chair-dumos-pink",
      label: "DUMOS Ergonomic Chair",
      description: "Pink · Lumbar support · Armrests",
      price: "$85",
      color: "#e0a0a8",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B0GF9K9DB8.01.LZZZZZZZ.jpg",
      link: "https://www.amazon.com/dp/B0GF9K9DB8",
    },
    {
      id: "chair-smug-white",
      label: "SMUG Ergonomic White Chair",
      description: "White · Mesh back · Adjustable",
      price: "$76",
      color: "#e8e5e0",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B09FHPKLZH.01.LZZZZZZZ.jpg",
      link: "https://www.amazon.com/s?k=white+ergonomic+mesh+desk+chair+dorm",
    },
    {
      id: "chair-flash-blue",
      label: "Flash Furniture Mesh Chair",
      description: "Blue · Mid-back · Padded seat",
      price: "$80",
      color: "#4a6a9a",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B07FFZFBMF.01.LZZZZZZZ.jpg",
      link: "https://www.amazon.com/dp/B07FFZFBMF",
    },
  ],

  Shelves: [
    {
      id: "shelf-wallniture-white",
      label: "Wallniture Floating Shelves",
      description: "White · Set of 2 · Easy mount",
      price: "$29",
      color: "#e8e5e0",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B01BVMTOVS.01.LZZZZZZZ.jpg",
      link: "https://www.amazon.com/dp/B01BVMTOVS",
    },
    {
      id: "shelf-mkono-wood",
      label: "Mkono Wood Wall Shelves",
      description: "Natural wood · Set of 3 · Rustic",
      price: "$32",
      color: "#c8a060",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B01DSKPGAK.01.LZZZZZZZ.jpg",
      link: "https://www.amazon.com/dp/B01DSKPGAK",
    },
  ],

  "Side Tables": [
    {
      id: "sidetable-bunk-caddy",
      label: "Modern Innovations Bunk Shelf",
      description: "Natural wood · Bedside caddy",
      price: "$22",
      color: "#b89050",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B078SFKVMG.01.LZZZZZZZ.jpg",
      link: "https://www.amazon.com/dp/B078SFKVMG",
    },
    {
      id: "sidetable-black-usb",
      label: "Nightstand with USB Ports",
      description: "Black · 2 drawers · USB charging",
      price: "$55",
      color: "#2a2a2a",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B0G9N5CLBX.01.LZZZZZZZ.jpg",
      link: "https://www.amazon.com/dp/B0G9N5CLBX",
    },
  ],

  // ─────────────────────────────────────────────────────────────────
  //  LIGHTING
  // ─────────────────────────────────────────────────────────────────

  "Desk Lamps": [
    {
      id: "lamp-taotronics-white",
      label: "TaoTronics LED Eye-Care Lamp",
      description: "White · Dimmable · 5 color modes",
      price: "$30",
      color: "#e8e5e0",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B07CSKBJHM.01.LZZZZZZZ.jpg",
      link: "https://www.amazon.com/dp/B07CSKBJHM",
    },
    {
      id: "lamp-amazon-basics-black",
      label: "Amazon Basics Metal Desk Lamp",
      description: "Black · Adjustable arm · Classic",
      price: "$29",
      color: "#282828",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B07N4MJ8KB.01.LZZZZZZZ.jpg",
      link: "https://www.amazon.com/dp/B07N4MJ8KB",
    },
    {
      id: "lamp-lepower-black",
      label: "LEPOWER Metal Desk Lamp",
      description: "Matte black · Flexible · USB port",
      price: "$32",
      color: "#303030",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B07XVMFZ17.01.LZZZZZZZ.jpg",
      link: "https://www.amazon.com/dp/B07XVMFZ17",
    },
  ],

  "Floor Lamps": [
    {
      id: "lamp-brightech-floor",
      label: "Brightech Sparq LED Floor Lamp",
      description: "Black · Dimmable · 3-way touch",
      price: "$47",
      color: "#2a2a2a",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B00KQ48Z4O.01.LZZZZZZZ.jpg",
      link: "https://www.amazon.com/dp/B00KQ48Z4O",
    },
    {
      id: "lamp-simple-designs-white",
      label: "Simple Designs Floor Lamp",
      description: "White shade · Accent light · Slim",
      price: "$35",
      color: "#f0ede8",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B00VCJFYVC.01.LZZZZZZZ.jpg",
      link: "https://www.amazon.com/s?k=simple+designs+floor+lamp+white",
    },
  ],

  "LED Strips": [
    {
      id: "led-govee-fairy",
      label: "Govee Fairy Star Lights",
      description: "12-pack · Warm white · Battery",
      price: "$12",
      color: "#ffb850",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B07HJ61RYK.01.LZZZZZZZ.jpg",
      link: "https://www.amazon.com/dp/B07HJ61RYK",
    },
    {
      id: "led-brightown-curtain",
      label: "Brightown 300 LED Curtain Lights",
      description: "9.8×9.8 ft · Warm white · Plug-in",
      price: "$17",
      color: "#ffd080",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B073GPG376.01.LZZZZZZZ.jpg",
      link: "https://www.amazon.com/dp/B073GPG376",
    },
    {
      id: "led-govee-rgb",
      label: "Govee RGB LED Strip Lights",
      description: "16.4 ft · Color changing · App",
      price: "$20",
      color: "#7070ff",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B07CL2RMR7.01.LZZZZZZZ.jpg",
      link: "https://www.amazon.com/dp/B07CL2RMR7",
    },
  ],
};
