import axios from 'axios';
import qs from 'qs'; 

// Crear una instancia de Axios con configuración global
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
        // 'x-api-key': `${import.meta.env.VITE_API_X_KEY}`,
  },
});

export default axiosInstance;