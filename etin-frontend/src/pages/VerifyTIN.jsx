import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { verifyTIN } from "../services/tinService";

export default function VerifyTIN() {
    const [tin, setTin] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setResult(null);

        try {
            const data = await verifyTIN(tin.trim().toUpperCase());
            setResult(data);
        } catch (err) {
            setError(err.response?.data?.message || "TIN not found or invalid");
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-2 text-gray-800">Verify TIN</h1>
                <p className="text-gray-600 mb-8">Check the validity of an Ethiopian Tax Identification Number</p>

                <div className="bg-white p-8 rounded-xl shadow-md">
                    <form onSubmit={handleVerify} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                TIN Number
                            </label>
                            <input
                                type="text"
                                placeholder="Enter TIN (e.g., ET123456789)"
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent uppercase"
                                value={tin}
                                onChange={(e) => setTin(e.target.value)}
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Format: ET followed by 9 digits (e.g., ET123456789)
                            </p>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                                {error}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
                        >
                            {loading ? "Verifying..." : "Verify TIN"}
                        </button>
                    </form>

                    {result && (
                        <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-green-800">Valid TIN</h3>
                                    <p className="text-green-600">This TIN is registered in the system</p>
                                </div>
                            </div>
                            
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between border-b border-green-200 pb-2">
                                    <span className="text-gray-600">Registered To:</span>
                                    <span className="font-semibold text-gray-800">{result.fullName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Status:</span>
                                    <span className={`font-semibold ${
                                        result.status === 'approved' ? 'text-green-600' : 
                                        result.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                                    }`}>
                                        {result.status?.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Why verify a TIN?</h4>
                    <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                        <li>Confirm tax registration status</li>
                        <li>Validate business partners</li>
                        <li>Ensure compliance with tax regulations</li>
                    </ul>
                </div>
            </div>
        </DashboardLayout>
    );
}
