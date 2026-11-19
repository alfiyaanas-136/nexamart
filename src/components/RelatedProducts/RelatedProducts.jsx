import { products } from "../../data/products";
import ProductCard from "../ProductCard/ProductCard";

const RelatedProducts = ({ currentProduct }) => {
  // Find products from the same category first
  const sameCategoryProducts = products.filter(
    (product) =>
      product.id !== currentProduct.id &&
      product.category === currentProduct.category
  );

  // Find products from other categories
  const otherProducts = products.filter(
    (product) =>
      product.id !== currentProduct.id &&
      product.category !== currentProduct.category
  );

  // Display a maximum of five related products
  const relatedProducts = [
    ...sameCategoryProducts,
    ...otherProducts,
  ].slice(0, 5);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-8">

      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
          You May Also Like
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Discover more products selected for you
        </p>
      </div>

      {/* Related Products Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {relatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

    </section>
  );
};

export default RelatedProducts;
