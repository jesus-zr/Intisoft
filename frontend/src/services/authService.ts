import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const authService = {
  login: async (user: string, password: string) => {
    const response = await apiClient.post('/auth/login', { user, password });
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  },

  getUserInfo: async (userId: string) => {
    const response = await apiClient.get(`/auth/user/${userId}`);
    return response.data;
  }
};

export default apiClient;
