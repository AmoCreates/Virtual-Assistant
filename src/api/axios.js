import axios from 'axios';

const api = axios.create({
    // VITE_API_URL comes from your Vercel Environment Variables
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

export default api;