import axios from 'axios';

// Create generic axios instance
const api = axios.create({
    baseURL: 'http://localhost:5001/api', // Hardcoded for now, or use import.meta.env.VITE_API_URL
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
