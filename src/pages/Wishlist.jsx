
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowLeft,
  Star,
  Check,
} from "lucide-react";

import { useWishlist } from "../hooks/useWishlist";
import { useCart } from "../hooks/useCart";

const Wishlist = () => {
  const {
    wishlist,
    wishlistCount,
    toggleWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  const [addedProductId, setAddedProductId] = useState(null);

  // Format prices
  const formatPrice = (price) =>
    `₹${Number(price || 0).toLocaleString("en-IN")}`;

  // Format review counts
  const formatReviews = (reviews = 0) =>
    reviews >= 1000
      ? `${(reviews / 1000).toFixed(1)}K`
      : reviews;

  // Add product to cart
  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedProductId(product.id);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="mx-auto w-[94%] max-w-[1400px]">

        {/* PAGE HEADER */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
              My Wishlist
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {wishlistCount} saved{" "}
              {wishlistCount === 1 ? "product" : "products"}
            </p>
          </div>

          <Link
            to="/products"
            className="flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-800"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </Link>
        </div>

        {wishlist.length === 0 ? (
          /* EMPTY WISHLIST */
          <div className="flex flex-col items-center rounded-xl border border-gray-200 bg-white px-5 py-16 text-center shadow-sm sm:py-20">
            <Heart
              size={70}
              className="mb-5 text-gray-300"
            />

            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Your wishlist is empty!
            </h2>

            <p className="mt-3 max-w-md text-sm text-gray-500 sm:text-base">
              Save products you love and find them here.
            </p>

            <Link
              to="/products"
              className="mt-6 rounded-lg bg-yellow-400 px-8 py-3 font-semibold text-gray-900 transition hover:bg-yellow-300"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          /* WISHLIST PRODUCTS GRID */
          <section
            aria-label="Saved products"
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5"
          >
            {wishlist.map((product) => {
              const originalPrice = Math.max(
                product.originalPrice || product.price,
                product.price
              );

              const discount =
                originalPrice > product.price
                  ? Math.round(
                      ((originalPrice - product.price) /
                        originalPrice) *
                        100
                    )
                  : 0;

              const isAdded = addedProductId === product.id;

              return (
                <article
                  key={product.id}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-2.5 shadow-sm transition hover:shadow-lg sm:p-3"
                >
                  {/* PRODUCT IMAGE */}
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-50">
                    <Link
                      to={`/products/${product.id}`}
                      className="block h-full w-full"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105 sm:p-3"
                      />
                    </Link>

                    {/* REMOVE FROM WISHLIST */}
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product)}
                      aria-label={`Remove ${product.name} from wishlist`}
                      title="Remove from wishlist"
                      className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-500 shadow-sm transition hover:scale-110 focus-visible:outline-2 focus-visible:outline-red-500"
                      >
                        <Trash2 size={17} />
                    </button>

                    {/* DISCOUNT BADGE */}
                    {discount > 0 && (
                      <span className="absolute bottom-2 left-2 rounded bg-green-600 px-2 py-1 text-[10px] font-semibold text-white sm:text-xs">
                        {discount}% OFF
                      </span>
                    )}
                  </div>

                  {/* PRODUCT INFORMATION */}
                  <div className="flex flex-1 flex-col gap-1 pt-3">
                    {product.brand && (
                      <p className="mb-1 truncate text-xs font-medium text-gray-500">
                        {product.brand}
                      </p>
                    )}

                    <Link
                      to={`/products/${product.id}`}
                      className="hover:text-blue-600"
                    >
                      <h3 className="line-clamp-2 min-h-10 text-sm font-semibold text-gray-900 transition hover:text-blue-600">
                        {product.name}
                      </h3>
                    </Link>

                    {/* PRODUCT RATING */}
                    {product.rating != null && (
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="flex items-center gap-1 rounded bg-green-600 px-1.5 py-0.5 text-xs font-semibold text-white">
                          {product.rating}
                          <Star size={12} fill="currentColor" />
                        </span>

                        {product.reviews != null && (
                          <span className="text-xs text-gray-500">
                            ({formatReviews(product.reviews)})
                          </span>
                        )}
                      </div>
                    )}

                    {/* PRODUCT PRICE */}
                    <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="text-base font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </span>

                      {originalPrice > product.price && (
                        <span className="text-xs text-gray-400 line-through">
                          {formatPrice(originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* ADD TO CART */}
                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      className={`mt-auto flex min-h-11 w-full items-center justify-center gap-1 rounded-lg px-1 py-2.5 text-[11px] font-bold transition sm:gap-2 sm:text-sm ${
                        isAdded
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check size={17} className="shrink-0" />
                          <span>Added to Cart</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={17} className="shrink-0" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
};

export default Wishlist;
