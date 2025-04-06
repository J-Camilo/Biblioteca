import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000, // Tiempo máximo de espera para las solicitudes (en milisegundos)
    headers: {
        'x-api-key': import.meta.env.VITE_API_X_KEY,
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Interceptores para manejar tokens y errores globales
axiosInstance.interceptors.request.use(
    (config) => {
        //aun no tiene token
        // const token = localStorage.getItem('authToken');
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }

        // Si el encabezado Content-Type es x-www-form-urlencoded, transformar los datos
        if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            config.data = qs.stringify(config.data); // Convertir datos a formato URL-encoded
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         // Manejar errores globales
//         if (error.response) {
//             // Errores del servidor (4xx, 5xx)
//             console.error('Error en la respuesta:', error.response.data);
//             if (error.response.status === 401) {
//                 // Redirigir al usuario a la página de inicio de sesión si el token expira
//                 window.location.href = '/login';
//             }
//         } else if (error.request) {
//             // La solicitud se hizo pero no se recibió respuesta
//             console.error('No se recibió respuesta del servidor');
//         } else {
//             // Otros errores
//             console.error('Error en la solicitud:', error.message);
//         }
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;