import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import TINCard from "../../components/TINCard";
import { getMyTIN } from "../../services/tinService";

export default function Dashboard() {
    const navigate = useNavigate();
    const [tin, setTin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTIN();
    }, []);

    const fetchTIN = async () => {
        try {
            const data = await getMyTIN();
            setTin(data);
        } catch (err) {
            setTin(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <h1 className="text-4xl font-bold mb-2 text-gray-800">
                Ethiopian eTIN Dashboard
            </h1>
            <p className="text-gray-600 mb-8">Manage your Tax Identification Number</p>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                </div>
            ) : tin ? (
                <div className="space-y-6">
                    {/* TIN Card Component */}
                    <TINCard tin={tin} />

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button 
                            onClick={() => navigate("/verify")}
                            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow text-left"
                        >
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-800">Verify TIN</h3>
                            <p className="text-sm text-gray-500">Check if a TIN is valid</p>
                        </button>

                        <div className="bg-white p-6 rounded-xl shadow">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-800">Help & Support</h3>
                            <p className="text-sm text-gray-500">Get assistance with your TIN</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No TIN Found</h2>
                    <p className="text-gray-600 mb-6">You haven't applied for a TIN yet. Apply now to get your Ethiopian Tax Identification Number.</p>
                    <button 
                        onClick={() => navigate("/apply")}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                    >
                        Apply for TIN
                    </button>
                </div>
            )}
        </DashboardLayout>
    );
}