
import { Link } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  CalendarDays,
  CreditCard,
  ArrowRight,
} from "lucide-react";

import { getDemoOrders } from "../utils/orderStorage";

const Orders = () => {
  // GET SAVED DEMO ORDERS
  const orders = getDemoOrders();

  // FORMAT PRICE
  const formatPrice = (price) =>
    `₹${Number(price || 0).toLocaleString("en-IN")}`;

  // FORMAT ORDER DATE
  const formatDate = (date) => {
    const parsed = new Date(date);

    return Number.isNaN(parsed.getTime())
      ? "Date unavailable"
      : parsed.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
  };

  return (
    <main className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-10">
      <div className="mx-auto w-[94%] max-w-[1100px]">

        {/* PAGE HEADER */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
              My Orders
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {orders.length} demo{" "}
              {orders.length === 1 ? "order" : "orders"}
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
          >
            Continue Shopping
            <ArrowRight size={17} />
          </Link>
        </div>

        {orders.length === 0 ? (

          /* EMPTY ORDERS STATE */
          <section className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white px-5 py-14 text-center shadow-sm sm:px-8 sm:py-20">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <Package
                size={46}
                className="text-gray-400"
              />
            </div>

            <h2 className="mt-6 text-xl font-bold text-gray-900 sm:text-2xl">
              No Orders Yet!
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500 sm:text-base">
              Your simulated orders will appear here
              after you complete a demo checkout.
            </p>

            <Link
              to="/products"
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-yellow-400 px-6 py-3 text-sm font-bold text-gray-900 transition hover:bg-yellow-300 sm:w-auto"
            >
              <ShoppingBag size={18} />
              Explore Products
            </Link>

          </section>
        ) : (

          /* ORDER HISTORY */
          <section
            aria-label="Demo order history"
            className="space-y-4 sm:space-y-5"
          >
            {orders.map((order) => (
              <article
                key={order.id}
                className="min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >

                {/* ORDER HEADER */}
                <div className="flex flex-col gap-3 border-b border-gray-200 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">

                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">
                      Order ID
                    </p>

                    <h2 className="mt-1 break-all text-sm font-bold text-gray-900 sm:text-base">
                      {order.id}
                    </h2>
                  </div>

                  <span className="w-fit max-w-full rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
                    {order.status || "Demo order placed"}
                  </span>

                </div>

                {/* ORDER INFORMATION */}
                <div className="grid grid-cols-1 gap-3 border-b border-gray-100 p-4 text-sm text-gray-600 sm:grid-cols-2 sm:gap-4 sm:p-5">

                  {/* ORDER DATE */}
                  <div className="flex min-w-0 items-start gap-2">
                    <CalendarDays
                      size={18}
                      className="mt-0.5 shrink-0 text-blue-600"
                    />

                    <span>
                      {formatDate(order.date)}
                    </span>
                  </div>

                  {/* PAYMENT METHOD */}
                  <div className="flex min-w-0 items-start gap-2">
                    <CreditCard
                      size={18}
                      className="mt-0.5 shrink-0 text-blue-600"
                    />

                    <span className="break-words">
                      {order.paymentMethod === "cod"
                        ? "Cash on Delivery (Demo)"
                        : "Online Payment (Simulation)"}
                    </span>
                  </div>

                </div>

                {/* ORDER PRODUCTS */}
                <div className="divide-y divide-gray-100 px-4 sm:px-5">

                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex min-w-0 items-start gap-3 py-4 sm:items-center sm:gap-4"
                    >

                      {/* PRODUCT IMAGE */}
                      <Link
                        to={`/products/${item.id}`}
                        className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-50 sm:h-24 sm:w-24"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          className="h-full w-full object-contain p-2"
                        />
                      </Link>

                      {/* PRODUCT INFORMATION */}
                      <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">

                        <div className="min-w-0 flex-1">

                          <Link
                            to={`/products/${item.id}`}
                            className="line-clamp-2 text-sm font-semibold text-gray-900 transition hover:text-blue-600"
                          >
                            {item.name}
                          </Link>

                          <p className="mt-1 text-xs text-gray-500">
                            Quantity: {item.quantity}
                          </p>

                        </div>

                        {/* ITEM TOTAL */}
                        <span className="shrink-0 text-sm font-bold text-gray-900 sm:text-base">
                          {formatPrice(
                            item.price * item.quantity
                          )}
                        </span>

                      </div>
                    </div>
                  ))}

                </div>

                {/* ORDER FOOTER */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 bg-gray-50 p-4 sm:p-5">

                  <span className="text-sm font-semibold text-gray-700">
                    Order Total
                  </span>

                  <span className="text-lg font-bold text-gray-900 sm:text-xl">
                    {formatPrice(order.total)}
                  </span>

                </div>

              </article>
            ))}
          </section>
        )}

        {/* DEMO NOTICE */}
        <p className="mx-auto mt-7 max-w-lg text-center text-xs leading-5 text-gray-500">
          <ShoppingBag
            size={15}
            className="mr-1 inline-block align-middle"
          />
          Demo order history is stored in this browser.
          No real purchases or payments have been made.
        </p>

      </div>
    </main>
  );
};

export default Orders;
