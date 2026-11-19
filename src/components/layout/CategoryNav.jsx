
import {
  ChevronDown,
  Flame,
  Menu,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import { categories } from "../../data/categories";

const CategoryNav = () => {
  const location = useLocation();

  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  const routeKey =
    `${location.pathname}${location.search}`;

  const [dropdown, setDropdown] = useState({
    isOpen: false,
    routeKey,
  });

  const isOpen =
    dropdown.isOpen &&
    dropdown.routeKey === routeKey;

  // TOGGLE DROPDOWN
  const toggleDropdown = () => {
    setDropdown({
      isOpen: !isOpen,
      routeKey,
    });
  };

  // CLOSE DROPDOWN
  const closeDropdown = () => {
    setDropdown({
      isOpen: false,
      routeKey,
    });
  };

  // OUTSIDE CLICK AND ESCAPE
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdown((prev) => ({
          ...prev,
          isOpen: false,
        }));
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setDropdown((prev) => ({
          ...prev,
          isOpen: false,
        }));

        triggerRef.current?.focus();
      }
    };

    document.addEventListener(
      "pointerdown",
      handlePointerDown
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [isOpen]);

  // MAIN HORIZONTAL CATEGORIES
  const mainCategories = categories.slice(0, 8);

  return (
    <nav
      aria-label="Product categories"
      className="
        relative z-40 w-full
        border-b border-gray-200
        bg-white shadow-sm
      "
    >
      <div
        className="
          mx-auto flex max-w-[1500px]
          items-center gap-3
          px-3 py-3
          sm:gap-4 sm:px-4
          md:px-8
          lg:gap-6
        "
      >
        {/* ALL CATEGORIES */}
        <div
          ref={dropdownRef}
          className="relative shrink-0"
        >
          <button
            ref={triggerRef}
            type="button"
            onClick={toggleDropdown}
            aria-expanded={isOpen}
            aria-controls={
              isOpen
                ? "nexamart-category-dropdown"
                : undefined
            }
            className="
              flex min-h-11 items-center
              gap-2 rounded-lg
              bg-blue-100 px-3
              text-sm font-semibold
              text-blue-900 transition
              hover:bg-blue-200
              focus-visible:outline-2
              focus-visible:outline-blue-600
              sm:px-4
            "
          >
            <Menu size={19} />

            <span>Categories</span>

            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* CATEGORY DROPDOWN */}
          {isOpen && (
            <div
              id="nexamart-category-dropdown"
              aria-label="All product categories"
              className="
                absolute left-0 top-full
                z-50 mt-2
                max-h-[70vh]
                w-[min(280px,calc(100vw-24px))]
                overflow-y-auto
                rounded-xl border
                border-gray-200
                bg-white py-2
                shadow-xl
              "
            >
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/products?category=${category.slug}`}
                  onClick={closeDropdown}
                  className="
                    block px-5 py-3
                    text-sm font-medium
                    text-gray-700 transition
                    hover:bg-blue-50
                    hover:text-blue-700
                    focus-visible:bg-blue-50
                    focus-visible:outline-none
                  "
                >
                  {category.name}
                </Link>
              ))}

              <div className="my-2 border-t border-gray-100" />

              {/* ALL PRODUCTS */}
              <Link
                to="/products"
                onClick={closeDropdown}
                className="
                  block px-5 py-3
                  text-sm font-semibold
                  text-[#064385]
                  hover:bg-blue-50
                "
              >
                All Products
              </Link>

              {/* DEALS & OFFERS */}
              <Link
                to="/products?sort=discount"
                onClick={closeDropdown}
                className="
                  flex items-center gap-2
                  px-5 py-3
                  text-sm font-semibold
                  text-pink-600
                  hover:bg-pink-50
                "
              >
                <Flame size={17} />
                Deals & Offers
              </Link>
            </div>
          )}
        </div>

        {/* HORIZONTAL CATEGORY LINKS */}
        <div
          className="
            flex min-w-0 flex-1
            items-center gap-4
            overflow-x-auto
            whitespace-nowrap
            scroll-smooth
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            sm:gap-5
            lg:gap-7
          "
        >
          {mainCategories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.slug}`}
              className="
                shrink-0 py-2
                text-sm font-medium
                text-gray-800 transition
                hover:text-blue-600
                focus-visible:outline-2
                focus-visible:outline-blue-600
              "
            >
              {category.name}
            </Link>
          ))}

          <Link
            to="/products"
            className="
              shrink-0 py-2
              text-sm font-medium
              text-gray-800 transition
              hover:text-blue-600
              focus-visible:outline-2
              focus-visible:outline-blue-600
            "
          >
            All Products
          </Link>
        </div>

        {/* DESKTOP DEALS BUTTON */}
        <Link
          to="/products?sort=discount"
          className="
            hidden min-h-11 shrink-0
            items-center gap-2
            rounded-lg bg-pink-500
            px-4 text-sm font-semibold
            text-white transition
            hover:bg-pink-600
            focus-visible:outline-2
            focus-visible:outline-pink-700
            sm:flex
          "
        >
          <Flame size={18} />
          Deals & Offers
        </Link>
      </div>
    </nav>
  );
};

export default CategoryNav;
