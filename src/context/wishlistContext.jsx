
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { WishlistContext } from "./wishlistContextStore";

const WISHLIST_STORAGE_KEY = "nexamart-wishlist";

export const WishlistProvider = ({ children }) => {
  // Load wishlist from localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem(
        WISHLIST_STORAGE_KEY
      );

      if (!savedWishlist) return [];

      const parsedWishlist = JSON.parse(savedWishlist);

      return Array.isArray(parsedWishlist)
        ? parsedWishlist.filter(
            (item) => item && item.id != null
          )
        : [];
    } catch (error) {
      console.error("Error loading wishlist:", error);
      return [];
    }
  });

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(
        WISHLIST_STORAGE_KEY,
        JSON.stringify(wishlist)
      );
    } catch (error) {
      console.error("Error saving wishlist:", error);
    }
  }, [wishlist]);

  // Add or remove a product from wishlist
  const toggleWishlist = useCallback((product) => {
    if (!product || product.id == null) {
      console.error("Invalid wishlist product:", product);
      return;
    }

    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some(
        (item) => item.id === product.id
      );

      if (exists) {
        return prevWishlist.filter(
          (item) => item.id !== product.id
        );
      }

      return [...prevWishlist, product];
    });
  }, []);

  // Check whether a product is in wishlist
  const isInWishlist = useCallback(
    (productId) => {
      return wishlist.some(
        (item) => item.id === productId
      );
    },
    [wishlist]
  );

  // Total wishlist items
  const wishlistCount = wishlist.length;

  // Memoize the Context value
  const contextValue = useMemo(
    () => ({
      wishlist,
      toggleWishlist,
      isInWishlist,
      wishlistCount,
    }),
    [
      wishlist,
      toggleWishlist,
      isInWishlist,
      wishlistCount,
    ]
  );

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
};
