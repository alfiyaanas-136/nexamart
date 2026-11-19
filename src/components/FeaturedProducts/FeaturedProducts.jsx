import { Link } from 'react-router-dom';
import { ArrowRight, Heart, ShoppingCart, Star } from 'lucide-react';
import { featuredProducts } from '../../data/featuredProducts';
import { useCart } from "../../hooks/useCart";
import { useWishlist } from '../../hooks/useWishlist';

const FeaturedProducts = () => {

    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
  const formatPrice = (price) =>
    `₹${price.toLocaleString('en-IN')}`;

  const formatReviews = (reviews) =>
    reviews >= 1000
      ? `${(reviews / 1000).toFixed(1)}K`
      : reviews;

  return (
    <section
      aria-label="Featured Products"
      className="mx-auto mt-8 w-[94%] max-w-[1500px]"
    >
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">

        {/* Section Header */}
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-950 md:text-2xl">
              Featured Products
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Discover our handpicked products
            </p>
          </div>

          <Link
            to="/products"
            className="flex shrink-0 items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            View All
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">

          {featuredProducts.map((product) => {
            const discount = Math.round(
              ((product.originalPrice - product.price) /
                product.originalPrice) * 100
            );

            return (
              <article
                key={product.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >

                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-50">

                  <Link
                    to={`/products/${product.id}`}
                    className="block h-full w-full"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  
                  {/* Wishlist Button */}
                  
                <button
                type="button"
                onClick={() => toggleWishlist(product)}
                aria-label={
                    isInWishlist(product.id)
                    ? `Remove ${product.name} from wishlist`
                    : `Add ${product.name} to wishlist`
                }
                aria-pressed={isInWishlist(product.id)}
                className="absolute right-2 top-2 rounded-full bg-white p-2 shadow-sm transition hover:scale-110"
                >
                <Heart
                    size={19}
                    className={
                    isInWishlist(product.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-600'
                    }
                />
                </button>


                </div>

                {/* Product Information */}
                <div className="flex flex-1 flex-col pt-3">

                  <Link to={`/products/${product.id}`}>
                    <h3 className="line-clamp-2 min-h-[40px] text-sm font-semibold text-gray-900 hover:text-blue-600">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="mt-2 flex items-center gap-2">
                    <span className="flex items-center gap-1 rounded bg-green-600 px-1.5 py-0.5 text-xs font-semibold text-white">
                      {product.rating}
                      <Star size={12} fill="currentColor" />
                    </span>

                    <span className="text-xs text-gray-500">
                      ({formatReviews(product.reviews)})
                    </span>
                  </div>

                  {/* Pricing */}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-base font-bold text-gray-950">
                      {formatPrice(product.price)}
                    </span>

                    <span className="text-xs text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  </div>

                  <p className="mt-1 text-xs font-semibold text-green-600">
                    {discount}% Off
                  </p>

                  {/* Add to Cart */}
                  
                    <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg bg-yellow-400 px-3 py-2.5 text-sm font-bold text-gray-950 transition hover:bg-yellow-300"
                    style={{ marginTop: '16px' }}
                    >
                    <ShoppingCart size={17} />
                    Add to Cart
                    </button>


                </div>
              </article>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
