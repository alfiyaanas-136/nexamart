
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// Shared layout components
import MainHeader from "./components/layout/MainHeader";
import CategoryNav from "./components/layout/CategoryNav";
import Footer from "./components/layout/Footer";

// Authentication
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Loading component
import PageLoader from "./components/common/PageLoader";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const MyAccount = lazy(() => import("./pages/MyAccount"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));
const Orders = lazy(() => import("./pages/Orders"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <MainHeader />

      <CategoryNav />

      <div className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Home />} />

            <Route path="/products" element={<Products />} />

            <Route
              path="/products/:id"
              element={<ProductDetails />}
            />

            <Route path="/cart" element={<Cart />} />

            <Route path="/wishlist" element={<Wishlist />} />

            <Route path="/login" element={<Login />} />

            <Route path="/signup" element={<Signup />} />

            {/* PROTECTED ROUTES */}
            <Route element={<ProtectedRoute />}>
              <Route path="/account" element={<MyAccount />} />

              <Route path="/orders" element={<Orders />} />

              <Route path="/checkout" element={<Checkout />} />
            </Route>

            {/* ORDER CONFIRMATION */}
            <Route
              path="/order-success"
              element={<OrderSuccess />}
            />

            {/* 404 PAGE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>

      <Footer />
    </div>
  );
}

export default App;
