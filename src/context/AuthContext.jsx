import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const navigate = useNavigate();

  // Función para iniciar sesión
  const login = () => {
    setIsAuthenticated(true);
    navigate("/"); 
  };

  // Función para cerrar sesión
  const logout = () => {
    setIsAuthenticated(false);
    navigate("/login"); 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
