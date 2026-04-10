import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5005',
    withCredentials: true,
});

// Request interceptor for logging
api.interceptors.request.use(config => {
    console.log(`🚀 Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
}, error => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
});

// Response interceptor for logging
api.interceptors.response.use(response => {
    return response;
}, error => {
    console.error('❌ API Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        url: error.config?.url
    });
    return Promise.reject(error);
});

export default api;
