import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null);

  const refreshAuth = async () => {
    try {
      await api.get("/auth/me");
      setAuthenticated(true);
    } catch (error) {
      setAuthenticated(false);
    }
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  const logout = async () => {
    await api.post("/auth/logout");
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ authenticated, refreshAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
