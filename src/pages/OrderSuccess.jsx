
import { Link, useLocation } from "react-router-dom";
import {
  CheckCircle2,
  ShoppingBag,
  Package,
  ArrowRight,
} from "lucide-react";

const OrderSuccess = () => {
  const location = useLocation();

  // GET SAVED DEMO ORDER
  const getSavedOrder = () => {
    try {
      const stored = sessionStorage.getItem(
        "nexamart-demo-order"
      );

      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };

  // GET ORDER FROM ROUTER STATE OR SESSION STORAGE
  const order = location.state?.order || getSavedOrder();

  // FORMAT PRICE
  const formatPrice = (price) =>
    `₹${Number(price || 0).toLocaleString("en-IN")}`;

  // NO RECENT ORDER
  if (!order) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-gray-50 px-4 py-10 sm:px-6">
        <section className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white px-5 py-10 text-center shadow-sm sm:px-8 sm:py-14">
          <Package
            size={64}
            className="mx-auto text-gray-300"
          />

          <h1 className="mt-5 text-xl font-bold text-gray-900 sm:text-2xl">
            No Recent Demo Order Found
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500 sm:text-base">
            Your recent demo order details are not
            available. Explore our products to continue
            shopping.
          </p>

          <Link
            to="/products"
            className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-yellow-400 px-6 py-3 text-sm font-bold text-gray-900 transition hover:bg-yellow-300 sm:w-auto"
          >
            <ShoppingBag size={18} />
            Explore Products
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-8 sm:px-6 sm:py-12 lg:py-16">

      {/* ORDER SUCCESS CARD */}
      <section className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white px-5 py-8 text-center shadow-sm sm:px-8 sm:py-10 lg:px-10">

        {/* SUCCESS ICON */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 sm:h-24 sm:w-24">
          <CheckCircle2
            size={58}
            strokeWidth={1.8}
            className="text-green-600 sm:h-16 sm:w-16"
          />
        </div>

        {/* SUCCESS MESSAGE */}
        <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl">
          Demo Order Placed!
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-600 sm:text-base">
          Your simulated order has been saved in this
          browser. No actual purchase or payment has
          taken place.
        </p>

        {/* ORDER DETAILS */}
        <div className="mt-7 rounded-xl border border-gray-100 bg-gray-50 p-4 text-left sm:p-5">

          <h2 className="mb-4 text-base font-bold text-gray-900">
            Order Summary
          </h2>

          <div className="space-y-4 text-sm">

            {/* ORDER ID */}
            <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
              <span className="shrink-0 text-gray-500">
                Order ID
              </span>

              <span className="break-all font-semibold text-gray-900 sm:text-right">
                {order.id}
              </span>
            </div>

            {/* TOTAL AMOUNT */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-gray-500">
                Total Amount
              </span>

              <span className="font-bold text-gray-900">
                {formatPrice(order.total)}
              </span>
            </div>

            {/* PAYMENT METHOD */}
            <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
              <span className="shrink-0 text-gray-500">
                Payment Method
              </span>

              <span className="font-medium text-gray-900 sm:text-right">
                {order.paymentMethod === "cod"
                  ? "Cash on Delivery (Demo)"
                  : "Online Payment (Simulation)"}
              </span>
            </div>

          </div>
        </div>

        {/* DEMO NOTICE */}
        <p className="mt-5 text-xs leading-5 text-gray-500">
          This is a demonstration order for the NexaMart
          portfolio project.
        </p>

        {/* ACTION BUTTONS */}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">

          {/* VIEW ORDERS */}
          <Link
            to="/orders"
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-blue-600 px-4 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 sm:flex-1"
          >
            <Package size={18} />
            View My Orders
          </Link>

          {/* CONTINUE SHOPPING */}
          <Link
            to="/products"
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-yellow-400 px-4 py-3 text-sm font-bold text-gray-900 transition hover:bg-yellow-300 sm:flex-1"
          >
            Continue Shopping
            <ArrowRight size={18} />
          </Link>

        </div>

      </section>
    </main>
  );
};

export default OrderSuccess;
