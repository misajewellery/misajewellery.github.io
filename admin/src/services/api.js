import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const BACKEND_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, '');

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const adminToken = localStorage.getItem('misa_admin_token');
        if (adminToken) {
            config.headers['Authorization'] = `Bearer ${adminToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
