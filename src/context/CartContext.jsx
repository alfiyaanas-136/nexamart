
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { CartContext } from "./cartContext";

const CART_STORAGE_KEY = "nexamart-cart";

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);

      if (!savedCart) return [];

      const parsedCart = JSON.parse(savedCart);

      if (!Array.isArray(parsedCart)) return [];

      return parsedCart.filter(
        (item) =>
          item &&
          item.id != null &&
          Number.isFinite(item.price) &&
          item.price >= 0 &&
          Number.isInteger(item.quantity) &&
          item.quantity > 0
      );
    } catch (error) {
      console.error("Error loading cart:", error);
      return [];
    }
  });

  // Persist cart changes
  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cart)
      );
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  }, [cart]);

  // Add product to cart
  const addToCart = useCallback((product) => {
    if (
      !product ||
      product.id == null ||
      !Number.isFinite(product.price) ||
      product.price < 0
    ) {
      console.error("Invalid product:", product);
      return;
    }

    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  }, []);

  // Remove product from cart
  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== productId)
    );
  }, []);

  // Clear cart after demo order
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Update product quantity
  const updateQuantity = useCallback(
    (productId, quantity) => {
      if (!Number.isInteger(quantity)) {
        console.error("Invalid quantity:", quantity);
        return;
      }

      if (quantity < 1) {
        removeFromCart(productId);
        return;
      }

      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity,
              }
            : item
        )
      );
    },
    [removeFromCart]
  );

  // Total number of items
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Total cart price
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Memoize the Context value
  const contextValue = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal,
    }),
    [
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal,
    ]
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};
