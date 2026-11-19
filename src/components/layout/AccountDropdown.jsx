
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  UserRound,
  ChevronDown,
  Package,
  Heart,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

const AccountDropdown = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isOpen]);

  // Close dropdown
  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Handle logout
  const handleLogout = () => {
    closeDropdown();

    logout();

    navigate("/", { replace: true });
  };

  // Shared menu link styles
  const menuLinkClass =
    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-blue-50 hover:text-[#064385] focus-visible:outline-2 focus-visible:outline-blue-600";

  return (
    <div
      ref={dropdownRef}
      className="relative shrink-0"
    >

      {/* ACCOUNT TRIGGER */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={
          isAuthenticated
            ? "Account options"
            : "Login and signup options"
        }
        aria-expanded={isOpen}
        aria-controls={
          isOpen ? "nexamart-account-menu" : undefined
        }
        className="flex flex-col items-center gap-1 text-white transition hover:text-yellow-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400"
      >
        <span className="flex items-center gap-1">
          <UserRound size={23} />

          <ChevronDown
            size={13}
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </span>

        <span className="hidden max-w-24 truncate text-xs font-medium sm:block">
          {isAuthenticated
            ? user?.name || "Account"
            : "Login"}
        </span>
      </button>

      {/* ACCOUNT DROPDOWN */}
      {isOpen && (
        <div
          id="nexamart-account-menu"
          aria-label="Account options"
          className="absolute right-0 top-full z-50 mt-4 w-[min(280px,calc(100vw-24px))] rounded-xl border border-gray-200 bg-white p-3 text-gray-800 shadow-xl"
        >

          {isAuthenticated ? (
            <>
              {/* USER PROFILE DETAILS */}
              <div className="flex items-center gap-3 px-2 py-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[#064385]">
                  <UserRound size={24} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-gray-900">
                    {user?.name || "Demo User"}
                  </p>

                  <p className="truncate text-xs text-gray-500">
                    {user?.email || ""}
                  </p>
                </div>
              </div>

              <div className="my-2 border-t border-gray-100" />

              {/* MY ACCOUNT */}
              <Link
                to="/account"
                onClick={closeDropdown}
                className={menuLinkClass}
              >
                <UserRound size={18} />
                My Account
              </Link>

              {/* MY ORDERS */}
              <Link
                to="/orders"
                onClick={closeDropdown}
                className={menuLinkClass}
              >
                <Package size={18} />
                My Orders
              </Link>

              {/* MY WISHLIST */}
              <Link
                to="/wishlist"
                onClick={closeDropdown}
                className={menuLinkClass}
              >
                <Heart size={18} />
                My Wishlist
              </Link>

              <div className="my-2 border-t border-gray-100" />

              {/* LOGOUT */}
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-red-500"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              {/* GUEST HEADING */}
              <div className="px-2 py-3">
                <p className="font-bold text-gray-900">
                  Welcome to NexaMart
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Sign in or create a demo account.
                </p>
              </div>

              <div className="my-2 border-t border-gray-100" />

              {/* LOGIN */}
              <Link
                to="/login"
                onClick={closeDropdown}
                className={menuLinkClass}
              >
                <LogIn size={18} />
                Login
              </Link>

              {/* SIGNUP */}
              <Link
                to="/signup"
                onClick={closeDropdown}
                className={menuLinkClass}
              >
                <UserPlus size={18} />
                Create Account
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
