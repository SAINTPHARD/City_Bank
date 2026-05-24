import { useState } from "react";
import PropTypes from "prop-types";
import AuthContext from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const login = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
    localStorage.setItem("token", jwt);
    localStorage.setItem("user", JSON.stringify(userData || {}));
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
