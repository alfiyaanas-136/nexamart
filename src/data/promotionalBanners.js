
import fashion from '../assets/promo/fashion.webp';
import home from '../assets/promo/home.webp';
import mobiles from '../assets/promo/mobiles.webp';

export const promotionalBanners = [
  {
    id: 1,
    title: 'Fashion Fest',
    discount: 'Up to 70% Off',
    buttonText: 'Shop Now',
    image: fashion,
    link: '/products?category=fashion',
    textColor: 'text-rose-950',
  },
  {
    id: 2,
    title: 'Upgrade Your Home',
    discount: 'Up to 60% Off',
    buttonText: 'Shop Now',
    image: home,
    link: '/products?category=home-living',
    textColor: 'text-blue-950',
  },
  {
    id: 3,
    title: 'Latest Mobiles',
    discount: 'Up to 40% Off',
    buttonText: 'Shop Now',
    image: mobiles,
    link: '/products?category=mobiles',
    textColor: 'text-purple-950',
  },
];
