// AuthProvider.js
import React, { useState, useEffect, useContext } from 'react'; // Importa useContext
import { useNavigate } from 'react-router-dom';
import { getDecryptedCookie, removeCookie } from '../utils/cookieManager';
import { login } from '../services/auth';
import { getAllUsers } from '../services/users';

export const AuthContext = React.createContext();

// Función para acceder al contexto
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Verificar la cookie al cargar la aplicación
  useEffect(()=> {
    const checkAuth = () => {
      const userData = getDecryptedCookie('auth');
      if (userData) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate('/login');
      }
    };
    checkAuth();
  }, [navigate]);

  // Función para iniciar sesión
  const sesion = async (credentials) => {
    await login(credentials); // Llama a la función de login
    setIsAuthenticated(true);
    navigate('/');
  };

  // Función para cerrar sesión
  const logout = () => {
    removeCookie('auth'); // Elimina la cookie
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, sesion, logout }}>
      {children}
    </AuthContext.Provider>
  );
};