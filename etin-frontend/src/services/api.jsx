import axios from "axios";

// Backend API URL - change this to your Render backend URL after deployment
const RENDER_BACKEND_URL = "https://ethiotin-backend.onrender.com/api";

// Use environment variable or fallback to localhost
const baseURL = import.meta.env.VITE_API_URL || 
                (import.meta.env.PROD ? RENDER_BACKEND_URL : "http://localhost:5000/api");

const API = axios.create({
    baseURL,
});

// attach token automatically
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
});

export default API;