import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

export const register = async (name, email, password) => {
    return await api.post('/register', { name, email, password });
};

export const login = async (email, password) => {
    return await api.post('/login', { email, password });
};

export const getUser = async (token) => {
    return await api.get('/user', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
