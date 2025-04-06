export const API_ENDPOINTS = {
    USERS: {
      ALL: '/users',
      SAVE: '/users',
      UPDATE: (id) => `/users/${id}`,
      GET_BY_ID: (id) => `/users/${id}`,
      DELETE: (id) => `/users/${id}`,
    },
    BOOKS: {
      ALL: '/books',
      SAVE: '/books',
      UPDATE: (id) => `/books/${id}`,
      GET_BY_ID: (id) => `/books/${id}`,
      DELETE: (id) => `/books/${id}`,
    },
    LENDS: {
      LEND_BOOK: '/lend',
    },
    LEND_HISTORY: {
      HISTORY: (user_id) => `/lend/history/${user_id}`,
    },
    RETURN_BOOKS: {
      RETURN: (user_id, book_id) => `/return/${user_id}/${book_id}`,
    },
    AUTH: {
      REGISTER: '/register',
      LOGIN: '/login',
    },
  };