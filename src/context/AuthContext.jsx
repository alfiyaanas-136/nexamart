
import { useState } from "react";
import { AuthContext } from "./authContextStore";

const STORAGE_KEY = "nexamart_demo_user";

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem(STORAGE_KEY);

    if (!storedUser) {
      return null;
    }

    const parsedUser = JSON.parse(storedUser);

    if (
      !parsedUser ||
      typeof parsedUser !== "object" ||
      typeof parsedUser.name !== "string" ||
      typeof parsedUser.email !== "string"
    ) {
      return null;
    }

    return {
      name: parsedUser.name,
      email: parsedUser.email,
    };
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);

  const login = (userData) => {
    const demoUser = {
      name: userData.name,
      email: userData.email,
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(demoUser)
    );

    setUser(demoUser);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
