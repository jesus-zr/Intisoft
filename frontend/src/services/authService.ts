import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const authService = {
  login: async (user: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        user,
        password
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Error en la solicitud' };
    }
  },

  getUser: async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/user/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Error en la solicitud' };
    }
  },

  forgotPassword: async (email: string) => {
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, {
        email
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Error en la solicitud' };
    }
  }
};
