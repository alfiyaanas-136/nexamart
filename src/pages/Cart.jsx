import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  ShieldCheck,
} from "lucide-react";

import { useCart } from "../hooks/useCart";

const Cart = () => {
  const {
    cart,
    cartCount,
    cartTotal,
    removeFromCart,
    updateQuantity,
  } = useCart();

  // Format prices in Indian Rupees
  const formatPrice = (price) =>
    `₹${Number(price || 0).toLocaleString("en-IN")}`;

  // Format category names
  const formatCategory = (category = "") =>
    category
      .split("-")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" & ");

  // Calculate original total
  const originalTotal = cart.reduce(
    (total, item) =>
      total +
      Math.max(
        item.originalPrice || item.price,
        item.price
      ) *
        item.quantity,
    0
  );

  // Calculate total savings
  const totalDiscount = Math.max(
    0,
    originalTotal - cartTotal
  );

  return (
    <main className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="mx-auto w-[94%] max-w-[1400px]">

        {/* PAGE HEADING */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
              My Shopping Cart
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {cartCount}{" "}
              {cartCount === 1 ? "item" : "items"} in your cart
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

        {cart.length === 0 ? (
          /* EMPTY CART */
          <div className="flex flex-col items-center rounded-xl border border-gray-200 bg-white px-5 py-16 text-center shadow-sm sm:py-20">
            <ShoppingCart
              size={70}
              className="mb-5 text-gray-300"
            />

            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Your cart is empty!
            </h2>

            <p className="mt-3 max-w-md text-sm text-gray-500 sm:text-base">
              Looks like you haven't added anything
              to your cart yet.
            </p>

            <Link
              to="/products"
              className="mt-6 rounded-lg bg-yellow-400 px-8 py-3 font-semibold text-gray-900 transition hover:bg-yellow-300"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">

            {/* CART PRODUCTS */}
            <section
              aria-label="Cart products"
              className="space-y-4 lg:col-span-2"
            >
              {cart.map((product) => {
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

                return (
                  <article
                    key={product.id}
                    className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4 md:p-5"
                  >
                    <div className="flex gap-3 sm:gap-4">

                      {/* PRODUCT IMAGE */}
                      <Link
                        to={`/products/${product.id}`}
                        className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-gray-50 sm:h-36 sm:w-36"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-contain p-2"
                        />
                      </Link>

                      {/* PRODUCT DETAILS */}
                      <div className="flex min-w-0 flex-1 flex-col">
                        <Link
                          to={`/products/${product.id}`}
                          className="break-words text-sm font-semibold text-gray-900 transition hover:text-blue-600 sm:text-base"
                        >
                          {product.name}
                        </Link>

                        <p className="mt-1 text-xs text-gray-500">
                          {formatCategory(product.category)}
                        </p>

                        {/* PRODUCT PRICE */}
                        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="text-base font-bold text-gray-900 sm:text-lg">
                            {formatPrice(product.price)}
                          </span>

                          {originalPrice > product.price && (
                            <span className="text-xs text-gray-400 line-through sm:text-sm">
                              {formatPrice(originalPrice)}
                            </span>
                          )}

                          {discount > 0 && (
                            <span className="text-xs font-semibold text-green-600 sm:text-sm">
                              {discount}% Off
                            </span>
                          )}
                        </div>

                        {/* QUANTITY AND REMOVE */}
                        <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-4">

                          {/* QUANTITY CONTROLS */}
                          <div className="flex items-center overflow-hidden rounded-lg border border-gray-300">
                            <button
                              type="button"
                              disabled={product.quantity <= 1}
                              onClick={() =>
                                updateQuantity(
                                  product.id,
                                  product.quantity - 1
                                )
                              }
                              aria-label={`Decrease quantity of ${product.name}`}
                              className="p-2 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              <Minus size={16} />
                            </button>

                            <span className="min-w-10 px-2 text-center text-sm font-semibold">
                              {product.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  product.id,
                                  product.quantity + 1
                                )
                              }
                              aria-label={`Increase quantity of ${product.name}`}
                              className="p-2 transition hover:bg-gray-100"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          {/* REMOVE PRODUCT */}
                          <button
                            type="button"
                            aria-label={`Remove ${product.name} from cart`}
                            onClick={() =>
                              removeFromCart(product.id)
                            }
                            className="flex items-center gap-2 text-sm font-medium text-red-500 transition hover:text-red-700"
                          >
                            <Trash2 size={17} />
                            Remove
                          </button>
                        </div>

                        {/* ITEM SUBTOTAL */}
                        {product.quantity > 1 && (
                          <p className="mt-3 text-xs text-gray-500">
                            Item subtotal:{" "}
                            <span className="font-semibold text-gray-800">
                              {formatPrice(
                                product.price * product.quantity
                              )}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>

            {/* PRICE SUMMARY */}
            <aside className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
              <h2 className="text-lg font-bold text-gray-900">
                Price Details
              </h2>

              <div className="mt-4 space-y-4 border-y border-gray-200 py-5">

                {/* ORIGINAL PRICE */}
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-gray-600">
                    Price ({cartCount}{" "}
                    {cartCount === 1 ? "item" : "items"})
                  </span>

                  <span className="font-medium text-gray-900">
                    {formatPrice(originalTotal)}
                  </span>
                </div>

                {/* DISCOUNT */}
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-gray-600">
                    Discount
                  </span>

                  <span className="font-medium text-green-600">
                    - {formatPrice(totalDiscount)}
                  </span>
                </div>

                {/* DELIVERY */}
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-gray-600">
                    Delivery Charges
                  </span>

                  <span className="font-medium text-green-600">
                    FREE
                  </span>
                </div>
              </div>

              {/* TOTAL AMOUNT */}
              <div className="mt-5 flex items-center justify-between gap-3">
                <span className="text-base font-bold text-gray-900 sm:text-lg">
                  Total Amount
                </span>

                <span className="text-xl font-bold text-gray-900">
                  {formatPrice(cartTotal)}
                </span>
              </div>

              {/* SAVINGS MESSAGE */}
              {totalDiscount > 0 && (
                <p className="mt-4 rounded-lg bg-green-50 p-3 text-sm font-semibold text-green-700">
                  You will save{" "}
                  {formatPrice(totalDiscount)} on this order!
                </p>
              )}

              {/* CHECKOUT BUTTON */}
              <Link
                to="/checkout"
                className="mt-6 block w-full rounded-lg bg-yellow-400 px-4 py-3 text-center font-bold text-gray-900 transition hover:bg-yellow-300"
              >
                Proceed to Checkout
              </Link>

              {/* SECURITY MESSAGE */}
              <div className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-gray-500">
                <ShieldCheck size={17} />
                Checkout integration coming soon
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
