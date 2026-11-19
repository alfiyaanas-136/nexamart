import HeroCarousel from '../components/home/HeroCarousel'
import ShopByCategory from '../components/home/ShopByCategory'
import DealsOfTheDay from '../components/home/DealsOfTheDay'
import PromotionalBanners from '../components/home/PromotionalBanners'
import FeaturedProducts from '../components/FeaturedProducts/FeaturedProducts'

const Home = () => {
  return (
    <main className='min-h-screen bg-gray-50 pb-12'>
      <HeroCarousel />
      <ShopByCategory />
      <DealsOfTheDay />
      <PromotionalBanners />
      <FeaturedProducts />
    </main>
  )
}

export default Home