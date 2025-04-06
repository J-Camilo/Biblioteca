import { API_ENDPOINTS } from '../context/apiEndpoints';
import { get, postJson } from './apiHelper';

export const lendBook = async (lendData) => {
  return postJson(API_ENDPOINTS.LENDS.LEND_BOOK, lendData);
};

export const getLendHistory = async (userId) => {
  return get(API_ENDPOINTS.LEND_HISTORY.HISTORY(userId));
};

export const returnBook = async (userId, bookId) => {
  return postJson(API_ENDPOINTS.RETURN_BOOKS.RETURN(userId, bookId));
};