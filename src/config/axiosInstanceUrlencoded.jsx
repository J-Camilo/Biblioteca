
import axios from 'axios';
import qs from 'qs';

// Crear una instancia de Axios específica para x-www-form-urlencoded
const axiosInstanceUrlencoded = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: "application/x-www-form-urlencoded"
    // 'x-api-key': `${import.meta.env.VITE_API_X_KEY}`,
  },
});

export default axiosInstanceUrlencoded;