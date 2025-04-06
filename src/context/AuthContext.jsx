// AuthProvider.js
import React, { useState, useEffect, useContext } from 'react'; // Importa useContext
import { useNavigate } from 'react-router-dom';
import { getDecryptedCookie, removeCookie } from '../utils/cookieManager';
import { login } from '../services/auth';

export const AuthContext = React.createContext();

// Función para acceder al contexto
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Verificar la cookie al cargar la aplicación
  useEffect(() => {
    const checkAuth = () => {
      const sessionData = sessionStorage.getItem('auth'); 
      if (!sessionData) {
        navigate('/login');
      }
    };
    checkAuth();
  }, [navigate]);

  // Función para iniciar sesión
  const sesion = async (credentials) => {
    const response =  await login(credentials); 
    sessionStorage.setItem('auth', response.access_token);
    navigate('/');
  };

  // Función para cerrar sesión
  const logout = () => {
    sessionStorage.removeItem('auth');
    removeCookie('auth'); 
    navigate('/login');
  };

  const value = {
    isAuthenticated: !!sessionStorage.getItem('auth'), 
    sesion,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};