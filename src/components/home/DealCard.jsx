
import { useState } from 'react';
import { Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const DealCard = ({ product }) => {
  const [liked, setLiked] = useState(false);

  const discount = Math.round(
    ((product.originalPrice - product.price) /
      product.originalPrice) * 100
  );

  const formatPrice = (price) =>
    price.toLocaleString('en-IN');

  const formatReviews = (count) =>
    count >= 1000
      ? `${(count / 1000).toFixed(1)}K`
      : count.toString();

  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-lg">

      {/* Wishlist */}
      <button
        type="button"
        onClick={() => setLiked(!liked)}
        aria-label={
          liked ? 'Remove from wishlist' : 'Add to wishlist'
        }
        aria-pressed={liked}
        className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-1.5"
      >
        <Heart
          size={20}
          className={
            liked
              ? 'fill-red-500 text-red-500'
              : 'text-gray-600'
          }
        />
      </button>

      {/* Product Image */}
      <Link to={`/products?category=${product.category}`}>
        <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="mt-3 flex flex-1 flex-col">

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded bg-green-600 px-1.5 py-0.5 text-xs font-semibold text-white">
            {product.rating}
            <Star size={11} fill="currentColor" />
          </span>

          <span className="text-xs text-gray-500">
            ({formatReviews(product.reviews)})
          </span>
        </div>

        <Link
          to={`/products?category=${product.category}`}
          className="mt-2 line-clamp-2 min-h-[40px] text-sm font-semibold text-gray-900 hover:text-blue-600"
        >
          {product.name}
        </Link>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          <span className="text-base font-bold text-gray-900">
            ₹{formatPrice(product.price)}
          </span>

          <span className="text-xs text-gray-400 line-through">
            ₹{formatPrice(product.originalPrice)}
          </span>

          <span className="rounded bg-green-50 px-1.5 py-0.5 text-xs font-semibold text-green-700">
            {discount}% Off
          </span>
        </div>

      </div>
    </article>
  );
};

export default DealCard;
