import Cookies from 'js-cookie';
import { encryptData, decryptData } from './cookieUtils';

// Guardar una cookie encriptada
export const setEncryptedCookie = (key, data, options = {}) => {
  const encryptedData = encryptData(data);
  Cookies.set(key, encryptedData, options);
};

// Leer una cookie y desencriptarla
export const getDecryptedCookie = (key) => {
  const encryptedData = Cookies.get(key);
  if (!encryptedData) return null;
  return decryptData(encryptedData);
};

// Eliminar una cookie
export const removeCookie = (key) => {
  Cookies.remove(key);
};