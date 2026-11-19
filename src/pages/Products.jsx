
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { products } from "../data/products";
import ProductCard from "../components/ProductCard/ProductCard";

// =====================================
// STATIC FILTER DATA
// =====================================

const categories = [
  { label: "All Categories", value: "all" },
  { label: "Mobiles", value: "mobiles" },
  { label: "Electronics", value: "electronics" },
  { label: "Fashion", value: "fashion" },
  { label: "Home & Living", value: "home-living" },
  { label: "Appliances", value: "appliances" },
  { label: "Beauty", value: "beauty" },
  { label: "Sports", value: "sports" },
  { label: "Toys & Kids", value: "toys-kids" },
];

const MAX_PRODUCT_PRICE =
  Math.ceil(
    Math.max(0, ...products.map((product) => product.price)) / 500
  ) * 500;

const sortOptions = [
  { label: "Popularity", value: "popularity" },
  { label: "Price: Low to High", value: "price-low" },
  { label: "Price: High to Low", value: "price-high" },
  { label: "Customer Rating", value: "rating" },
  { label: "Discount: High to Low", value: "discount" },
];

const ratingOptions = [
  { label: "All Ratings", value: "all" },
  { label: "4★ & above", value: "4" },
  { label: "3★ & above", value: "3" },
  { label: "2★ & above", value: "2" },
  { label: "1★ & above", value: "1" },
];

const availableBrands = [
  ...new Set(products.map((product) => product.brand).filter(Boolean)),
].sort((a, b) => a.localeCompare(b));

// =====================================
// PRODUCTS COMPONENT
// =====================================

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterButtonRef = useRef(null);
  const filterPanelRef = useRef(null);

  // =====================================
  // MOBILE FILTER ACCESSIBILITY
  // =====================================

  const closeFilterDrawer = useCallback(() => {
    setIsFilterOpen(false);
    filterButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isFilterOpen) return;

    const panel = filterPanelRef.current;
    if (!panel) return;

    const getFocusableElements = () =>
      Array.from(
        panel.querySelectorAll(
          'button:not([disabled]), ' +
            'input:not([disabled]), ' +
            'select:not([disabled]), ' +
            'a[href], ' +
            '[tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => element.getClientRects().length > 0);

    const focusableElements = getFocusableElements();

    (focusableElements[0] || panel).focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeFilterDrawer();
        return;
      }

      if (event.key !== "Tab") return;

      const elements = getFocusableElements();

      if (elements.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const firstElement = elements[0];
      const lastElement = elements[elements.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === firstElement
      ) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      } else if (!panel.contains(document.activeElement)) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFilterOpen, closeFilterDrawer]);

  // =====================================
  // READ URL PARAMETERS
  // =====================================

  const searchQuery = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "all";
  const selectedPrice = searchParams.get("maxPrice");
  const sortBy = searchParams.get("sort") || "popularity";
  const selectedRating = searchParams.get("rating") || "all";

  const maxPrice =
    selectedPrice !== null &&
    Number.isFinite(Number(selectedPrice))
      ? Math.max(
          0,
          Math.min(MAX_PRODUCT_PRICE, Number(selectedPrice))
        )
      : MAX_PRODUCT_PRICE;

  const minRating =
    selectedRating === "all"
      ? 0
      : Number(selectedRating) || 0;

  const selectedBrandsKey = searchParams
    .getAll("brand")
    .filter(Boolean)
    .join("\u0000");

  const selectedBrands = useMemo(
    () =>
      selectedBrandsKey
        ? selectedBrandsKey.split("\u0000")
        : [],
    [selectedBrandsKey]
  );

  // =====================================
  // UPDATE URL PARAMETERS
  // =====================================

  const updateParam = (key, value, defaultValue) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);

        if (!value || value === defaultValue) {
          next.delete(key);
        } else {
          next.set(key, value);
        }

        return next;
      },
      { replace: true }
    );
  };

  const handleSearchChange = (event) => {
    updateParam("search", event.target.value, "");
  };

  const handleCategoryChange = (event) => {
    updateParam("category", event.target.value, "all");
  };

  const handlePriceChange = (event) => {
    updateParam(
      "maxPrice",
      String(Number(event.target.value)),
      String(MAX_PRODUCT_PRICE)
    );
  };

  const handleBrandChange = (brand) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        const brands = new Set(next.getAll("brand"));

        if (brands.has(brand)) {
          brands.delete(brand);
        } else {
          brands.add(brand);
        }

        next.delete("brand");

        brands.forEach((item) => {
          next.append("brand", item);
        });

        return next;
      },
      { replace: true }
    );
  };

  const handleRatingChange = (event) => {
    updateParam("rating", event.target.value, "all");
  };

  const handleSortChange = (event) => {
    updateParam("sort", event.target.value, "popularity");
  };

  // =====================================
  // REMOVE INDIVIDUAL FILTER
  // =====================================

  const removeFilter = (key, value = null) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);

        if (key === "brand" && value !== null) {
          const remainingBrands = next
            .getAll("brand")
            .filter((brand) => brand !== value);

          next.delete("brand");

          remainingBrands.forEach((brand) => {
            next.append("brand", brand);
          });
        } else {
          next.delete(key);
        }

        return next;
      },
      { replace: true }
    );
  };

  const clearAllFilters = () => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);

        [
          "search",
          "category",
          "maxPrice",
          "brand",
          "rating",
        ].forEach((key) => next.delete(key));

        return next;
      },
      { replace: true }
    );
  };

  // =====================================
  // FILTER PRODUCTS
  // =====================================

  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        (product.brand || "").toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === "all" ||
        product.category === selectedCategory;

      const matchesPrice = product.price <= maxPrice;

      const matchesBrand =
        selectedBrands.length === 0 ||
        selectedBrands.includes(product.brand);

      const matchesRating = product.rating >= minRating;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesBrand &&
        matchesRating
      );
    });
  }, [
    searchQuery,
    selectedCategory,
    maxPrice,
    selectedBrands,
    minRating,
  ]);

  // =====================================
  // SORT PRODUCTS
  // =====================================

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;

        case "price-high":
          return b.price - a.price;

        case "rating":
          return b.rating - a.rating;

        case "discount": {
          const discountA =
            a.originalPrice > 0
              ? ((a.originalPrice - a.price) /
                  a.originalPrice) *
                100
              : 0;

          const discountB =
            b.originalPrice > 0
              ? ((b.originalPrice - b.price) /
                  b.originalPrice) *
                100
              : 0;

          return discountB - discountA;
        }

        case "popularity":
        default:
          return b.reviews - a.reviews;
      }
    });
  }, [filteredProducts, sortBy]);

  // =====================================
  // ACTIVE FILTER STATUS
  // =====================================

  const hasActiveFilters =
    Boolean(searchQuery) ||
    selectedCategory !== "all" ||
    selectedPrice !== null ||
    selectedBrands.length > 0 ||
    selectedRating !== "all";

  // =====================================
  // JSX
  // =====================================

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto w-[94%] max-w-[1400px]">

        {/* Back Navigation */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Page Heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            All Products
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Explore our latest collection of products
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search
            size={20}
            aria-hidden="true"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="search"
            aria-label="Search products"
            placeholder="Search products by name, category or brand..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Sidebar + Products */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">

          {/* Mobile Drawer Backdrop */}
          {isFilterOpen && (
            <button
              type="button"
              aria-label="Close filter panel"
              tabIndex={-1}
              onClick={closeFilterDrawer}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            />
          )}

          {/* =====================================
              FILTER SIDEBAR
          ===================================== */}

          <aside
            ref={filterPanelRef}
            id="product-filter-panel"
            role={isFilterOpen ? "dialog" : undefined}
            aria-modal={isFilterOpen ? "true" : undefined}
            aria-label="Product filters"
            tabIndex={-1}
            className={`
              fixed inset-y-0 left-0 z-50 flex w-[85%] max-w-[340px]
              flex-col bg-white p-5 shadow-xl
              transition-transform duration-300
              lg:sticky lg:top-6 lg:z-auto lg:flex lg:w-auto lg:max-w-none
              lg:max-h-[calc(100vh-3rem)]
              lg:translate-x-0 lg:rounded-xl lg:border
              lg:border-gray-200 lg:shadow-sm
              ${
                isFilterOpen
                  ? "visible translate-x-0"
                  : "invisible -translate-x-full lg:visible"
              }
            `}
          >
            {/* Sidebar Heading */}
            <div className="mb-5 flex items-center gap-2 border-b border-gray-100 pb-4">
              <SlidersHorizontal
                size={20}
                className="shrink-0 text-blue-600"
                aria-hidden="true"
              />

              <h2 className="text-lg font-bold text-gray-900">
                Filters
              </h2>

              <button
                type="button"
                onClick={clearAllFilters}
                className="ml-auto text-xs font-semibold text-blue-600 hover:text-blue-800"
              >
                Clear All
              </button>

              <button
                type="button"
                onClick={closeFilterDrawer}
                aria-label="Close filters"
                className="ml-auto rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Filter Content */}
            <div
              className="
                hide-scrollbar min-h-0 flex-1
                overflow-y-auto overscroll-contain pr-2
              "
            >
              {/* Category Filter */}
              <div className="mb-6">
                <label
                  htmlFor="category-filter"
                  className="mb-3 block text-sm font-semibold text-gray-800"
                >
                  Category
                </label>

                <select
                  id="category-filter"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500"
                >
                  {categories.map((category) => (
                    <option
                      key={category.value}
                      value={category.value}
                    >
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Slider */}
              <div className="border-t border-gray-100 pt-5">
                <div className="mb-4 flex items-center justify-between gap-2">
                  <label
                    htmlFor="price-filter"
                    className="text-sm font-semibold text-gray-800"
                  >
                    Price Range
                  </label>

                  <span className="text-sm font-bold text-blue-600">
                    ₹{maxPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                <input
                  id="price-filter"
                  type="range"
                  min="0"
                  max={MAX_PRODUCT_PRICE}
                  step="500"
                  value={maxPrice}
                  onChange={handlePriceChange}
                  aria-label="Maximum product price"
                  className="w-full cursor-pointer accent-blue-600"
                />

                <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                  <span>₹0</span>
                  <span>
                    ₹{MAX_PRODUCT_PRICE.toLocaleString("en-IN")}
                  </span>
                </div>

                <p className="mt-4 text-xs text-gray-500">
                  Showing products up to{" "}
                  <span className="font-semibold text-gray-800">
                    ₹{maxPrice.toLocaleString("en-IN")}
                  </span>
                </p>

                {selectedPrice !== null && (
                  <button
                    type="button"
                    onClick={() => removeFilter("maxPrice")}
                    className="mt-3 text-xs font-semibold text-blue-600 hover:text-blue-800"
                  >
                    Reset Price
                  </button>
                )}
              </div>

              {/* Brand Filter */}
              <div className="mt-6 border-t border-gray-100 pt-5">
                <h3 className="mb-4 text-sm font-semibold text-gray-800">
                  Brand
                </h3>

                <div
                  className="
                    hide-scrollbar h-52 min-h-0
                    overflow-y-auto overscroll-contain pr-3
                  "
                >
                  <div className="space-y-3">
                    {availableBrands.map((brand) => (
                      <label
                        key={brand}
                        className="flex cursor-pointer items-center gap-3"
                      >
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => handleBrandChange(brand)}
                          className="h-4 w-4 shrink-0 cursor-pointer rounded border-gray-300 accent-blue-600"
                        />

                        <span className="text-sm text-gray-600">
                          {brand}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Customer Rating Filter */}
              <div className="mt-6 border-t border-gray-100 pt-5">
                <h3 className="mb-4 text-sm font-semibold text-gray-800">
                  Customer Ratings
                </h3>

                <div className="space-y-3">
                  {ratingOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex cursor-pointer items-center gap-3"
                    >
                      <input
                        type="radio"
                        name="customer-rating"
                        value={option.value}
                        checked={selectedRating === option.value}
                        onChange={handleRatingChange}
                        className="h-4 w-4 cursor-pointer accent-blue-600"
                      />

                      <span className="text-sm text-gray-600">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Apply Filters */}
            <div className="shrink-0 border-t border-gray-200 bg-white pt-4 lg:hidden">
              <button
                type="button"
                onClick={closeFilterDrawer}
                className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                Show {filteredProducts.length} Products
              </button>
            </div>
          </aside>

          {/* =====================================
              RIGHT PRODUCT SECTION
          ===================================== */}

          <section className="min-w-0">

            {/* Active Filter Chips */}
            {hasActiveFilters && (
              <div className="mb-5 rounded-xl border border-gray-200 bg-white p-4">
                <div className="flex flex-wrap items-center gap-2">

                  <span className="mr-1 text-sm font-semibold text-gray-800">
                    Active Filters:
                  </span>

                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => removeFilter("search")}
                      className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100"
                    >
                      Search: {searchQuery}
                      <X size={14} aria-hidden="true" />
                    </button>
                  )}

                  {selectedCategory !== "all" && (
                    <button
                      type="button"
                      onClick={() => removeFilter("category")}
                      className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100"
                    >
                      {categories.find(
                        (category) =>
                          category.value === selectedCategory
                      )?.label || selectedCategory}
                      <X size={14} aria-hidden="true" />
                    </button>
                  )}

                  {selectedPrice !== null && (
                    <button
                      type="button"
                      onClick={() => removeFilter("maxPrice")}
                      className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100"
                    >
                      Under ₹{maxPrice.toLocaleString("en-IN")}
                      <X size={14} aria-hidden="true" />
                    </button>
                  )}

                  {selectedBrands.map((brand) => (
                    <button
                      key={brand}
                      type="button"
                      onClick={() => removeFilter("brand", brand)}
                      className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100"
                    >
                      {brand}
                      <X size={14} aria-hidden="true" />
                    </button>
                  ))}

                  {selectedRating !== "all" && (
                    <button
                      type="button"
                      onClick={() => removeFilter("rating")}
                      className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100"
                    >
                      {selectedRating}★ & above
                      <X size={14} aria-hidden="true" />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="ml-auto text-xs font-semibold text-red-500 hover:text-red-700"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}

            {/* Product Count + Sorting */}
            <div className="mb-5 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-bold text-gray-900">
                  {filteredProducts.length}
                </span>{" "}
                {filteredProducts.length === 1
                  ? "product"
                  : "products"}
              </p>

              <div className="flex items-center gap-3">
                <label
                  htmlFor="sort-filter"
                  className="shrink-0 text-sm font-semibold text-gray-700"
                >
                  Sort By:
                </label>

                <select
                  id="sort-filter"
                  value={sortBy}
                  onChange={handleSortChange}
                  className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 sm:w-52"
                >
                  {sortOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mobile Filter Button */}
            <div className="mb-4 flex justify-end lg:hidden">
              <button
                ref={filterButtonRef}
                type="button"
                onClick={() => setIsFilterOpen(true)}
                aria-expanded={isFilterOpen}
                aria-controls="product-filter-panel"
                className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 shadow-sm"
              >
                <SlidersHorizontal size={18} aria-hidden="true" />
                Filters
              </button>
            </div>

            {/* Product Grid */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-2 items-stretch gap-3 sm:gap-4 md:grid-cols-3 xl:gap-5 2xl:grid-cols-4">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-gray-200 bg-white px-6 py-16 text-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  No products found
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Try adjusting your search or filters.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default Products;
