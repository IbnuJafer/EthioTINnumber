import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

// Generate avatar URL based on name
const getAvatarUrl = (name) => {
    const encodedName = encodeURIComponent(name || "User");
    return `https://ui-avatars.com/api/?name=${encodedName}&background=random&color=fff&size=128`;
};

export default function AdminTINCard({ tin, onAction, isLoading }) {
    // Handle both populated and non-populated user data
    const userName = tin.user?.fullName || tin.userId?.name || "Unknown User";
    const userEmail = tin.user?.email || tin.userId?.email || "N/A";

    return (
        <motion.div
            layout
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
        >
            <div className="p-4">
                <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <img
                        src={getAvatarUrl(userName)}
                        alt={userName}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-100 dark:border-gray-600 flex-shrink-0"
                    />

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                            {userName}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {userEmail}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                                TIN: <span className="font-mono font-medium">{tin.tinNumber}</span>
                            </span>
                        </div>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 mt-2">
                            Status: {tin.status}
                        </span>
                    </div>

                    {/* Action Buttons */}
                    {tin.status === "pending" && (
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={isLoading}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-1.5 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => onAction(tin._id, "approve")}
                            >
                                {isLoading ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <Check className="w-4 h-4" />
                                )}
                                Approve
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={isLoading}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-1.5 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => onAction(tin._id, "reject")}
                            >
                                {isLoading ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <X className="w-4 h-4" />
                                )}
                                Reject
                            </motion.button>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
