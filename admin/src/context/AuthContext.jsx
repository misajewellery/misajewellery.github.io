import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('misa_admin_token');
            if (token) {
                try {
                    const { data } = await api.get('/admin/me');
                    setAdmin(data);
                } catch (error) {
                    console.error(error);
                    localStorage.removeItem('misa_admin_token');
                    setAdmin(null);
                }
            }
            setLoading(false);
        };

        checkLoggedIn();
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await api.post('/admin/login', { email, password });
            localStorage.setItem('misa_admin_token', data.token);
            setAdmin(data);
            toast.success(`Welcome back, ${data.username || data.email}`);
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('misa_admin_token');
        setAdmin(null);
        toast.info('Logged out');
    };

    return (
        <AuthContext.Provider value={{ admin, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
