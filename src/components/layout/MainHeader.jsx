
import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  Heart,
  Search,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";

import AccountDropdown from "./AccountDropdown";

import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";

// SEARCH COMPONENT
const HeaderSearch = ({ initialQuery }) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    navigate(
      `/products?search=${encodeURIComponent(query)}`
    );
  };

  return (
    <form
      onSubmit={handleSearch}
      role="search"
      className="
        order-3 flex w-full min-w-0 items-center
        overflow-hidden rounded-full bg-white
        shadow-sm transition
        focus-within:ring-2 focus-within:ring-yellow-400
        lg:order-none lg:flex-1
      "
    >
      <input
        type="search"
        value={searchQuery}
        onChange={(event) =>
          setSearchQuery(event.target.value)
        }
        placeholder="Search for products, brands and more..."
        aria-label="Search products"
        className="
          min-w-0 flex-1 bg-transparent
          px-4 py-3 text-sm text-gray-800
          outline-none placeholder:text-gray-400
          sm:px-5
        "
      />

      <button
        type="submit"
        aria-label="Submit search"
        className="
          flex h-11 w-12 shrink-0
          items-center justify-center
          text-blue-900 transition
          hover:bg-gray-100
          focus-visible:outline-2
          focus-visible:outline-blue-600
        "
      >
        <Search size={21} />
      </button>
    </form>
  );
};

// MAIN HEADER
const MainHeader = () => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const location = useLocation();

  const initialQuery =
    location.pathname === "/products"
      ? new URLSearchParams(location.search).get("search") || ""
      : "";

  return (
    <header className="w-full bg-[#064385] text-white shadow-md">
      <div
        className="
          mx-auto flex max-w-[1500px]
          flex-wrap items-center
          gap-x-3 gap-y-4
          px-3 py-3
          sm:px-4 sm:py-4
          md:px-8
          lg:flex-nowrap lg:gap-6
          xl:gap-8
        "
      >
        {/* LOGO */}
        <Link
          to="/"
          aria-label="NexaMart Home"
          className="
            flex shrink-0 items-center gap-2
            rounded-md
            focus-visible:outline-2
            focus-visible:outline-offset-4
            focus-visible:outline-yellow-400
          "
        >
          <ShoppingBag
            size={30}
            strokeWidth={2.5}
            className="text-yellow-400 sm:h-[35px] sm:w-[35px]"
          />

          <span
            className="
              text-xl font-extrabold
              tracking-tight
              sm:text-2xl
              md:text-3xl
            "
          >
            Nexa
            <span className="text-yellow-400">
              Mart
            </span>
          </span>
        </Link>

        {/* SEARCH */}
        <HeaderSearch
          key={`${location.pathname}${location.search}`}
          initialQuery={initialQuery}
        />

        {/* HEADER ACTIONS */}
        <nav
          aria-label="Account and shopping"
          className="
            ml-auto flex shrink-0
            items-center
            gap-1.5
            sm:gap-3
            md:gap-5
            lg:ml-0
          "
        >
          <AccountDropdown />

          {/* WISHLIST */}
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="
              relative flex min-h-11 min-w-10
              flex-col items-center
              justify-center gap-1
              rounded-lg transition
              hover:text-yellow-300
              focus-visible:outline-2
              focus-visible:outline-yellow-400
            "
          >
            <div className="relative">
              <Heart size={22} />

              {wishlistCount > 0 && (
                <span
                  className="
                    absolute -right-3 -top-2
                    flex h-[18px] min-w-[18px]
                    items-center justify-center
                    rounded-full bg-red-500
                    px-1 text-[10px]
                    font-bold text-white
                  "
                >
                  {wishlistCount}
                </span>
              )}
            </div>

            <span className="hidden text-xs font-medium sm:block">
              Wishlist
            </span>
          </Link>

          {/* CART */}
          <Link
            to="/cart"
            aria-label="Shopping Cart"
            className="
              relative flex min-h-11 min-w-10
              flex-col items-center
              justify-center gap-1
              rounded-lg transition
              hover:text-yellow-300
              focus-visible:outline-2
              focus-visible:outline-yellow-400
            "
          >
            <div className="relative">
              <ShoppingCart size={22} />

              {cartCount > 0 && (
                <span
                  className="
                    absolute -right-3 -top-2
                    flex h-[18px] min-w-[18px]
                    items-center justify-center
                    rounded-full bg-red-500
                    px-1 text-[10px]
                    font-bold text-white
                  "
                >
                  {cartCount}
                </span>
              )}
            </div>

            <span className="hidden text-xs font-medium sm:block">
              Cart
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default MainHeader;
