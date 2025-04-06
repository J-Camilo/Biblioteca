import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Función para iniciar sesión
  const sesion = async (credentials) => {
    await login(credentials);
    setIsAuthenticated(true);
    navigate("/"); 
  };

  // Función para cerrar sesión
  const logout = () => {
    setIsAuthenticated(false);
    navigate("/login"); 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, sesion, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
