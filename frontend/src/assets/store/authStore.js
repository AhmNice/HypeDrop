import { create } from 'zustand';
import axios from 'axios';

axios.defaults.withCredentials = true;

const initialState = {
  user: null,
  isAuthenticated: false,
  success: false,
  error: null,
  isLoading: false,
  isOtpSuccess: false,
  isCheckingAuth: true,
};

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

export const useAuthStore = create((set) => ({
  ...initialState,

  resetAuthState: () => {
    set({ error: null, success: false });
  },

  signup: async (formData) => {
    const { fullname, stageName, email, password } = formData;
    const BASE_URL = `${BASE_API_URL}/signup`;

    set({ isLoading: true, error: null, success: false });

    try {
      const response = await axios.post(BASE_URL, {
        fullName: fullname,
        stageName,
        email,
        password,
        role: 'artist',
      });

      set({
        user: response.data.user,
        isAuthenticated: true,
        success: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error signing up',
        isLoading: false,
        success: false,
      });
      throw error;
    }
  },

  signup_user: async (formData) => {
    const { email, userName, phone, password } = formData;
    const BASE_URL = `${BASE_API_URL}/signup`;

    set({ isLoading: true, error: null, success: false });

    try {
      const response = await axios.post(BASE_URL, {
        email,
        userName,
        password,
        phoneNumber: phone,
        role: 'user',
      });

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        success: true,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error signing up',
        isLoading: false,
        success: false,
      });
      throw error;
    }
  },

  verify_email: async ({ code }) => {
    const BASE_URL = `${BASE_API_URL}/account-verification`;
    set({ isOtpSuccess: false, isLoading: true, error: null });

    try {
      await axios.post(BASE_URL, { code });
      set({ isAuthenticated: true, isOtpSuccess: true, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Email verification failed',
        isLoading: false,
        isOtpSuccess: false,
      });
      throw error;
    }
  },

  login: async (email, password) => {
    const BASE_URL = `${BASE_API_URL}/login`;

    set({ isLoading: true, error: null, success: false });

    try {
      const response = await axios.post(BASE_URL, { email, password });

      set({
        user: response.data.user,
        isAuthenticated: true,
        success: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Login failed',
        isLoading: false,
        isAuthenticated: false,
        success: false,
      });
      throw error;
    }
  },

  logout: async () => {
    const BASE_URL = `${BASE_API_URL}/logout`;

    try {
      await axios.post(BASE_URL);
      set({ ...initialState, isCheckingAuth: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Logout failed',
        isLoading: false,
      });
      throw error;
    }
  },
  updatePassword: async (currentPassword, newPassword, userId) => {
    const BASE_URL = `${BASE_API_URL}/change-password`;
    set({
      success: false,
      isLoading: true,
      error: null
    })
    try {
      const { data } = await axios.post(BASE_URL, { currentPassword, newPassword, userId })
      set({
        success: true,
        error: null,
        isLoading: false
      })
    } catch (error) {
      set({
        success: false,
        error: error.response?.data?.message || error.message,
        isLoading: false
      })
    }
  },
  updateDisplayname_email: async (displayName, email, userId)=>{
     const BASE_URL = `${BASE_API_URL}/update-displayname-email`;
    set({
      success: false,
      isLoading: true,
      error: null
    })
    try {
        const { data } = await axios.post(BASE_URL, {displayName, email, userId});
        set({
          success:true,
          error:null,
          isLoading:false
        })
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error',
        success:false,
        isLoading:false
      })
    }

  },
  checkAuth: async () => {
    const BASE_URL = `${BASE_API_URL}/authenticatedAccount`;

    try {
      const response = await axios.get(BASE_URL);

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        isCheckingAuth: false,
        success: true,
        error: null,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error authenticating user',
        isLoading: false,
        isCheckingAuth: false,
        isAuthenticated: false,
        success: false,
      });
      throw error;
    }
  },
}));
