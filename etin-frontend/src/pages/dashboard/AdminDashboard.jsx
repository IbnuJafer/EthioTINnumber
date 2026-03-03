import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, LogOut, Clock, CheckCircle, XCircle, User, Globe, Bell } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { getDashboard, updateTINStatus } from "../../services/adminService";
import { useTheme } from "../../contexts/ThemeContext";
import { useToast } from "../../contexts/ToastContext";
import AdminTINCard from "../../components/AdminTINCard";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.35,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
    exit: {
        opacity: 0,
        x: -100,
        scale: 0.9,
        transition: {
            duration: 0.25,
        },
    },
};

export default function AdminDashboard() {
    const [data, setData] = useState({ counts: {}, lists: {} });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("pending");
    const [actionLoading, setActionLoading] = useState(null);
    const [showAnalytics, setShowAnalytics] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const { showSuccess, showError } = useToast();
    const { t, i18n } = useTranslation();

    const token = localStorage.getItem("adminToken");

    const toggleLanguage = () => {
        const newLang = i18n.language === "en" ? "am" : "en";
        i18n.changeLanguage(newLang);
    };

    useEffect(() => {
        if (!token) {
            navigate("/admin/login");
            return;
        }
        fetchDashboard();
    }, [token, navigate]);

    const fetchDashboard = async () => {
        try {
            setLoading(true);
            const res = await getDashboard();
            setData(res.data);
            setError("");
        } catch (err) {
            if (err.response?.status === 401) {
                localStorage.removeItem("adminToken");
                navigate("/admin/login");
            } else {
                setError(err.response?.data?.message || "Failed to load dashboard data");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (id, action) => {
        try {
            setActionLoading(id);
            await updateTINStatus(id, action);

            // Optimistically update state without refetching
            setData((prev) => {
                const updatedPending = prev.lists.pending.filter(tin => tin._id !== id);
                let updatedApproved = [...prev.lists.approved];
                let updatedRejected = [...prev.lists.rejected];

                const changedTIN = prev.lists.pending.find(tin => tin._id === id);
                if (changedTIN) {
                    const updatedTIN = { ...changedTIN, status: action };
                    if (action === "approve") {
                        updatedApproved.unshift(updatedTIN);
                    } else {
                        updatedRejected.unshift(updatedTIN);
                    }
                }

                return {
                    counts: {
                        pending: updatedPending.length,
                        approved: updatedApproved.length,
                        rejected: updatedRejected.length
                    },
                    lists: {
                        pending: updatedPending,
                        approved: updatedApproved,
                        rejected: updatedRejected
                    }
                };
            });

            showSuccess(`TIN ${action}d successfully`);
            setError("");
        } catch (err) {
            const errorMsg = err.response?.data?.message || `Failed to ${action} TIN`;
            showError(errorMsg);
            setError(errorMsg);
        } finally {
            setActionLoading(null);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
    };

    const getTabCount = (tab) => data.counts[tab] || 0;

    const getCurrentList = () => data.lists[activeTab] || [];

    if (loading && !data.counts.pending && !data.counts.approved) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <div className="animate-spin rounded-full h-12 w-12 border-3 border-blue-600 border-t-transparent mx-auto"></div>
                    <p className="mt-4 text-gray-500 dark:text-gray-400">Loading dashboard...</p>
                </motion.div>
            </div>
        );
    }

    // Compact stat badges like in the design
    const statBadges = [
        { label: t("pending"), count: data.counts.pending || 0, color: "bg-yellow-500", dotColor: "bg-yellow-400" },
        { label: t("approved"), count: data.counts.approved || 0, color: "bg-green-500", dotColor: "bg-green-400" },
        { label: t("rejected"), count: data.counts.rejected || 0, color: "bg-red-500", dotColor: "bg-red-400" },
    ];

    // Chart data
    const pieData = [
        { name: t("pending"), value: data.counts.pending || 0, color: "#EAB308" },
        { name: t("approved"), value: data.counts.approved || 0, color: "#22C55E" },
        { name: t("rejected"), value: data.counts.rejected || 0, color: "#EF4444" },
    ];

    const barData = [
        { name: t("pending"), count: data.counts.pending || 0 },
        { name: t("approved"), count: data.counts.approved || 0 },
        { name: t("rejected"), count: data.counts.rejected || 0 },
    ];

    const total = (data.counts.pending || 0) + (data.counts.approved || 0) + (data.counts.rejected || 0);
    const approvalRate = total > 0 ? Math.round(((data.counts.approved || 0) / total) * 100) : 0;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {/* Header */}
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300"
            >
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <motion.h1
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl font-bold text-gray-900 dark:text-white"
                        >
                            {t("adminDashboard")}
                        </motion.h1>
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="flex items-center gap-2 sm:gap-3"
                        >
                            {/* Language Toggle */}
                            <button
                                onClick={toggleLanguage}
                                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs sm:text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                            >
                                <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                <span className="hidden sm:inline">{i18n.language === "en" ? "EN" : "አማ"}</span>
                            </button>
                            
                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs sm:text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                            >
                                {theme === "light" ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                                <span className="hidden md:inline">{theme === "light" ? t("lightMode") : t("darkMode")}</span>
                            </button>
                            
                            {/* Analytics Toggle */}
                            <button
                                onClick={() => setShowAnalytics(!showAnalytics)}
                                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs sm:text-sm hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-200"
                            >
                                <span className="hidden sm:inline">{t("analytics")}</span>
                                <span className="sm:hidden">📊</span>
                            </button>
                            
                            {/* Admin Badge */}
                            <div className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                <span className="hidden sm:inline">Admin</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.header>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg mb-6 text-sm"
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Compact Stats Row */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap items-center gap-4 mb-6"
                >
                    {statBadges.map((stat) => (
                        <div
                            key={stat.label}
                            className="flex items-center gap-2 text-sm"
                        >
                            <span className={`w-2 h-2 rounded-full ${stat.dotColor}`}></span>
                            <span className="text-gray-600 dark:text-gray-400">{stat.label}:</span>
                            <motion.span
                                key={stat.count}
                                initial={{ scale: 1.2 }}
                                animate={{ scale: 1 }}
                                className="font-semibold text-gray-900 dark:text-white"
                            >
                                {stat.count}
                            </motion.span>
                        </div>
                    ))}
                </motion.div>

                {/* Analytics Section */}
                <AnimatePresence>
                    {showAnalytics && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-6 overflow-hidden"
                        >
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    {t("analytics")}
                                </h3>
                                
                                {/* Stats Cards */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
                                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 sm:p-4 text-center">
                                        <p className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">{total}</p>
                                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{t("totalApplications")}</p>
                                    </div>
                                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 sm:p-4 text-center">
                                        <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">{approvalRate}%</p>
                                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{t("approvalRate")}</p>
                                    </div>
                                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 sm:p-4 text-center">
                                        <p className="text-2xl sm:text-3xl font-bold text-yellow-600 dark:text-yellow-400">{data.counts.pending || 0}</p>
                                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{t("pending")}</p>
                                    </div>
                                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 sm:p-4 text-center">
                                        <p className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">{data.counts.approved || 0}</p>
                                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{t("approved")}</p>
                                    </div>
                                </div>

                                {/* Charts */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                    {/* Pie Chart */}
                                    <div className="h-48 sm:h-64">
                                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-center">
                                            {t("totalApplications")}
                                        </h4>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={pieData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={40}
                                                    outerRadius={70}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    {pieData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>

                                    {/* Bar Chart */}
                                    <div className="h-48 sm:h-64">
                                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-center">
                                            {t("recentActivity")}
                                        </h4>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={barData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                                <YAxis tick={{ fontSize: 12 }} />
                                                <Tooltip />
                                                <Bar dataKey="count" fill="#3B82F6" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Section Title */}
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4"
                >
                    {t("pendingTINs")}
                </motion.h2>

                {/* TIN List */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-3"
                >
                    <AnimatePresence mode="popLayout">
                        {data.lists.pending?.length === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-8 sm:py-12 text-gray-500 dark:text-gray-400 text-sm sm:text-base"
                            >
                                {t("noPending")}
                            </motion.div>
                        ) : (
                            data.lists.pending?.map((tin, index) => (
                                <motion.div
                                    key={tin._id}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    layout
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <AdminTINCard
                                        tin={tin}
                                        onAction={handleAction}
                                        isLoading={actionLoading === tin._id}
                                    />
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </motion.div>
            </main>
        </div>
    );
}
