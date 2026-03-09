// What the 3D room renderer reads from SelectedItems
export type Product = {
  id: string;
  label: string;
  price: string;
  color: string;       // hex used for 3D rendering
  link?: string;
  thumbnail?: string;  // Amazon / retailer product image URL
};

export type SelectedItems = Partial<Record<string, Product>>;

// Products organized as: subcategory → color groups → 2 variants each
export type ColorGroup = {
  id: string;    // e.g. "white"
  label: string; // e.g. "White"
  color: string; // representative hex (swatch + 3D fallback)
  variants: Product[];
};

export const PRODUCTS: Record<string, ColorGroup[]> = {

  // ─────────────────────────────────────────────────────────────────
  //  BEDDING
  // ─────────────────────────────────────────────────────────────────

  Comforters: [
    {
      id: "white",
      label: "White",
      color: "#f4f2ee",
      variants: [
        {
          id: "comforter-bedsure-duvet-white",
          label: "Bedsure Comforter Duvet Insert",
          price: "$30",
          color: "#f4f2ee",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B08CXS47QG.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B08CXS47QG",
        },
        {
          id: "comforter-bedsure-boho-white",
          label: "Bedsure Boho Farmhouse Set",
          price: "$33",
          color: "#f8f6f2",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B0BC1G57Y2.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B0BC1G57Y2",
        },
      ],
    },
    {
      id: "blush-pink",
      label: "Blush Pink",
      color: "#e8b4b8",
      variants: [
        {
          id: "comforter-bedsure-blush-5pc",
          label: "Bedsure Reversible Blush 5-Piece",
          price: "$40",
          color: "#e8b4b8",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B0BSFQCC8J.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B0BSFQCC8J",
        },
        {
          id: "comforter-bedsure-blush-2pc",
          label: "Bedsure GentleSoft Blush 2-Piece",
          price: "$29",
          color: "#eec0c4",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B0FNWKR4HN.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B0FNWKR4HN",
        },
      ],
    },
    {
      id: "navy-blue",
      label: "Navy Blue",
      color: "#1e3a5f",
      variants: [
        {
          id: "comforter-bedsure-navy-5pc",
          label: "Bedsure Navy 5-Piece Bed-in-Bag",
          price: "$43",
          color: "#1e3a5f",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B0893B72QJ.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B0893B72QJ",
        },
        {
          id: "comforter-bedsure-navy-2pc",
          label: "Bedsure Navy Reversible 2-Piece",
          price: "$29",
          color: "#253b60",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B0BN5W3YQM.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B0BN5W3YQM",
        },
      ],
    },
    {
      id: "sage-green",
      label: "Sage Green",
      color: "#7d9b76",
      variants: [
        {
          id: "comforter-bedsure-sage-floral",
          label: "Bedsure Sage Botanical Floral Set",
          price: "$30",
          color: "#7d9b76",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B08P4TBSWM.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B08P4TBSWM",
        },
        {
          id: "comforter-bedsure-sage-2pc",
          label: "Bedsure Sage Cationic Set",
          price: "$29",
          color: "#8aaa80",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B0CV5Z9KKK.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B0CV5Z9KKK",
        },
      ],
    },
    {
      id: "gray",
      label: "Gray",
      color: "#8a8a8a",
      variants: [
        {
          id: "comforter-bedsure-gray-pintuck",
          label: "Bedsure Gray Pintuck 5-Piece",
          price: "$40",
          color: "#9a9890",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B09VSZL22V.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B09VSZL22V",
        },
        {
          id: "comforter-bedsure-gray-2pc",
          label: "Bedsure Light Grey Prewashed",
          price: "$28",
          color: "#b0aeaa",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B0D14CYSKG.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B0D14CYSKG",
        },
      ],
    },
    {
      id: "lavender",
      label: "Lavender",
      color: "#b4a0cc",
      variants: [
        {
          id: "comforter-cozylux-lavender",
          label: "CozyLux Lavender Bed-in-Bag 5pc",
          price: "$55",
          color: "#b4a0cc",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=cozylux+lavender+twin+xl+comforter+bed+in+bag",
        },
        {
          id: "comforter-bedsure-lavender",
          label: "Bedsure Lavender Pintuck Set",
          price: "$40",
          color: "#c0b0d8",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=bedsure+lavender+twin+xl+comforter",
        },
      ],
    },
  ],

  Sheets: [
    {
      id: "white",
      label: "White",
      color: "#f8f6f2",
      variants: [
        {
          id: "sheets-mellanni-white",
          label: "Mellanni 3-Piece Iconic White",
          price: "$35",
          color: "#f8f6f2",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B016P42X2W.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B016P42X2W",
        },
        {
          id: "sheets-bedsure-white-cooling",
          label: "Bedsure Cooling White Sheets",
          price: "$27",
          color: "#f4f2ee",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=bedsure+white+cooling+twin+xl+sheets",
        },
      ],
    },
    {
      id: "blush",
      label: "Blush Pink",
      color: "#e8c0c4",
      variants: [
        {
          id: "sheets-mellanni-blush",
          label: "Mellanni 3-Piece Blush Pink",
          price: "$35",
          color: "#e8c0c4",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B016P42E9E.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/s?k=mellanni+twin+xl+blush+pink+sheets",
        },
        {
          id: "sheets-bedsure-pink",
          label: "Bedsure Pink Cationic Sheets",
          price: "$27",
          color: "#f0c8cc",
          thumbnail: "",
          link: "https://www.amazon.com/dp/B08RS4FX5L",
        },
      ],
    },
    {
      id: "light-blue",
      label: "Sky Blue",
      color: "#9cc0d8",
      variants: [
        {
          id: "sheets-mellanni-lightblue",
          label: "Mellanni 3-Piece Light Blue",
          price: "$35",
          color: "#9cc0d8",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=mellanni+twin+xl+light+blue+sheets",
        },
        {
          id: "sheets-bedsure-lightblue",
          label: "Bedsure Light Blue Cationic",
          price: "$27",
          color: "#a8c8d8",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B0CBKLSXZH.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B0CBKLSXZH",
        },
      ],
    },
    {
      id: "gray",
      label: "Light Gray",
      color: "#c0bebb",
      variants: [
        {
          id: "sheets-mellanni-gray",
          label: "Mellanni 3-Piece Light Gray",
          price: "$35",
          color: "#c0bebb",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B016P42E9E.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B016P42E9E",
        },
        {
          id: "sheets-bedsure-gray",
          label: "Bedsure Gray Prewashed Sheets",
          price: "$28",
          color: "#b8b6b2",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=bedsure+gray+twin+xl+sheets",
        },
      ],
    },
    {
      id: "sage",
      label: "Sage Green",
      color: "#a0b89a",
      variants: [
        {
          id: "sheets-mellanni-sage",
          label: "Mellanni 3-Piece Sage",
          price: "$35",
          color: "#a0b89a",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=mellanni+twin+xl+sage+green+sheets",
        },
        {
          id: "sheets-bedsure-sage",
          label: "Bedsure Sage Cationic Sheets",
          price: "$27",
          color: "#a8c0a0",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=bedsure+sage+green+twin+xl+sheets",
        },
      ],
    },
  ],

  Pillows: [
    {
      id: "neutral",
      label: "White / Ivory",
      color: "#f0ece4",
      variants: [
        {
          id: "pillow-utopia-white",
          label: "Utopia Bedding 2-Pack Pillows",
          price: "$18",
          color: "#f0ece4",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B00EINBSJ2.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B00EINBSJ2",
        },
        {
          id: "pillow-beckham-white",
          label: "Beckham Hotel Collection 2-Pack",
          price: "$22",
          color: "#f8f6f2",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B0731LNH72.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B0731LNH72",
        },
      ],
    },
    {
      id: "throw-blush",
      label: "Blush Throw Pillow",
      color: "#e8b4b8",
      variants: [
        {
          id: "pillow-throw-blush-target",
          label: "Threshold Blush Velvet Pillow",
          price: "$12",
          color: "#e8b4b8",
          thumbnail: "",
          link: "https://www.target.com/s?searchTerm=blush+velvet+throw+pillow",
        },
        {
          id: "pillow-throw-blush-amazon",
          label: "ComfortCamp Blush Pillow Cover",
          price: "$14",
          color: "#dca8ac",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=blush+pink+throw+pillow+cover+18x18",
        },
      ],
    },
    {
      id: "throw-sage",
      label: "Sage Green Throw Pillow",
      color: "#8aaa84",
      variants: [
        {
          id: "pillow-throw-sage-amazon",
          label: "Sage Linen Pillow Cover 18x18",
          price: "$14",
          color: "#8aaa84",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=sage+green+linen+throw+pillow+cover+18x18",
        },
        {
          id: "pillow-throw-sage-target",
          label: "Threshold Sage Woven Pillow",
          price: "$15",
          color: "#7a9e76",
          thumbnail: "",
          link: "https://www.target.com/s?searchTerm=sage+green+throw+pillow",
        },
      ],
    },
    {
      id: "throw-navy",
      label: "Navy Throw Pillow",
      color: "#1e3a5f",
      variants: [
        {
          id: "pillow-throw-navy-amazon",
          label: "Navy Velvet Throw Pillow 18x18",
          price: "$13",
          color: "#1e3a5f",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=navy+blue+velvet+throw+pillow+cover+18x18",
        },
        {
          id: "pillow-throw-navy-target",
          label: "Threshold Navy Knit Pillow",
          price: "$15",
          color: "#253b60",
          thumbnail: "",
          link: "https://www.target.com/s?searchTerm=navy+throw+pillow",
        },
      ],
    },
  ],

  "Mattress Toppers": [
    {
      id: "2-inch",
      label: "2\" Memory Foam",
      color: "#e8e0d0",
      variants: [
        {
          id: "topper-linenspa-2in",
          label: "Linenspa 2\" Gel Memory Foam",
          price: "$45",
          color: "#e8e0d0",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B01MTO43LV.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B01MTO43LV",
        },
        {
          id: "topper-linenspa-2in-gel-swirl",
          label: "Linenspa 2\" Gel Swirl Foam",
          price: "$43",
          color: "#f0e8d8",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B0792JK6J9.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B0792JK6J9",
        },
      ],
    },
    {
      id: "3-inch",
      label: "3\" Memory Foam",
      color: "#d8d0c0",
      variants: [
        {
          id: "topper-linenspa-3in",
          label: "Linenspa 3\" Gel Memory Foam",
          price: "$52",
          color: "#d8d0c0",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B07MY2L58J.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B07MY2L58J",
        },
        {
          id: "topper-perlecare-3in",
          label: "PERLECARE 3\" Cooling Foam",
          price: "$58",
          color: "#e0d8c8",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B0BYNGHY7N.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B0BYNGHY7N",
        },
      ],
    },
    {
      id: "bamboo-pad",
      label: "Bamboo Pillowtop Pad",
      color: "#e4e0d8",
      variants: [
        {
          id: "topper-bamboo-utopia",
          label: "Utopia Bedding Bamboo Mattress Pad",
          price: "$38",
          color: "#e4e0d8",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=utopia+bedding+bamboo+mattress+pad+twin+xl",
        },
        {
          id: "topper-bamboo-linenspa",
          label: "Linenspa Bamboo Knit Pillowtop",
          price: "$42",
          color: "#eee8dc",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=linenspa+bamboo+mattress+topper+twin+xl",
        },
      ],
    },
  ],

  // ─────────────────────────────────────────────────────────────────
  //  FURNITURE
  // ─────────────────────────────────────────────────────────────────

  "Desk Chairs": [
    {
      id: "black-mesh",
      label: "Black Mesh",
      color: "#222222",
      variants: [
        {
          id: "chair-furmax-black",
          label: "Furmax Mid-Back Mesh Chair",
          price: "$64",
          color: "#222222",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=furmax+mid+back+mesh+office+chair+black",
        },
        {
          id: "chair-flash-black",
          label: "Flash Furniture Mid-Back Mesh",
          price: "$80",
          color: "#2a2a2a",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=flash+furniture+mid+back+mesh+office+chair",
        },
      ],
    },
    {
      id: "white-desk-chair",
      label: "White",
      color: "#e8e5e0",
      variants: [
        {
          id: "chair-smug-white",
          label: "SMUG Ergonomic White Chair",
          price: "$76",
          color: "#e8e5e0",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=white+ergonomic+desk+chair+dorm",
        },
        {
          id: "chair-amazon-basics-white",
          label: "Amazon Basics Low-Back White",
          price: "$68",
          color: "#f0ede8",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=amazon+basics+low+back+white+office+chair",
        },
      ],
    },
    {
      id: "pink-desk-chair",
      label: "Pink",
      color: "#e0a0a8",
      variants: [
        {
          id: "chair-dumos-pink",
          label: "DUMOS Ergonomic Pink Chair",
          price: "$85",
          color: "#e0a0a8",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B0GF9K9DB8.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B0GF9K9DB8",
        },
        {
          id: "chair-pink-mesh",
          label: "Dorm Pink Breathable Mesh",
          price: "$72",
          color: "#d89098",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=pink+mesh+ergonomic+desk+chair+dorm",
        },
      ],
    },
  ],

  Shelves: [
    {
      id: "white-floating",
      label: "White Floating",
      color: "#e8e5e0",
      variants: [
        {
          id: "shelf-rustic-state-white",
          label: "Rustic State Wall Shelf Set of 3",
          price: "$38",
          color: "#e8e5e0",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=rustic+state+white+floating+wall+shelf+set",
        },
        {
          id: "shelf-wallniture-white",
          label: "Wallniture Floating Shelves 2-Pack",
          price: "$29",
          color: "#f0ede8",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=wallniture+white+floating+shelf+set",
        },
      ],
    },
    {
      id: "natural-wood",
      label: "Natural Wood",
      color: "#c8a060",
      variants: [
        {
          id: "shelf-wood-amazon",
          label: "Mkono Wood Wall Shelves Set of 3",
          price: "$32",
          color: "#c8a060",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=mkono+wood+floating+wall+shelf+set+of+3",
        },
        {
          id: "shelf-wood-crate",
          label: "Crate & Barrel Wood Ledge Shelf",
          price: "$49",
          color: "#b89050",
          thumbnail: "",
          link: "https://www.crateandbarrel.com/furniture/shelves",
        },
      ],
    },
  ],

  "Bed Risers": [
    {
      id: "black-risers",
      label: "Black",
      color: "#333333",
      variants: [
        {
          id: "risers-utopia-black",
          label: "Utopia 3\"/5\" Adjustable 4-Pack",
          price: "$18",
          color: "#333333",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B073WFCV1L.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B073WFCV1L",
        },
        {
          id: "risers-homeit-black",
          label: "Home It Stackable 3/5/8\" 4-Pack",
          price: "$16",
          color: "#2a2a2a",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B00MH74S16.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B00MH74S16",
        },
      ],
    },
    {
      id: "white-risers",
      label: "White",
      color: "#e0ddd8",
      variants: [
        {
          id: "risers-holdn-white",
          label: "HOLDN' 3/5/8\" Adjustable 4-Pack",
          price: "$19",
          color: "#e0ddd8",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B0B6B125G1.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B0B6B125G1",
        },
        {
          id: "risers-butizone-usb",
          label: "Butizone w/ USB Ports 4-Pack",
          price: "$38",
          color: "#dedad4",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B08KZNFSTY.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B08KZNFSTY",
        },
      ],
    },
  ],

  "Side Tables": [
    {
      id: "white-nightstand",
      label: "White",
      color: "#f0ede8",
      variants: [
        {
          id: "sidetable-amazon-white",
          label: "Zesthouse White Nightstand w/ Drawer",
          price: "$42",
          color: "#f0ede8",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=white+nightstand+with+drawer+dorm+small",
        },
        {
          id: "sidetable-walmart-white",
          label: "Mainstays 1-Drawer Nightstand",
          price: "$35",
          color: "#f8f5f0",
          thumbnail: "",
          link: "https://www.walmart.com/search?q=mainstays+nightstand+white",
        },
      ],
    },
    {
      id: "wood-nightstand",
      label: "Natural Wood",
      color: "#c8a060",
      variants: [
        {
          id: "sidetable-wood-wayfair",
          label: "Millwood Pines Walnut Nightstand",
          price: "$58",
          color: "#c8a060",
          thumbnail: "",
          link: "https://www.wayfair.com/furniture/pdp/nightstands",
        },
        {
          id: "sidetable-bunk-caddy",
          label: "Modern Innovations Bunk Shelf Caddy",
          price: "$22",
          color: "#b89050",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B078SFKVMG.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B078SFKVMG",
        },
      ],
    },
    {
      id: "black-nightstand",
      label: "Black",
      color: "#2a2a2a",
      variants: [
        {
          id: "sidetable-black-amazon",
          label: "affeivul Black Nightstand w/ USB",
          price: "$55",
          color: "#2a2a2a",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B0G9N5CLBX.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B0G9N5CLBX",
        },
        {
          id: "sidetable-black-target",
          label: "Target Room Essentials Black Side Table",
          price: "$45",
          color: "#333333",
          thumbnail: "",
          link: "https://www.target.com/s?searchTerm=black+nightstand+dorm",
        },
      ],
    },
  ],

  // ─────────────────────────────────────────────────────────────────
  //  DECOR
  // ─────────────────────────────────────────────────────────────────

  Posters: [
    {
      id: "botanical",
      label: "Botanical / Nature",
      color: "#7a9e7e",
      variants: [
        {
          id: "poster-botanical-society6",
          label: "Society6 Botanical Leaves Print",
          price: "$19",
          color: "#7a9e7e",
          thumbnail: "",
          link: "https://society6.com/a/collections/posters-dorm-room?q=botanical",
        },
        {
          id: "poster-botanical-amazon",
          label: "LZIMU Botanical Set of 4 Prints",
          price: "$15",
          color: "#6a9060",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=botanical+set+of+4+wall+art+prints+dorm",
        },
      ],
    },
    {
      id: "abstract",
      label: "Abstract / Modern Art",
      color: "#6a7ec8",
      variants: [
        {
          id: "poster-abstract-society6",
          label: "Society6 Abstract Boho Print",
          price: "$19",
          color: "#6a7ec8",
          thumbnail: "",
          link: "https://society6.com/a/collections/posters-dorm-room?q=abstract",
        },
        {
          id: "poster-abstract-amazon",
          label: "Abstract Watercolor Set 4 Pieces",
          price: "$16",
          color: "#8090c0",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=abstract+watercolor+wall+art+prints+set+dorm",
        },
      ],
    },
    {
      id: "city-skyline",
      label: "City / Architecture",
      color: "#2a2a3a",
      variants: [
        {
          id: "poster-city-urban-out",
          label: "New York Skyline Poster",
          price: "$22",
          color: "#2a2a3a",
          thumbnail: "",
          link: "https://www.urbanoutfitters.com/shop/wall-art?q=city+skyline",
        },
        {
          id: "poster-city-amazon",
          label: "Minimalist City Map Print",
          price: "$14",
          color: "#3a3a4a",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=minimalist+city+skyline+poster+print+dorm",
        },
      ],
    },
    {
      id: "vintage",
      label: "Vintage / Retro",
      color: "#c87840",
      variants: [
        {
          id: "poster-vintage-amazon",
          label: "Vintage Retro Travel Poster",
          price: "$15",
          color: "#c87840",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=vintage+travel+poster+print+dorm+room",
        },
        {
          id: "poster-vintage-urban",
          label: "Retro Music Poster Print",
          price: "$20",
          color: "#a86830",
          thumbnail: "",
          link: "https://www.urbanoutfitters.com/shop/wall-art?q=retro",
        },
      ],
    },
    {
      id: "minimalist",
      label: "Minimalist / Typography",
      color: "#d8c8b8",
      variants: [
        {
          id: "poster-minimal-society6",
          label: "Society6 Minimalist Line Art",
          price: "$17",
          color: "#d8c8b8",
          thumbnail: "",
          link: "https://society6.com/a/collections/posters-dorm-room?q=minimalist",
        },
        {
          id: "poster-minimal-amazon",
          label: "Inspirational Quote Print Set",
          price: "$13",
          color: "#e0d0c0",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=minimalist+quote+poster+print+dorm",
        },
      ],
    },
  ],

  "String Lights": [
    {
      id: "warm-white",
      label: "Warm White",
      color: "#ffd080",
      variants: [
        {
          id: "lights-brightown-curtain-warm",
          label: "Brightown 300 LED Curtain Lights",
          price: "$17",
          color: "#ffd080",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B073GPG376.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B073GPG376",
        },
        {
          id: "lights-govee-fairy-warm",
          label: "Govee 12-Pack Fairy Star Lights",
          price: "$12",
          color: "#ffb850",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B07HJ61RYK.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B07HJ61RYK",
        },
      ],
    },
    {
      id: "cool-white",
      label: "Cool White",
      color: "#e8f4ff",
      variants: [
        {
          id: "lights-brightown-cool",
          label: "Brightown 100 LED Cool White",
          price: "$14",
          color: "#e8f4ff",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B0D824QN2Q.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B0D824QN2Q",
        },
        {
          id: "lights-solar-cool",
          label: "Brightown Solar 200 LED Pure White",
          price: "$16",
          color: "#d8eeff",
          thumbnail: "",
          link: "https://www.amazon.com/dp/B07Q56QL8W",
        },
      ],
    },
    {
      id: "none",
      label: "None",
      color: "#aaaaaa",
      variants: [
        { id: "lights-none", label: "No String Lights", price: "—", color: "#aaaaaa" },
      ],
    },
  ],

  Mirrors: [
    {
      id: "round-black",
      label: "Round — Black",
      color: "#2a2a2a",
      variants: [
        {
          id: "mirror-gosider-black-round",
          label: "Gosider 16\" Black Circle Mirror",
          price: "$28",
          color: "#2a2a2a",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B0D9PS49JK.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B0D9PS49JK",
        },
        {
          id: "mirror-amazon-black-round-large",
          label: "Black Round 24\" Wall Mirror",
          price: "$35",
          color: "#333333",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=black+round+wall+mirror+24+inch+dorm",
        },
      ],
    },
    {
      id: "round-gold",
      label: "Round — Gold",
      color: "#c8a040",
      variants: [
        {
          id: "mirror-gold-round-amazon",
          label: "Gold Circle Wall Mirror 16\"",
          price: "$32",
          color: "#c8a040",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=gold+circle+wall+mirror+16+inch+dorm",
        },
        {
          id: "mirror-gold-crate",
          label: "Crate & Barrel Arch Gold Mirror",
          price: "$79",
          color: "#b89030",
          thumbnail: "",
          link: "https://www.crateandbarrel.com/mirrors",
        },
      ],
    },
    {
      id: "over-door",
      label: "Over-the-Door Full Length",
      color: "#888888",
      variants: [
        {
          id: "mirror-overdoor-mirrotek",
          label: "Mirrotek Full-Length OTD Mirror",
          price: "$38",
          color: "#888888",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B09HSVZWVH.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B09HSVZWVH",
        },
        {
          id: "mirror-overdoor-amazon-white",
          label: "Amanti Art Narrow OTD Mirror",
          price: "$45",
          color: "#e0ddd8",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=over+the+door+full+length+mirror+dorm",
        },
      ],
    },
  ],

  Rugs: [
    {
      id: "ivory-cream",
      label: "Ivory / Cream",
      color: "#e8e0d0",
      variants: [
        {
          id: "rug-safavieh-tulum-ivory",
          label: "Safavieh Tulum 3×5 Ivory Boho",
          price: "$34",
          color: "#e8e0d0",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B07W863S9B.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B07W863S9B",
        },
        {
          id: "rug-ruggable-ivory",
          label: "Ruggable Washable Ivory Shag 3×5",
          price: "$89",
          color: "#f0e8d8",
          thumbnail: "",
          link: "https://ruggable.com/collections/shag?size=3x5",
        },
      ],
    },
    {
      id: "blush-pink-rug",
      label: "Blush Pink",
      color: "#d4a8a8",
      variants: [
        {
          id: "rug-amazon-blush-boucle",
          label: "Boucle Blush Area Rug 3×5",
          price: "$55",
          color: "#d4a8a8",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=blush+pink+boucle+area+rug+3x5+dorm",
        },
        {
          id: "rug-ruggable-blush",
          label: "Ruggable Blush Washable Rug 3×5",
          price: "$79",
          color: "#e0b8b8",
          thumbnail: "",
          link: "https://ruggable.com/collections/pink?size=3x5",
        },
      ],
    },
    {
      id: "gray-rug",
      label: "Gray",
      color: "#9a9890",
      variants: [
        {
          id: "rug-safavieh-gray",
          label: "Safavieh Patina 3×5 Gray Vintage",
          price: "$38",
          color: "#9a9890",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B017NME0OE.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B017NME0OE",
        },
        {
          id: "rug-ruggable-gray",
          label: "Ruggable Gray Washable Shag 3×5",
          price: "$89",
          color: "#a8a6a0",
          thumbnail: "",
          link: "https://ruggable.com/collections/gray?size=3x5",
        },
      ],
    },
    {
      id: "navy-rug",
      label: "Navy",
      color: "#2a3f5f",
      variants: [
        {
          id: "rug-amazon-navy-stripe",
          label: "Navy Striped Cotton Flatweave 3×5",
          price: "$45",
          color: "#2a3f5f",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=navy+stripe+cotton+area+rug+3x5",
        },
        {
          id: "rug-safavieh-navy",
          label: "Safavieh Retro Navy 3×5",
          price: "$42",
          color: "#1e3050",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=safavieh+navy+area+rug+3x5",
        },
      ],
    },
    {
      id: "sage-rug",
      label: "Sage Green",
      color: "#8aaa84",
      variants: [
        {
          id: "rug-amazon-sage-abstract",
          label: "Sage Abstract Boho Area Rug 3×5",
          price: "$52",
          color: "#8aaa84",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=sage+green+abstract+area+rug+3x5+dorm",
        },
        {
          id: "rug-ruggable-sage",
          label: "Ruggable Sage Washable Rug 3×5",
          price: "$89",
          color: "#7a9e78",
          thumbnail: "",
          link: "https://ruggable.com/collections/green?size=3x5",
        },
      ],
    },
  ],

  // ─────────────────────────────────────────────────────────────────
  //  LIGHTING
  // ─────────────────────────────────────────────────────────────────

  "Desk Lamps": [
    {
      id: "white-lamp",
      label: "White / Neutral",
      color: "#e8e5e0",
      variants: [
        {
          id: "lamp-taotronics-white",
          label: "TaoTronics LED Eye-Care Lamp",
          price: "$30",
          color: "#e8e5e0",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=taotronics+white+led+eye+care+desk+lamp",
        },
        {
          id: "lamp-ikea-white",
          label: "IKEA FORSÅ Work Lamp White",
          price: "$25",
          color: "#f0ede8",
          thumbnail: "",
          link: "https://www.ikea.com/us/en/search/?q=desk+lamp+white",
        },
      ],
    },
    {
      id: "black-lamp",
      label: "Matte Black",
      color: "#303030",
      variants: [
        {
          id: "lamp-taotronics-black",
          label: "TaoTronics 3-Way Dimmer Black",
          price: "$34",
          color: "#303030",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=taotronics+black+dimmable+desk+lamp",
        },
        {
          id: "lamp-amazon-basics-black",
          label: "Amazon Basics Metal Adjustable Lamp",
          price: "$29",
          color: "#282828",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=amazon+basics+metal+adjustable+desk+lamp+black",
        },
      ],
    },
    {
      id: "gold-lamp",
      label: "Brass / Gold",
      color: "#c8a040",
      variants: [
        {
          id: "lamp-crate-brass",
          label: "Crate & Barrel Arched Brass Lamp",
          price: "$59",
          color: "#c8a040",
          thumbnail: "",
          link: "https://www.crateandbarrel.com/lighting/table-lamps",
        },
        {
          id: "lamp-gold-amazon",
          label: "Lavish Home Brass Swing Arm Lamp",
          price: "$38",
          color: "#d4a820",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=brass+gold+swing+arm+desk+lamp",
        },
      ],
    },
    {
      id: "pink-lamp",
      label: "Pink",
      color: "#d4808c",
      variants: [
        {
          id: "lamp-pink-mushroom",
          label: "Pink Mushroom Ambient Lamp",
          price: "$24",
          color: "#d4808c",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=pink+mushroom+table+lamp+dorm",
        },
        {
          id: "lamp-pink-modern",
          label: "Brightech Modern Pink Desk Lamp",
          price: "$35",
          color: "#e09090",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=pink+modern+led+desk+lamp+dorm",
        },
      ],
    },
  ],

  "Floor Lamps": [
    {
      id: "white-floor",
      label: "White",
      color: "#e8e5e0",
      variants: [
        {
          id: "floorlamp-brightech-white",
          label: "Brightech Sparq Arc Floor Lamp",
          price: "$55",
          color: "#e8e5e0",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=brightech+arc+floor+lamp+white+dorm",
        },
        {
          id: "floorlamp-walmart-white",
          label: "Mainstays Torchiere Floor Lamp White",
          price: "$28",
          color: "#f0ede8",
          thumbnail: "",
          link: "https://www.walmart.com/search?q=mainstays+floor+lamp+white",
        },
      ],
    },
    {
      id: "black-floor",
      label: "Black",
      color: "#2a2a2a",
      variants: [
        {
          id: "floorlamp-brightech-black",
          label: "Brightech Litespan Black LED",
          price: "$60",
          color: "#2a2a2a",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=brightech+litespan+black+floor+lamp",
        },
        {
          id: "floorlamp-amazon-black",
          label: "Simple Designs Black Torchiere",
          price: "$35",
          color: "#333333",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=simple+designs+black+torchiere+floor+lamp",
        },
      ],
    },
    {
      id: "gold-floor",
      label: "Gold / Brass",
      color: "#c8a040",
      variants: [
        {
          id: "floorlamp-gold-amazon",
          label: "Brightech Gold Arc LED Floor Lamp",
          price: "$65",
          color: "#c8a040",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=gold+arc+floor+lamp+dorm",
        },
        {
          id: "floorlamp-crate-gold",
          label: "Crate & Barrel Brass Tripod Lamp",
          price: "$149",
          color: "#d4a820",
          thumbnail: "",
          link: "https://www.crateandbarrel.com/lighting/floor-lamps",
        },
      ],
    },
  ],

  "LED Strips": [
    {
      id: "none",
      label: "None",
      color: "#cccccc",
      variants: [
        { id: "led-none", label: "No LED Strips", price: "—", color: "#cccccc" },
      ],
    },
    {
      id: "multicolor-rgb",
      label: "Multicolor RGB",
      color: "#cc44ff",
      variants: [
        {
          id: "led-govee-rgbic",
          label: "Govee RGBIC 32.8ft App Control",
          price: "$22",
          color: "#cc44ff",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B099S9DXT7.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B099S9DXT7",
        },
        {
          id: "led-daybetter-rgb",
          label: "Daybetter RGB 50ft Music Sync",
          price: "$14",
          color: "#aa22ff",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B08JSFH1G6.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B08JSFH1G6",
        },
      ],
    },
    {
      id: "warm-white-led",
      label: "Warm White",
      color: "#ffb050",
      variants: [
        {
          id: "led-govee-warm",
          label: "Govee Warm White 32.8ft Strip",
          price: "$19",
          color: "#ffb050",
          thumbnail: "",
          link: "https://www.amazon.com/dp/B07XHJX115",
        },
        {
          id: "led-daybetter-warm",
          label: "Daybetter Warm White 32.8ft",
          price: "$11",
          color: "#ffa840",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=daybetter+warm+white+led+strip+32.8ft",
        },
      ],
    },
    {
      id: "purple-led",
      label: "Purple",
      color: "#9060e0",
      variants: [
        {
          id: "led-govee-purple",
          label: "Govee Purple 32.8ft LED Strip",
          price: "$22",
          color: "#9060e0",
          thumbnail: "",
          link: "https://www.amazon.com/dp/B099S9DXT7",
        },
        {
          id: "led-daybetter-purple",
          label: "Daybetter Purple 50ft Strip",
          price: "$14",
          color: "#8050d0",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=daybetter+purple+led+strip+lights",
        },
      ],
    },
    {
      id: "blue-led",
      label: "Blue",
      color: "#4080ff",
      variants: [
        {
          id: "led-govee-blue",
          label: "Govee Blue 32.8ft LED Strip",
          price: "$22",
          color: "#4080ff",
          thumbnail: "",
          link: "https://www.amazon.com/dp/B099S9DXT7",
        },
        {
          id: "led-daybetter-blue",
          label: "Daybetter Blue 50ft Strip",
          price: "$14",
          color: "#3070ee",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=daybetter+blue+led+strip+lights+50ft",
        },
      ],
    },
    {
      id: "pink-led",
      label: "Pink",
      color: "#ff60a0",
      variants: [
        {
          id: "led-govee-pink",
          label: "Govee Pink 32.8ft LED Strip",
          price: "$22",
          color: "#ff60a0",
          thumbnail: "",
          link: "https://www.amazon.com/dp/B099S9DXT7",
        },
        {
          id: "led-daybetter-pink",
          label: "Daybetter Pink 50ft Strip",
          price: "$14",
          color: "#ff5090",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=daybetter+pink+led+strip+lights+50ft",
        },
      ],
    },
  ],

  // ─────────────────────────────────────────────────────────────────
  //  STORAGE
  // ─────────────────────────────────────────────────────────────────

  "Under-Bed": [
    {
      id: "rolling-bins",
      label: "Rolling Bins",
      color: "#444444",
      variants: [
        {
          id: "storage-shozafia-rolling",
          label: "Shozafia 3-Pack Rolling Bins w/ Lid",
          price: "$30",
          color: "#444444",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B07MTLKFXN.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B07MTLKFXN",
        },
        {
          id: "storage-fokyfok-rolling",
          label: "Fokyfok 2-Pack Underbed w/ Wheels",
          price: "$28",
          color: "#2a2a2a",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B0C72QCTQ7.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B0C72QCTQ7",
        },
      ],
    },
    {
      id: "fabric-bags",
      label: "Fabric Storage Bags",
      color: "#9a9890",
      variants: [
        {
          id: "storage-buddingjoy-bag",
          label: "Budding Joy 90L Foldable Bags 2-Pack",
          price: "$25",
          color: "#9a9890",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B09Q38H2J4.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B09Q38H2J4",
        },
        {
          id: "storage-supowin-bag",
          label: "Supowin Underbed Storage Bin w/ Lid",
          price: "$22",
          color: "#a8a6a0",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B09M393DH2.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B09M393DH2",
        },
      ],
    },
  ],

  "Closet Organizers": [
    {
      id: "hanging-shelves",
      label: "Hanging Shelf Organizer",
      color: "#9a9890",
      variants: [
        {
          id: "closet-youdenova-hanging",
          label: "YOUDENOVA 6-Shelf Hanging Organizer",
          price: "$24",
          color: "#9a9890",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B07SYPLVTG.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B07SYPLVTG",
        },
        {
          id: "closet-storageworks-hanging",
          label: "StorageWorks 5-Shelf Hanging Shelves",
          price: "$28",
          color: "#888684",
          thumbnail: "https://images-na.ssl-images-amazon.com/images/P/B07ZJ74NX3.01.LZZZZZZZ.jpg",
          link: "https://www.amazon.com/dp/B07ZJ74NX3",
        },
      ],
    },
    {
      id: "hanger-organizers",
      label: "Space-Saving Hangers",
      color: "#707070",
      variants: [
        {
          id: "closet-velvet-hanger",
          label: "Zober Velvet Non-Slip Hangers 50pk",
          price: "$17",
          color: "#707070",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=zober+velvet+non+slip+hangers+50+pack",
        },
        {
          id: "closet-cascade-hanger",
          label: "Closet Organizer Cascade Clips 8-pk",
          price: "$12",
          color: "#606060",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=closet+organizer+cascade+hanger+clips+dorm",
        },
      ],
    },
    {
      id: "drawer-organizer",
      label: "Drawer Organizer",
      color: "#c8c4bc",
      variants: [
        {
          id: "closet-idesign-drawer",
          label: "iDesign Drawer Organizer Set",
          price: "$20",
          color: "#c8c4bc",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=idesign+drawer+organizer+set+dorm",
        },
        {
          id: "closet-skubb-ikea",
          label: "IKEA SKUBB Box Set of 6",
          price: "$12",
          color: "#d8d4cc",
          thumbnail: "",
          link: "https://www.ikea.com/us/en/p/skubb-box-set-of-6-white-00263188/",
        },
      ],
    },
  ],

  Bins: [
    {
      id: "fabric-cube-bins",
      label: "Fabric Cube Bins",
      color: "#8a9890",
      variants: [
        {
          id: "bins-whitmor-cube",
          label: "Whitmor Fabric Cube Bins 6-Pack",
          price: "$22",
          color: "#8a9890",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=whitmor+fabric+cube+storage+bins+6+pack",
        },
        {
          id: "bins-ikea-drona",
          label: "IKEA DRONA Storage Box Set of 4",
          price: "$20",
          color: "#9a9088",
          thumbnail: "",
          link: "https://www.ikea.com/us/en/search/?q=drona+box",
        },
      ],
    },
    {
      id: "wicker-bins",
      label: "Wicker / Seagrass",
      color: "#c0a060",
      variants: [
        {
          id: "bins-seagrass-amazon",
          label: "Seagrass Storage Basket Set of 3",
          price: "$32",
          color: "#c0a060",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=seagrass+storage+basket+set+dorm",
        },
        {
          id: "bins-wicker-target",
          label: "Threshold Wicker Bin Medium",
          price: "$18",
          color: "#b09050",
          thumbnail: "",
          link: "https://www.target.com/s?searchTerm=wicker+storage+bin+medium",
        },
      ],
    },
    {
      id: "pop-up-laundry",
      label: "Laundry Hamper",
      color: "#9090a0",
      variants: [
        {
          id: "bins-mdesign-hamper",
          label: "mDesign Pop-Up Laundry Hamper",
          price: "$18",
          color: "#9090a0",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=mdesign+popup+laundry+hamper+dorm",
        },
        {
          id: "bins-honey-hamper",
          label: "Honey-Can-Do Collapsible Hamper",
          price: "$22",
          color: "#808090",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=honey+can+do+collapsible+laundry+hamper+dorm",
        },
      ],
    },
  ],

  Hooks: [
    {
      id: "over-door-hooks",
      label: "Over-Door Hooks",
      color: "#888888",
      variants: [
        {
          id: "hooks-overdoor-simple",
          label: "Simple Houseware 6-Hook OTD Rack",
          price: "$14",
          color: "#888888",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=simple+houseware+over+door+hook+rack+6+hook",
        },
        {
          id: "hooks-overdoor-spectrum",
          label: "Spectrum 5-Hook OTD Organizer",
          price: "$16",
          color: "#707070",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=spectrum+over+door+hook+organizer+5+hook",
        },
      ],
    },
    {
      id: "adhesive-hooks",
      label: "Command Strips / Adhesive",
      color: "#c0c0c0",
      variants: [
        {
          id: "hooks-command-medium",
          label: "Command Medium Hooks 6-Pack",
          price: "$10",
          color: "#c0c0c0",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=command+medium+damage+free+hooks+6+pack",
        },
        {
          id: "hooks-command-large",
          label: "Command Large Hooks 4-Pack",
          price: "$12",
          color: "#b0b0b0",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=command+large+damage+free+hooks+4+pack",
        },
      ],
    },
    {
      id: "wall-hooks-decorative",
      label: "Decorative Wall Hooks",
      color: "#c8a040",
      variants: [
        {
          id: "hooks-gold-decorative",
          label: "Gold Brass Decorative Hook Set of 4",
          price: "$18",
          color: "#c8a040",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=gold+brass+decorative+wall+hooks+set+4",
        },
        {
          id: "hooks-black-decorative",
          label: "Matte Black Single Hook Set of 6",
          price: "$16",
          color: "#303030",
          thumbnail: "",
          link: "https://www.amazon.com/s?k=matte+black+wall+hook+set+6",
        },
      ],
    },
  ],
};
