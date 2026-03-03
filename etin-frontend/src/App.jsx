import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ToastProvider } from "./contexts/ToastContext";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLogin from "./pages/auth/AdminLogin";
import Dashboard from "./pages/dashboard/Dashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import ApplyTIN from "./pages/ApplyTIN";
import VerifyTIN from "./pages/VerifyTIN";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/apply" element={
              <ProtectedRoute>
                <ApplyTIN />
              </ProtectedRoute>
            } />
            <Route path="/verify" element={
              <ProtectedRoute>
                <VerifyTIN />
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}