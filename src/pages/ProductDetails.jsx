import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  ShoppingCart,
  Star,
  Plus,
  Minus,
  Truck,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import { products } from "../data/products";
import { useCart } from "../hooks/useCart";
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";
import ProductImageGallery from "../components/ProductImageGallery/ProductImageGallery";

const ProductDetails = () => {
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
 
  // Find product using URL ID
const product = products.find(
  (item) => Number(item.id) === Number(id)
);

  // Format price in Indian Rupees
  const formatPrice = (price) =>
    `₹${price.toLocaleString("en-IN")}`;

  // Handle unavailable product
  if (!product) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Product Not Found
        </h1>

        <p className="mt-3 text-gray-500">
          The product you're looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="mt-6 rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-gray-900 transition hover:bg-yellow-300"
        >
          Back to Home
        </Link>
      </main>
    );
  }

  // Calculate discount
  const discount = Math.round(
    ((product.originalPrice - product.price) /
      product.originalPrice) *
      100
  );

  // Add selected quantity to cart
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">

      <div className="mx-auto w-[94%] max-w-[1400px]">

        {/* Back Navigation */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-800"
        >
          <ArrowLeft size={18} />
          Continue Shopping
        </Link>

        {/* =========================================
            MAIN PRODUCT DETAILS
        ========================================= */}

        <div className="grid grid-cols-1 gap-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-8 lg:grid-cols-2">

          {/* Product Image Gallery */}
          <ProductImageGallery
            key={product.id}
            product={product}
          />

          {/* Product Information */}
          <div className="flex flex-col">

            {/* Category */}
            <p className="text-sm font-medium capitalize text-blue-600">
              {product.category.replace("-", " & ")}
            </p>

            {/* Product Name */}
            <h1 className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-3">

              <span className="flex items-center gap-1 rounded-md bg-green-600 px-2 py-1 text-sm font-semibold text-white">
                {product.rating}
                <Star size={15} fill="currentColor" />
              </span>

              <span className="text-sm text-gray-500">
                {product.reviews.toLocaleString("en-IN")} Ratings & Reviews
              </span>

            </div>

            {/* Pricing */}
            <div className="mt-6 border-t border-gray-200 pt-6">

              <p className="mb-2 text-sm font-semibold text-green-600">
                Special Price
              </p>

              <div className="flex flex-wrap items-center gap-3">

                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>

                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>

                <span className="text-base font-semibold text-green-600">
                  {discount}% Off
                </span>

              </div>

              <p className="mt-2 text-sm text-gray-500">
                Inclusive of all taxes
              </p>

            </div>

            {/* Quantity Selector */}
            <div className="mt-8">

              <h2 className="mb-3 text-sm font-semibold text-gray-800">
                Quantity
              </h2>

              <div className="flex w-fit items-center overflow-hidden rounded-lg border border-gray-300">

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((prev) => Math.max(1, prev - 1))
                  }
                  disabled={quantity === 1}
                  aria-label="Decrease quantity"
                  className="p-3 transition hover:bg-gray-100 disabled:opacity-40"
                >
                  <Minus size={18} />
                </button>

                <span className="min-w-12 text-center font-semibold">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((prev) => prev + 1)
                  }
                  aria-label="Increase quantity"
                  className="p-3 transition hover:bg-gray-100"
                >
                  <Plus size={18} />
                </button>

              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              {/* Add to Cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-yellow-400 px-6 py-3.5 font-bold text-gray-900 transition hover:bg-yellow-300"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>

              {/* View Cart */}
              <Link
                to="/cart"
                className="flex flex-1 items-center justify-center rounded-lg bg-blue-600 px-6 py-3.5 font-bold text-white transition hover:bg-blue-700"
              >
                View Cart
              </Link>

            </div>

            {/* Product Benefits */}
            <div className="mt-8 space-y-4 border-t border-gray-200 pt-6">

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Truck
                  size={21}
                  className="shrink-0 text-blue-600"
                />
                <span>
                  Delivery availability will be confirmed at checkout
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <ShieldCheck
                  size={21}
                  className="shrink-0 text-blue-600"
                />
                <span>
                  Secure checkout integration coming soon
                </span>
              </div>

            </div>

          </div>
        </div>

        {/* =========================================
            ADDITIONAL PRODUCT INFORMATION
        ========================================= */}

        <div className="mt-6 space-y-6">

          {/* PRODUCT DESCRIPTION */}
          {product.description && (
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">

              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Product Description
              </h2>

              <p className="text-sm leading-7 text-gray-600 md:text-base">
                {product.description}
              </p>

            </section>
          )}

          {/* PRODUCT HIGHLIGHTS */}
          {product.highlights?.length > 0 && (
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">

              <h2 className="mb-5 text-xl font-bold text-gray-900">
                Product Highlights
              </h2>

              <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">

                {product.highlights.map((highlight, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-gray-700 md:text-base"
                  >
                    <CheckCircle2
                      size={20}
                      className="mt-0.5 shrink-0 text-green-600"
                    />

                    <span>{highlight}</span>
                  </li>
                ))}

              </ul>

            </section>
          )}

          {/* PRODUCT SPECIFICATIONS */}
          {product.specifications &&
            Object.keys(product.specifications).length > 0 && (
              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">

                <h2 className="mb-5 text-xl font-bold text-gray-900">
                  Product Specifications
                </h2>

                <div className="overflow-hidden rounded-lg border border-gray-200">

                  {Object.entries(product.specifications).map(
                    ([key, value], index) => (
                      <div
                        key={key}
                        className={`grid grid-cols-2 gap-4 px-4 py-3 text-sm md:text-base ${
                          index % 2 === 0
                            ? "bg-gray-50"
                            : "bg-white"
                        }`}
                      >

                        <span className="font-medium text-gray-600">
                          {key.replace(
                            /([a-z])([A-Z])/g,
                            "$1 $2"
                          )}
                        </span>

                        <span className="text-gray-900">
                          {value}
                        </span>

                      </div>
                    )
                  )}

                </div>

              </section>
            )}

        </div> {/* End Additional Product Information */}

            {/* Related Products Section */}
        <RelatedProducts
          key={product.id}
          currentProduct={product}
        />

      </div> {/* End Main Container */}
    </main>
  );
};

export default ProductDetails;
