import { Link, useLocation } from "react-router-dom";
import { FaHome, FaIdCard, FaUser, FaPlus, FaSearch, FaSignOutAlt } from "react-icons/fa";

export default function Sidebar() {
    const location = useLocation();
    
    const isActive = (path) => location.pathname === path;
    
    const linkClass = (path) => `
        flex items-center gap-3 p-3 rounded-lg transition-colors
        ${isActive(path) ? "bg-green-700" : "hover:bg-green-700"}
    `;

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <div className="w-64 h-screen bg-green-800 text-white fixed flex flex-col">
            <h1 className="text-2xl font-bold p-6 border-b border-green-700">
                eTIN System
            </h1>

            <nav className="p-4 space-y-2 flex-1">
                <Link to="/dashboard" className={linkClass("/dashboard")}>
                    <FaHome /> Dashboard
                </Link>

                <Link to="/apply" className={linkClass("/apply")}>
                    <FaPlus /> Apply for TIN
                </Link>

                <Link to="/verify" className={linkClass("/verify")}>
                    <FaSearch /> Verify TIN
                </Link>

                <Link to="/profile" className={linkClass("/profile")}>
                    <FaUser /> Profile
                </Link>
            </nav>
            
            <div className="p-4 border-t border-green-700">
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-700 w-full text-left"
                >
                    <FaSignOutAlt /> Logout
                </button>
            </div>
        </div>
    );
}