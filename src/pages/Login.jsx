
import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Heart,
  Truck,
} from "lucide-react";

import { validateEmail } from "../utils/authValidation";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // =====================================
  // REDIRECT AFTER LOGIN
  // =====================================

  const requestedPath = location.state?.from;

  const redirectTo =
    requestedPath &&
    typeof requestedPath.pathname === "string" &&
    requestedPath.pathname.startsWith("/") &&
    !requestedPath.pathname.startsWith("//")
      ? `${requestedPath.pathname}${requestedPath.search || ""}${requestedPath.hash || ""}`
      : "/";

  // =====================================
  // STATE
  // =====================================

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // =====================================
  // ACCESSIBILITY REFS
  // =====================================

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const formErrorRef = useRef(null);

  // =====================================
  // HANDLE INPUT CHANGES
  // =====================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      form: "",
    }));
  };

  // =====================================
  // HANDLE DEMO LOGIN
  // =====================================

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};
    const emailError = validateEmail(formData.email);

    if (emailError) {
      newErrors.email = emailError;
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    // Focus the first invalid field.
    if (Object.keys(newErrors).length > 0) {
      if (newErrors.email) {
        emailInputRef.current?.focus();
      } else if (newErrors.password) {
        passwordInputRef.current?.focus();
      }

      return;
    }

    const email = formData.email.trim().toLowerCase();

    let profile;

    try {
      const storedProfile = localStorage.getItem(
        "nexamart_demo_profile"
      );

      profile = storedProfile
        ? JSON.parse(storedProfile)
        : null;
    } catch {
      profile = null;
    }

    if (
      !profile ||
      typeof profile !== "object" ||
      typeof profile.name !== "string" ||
      typeof profile.email !== "string" ||
      profile.email !== email
    ) {
      setErrors({
        form:
          "No demo profile found for this email. Please sign up first.",
      });

      // Announce the form-level error.
      requestAnimationFrame(() => {
        formErrorRef.current?.focus();
      });

      return;
    }

    // Frontend-only demo login.
    // Passwords are not stored or verified.
    try {
      login({
        name: profile.name,
        email: profile.email,
      });

      navigate(redirectTo, { replace: true });
    } catch {
      setErrors({
        form:
          "Unable to start the demo session. Please try again.",
      });

      requestAnimationFrame(() => {
        formErrorRef.current?.focus();
      });
    }
  };

  // =====================================
  // JSX
  // =====================================

  return (
    <main className="min-h-[75vh] bg-gray-50 px-3 py-5 sm:px-6 sm:py-10 lg:py-14">
      <div className="mx-auto grid w-full max-w-[1000px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg lg:grid-cols-2">

        {/* =====================================
            LEFT BRAND PANEL
        ===================================== */}

        <div className="bg-[#064385] px-5 py-6 text-white sm:px-8 sm:py-8 lg:flex lg:flex-col lg:justify-between lg:p-12">
          <div>

            {/* LOGO */}
            <Link
              to="/"
              aria-label="NexaMart - Go to homepage"
              className="inline-flex items-center gap-2.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400"
            >
              <ShoppingBag
                size={30}
                aria-hidden="true"
                className="text-yellow-400 sm:size-9"
              />

              <span className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                Nexa
                <span className="text-yellow-400">
                  Mart
                </span>
              </span>
            </Link>

            {/* BRAND HEADING */}
            <h1 className="mt-6 text-2xl font-bold leading-tight sm:text-3xl lg:mt-12 lg:text-4xl">
              Welcome Back!
            </h1>

            <p className="mt-3 max-w-sm text-sm leading-6 text-blue-100 sm:text-base sm:leading-7 lg:mt-5">
              Sign in to discover amazing products,
              save your favorites, and enjoy a
              seamless shopping experience.
            </p>
          </div>

          {/* DESKTOP BENEFITS */}
          <div className="mt-12 hidden space-y-5 lg:block">
            <div className="flex items-center gap-3">
              <Heart
                size={22}
                aria-hidden="true"
                className="text-yellow-400"
              />

              <span className="text-sm text-blue-100">
                Save products to your wishlist
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Truck
                size={22}
                aria-hidden="true"
                className="text-yellow-400"
              />

              <span className="text-sm text-blue-100">
                Explore products across categories
              </span>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck
                size={22}
                aria-hidden="true"
                className="text-yellow-400"
              />

              <span className="text-sm text-blue-100">
                Manage your shopping account
              </span>
            </div>
          </div>
        </div>

        {/* =====================================
            RIGHT LOGIN FORM
        ===================================== */}

        <div className="min-w-0 px-5 py-7 sm:px-10 sm:py-10 lg:flex lg:flex-col lg:justify-center lg:p-12">

          {/* FORM HEADING */}
          <div className="mb-6 sm:mb-8">
            <h2
              id="login-form-heading"
              className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl"
            >
              Login to Your Account
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Enter your details to continue shopping.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            aria-labelledby="login-form-heading"
            className="space-y-5 sm:space-y-6"
          >

            {/* =====================================
                EMAIL ADDRESS
            ===================================== */}

            <div>
              <label
                htmlFor="login-email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  ref={emailInputRef}
                  id="login-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  autoComplete="email"
                  required
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email
                      ? "login-email-error"
                      : undefined
                  }
                  className={`w-full min-w-0 rounded-lg border bg-white py-3.5 pl-12 pr-4 text-sm text-gray-900 outline-none transition focus:ring-2 ${
                    errors.email
                      ? "border-red-400 focus:ring-red-100"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                />
              </div>

              {errors.email && (
                <p
                  id="login-email-error"
                  role="alert"
                  className="mt-2 text-xs text-red-600"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* =====================================
                PASSWORD
            ===================================== */}

            <div>
              <label
                htmlFor="login-password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={19}
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  ref={passwordInputRef}
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter a demo password"
                  autoComplete="off"
                  required
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password
                      ? "login-password-error"
                      : undefined
                  }
                  className={`w-full min-w-0 rounded-lg border bg-white py-3.5 pl-12 pr-12 text-sm text-gray-900 outline-none transition focus:ring-2 ${
                    errors.password
                      ? "border-red-400 focus:ring-red-100"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                />

                {/* SHOW / HIDE PASSWORD */}
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  aria-pressed={showPassword}
                  aria-controls="login-password"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-sm text-gray-500 transition hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
                >
                  {showPassword ? (
                    <EyeOff size={19} aria-hidden="true" />
                  ) : (
                    <Eye size={19} aria-hidden="true" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p
                  id="login-password-error"
                  role="alert"
                  className="mt-2 text-xs text-red-600"
                >
                  {errors.password}
                </p>
              )}
            </div>

            {/* =====================================
                DEMO NOTICE
            ===================================== */}

            <div className="flex items-center gap-2 text-xs text-gray-500 sm:text-sm">
              <ShieldCheck
                size={17}
                aria-hidden="true"
                className="shrink-0 text-blue-600"
              />

              <span>
                Frontend-only demo account
              </span>
            </div>

            {/* =====================================
                FORM ERROR
            ===================================== */}

            {errors.form && (
              <p
                ref={formErrorRef}
                tabIndex={-1}
                role="alert"
                className="rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                {errors.form}
              </p>
            )}

            {/* =====================================
                LOGIN BUTTON
            ===================================== */}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#064385] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:text-base"
            >
              Login
              <ArrowRight size={19} aria-hidden="true" />
            </button>
          </form>

          {/* =====================================
              SIGNUP LINK
          ===================================== */}

          <p className="mt-6 text-center text-sm text-gray-600 sm:mt-8">
            New to NexaMart?{" "}
            <Link
              to="/signup"
              state={location.state}
              className="rounded-sm font-bold text-blue-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Create an Account
            </Link>
          </p>

          {/* =====================================
              DISCLAIMER
          ===================================== */}

          <p className="mt-5 text-center text-xs leading-5 text-gray-400 sm:mt-6">
            Demo mode: passwords are not stored or
            verified. Please do not enter a real password.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
