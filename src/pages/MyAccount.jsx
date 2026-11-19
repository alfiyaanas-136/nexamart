
import { Link, useNavigate } from "react-router-dom";

import {
  UserRound,
  Mail,
  Package,
  Heart,
  ShoppingBag,
  LogOut,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";

const MyAccount = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const navigate = useNavigate();

  // Handle demo logout
  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const quickLinks = [
    {
      title: "My Orders",
      description: "View your previous demo orders",
      icon: Package,
      path: "/orders",
      count: null,
    },
    {
      title: "My Wishlist",
      description: "Explore your saved products",
      icon: Heart,
      path: "/wishlist",
      count: wishlistCount,
    },
    {
      title: "My Cart",
      description: "Review your shopping cart",
      icon: ShoppingBag,
      path: "/cart",
      count: cartCount,
    },
  ];

  return (
    <main className="min-h-[75vh] bg-gray-50 px-3 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-6xl">

        {/* PAGE HEADING */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            My Account
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Manage your profile and shopping activity.
          </p>
        </div>

        {/* PROFILE BANNER */}
        <section className="mb-6 rounded-2xl bg-[#064385] p-5 text-white shadow-md sm:mb-8 sm:p-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">

            {/* AVATAR */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/15 sm:h-20 sm:w-20">
              <UserRound
                size={34}
                className="text-yellow-400 sm:size-10"
              />
            </div>

            {/* USER DETAILS */}
            <div className="min-w-0 flex-1">
              <p className="text-xs text-blue-100 sm:text-sm">
                Welcome to NexaMart
              </p>

              <h2 className="mt-1 break-words text-xl font-bold sm:text-3xl">
                {user?.name || "Demo User"}
              </h2>

              <p className="mt-2 break-all text-xs text-blue-100 sm:text-sm">
                {user?.email || "Email unavailable"}
              </p>
            </div>
          </div>
        </section>

        {/* ACCOUNT CONTENT */}
        <div className="grid min-w-0 gap-5 sm:gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-8">

          {/* PERSONAL INFORMATION */}
          <section className="min-w-0 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">

            <div className="mb-5 flex items-center gap-3 sm:mb-6">
              <UserRound
                size={22}
                className="shrink-0 text-[#064385]"
              />

              <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                Personal Information
              </h2>
            </div>

            <div className="space-y-5 sm:space-y-6">

              {/* FULL NAME */}
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                  Full Name
                </p>

                <div className="flex min-w-0 items-center gap-3 rounded-lg bg-gray-50 p-3 sm:p-4">
                  <UserRound
                    size={19}
                    className="shrink-0 text-gray-400"
                  />

                  <span className="min-w-0 break-words text-sm font-medium text-gray-800">
                    {user?.name || "Not provided"}
                  </span>
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                  Email Address
                </p>

                <div className="flex min-w-0 items-center gap-3 rounded-lg bg-gray-50 p-3 sm:p-4">
                  <Mail
                    size={19}
                    className="shrink-0 text-gray-400"
                  />

                  <span className="min-w-0 break-all text-sm font-medium text-gray-800">
                    {user?.email || "Not provided"}
                  </span>
                </div>
              </div>

              {/* DEMO ACCOUNT NOTICE */}
              <div className="flex items-start gap-3 rounded-lg border border-blue-100 bg-blue-50 p-3 sm:p-4">
                <ShieldCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-blue-600"
                />

                <p className="min-w-0 text-xs leading-6 text-blue-800">
                  This is a demo account. Profile
                  information is stored locally in
                  your browser. Real authentication
                  is not enabled.
                </p>
              </div>
            </div>
          </section>

          {/* SHOPPING DASHBOARD */}
          <section className="min-w-0 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">

            <h2 className="mb-5 text-lg font-bold text-gray-900 sm:mb-6 sm:text-xl">
              Shopping Dashboard
            </h2>

            <div className="space-y-3 sm:space-y-4">
              {quickLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.title}
                    to={item.path}
                    className="group flex min-w-0 items-center gap-3 rounded-xl border border-gray-200 p-3 transition hover:border-blue-300 hover:bg-blue-50 sm:gap-4 sm:p-4"
                  >

                    {/* ICON */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#064385] sm:h-12 sm:w-12">
                      <Icon size={21} />
                    </div>

                    {/* DETAILS */}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-gray-900 sm:text-base">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        {item.description}
                      </p>
                    </div>

                    {/* COUNT */}
                    {item.count !== null && (
                      <span className="shrink-0 rounded-full bg-yellow-100 px-2 py-1 text-xs font-bold text-yellow-800 sm:px-2.5">
                        {item.count}
                      </span>
                    )}

                    <ArrowRight
                      size={17}
                      className="hidden shrink-0 text-gray-400 transition group-hover:translate-x-1 group-hover:text-blue-600 sm:block"
                    />
                  </Link>
                );
              })}
            </div>
          </section>
        </div>

        {/* ACCOUNT ACTIONS */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:mt-8 sm:p-6 lg:p-8">

          <h2 className="mb-5 text-lg font-bold text-gray-900 sm:text-xl">
            Account Actions
          </h2>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">

            {/* LOGOUT */}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 sm:w-auto"
            >
              <LogOut size={19} />
              Logout
            </button>

            {/* CONTINUE SHOPPING */}
            <Link
              to="/products"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#064385] px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 sm:w-auto"
            >
              <ShoppingBag size={19} />
              Continue Shopping
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default MyAccount;
