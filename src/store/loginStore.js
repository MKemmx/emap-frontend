import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

// Import Axios
import axios from 'axios';

const loginStore = (set, get) => ({
  user: null,
  isAuthenticated: false,
  token: null,
  error: null,
  loading: false,
  login: async (loginData) => {
    try {
      set({
        ...get(),
        loading: true,
      });

      const { data } = await axios.post('/auth/admin-login', loginData);
      set({
        ...get(),
        user: data.data.admin,
        token: data.data.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        ...get(),
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: {
          title: 'Incorrect Credentials',
          description: error.response.data.msg,
        },
      });
    }
  },
  setError: (errorData) => {
    set({
      ...get(),
      isAuthenticated: false,
      loading: false,
      error: errorData,
    });
  },
  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      token: null,
      error: null,
      loading: false,
    });
  },
});

export const useLoginStore = create(
  devtools(
    persist(loginStore, {
      name: 'emap-auth',
    })
  )
);
