import { get, postJson, put, remove } from './apiHelper';
import { API_ENDPOINTS } from '../context/apiEndpoints';

export const getAllBooks = async () => {
  return get(API_ENDPOINTS.BOOKS.ALL);
};

export const saveBook = async (bookData) => {
  return postJson(API_ENDPOINTS.BOOKS.SAVE, bookData);
};

export const updateBook = async (id, updatedData) => {
  return put(API_ENDPOINTS.BOOKS.UPDATE(id), updatedData);
};

export const getBookById = async (id) => {
  return get(API_ENDPOINTS.BOOKS.GET_BY_ID(id));
};

export const searchBooks = async (value, name) => {
  return get(API_ENDPOINTS.BOOKS.SEARCH(value, name));
};

export const deleteBook = async (id) => {
  return remove(API_ENDPOINTS.BOOKS.DELETE(id));
};