
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  MapPin,
  CreditCard,
  Truck,
  ShieldCheck,
} from "lucide-react";

import { useCart } from "../hooks/useCart";
import { saveDemoOrder } from "../utils/orderStorage";

const deliveryFields = [
  {
    name: "fullName",
    label: "Full Name",
    autoComplete: "name",
  },
  {
    name: "phone",
    label: "Mobile Number",
    autoComplete: "tel",
  },
  {
    name: "pincode",
    label: "PIN Code",
    autoComplete: "postal-code",
  },
  {
    name: "city",
    label: "City",
    autoComplete: "address-level2",
  },
  {
    name: "state",
    label: "State",
    autoComplete: "address-level1",
  },
];

const Checkout = () => {
  const { cart, cartCount, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  // DELIVERY FORM STATE
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    address: "",
    city: "",
    state: "",
  });

  // PAYMENT METHOD STATE
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // VALIDATION STATE
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");

  // ACCESSIBILITY REFS
  const fieldRefs = useRef({});
  const formErrorRef = useRef(null);

  // FORMAT PRICES
  const formatPrice = (price) =>
    `₹${Number(price || 0).toLocaleString("en-IN")}`;

  // CALCULATE ORIGINAL TOTAL
  const originalTotal = cart.reduce(
    (total, item) =>
      total +
      Math.max(
        item.originalPrice || item.price,
        item.price
      ) *
        item.quantity,
    0
  );

  // CALCULATE DISCOUNT
  const discount = Math.max(0, originalTotal - cartTotal);

  // HANDLE DELIVERY INPUT CHANGES
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFieldErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setError("");
  };

  // VALIDATE DELIVERY FORM
  const validateForm = () => {
    const newErrors = {};

    const requiredFields = [
      "fullName",
      "phone",
      "pincode",
      "city",
      "state",
      "address",
    ];

    requiredFields.forEach((name) => {
      if (!form[name].trim()) {
        newErrors[name] = "This field is required.";
      }
    });

    // VALIDATE INDIAN MOBILE NUMBER
    if (
      form.phone.trim() &&
      !/^[6-9]\d{9}$/.test(form.phone.trim())
    ) {
      newErrors.phone =
        "Enter a valid 10-digit Indian mobile number.";
    }

    // VALIDATE INDIAN PIN CODE
    if (
      form.pincode.trim() &&
      !/^[1-9]\d{5}$/.test(form.pincode.trim())
    ) {
      newErrors.pincode =
        "Enter a valid 6-digit PIN code.";
    }

    return newErrors;
  };

  // HANDLE DEMO ORDER SUBMISSION
  const handlePlaceOrder = (event) => {
    event.preventDefault();

    setError("");

    // CHECK CART
    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    // VALIDATE DELIVERY DETAILS
    const newErrors = validateForm();

    setFieldErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstInvalidField = [
        "fullName",
        "phone",
        "pincode",
        "city",
        "state",
        "address",
      ].find((name) => newErrors[name]);

      if (firstInvalidField) {
        fieldRefs.current[firstInvalidField]?.focus();
      }

      return;
    }

    // CREATE DEMO ORDER
    const order = {
      id: `NX-${Date.now()}`,
      items: cart.map((item) => ({ ...item })),
      total: cartTotal,
      paymentMethod,
      date: new Date().toISOString(),
      status: "Demo order placed",
    };

    // SAVE ORDER WITHOUT DELIVERY CONTACT INFORMATION
    try {
      const savedOrder = saveDemoOrder(order);

      sessionStorage.setItem(
        "nexamart-demo-order",
        JSON.stringify(savedOrder)
      );

      clearCart();

      navigate("/order-success", {
        replace: true,
        state: { order: savedOrder },
      });
    } catch (storageError) {
      console.error(
        "Could not save demo order:",
        storageError
      );

      setError(
        "Unable to save your demo order. Please check browser storage and try again."
      );

      requestAnimationFrame(() => {
        formErrorRef.current?.focus();
      });
    }
  };

  // EMPTY CART STATE
  if (cart.length === 0) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-5 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Your cart is empty
        </h1>

        <p className="mt-3 text-gray-500">
          Add products to your cart before checkout.
        </p>

        <Link
          to="/products"
          className="mt-6 rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-gray-900 transition hover:bg-yellow-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Explore Products
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-5 sm:py-8">
      <div className="mx-auto w-[94%] max-w-[1300px]">

        {/* PAGE HEADER */}
        <div className="mb-6">
          <Link
            to="/cart"
            className="flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            Back to Cart
          </Link>

          <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
            Checkout
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Complete your delivery details to place a demo order.
          </p>
        </div>

        {/* CHECKOUT FORM */}
        <form
          onSubmit={handlePlaceOrder}
          noValidate
          className="grid grid-cols-1 items-start gap-4 sm:gap-6 lg:grid-cols-3"
        >
          {/* LEFT SIDE */}
          <div className="min-w-0 space-y-4 sm:space-y-6 lg:col-span-2">

            {/* DELIVERY ADDRESS */}
            <section
              aria-labelledby="delivery-heading"
              className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6"
            >
              <h2
                id="delivery-heading"
                className="flex items-center gap-2 text-lg font-bold text-gray-900"
              >
                <MapPin
                  size={20}
                  aria-hidden="true"
                  className="shrink-0 text-blue-600"
                />
                Delivery Address
              </h2>

              {/* DELIVERY INPUT GRID */}
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {deliveryFields.map(
                  ({ name, label, autoComplete }) => (
                    <div key={name} className="min-w-0">
                      <label
                        htmlFor={`checkout-${name}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        {label}
                      </label>

                      <input
                        ref={(element) => {
                          fieldRefs.current[name] = element;
                        }}
                        id={`checkout-${name}`}
                        type="text"
                        name={name}
                        value={form[name]}
                        onChange={handleChange}
                        required
                        autoComplete={autoComplete}
                        maxLength={
                          name === "phone"
                            ? 10
                            : name === "pincode"
                              ? 6
                              : undefined
                        }
                        inputMode={
                          name === "phone" ||
                          name === "pincode"
                            ? "numeric"
                            : "text"
                        }
                        aria-invalid={Boolean(fieldErrors[name])}
                        aria-describedby={
                          fieldErrors[name]
                            ? `checkout-${name}-error`
                            : undefined
                        }
                        className={`mt-2 min-h-12 w-full min-w-0 rounded-lg border bg-white px-3 py-3 text-base text-gray-900 outline-none transition focus:ring-2 ${
                          fieldErrors[name]
                            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                            : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                        }`}
                      />

                      {fieldErrors[name] && (
                        <p
                          id={`checkout-${name}-error`}
                          role="alert"
                          className="mt-2 text-xs text-red-600"
                        >
                          {fieldErrors[name]}
                        </p>
                      )}
                    </div>
                  )
                )}

                {/* FULL ADDRESS */}
                <div className="min-w-0 sm:col-span-2">
                  <label
                    htmlFor="checkout-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Address
                  </label>

                  <textarea
                    ref={(element) => {
                      fieldRefs.current.address = element;
                    }}
                    id="checkout-address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    autoComplete="street-address"
                    aria-invalid={Boolean(fieldErrors.address)}
                    aria-describedby={
                      fieldErrors.address
                        ? "checkout-address-error"
                        : undefined
                    }
                    className={`mt-2 w-full min-w-0 resize-y rounded-lg border bg-white px-3 py-3 text-base text-gray-900 outline-none transition focus:ring-2 ${
                      fieldErrors.address
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                  />

                  {fieldErrors.address && (
                    <p
                      id="checkout-address-error"
                      role="alert"
                      className="mt-2 text-xs text-red-600"
                    >
                      {fieldErrors.address}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* PAYMENT METHODS */}
            <section
              aria-labelledby="payment-heading"
              className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6"
            >
              <h2
                id="payment-heading"
                className="flex items-center gap-2 text-lg font-bold text-gray-900"
              >
                <CreditCard
                  size={20}
                  aria-hidden="true"
                  className="shrink-0 text-blue-600"
                />
                Payment Method
              </h2>

              <fieldset
                aria-describedby="payment-disclaimer"
                className="mt-5 min-w-0"
              >
                <legend className="sr-only">
                  Choose a payment method
                </legend>

                <div className="space-y-3">

                  {/* CASH ON DELIVERY */}
                  <label
                    className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-lg border p-3 transition focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 sm:p-4 ${
                      paymentMethod === "cod"
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(event) =>
                        setPaymentMethod(event.target.value)
                      }
                      className="h-4 w-4 shrink-0 accent-blue-600"
                    />

                    <Truck
                      size={19}
                      aria-hidden="true"
                      className="shrink-0 text-gray-700"
                    />

                    <span className="min-w-0 text-sm font-medium text-gray-800">
                      Cash on Delivery (Demo)
                    </span>
                  </label>

                  {/* ONLINE PAYMENT SIMULATION */}
                  <label
                    className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-lg border p-3 transition focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 sm:p-4 ${
                      paymentMethod === "online-demo"
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="online-demo"
                      checked={paymentMethod === "online-demo"}
                      onChange={(event) =>
                        setPaymentMethod(event.target.value)
                      }
                      className="h-4 w-4 shrink-0 accent-blue-600"
                    />

                    <CreditCard
                      size={19}
                      aria-hidden="true"
                      className="shrink-0 text-gray-700"
                    />

                    <span className="min-w-0 text-sm font-medium text-gray-800">
                      Online Payment (Simulation Only)
                    </span>
                  </label>
                </div>
              </fieldset>

              {/* PAYMENT DISCLAIMER */}
              <p
                id="payment-disclaimer"
                className="mt-4 text-xs leading-relaxed text-gray-500"
              >
                No real payment will be collected. Do not enter
                card details or other payment credentials.
              </p>
            </section>
          </div>

          {/* RIGHT SIDE: ORDER SUMMARY */}
          <aside
            aria-labelledby="order-summary-heading"
            className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:sticky lg:top-6"
          >
            <h2
              id="order-summary-heading"
              className="text-lg font-bold text-gray-900"
            >
              Order Summary
            </h2>

            {/* ORDER ITEMS */}
            <div className="mt-4 max-h-64 space-y-3 overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex min-w-0 items-center gap-2 border-b border-gray-100 pb-3 sm:gap-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-12 w-12 shrink-0 rounded-lg bg-gray-50 object-contain p-1 sm:h-14 sm:w-14"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-medium text-gray-900">
                      {item.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <span className="shrink-0 text-right text-xs font-semibold text-gray-900 sm:text-sm">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* PRICE BREAKDOWN */}
            <div className="mt-5 space-y-3 border-b border-gray-200 pb-5 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-gray-600">
                  Price ({cartCount} items)
                </span>

                <span className="shrink-0 font-medium text-gray-900">
                  {formatPrice(originalTotal)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-gray-600">
                  Discount
                </span>

                <span className="shrink-0 font-medium text-green-600">
                  - {formatPrice(discount)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-gray-600">
                  Delivery
                </span>

                <span className="font-medium text-green-600">
                  FREE
                </span>
              </div>
            </div>

            {/* TOTAL AMOUNT */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-2 font-bold">
              <span className="text-gray-900">
                Total Amount
              </span>

              <span className="text-xl text-gray-900">
                {formatPrice(cartTotal)}
              </span>
            </div>

            {/* FORM ERROR MESSAGE */}
            {error && (
              <p
                ref={formErrorRef}
                tabIndex={-1}
                role="alert"
                className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                {error}
              </p>
            )}

            {/* PLACE ORDER BUTTON */}
            <button
              type="submit"
              className="mt-6 flex min-h-12 w-full items-center justify-center rounded-lg bg-yellow-400 px-4 py-3 text-sm font-bold text-gray-900 transition hover:bg-yellow-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:text-base"
            >
              Place Demo Order
            </button>

            {/* CHECKOUT SECURITY NOTICE */}
            <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs leading-relaxed text-gray-500">
              <ShieldCheck
                size={17}
                aria-hidden="true"
                className="shrink-0"
              />
              Demo checkout — no real transactions
            </p>
          </aside>
        </form>
      </div>
    </main>
  );
};

export default Checkout;
