import axios from 'axios';
import qs from 'qs'; 

// Crear una instancia de Axios con configuración global
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
        // 'x-api-key': `${import.meta.env.VITE_API_X_KEY}`,

  },
});

// Interceptores para manejar tokens y errores globales
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     // Si el encabezado Content-Type es x-www-form-urlencoded, transformar los datos
//     if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
//       config.data = qs.stringify(config.data); // Convertir datos a formato URL-encoded
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;