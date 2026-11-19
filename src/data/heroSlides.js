
import hero1 from "../assets/banners/hero1.webp";
import hero2 from "../assets/banners/hero2.webp";
import hero3 from "../assets/banners/hero3.webp";
import hero4 from "../assets/banners/hero4.webp";
import hero5 from "../assets/banners/hero5.webp";

// Optional mobile-specific banners
// Create these images before enabling the imports below.
//
// import hero1Mobile from "../assets/banners/hero1-mobile.webp";
// import hero2Mobile from "../assets/banners/hero2-mobile.webp";
// import hero3Mobile from "../assets/banners/hero3-mobile.webp";
// import hero4Mobile from "../assets/banners/hero4-mobile.webp";
// import hero5Mobile from "../assets/banners/hero5-mobile.webp";

export const heroSlides = [
  {
    id: 1,
    title: "Big Shopping",
    highlight: "Deals",
    subtitle: "Up to 70% Off",
    buttonText: "Shop Now",
    image: hero1,

    // mobileImage: hero1Mobile,

    link: "/products?sort=discount",
    background: "from-purple-900 to-pink-500",
  },
  {
    id: 2,
    title: "Fashion",
    highlight: "Fest",
    subtitle: "Up to 60% Off",
    buttonText: "Explore Fashion",
    image: hero2,

    // mobileImage: hero2Mobile,

    link: "/products?category=fashion",
    background: "from-pink-700 to-orange-400",
  },
  {
    id: 3,
    title: "Electronics",
    highlight: "Sale",
    subtitle: "Up to 50% Off",
    buttonText: "Shop Electronics",
    image: hero3,

    // mobileImage: hero3Mobile,

    link: "/products?category=electronics",
    background: "from-blue-900 to-cyan-500",
  },
  {
    id: 4,
    title: "Upgrade Your",
    highlight: "Home",
    subtitle: "Up to 55% Off",
    buttonText: "Explore Collection",
    image: hero4,

    // mobileImage: hero4Mobile,

    link: "/products?category=home-living",
    background: "from-emerald-900 to-teal-400",
  },
  {
    id: 5,
    title: "Beauty",
    highlight: "Bonanza",
    subtitle: "Up to 40% Off",
    buttonText: "Shop Beauty",
    image: hero5,

    // mobileImage: hero5Mobile,

    link: "/products?category=beauty",
    background: "from-fuchsia-900 to-rose-400",
  },
];
