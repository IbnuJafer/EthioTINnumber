import axios from "axios";

// Use relative URL in production, localhost in development
const API_URL = import.meta.env.PROD ? "/api" : "http://localhost:5000/api";

// Create axios instance with default config
const adminAPI = axios.create({
    baseURL: API_URL,
});

// Add auth token to requests
adminAPI.interceptors.request.use((config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Admin login
export const adminLogin = (email, password) =>
    axios.post(`${API_URL}/admin/login`, { email, password });

// Get admin dashboard data (counts & lists by status)
export const getDashboard = (token) =>
    adminAPI.get("/admin/dashboard");

// Update TIN status (approve/reject)
export const updateTINStatus = (id, action, token) =>
    adminAPI.put(`/admin/tin/${action}/${id}`);

// Get all TINs
export const getAllTINs = (token) =>
    adminAPI.get("/admin/tin/all");

// Get pending TINs
export const getPendingTINs = (token) =>
    adminAPI.get("/admin/tin/pending");
