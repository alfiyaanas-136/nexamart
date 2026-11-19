
import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  ShoppingBag,
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  Heart,
  Truck,
  ShieldCheck,
} from "lucide-react";

import { useAuth } from "../hooks/useAuth";

import {
  validateFullName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  getPasswordStrength,
} from "../utils/authValidation";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // =====================================
  // REDIRECT AFTER SIGNUP
  // =====================================

  const requestedPath = location.state?.from;

  const redirectTo =
    requestedPath &&
    typeof requestedPath.pathname === "string" &&
    requestedPath.pathname.startsWith("/") &&
    !requestedPath.pathname.startsWith("//")
      ? `${requestedPath.pathname}${
          requestedPath.search || ""
        }${requestedPath.hash || ""}`
      : "/";

  // =====================================
  // STATE
  // =====================================

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [errors, setErrors] = useState({});

  // =====================================
  // ACCESSIBILITY REFS
  // =====================================

  const fullNameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);
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
  // HANDLE DEMO SIGNUP
  // =====================================

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};

    const fullNameError = validateFullName(
      formData.fullName
    );

    const emailError = validateEmail(
      formData.email
    );

    const passwordError = validatePassword(
      formData.password
    );

    const confirmPasswordError = validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    );

    if (fullNameError) {
      newErrors.fullName = fullNameError;
    }

    if (emailError) {
      newErrors.email = emailError;
    }

    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (confirmPasswordError) {
      newErrors.confirmPassword = confirmPasswordError;
    }

    setErrors(newErrors);

    // Focus the first invalid field.
    if (Object.keys(newErrors).length > 0) {
      if (newErrors.fullName) {
        fullNameInputRef.current?.focus();
      } else if (newErrors.email) {
        emailInputRef.current?.focus();
      } else if (newErrors.password) {
        passwordInputRef.current?.focus();
      } else if (newErrors.confirmPassword) {
        confirmPasswordInputRef.current?.focus();
      }

      return;
    }

    // =====================================
    // CREATE DEMO PROFILE
    // =====================================

    // Store profile information only.
    // Passwords are never stored or verified.
    const demoProfile = {
      name: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
    };

    try {
      localStorage.setItem(
        "nexamart_demo_profile",
        JSON.stringify(demoProfile)
      );

      login(demoProfile);

      navigate(redirectTo, { replace: true });
    } catch {
      setErrors({
        form:
          "Unable to create the demo profile. Please try again.",
      });

      requestAnimationFrame(() => {
        formErrorRef.current?.focus();
      });
    }
  };

  // =====================================
  // PASSWORD STRENGTH
  // =====================================

  const passwordStrength = getPasswordStrength(
    formData.password
  );

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
              Join NexaMart Today!
            </h1>

            <p className="mt-3 max-w-sm text-sm leading-6 text-blue-100 sm:text-base sm:leading-7 lg:mt-5">
              Create your account and discover a world
              of amazing products, exciting deals,
              and effortless shopping.
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
                Save your favorite products
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Truck
                size={22}
                aria-hidden="true"
                className="text-yellow-400"
              />

              <span className="text-sm text-blue-100">
                Explore multiple shopping categories
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
            RIGHT SIGNUP FORM
        ===================================== */}

        <div className="min-w-0 px-5 py-7 sm:px-10 sm:py-10 lg:flex lg:flex-col lg:justify-center lg:p-12">

          {/* FORM HEADING */}
          <div className="mb-6 sm:mb-8">
            <h2
              id="signup-form-heading"
              className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl"
            >
              Create Your Account
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Fill in your details to get started.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            aria-labelledby="signup-form-heading"
            className="space-y-5"
          >

            {/* =====================================
                FULL NAME
            ===================================== */}

            <div>
              <label
                htmlFor="signup-fullname"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Full Name
              </label>

              <div className="relative">
                <UserRound
                  size={19}
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  ref={fullNameInputRef}
                  id="signup-fullname"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={
                    errors.fullName
                      ? "signup-fullname-error"
                      : undefined
                  }
                  className={`w-full min-w-0 rounded-lg border bg-white py-3.5 pl-12 pr-4 text-sm text-gray-900 outline-none transition focus:ring-2 ${
                    errors.fullName
                      ? "border-red-400 focus:ring-red-100"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                />
              </div>

              {errors.fullName && (
                <p
                  id="signup-fullname-error"
                  role="alert"
                  className="mt-2 text-xs text-red-600"
                >
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* =====================================
                EMAIL ADDRESS
            ===================================== */}

            <div>
              <label
                htmlFor="signup-email"
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
                  id="signup-email"
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
                      ? "signup-email-error"
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
                  id="signup-email-error"
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
                htmlFor="signup-password"
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
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a demo password"
                  autoComplete="off"
                  required
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password
                      ? "signup-password-help signup-password-error"
                      : "signup-password-help"
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
                  aria-controls="signup-password"
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
                  id="signup-password-error"
                  role="alert"
                  className="mt-2 text-xs text-red-600"
                >
                  {errors.password}
                </p>
              )}

              {/* PASSWORD STRENGTH */}
              <div className="mt-3">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-xs text-gray-500">
                    Password Strength
                  </span>

                  <span
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                    className="text-xs font-semibold text-gray-600"
                  >
                    {passwordStrength.label || "Not entered"}
                  </span>
                </div>

                {/* Decorative strength bars */}
                <div
                  className="flex gap-1.5"
                  aria-hidden="true"
                >
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-1.5 flex-1 rounded-full ${
                        level <= passwordStrength.score
                          ? passwordStrength.color
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>

                <p
                  id="signup-password-help"
                  className="mt-2 text-xs leading-5 text-gray-500"
                >
                  Use at least 8 characters, including
                  uppercase, lowercase, a number,
                  and a special character.
                </p>
              </div>
            </div>

            {/* =====================================
                CONFIRM PASSWORD
            ===================================== */}

            <div>
              <label
                htmlFor="signup-confirm-password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Confirm Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={19}
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  ref={confirmPasswordInputRef}
                  id="signup-confirm-password"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your demo password"
                  autoComplete="off"
                  required
                  aria-invalid={Boolean(errors.confirmPassword)}
                  aria-describedby={
                    errors.confirmPassword
                      ? "signup-confirm-password-error"
                      : undefined
                  }
                  className={`w-full min-w-0 rounded-lg border bg-white py-3.5 pl-12 pr-12 text-sm text-gray-900 outline-none transition focus:ring-2 ${
                    errors.confirmPassword
                      ? "border-red-400 focus:ring-red-100"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                />

                {/* SHOW / HIDE CONFIRM PASSWORD */}
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  aria-pressed={showConfirmPassword}
                  aria-controls="signup-confirm-password"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-sm text-gray-500 transition hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} aria-hidden="true" />
                  ) : (
                    <Eye size={19} aria-hidden="true" />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p
                  id="signup-confirm-password-error"
                  role="alert"
                  className="mt-2 text-xs text-red-600"
                >
                  {errors.confirmPassword}
                </p>
              )}
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
                SIGNUP BUTTON
            ===================================== */}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#064385] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:text-base"
            >
              Create Account
              <ArrowRight
                size={19}
                aria-hidden="true"
              />
            </button>
          </form>

          {/* =====================================
              LOGIN LINK
          ===================================== */}

          <p className="mt-6 text-center text-sm text-gray-600 sm:mt-8">
            Already have an account?{" "}
            <Link
              to="/login"
              state={location.state}
              className="rounded-sm font-bold text-blue-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Login
            </Link>
          </p>

          {/* =====================================
              DISCLAIMER
          ===================================== */}

          <p className="mt-5 text-center text-xs leading-5 text-gray-400 sm:mt-6">
            Demo account only. Passwords are not
            stored or verified. Please do not use
            a real password.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Signup;
