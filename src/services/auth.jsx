import { API_ENDPOINTS } from '../context/apiEndpoints';
import { postFormUrlEncoded, postJson } from './apiHelper';

export const login = async (credentials) => {
  return postFormUrlEncoded(API_ENDPOINTS.AUTH.LOGIN, credentials);
};

export const register = async (userData) => {
  return postJson(API_ENDPOINTS.AUTH.REGISTER, userData);
};