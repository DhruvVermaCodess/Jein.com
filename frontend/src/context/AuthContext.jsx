import { createContext, useEffect, useState } from "react";
import { BACKEND_URI } from "../utils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    try {
      isAuthenticated();
      IsAdmin();
      getUserId();
    } catch (error) {
      console.error("Error initializing auth context:", error);
    }
  }, []);

  const handleAddToCart = async (productId, quantity, price, userId) => {
    if (!userId) {
      console.error("User is not authenticated.");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URI}/api/cart/add-to-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productId, quantity, price, userId }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Add to cart success:", data.message);
      } else {
        const error = await response.json();
        console.error("Failed to add to cart:", error.message);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const getUserId = async () => {
    try {
      const response = await fetch(`${BACKEND_URI}/api/auth/userId`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUserId(data.userId);
      } else {
        console.error("Failed to fetch user ID:", await response.text());
      }
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  };

  const isAuthenticated = async () => {
    try {
      const response = await fetch(`${BACKEND_URI}/api/auth/checkAuth`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setIsAuth(data.message);
      } else {
        console.error("Failed to check authentication:", await response.text());
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
    }
  };

  const IsAdmin = async () => {
    try {
      const response = await fetch(`${BACKEND_URI}/api/auth/isAdmin`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setIsAdmin(data.message);
      } else {
        console.error("Failed to check admin status:", await response.text());
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuth, setIsAuth, isAdmin, setIsAdmin, userId, setUserId, handleAddToCart }}
    >
      {children}
    </AuthContext.Provider>
  );
};
