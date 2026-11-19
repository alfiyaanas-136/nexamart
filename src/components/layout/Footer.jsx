import { Link } from "react-router-dom";
import {
  ShoppingBag,
  MapPin,
  Mail,
  Phone,
  Globe,
  Camera,
  PlayCircle,
  Heart,
  ShoppingCart,
  Package,
  UserRound,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "All Products", path: "/products" },
    { name: "Electronics", path: "/products?category=Electronics" },
    { name: "Fashion", path: "/products?category=Fashion" },
    { name: "Home & Living", path: "/products?category=Home%20%26%20Living" },
  ];

  const customerLinks = [
    { name: "My Orders", path: "/orders", icon: Package },
    { name: "Shopping Cart", path: "/cart", icon: ShoppingCart },
    { name: "Wishlist", path: "/wishlist", icon: Heart },
    { name: "My Account", path: "/account", icon: UserRound },
  ];

  const footerLinkClass =
    "inline-flex items-center gap-2 text-sm text-blue-100 transition-colors duration-200 hover:text-yellow-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400";

  return (
    <footer className="mt-auto w-full bg-[#064385] text-white">

      {/* MAIN FOOTER */}
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 sm:pt-14 lg:px-8 lg:pb-14 lg:pt-16">

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          {/* COLUMN 1 - BRAND */}
          <div className="min-w-0">
            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >
              <ShoppingBag
                size={32}
                className="shrink-0 text-yellow-400"
              />

              <span className="text-2xl font-extrabold tracking-tight">
                Nexa
                <span className="text-yellow-400">
                  Mart
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-blue-100">
              Discover your favorite products across
              electronics, fashion, home essentials,
              beauty, and more. Explore a modern
              shopping experience with NexaMart.
            </p>

            
            {/* SOCIAL ICONS */}
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-semibold text-white">
                Follow Our Journey
              </h3>

              <div className="flex flex-wrap items-center gap-3">
                {[
                  { name: "Website", Icon: Globe },
                  { name: "Instagram", Icon: Camera },
                  { name: "YouTube", Icon: PlayCircle },
                ].map(({ name, Icon }) => (
                  <span
                    key={name}
                    title={`${name} — coming soon`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-blue-100"
                  >
                    <Icon size={19} aria-hidden="true" />
                    <span className="sr-only">
                      {name} — coming soon
                    </span>
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* COLUMN 2 - QUICK LINKS */}
          <div className="min-w-0">
            <h3 className="text-base font-bold text-white">
              Quick Links
            </h3>

            <div className="mt-3 h-1 w-10 rounded-full bg-yellow-400" />

            <ul className="mt-6 space-y-3.5">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={footerLinkClass}
                  >
                    <ArrowRight
                      size={15}
                      className="shrink-0 text-yellow-400"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3 - CUSTOMER LINKS */}
          <div className="min-w-0">
            <h3 className="text-base font-bold text-white">
              Customer Support
            </h3>

            <div className="mt-3 h-1 w-10 rounded-full bg-yellow-400" />

            <ul className="mt-6 space-y-3.5">
              {customerLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={footerLinkClass}
                    >
                      <Icon
                        size={16}
                        className="shrink-0 text-yellow-400"
                      />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <p className="mt-5 max-w-xs text-xs leading-6 text-blue-200">
              Orders and accounts are part of the
              NexaMart frontend demonstration.
            </p>
          </div>

          {/* COLUMN 4 - CONTACT */}
          <div className="min-w-0">
            <h3 className="text-base font-bold text-white">
              Contact & Information
            </h3>

            <div className="mt-3 h-1 w-10 rounded-full bg-yellow-400" />

            <div className="mt-6 space-y-5">

              {/* LOCATION */}
              <div className="flex items-start gap-3">
                <MapPin
                  size={19}
                  className="mt-0.5 shrink-0 text-yellow-400"
                />

                <div>
                  <p className="text-sm font-semibold text-white">
                    Location
                  </p>
                  <p className="mt-1 text-sm text-blue-100">
                    India
                  </p>
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex items-start gap-3">
                <Mail
                  size={19}
                  className="mt-0.5 shrink-0 text-yellow-400"
                />

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">
                    Email Support
                  </p>
                  <p className="mt-1 text-sm leading-6 text-blue-100">
                    Demo project — no live support email
                  </p>
                </div>
              </div>

              {/* PHONE */}
              <div className="flex items-start gap-3">
                <Phone
                  size={19}
                  className="mt-0.5 shrink-0 text-yellow-400"
                />

                <div>
                  <p className="text-sm font-semibold text-white">
                    Customer Care
                  </p>
                  <p className="mt-1 text-sm text-blue-100">
                    Not available in demo mode
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SHOPPING BENEFITS */}
      <div className="border-y border-white/15 bg-[#05396f]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-7 sm:grid-cols-3 sm:gap-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-3">
            <ShieldCheck
              size={27}
              className="shrink-0 text-yellow-400"
            />
            <div>
              <h4 className="text-sm font-semibold text-white">
                Demo Shopping
              </h4>
              <p className="mt-1 text-xs text-blue-100">
                Explore a simulated checkout
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Truck
              size={27}
              className="shrink-0 text-yellow-400"
            />
            <div>
              <h4 className="text-sm font-semibold text-white">
                Product Discovery
              </h4>
              <p className="mt-1 text-xs text-blue-100">
                Browse multiple categories
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RotateCcw
              size={27}
              className="shrink-0 text-yellow-400"
            />
            <div>
              <h4 className="text-sm font-semibold text-white">
                Demo Orders
              </h4>
              <p className="mt-1 text-xs text-blue-100">
                Practice the shopping journey
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM FOOTER */}
      <div className="bg-[#032f5d]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">

          {/* COPYRIGHT */}
          <div className="text-center lg:text-left">
            <p className="text-sm text-blue-100">
              © {currentYear} NexaMart. All rights reserved.
            </p>

            <p className="mt-1 text-xs text-blue-200">
              Built with React, JavaScript & Tailwind CSS.
            </p>
          </div>

          {/* PAYMENT INFORMATION */}
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-3">
            <div className="flex items-center gap-2 text-blue-100">
              <CreditCard
                size={19}
                className="text-yellow-400"
              />
              <span className="text-xs font-medium">
                Payment UI Demo
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {["UPI", "Cards", "Net Banking", "COD"].map(
                (method) => (
                  <span
                    key={method}
                    className="rounded border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white"
                  >
                    {method}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* DEMO DISCLAIMER */}
        <div className="mx-auto max-w-7xl border-t border-white/10 px-4 py-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs leading-5 text-blue-200">
            NexaMart is a frontend portfolio project.
            Products, accounts, orders, payments, and
            customer services are for demonstration
            purposes only. No real transactions are processed.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
