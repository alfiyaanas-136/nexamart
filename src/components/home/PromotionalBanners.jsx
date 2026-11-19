import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { promotionalBanners } from '../../data/promotionalBanners';

const PromotionalBanners = () => {
  return (
    <section
      aria-label="Featured promotional offers"
      className="mx-auto mt-6 w-[94%] max-w-[1500px]"
    >
      {/* Promotional Banners Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">

        {promotionalBanners.map((banner) => (
          <article
            key={banner.id}
            className="group relative aspect-[2.8/1] w-full min-w-0 overflow-hidden rounded-2xl bg-gray-100 shadow-sm transition-shadow duration-300 hover:shadow-lg"
          >

            {/* Background Image */}
            <img
              src={banner.image}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />

            {/* Promotional Content */}
            <div
              className={`relative z-10 flex h-full w-[55%] flex-col items-start justify-center pl-[7%] ${banner.textColor}`}
            >

              {/* Banner Title */}
              <h2 className="max-w-[180px] text-lg font-extrabold leading-tight sm:text-xl lg:text-lg xl:text-xl 2xl:text-2xl">
                {banner.title}
              </h2>

              {/* Discount */}
              <p className="mt-1 text-xs font-semibold sm:text-sm xl:text-base">
                {banner.discount}
              </p>

              {/* Shop Now Button */}
              <Link
                to={banner.link}
                className="mt-3 inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-lg bg-yellow-400 px-3 py-2 text-xs font-bold text-gray-950 shadow-sm transition-colors duration-300 hover:bg-yellow-300 sm:text-sm"
              >
                {banner.buttonText}
                <ArrowRight size={16} />
              </Link>

            </div>
          </article>
        ))}

      </div>
    </section>
  );
};

export default PromotionalBanners;
