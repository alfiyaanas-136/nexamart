
import smartphone from "../assets/featured/smartphone.webp";
import earbuds from "../assets/featured/earbuds.webp";
import shoes from "../assets/featured/shoes.webp";
import handbag from "../assets/featured/handbag.webp";
import smartwatch from "../assets/featured/smartwatch.webp";
import chair from "../assets/featured/chair.webp";

// Smartphone
import smartphoneBack from "../assets/featured/smartphone-back.webp";
import smartphoneSide from "../assets/featured/smartphone-side.webp";
import smartphoneCloseup from "../assets/featured/smartphone-closeup.webp";

// Wireless Earbuds
import earbudsBack from "../assets/featured/earbuds-back.webp";
import earbudsSide from "../assets/featured/earbuds-side.webp";
import earbudsCloseup from "../assets/featured/earbuds-closeup.webp";

// Running Shoes
import shoesBack from "../assets/featured/shoes-back.webp";
import shoesSide from "../assets/featured/shoes-side.webp";
import shoesCloseup from "../assets/featured/shoes-closeup.webp";

// Handbag
import handbagBack from "../assets/featured/handbag-back.webp";
import handbagSide from "../assets/featured/handbag-side.webp";
import handbagCloseup from "../assets/featured/handbag-closeup.webp";

// Smart Watch
import smartwatchBack from "../assets/featured/smartwatch-back.webp";
import smartwatchSide from "../assets/featured/smartwatch-side.webp";
import smartwatchCloseup from "../assets/featured/smartwatch-closeup.webp";

// Accent Chair
import chairBack from "../assets/featured/chair-back.webp";
import chairSide from "../assets/featured/chair-side.webp";
import chairCloseup from "../assets/featured/chair-closeup.webp";

export const featuredProducts = [
  {
    id: 101,
    name: "5G Smartphone",
    category: "mobiles",
    price: 14999,
    originalPrice: 19999,
    rating: 4.5,
    reviews: 8500,

    // Main Product Image
    image: smartphone,

    // Product Image Gallery
    images: [
      smartphone,
      smartphoneBack,
      smartphoneSide,
      smartphoneCloseup,
    ],

    description:
      "Experience smooth everyday performance with this stylish 5G smartphone. Designed with a vibrant display, sleek finish, and versatile camera system, it is ideal for entertainment, photography, communication, and multitasking.",

    highlights: [
      "High-speed 5G connectivity",
      "Large immersive display",
      "Triple rear camera design",
      "Modern and lightweight body",
      "Ideal for everyday multitasking",
    ],

    specifications: {
      Brand: "NexaTech",
      Color: "Lavender Purple",
      Connectivity: "5G",
      Display: "Full-screen touchscreen",
      Camera: "Triple rear camera",
      Category: "Smartphone",
    },
  },

  {
    id: 102,
    name: "Wireless Earbuds",
    category: "electronics",
    price: 1299,
    originalPrice: 2999,
    rating: 4.4,
    reviews: 12600,

    // Main Product Image
    image: earbuds,

    // Product Image Gallery
    images: [
      earbuds,
      earbudsBack,
      earbudsSide,
      earbudsCloseup,
    ],

    description:
      "Enjoy your favorite music and calls with these stylish wireless earbuds. Their compact charging case, comfortable design, and convenient wireless connectivity make them suitable for daily listening.",

    highlights: [
      "Wireless audio connectivity",
      "Compact portable charging case",
      "Comfortable in-ear design",
      "Built-in microphone design",
      "Lightweight and travel-friendly",
    ],

    specifications: {
      Brand: "NexaSound",
      Color: "Lavender",
      Type: "True Wireless Earbuds",
      Connectivity: "Bluetooth",
      Charging: "Portable charging case",
      Category: "Audio Accessories",
    },
  },

  {
    id: 103,
    name: "Men's Running Shoes",
    category: "fashion",
    price: 1799,
    originalPrice: 3499,
    rating: 4.3,
    reviews: 5200,

    // Main Product Image
    image: shoes,

    // Product Image Gallery
    images: [
      shoes,
      shoesBack,
      shoesSide,
      shoesCloseup,
    ],

    description:
      "Stay comfortable and stylish with these modern men's running shoes. Featuring a breathable upper, cushioned sole, and sporty design, they are suitable for walking, casual outings, and everyday activities.",

    highlights: [
      "Breathable mesh upper",
      "Comfortable cushioned sole",
      "Lightweight athletic design",
      "Lace-up closure",
      "Suitable for walking and casual wear",
    ],

    specifications: {
      Brand: "NexaFit",
      Color: "White and Blue",
      Type: "Running Shoes",
      Upper: "Mesh-style fabric",
      Closure: "Lace-up",
      Gender: "Men",
    },
  },

  {
    id: 104,
    name: "Women's Handbag",
    category: "fashion",
    price: 1299,
    originalPrice: 2599,
    rating: 4.5,
    reviews: 4300,

    // Main Product Image
    image: handbag,

    // Product Image Gallery
    images: [
      handbag,
      handbagBack,
      handbagSide,
      handbagCloseup,
    ],

    description:
      "Complete your everyday look with this elegant women's handbag. Its structured silhouette, soft peach finish, and stylish gold-tone details make it a fashionable accessory for casual outings, office wear, and special occasions.",

    highlights: [
      "Elegant structured design",
      "Stylish peach color",
      "Double carrying handles",
      "Detachable shoulder strap design",
      "Decorative gold-tone hardware",
    ],

    specifications: {
      Brand: "NexaStyle",
      Color: "Peach Pink",
      Type: "Handbag",
      Material: "Leather-look material",
      Strap: "Double handles and shoulder strap",
      Gender: "Women",
    },
  },

  {
    id: 105,
    name: "Smart Watch",
    category: "electronics",
    price: 1599,
    originalPrice: 3999,
    rating: 4.5,
    reviews: 8400,

    // Main Product Image
    image: smartwatch,

    // Product Image Gallery
    images: [
      smartwatch,
      smartwatchBack,
      smartwatchSide,
      smartwatchCloseup,
    ],

    description:
      "Stay connected and keep track of your daily activities with this modern smartwatch. Featuring a colorful touchscreen interface, fitness tracking display, and comfortable wrist strap, it combines technology with everyday convenience.",

    highlights: [
      "Modern touchscreen display",
      "Heart rate tracking interface",
      "Daily step count display",
      "Bluetooth connectivity design",
      "Comfortable adjustable wrist strap",
    ],

    specifications: {
      Brand: "NexaWear",
      Color: "Black",
      Type: "Smart Watch",
      Display: "Touchscreen",
      Connectivity: "Bluetooth",
      Strap: "Silicone-style adjustable strap",
    },
  },

  {
    id: 106,
    name: "Modern Accent Chair",
    category: "home-living",
    price: 4999,
    originalPrice: 8999,
    rating: 4.6,
    reviews: 2100,

    // Main Product Image
    image: chair,

    // Product Image Gallery
    images: [
      chair,
      chairBack,
      chairSide,
      chairCloseup,
    ],

    description:
      "Add warmth and elegance to your living space with this modern accent chair. Its mustard-yellow upholstery, curved armrests, cushioned seating, and wooden legs create a comfortable and stylish addition to contemporary interiors.",

    highlights: [
      "Premium mustard-yellow appearance",
      "Comfortable cushioned seating",
      "Curved backrest and armrests",
      "Elegant tapered wooden legs",
      "Ideal for living rooms and reading corners",
    ],

    specifications: {
      Brand: "NexaHome",
      Color: "Mustard Yellow",
      Type: "Accent Chair",
      Upholstery: "Fabric-style upholstery",
      Legs: "Wooden",
      SeatingCapacity: "1 Person",
    },
  },
];
