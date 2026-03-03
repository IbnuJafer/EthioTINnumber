import axios from "axios";

// Use relative URL in production, localhost in development
const baseURL = import.meta.env.PROD ? "/api" : "http://localhost:5000/api";

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