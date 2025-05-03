export const API_ENDPOINTS = {
  PEOPLE: {
    ALL: '/people',
    SAVE: '/people',
    UPDATE: (id) => `/people/${id}`,
    GET_BY_ID: (id) => `/people/${id}`,
    DELETE: (id) => `/people/${id}`,
  },
  BOOKS: {
    ALL: '/books',
    SAVE: '/books',
    UPDATE: (id) => `/books/${id}`,
    GET_BY_ID: (id) => `/books/${id}`,
    DELETE: (id) => `/books/${id}`,
    SEARCH: (prefix, field) => `/books?prefix=${prefix}&field=${field}`
  },
  LENDS: {
    LEND_BOOK: '/lend',
  },
  LEND_HISTORY: {
    HISTORY: (user_id) => `/lend/history/${user_id}`,
  },
  // RETURN_BOOKS: {
  //   RETURN: (user_id, book_id) => `/return/${user_id}/${book_id}`,
  // },  
  RETURN_BOOKS: {
    RETURN: (user_id) => `/lend/${user_id}`,
  },
  AUTH: {
    REGISTER: '/register',
    LOGIN: '/login',
  },
};