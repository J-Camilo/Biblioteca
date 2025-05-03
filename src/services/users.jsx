import { get, postJson, put, remove } from './apiHelper';
import { API_ENDPOINTS } from '../context/apiEndpoints';

export const getAllUsers = async () => {
  return get(API_ENDPOINTS.PEOPLE.ALL);
};

export const saveUser = async (userData) => {
  return postJson(API_ENDPOINTS.PEOPLE.SAVE, userData);
};

export const updateUser = async (id, updatedData) => {
  return put(API_ENDPOINTS.PEOPLE.UPDATE(id), updatedData);
};

export const getUserById = async (id) => {  
  return get(API_ENDPOINTS.PEOPLE.GET_BY_ID(id));
};

export const deleteUser = async (id) => {
  return remove(API_ENDPOINTS.PEOPLE.DELETE(id));
};