import { API_ENDPOINTS } from '../context/apiEndpoints';
import { get, postJson, put } from './apiHelper';

export const lendBook = async (lendData) => {
  return postJson(API_ENDPOINTS.LENDS.LEND_BOOK, lendData);
};

export const getLendHistory = async () => {
  return get(API_ENDPOINTS.LENDS.LEND_BOOK);
};

export const returnBook = async (userId, record) => {
  return put(API_ENDPOINTS.RETURN_BOOKS.RETURN(userId), record);
};