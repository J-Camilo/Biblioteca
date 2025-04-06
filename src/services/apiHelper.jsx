import axiosInstance from "../config/axios";
import axiosInstanceUrlencoded from "../config/axiosInstanceUrlencoded";
import { setEncryptedCookie } from "../utils/cookieManager";

// Función para obtener datos
export const get = async (url) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para enviar datos en formato JSON
export const postJson = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

function toFormUrlEncoded(obj) {
  const params = new URLSearchParams();
  for (let key in obj) {
    params.append(key, obj[key]);
  }
  return params;
}

// Función para enviar datos en formato x-www-form-urlencoded
export const postFormUrlEncoded = async (url, data) => {
  try {
    const dataForm = toFormUrlEncoded(data);

    const response = await axiosInstanceUrlencoded.post(url, dataForm, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Guardar los datos del usuario en una cookie encriptada
    setEncryptedCookie('auth', response.data, { expires: 1 });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para actualizar datos
export const put = async (url, data) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para eliminar recursos
export const remove = async (url) => {
  try {
    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};