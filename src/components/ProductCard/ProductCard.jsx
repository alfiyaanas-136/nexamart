import { Link } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";

import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const formatPrice = (price) =>
    `₹${Number(price).toLocaleString("en-IN")}`;

  const formatReviews = (reviews) =>
    reviews >= 1000
      ? `${(reviews / 1000).toFixed(1)}K`
      : reviews;

  const discount =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : 0;

  const isWishlisted = isInWishlist(product.id);

  const productUrl = `/products/${product.id}`;

  const categoryLabel = product.category
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-50">

        <Link
          to={productUrl}
          aria-label={`View ${product.name}`}
          className="block h-full w-full"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
          />
        </Link>

        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute left-2 top-2 rounded-md bg-green-600 px-2 py-1 text-[11px] font-bold text-white shadow-sm">
            {discount}% OFF
          </span>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={
            isWishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          aria-pressed={isWishlisted}
          className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <Heart
            size={19}
            className={
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-gray-600 hover:text-red-500"
            }
          />
        </button>

      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col pt-4">

        {/* Category */}
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-blue-600">
          {categoryLabel}
        </p>

        {/* Brand */}
        {product.brand && (
          <p className="mb-1 truncate text-xs font-medium text-gray-500">
            {product.brand}
          </p>
        )}

        {/* Product Name */}
        <Link
          to={productUrl}
          className="block"
        >
          <h3 className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-gray-900 transition hover:text-blue-600">
            {product.name}
          </h3>
        </Link>

        {/* Ratings */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-md bg-green-800 px-2 py-1 text-xs font-bold text-white">
            {product.rating}
            <Star
              size={12}
              fill="currentColor"
            />
          </span>

          <span className="text-xs text-gray-500">
            ({formatReviews(product.reviews)} reviews)
          </span>
        </div>

        {/* Pricing */}
        <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-lg font-bold text-gray-950">
            {formatPrice(product.price)}
          </span>

          {discount > 0 && (
            <span className="text-xs text-gray-600 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Discount Text */}
        {discount > 0 && (
          <p className="mt-1 text-xs font-semibold text-green-800">
            You save{" "}
            {formatPrice(
              product.originalPrice - product.price
            )}
          </p>
        )}

        {/* Add to Cart */}
        <div className="mt-auto pt-5">
          <button
            type="button"
            onClick={() => addToCart(product)}
            aria-label={`Add ${product.name} to cart`}
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-yellow-400 px-3 py-3 text-sm font-bold text-gray-950 transition-colors duration-200 hover:bg-yellow-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:scale-[0.98]"
          >
            <ShoppingCart size={17} />
            Add to Cart
          </button>
        </div>

      </div>

    </article>
  );
};

export default ProductCard;
