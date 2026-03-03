import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { applyForTIN } from "../services/tinService";
import DashboardLayout from "../components/layout/DashboardLayout";

export default function ApplyTIN() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ 
        nationalId: "", 
        phone: "", 
        region: "", 
        city: "" 
    });
    const [tin, setTin] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Ethiopian regions
    const regions = [
        "Addis Ababa",
        "Afar",
        "Amhara",
        "Benishangul-Gumuz",
        "Dire Dawa",
        "Gambela",
        "Harari",
        "Oromia",
        "Sidama",
        "Somali",
        "South Ethiopia",
        "Tigray"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const data = await applyForTIN(form);
            setTin(data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to apply for TIN");
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Apply for TIN</h1>
                
                {!tin ? (
                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <p className="text-gray-600 mb-6">
                            Fill in your details to apply for an Ethiopian Tax Identification Number (TIN).
                        </p>
                        
                        {error && (
                            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                                {error}
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    National ID
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your National ID (e.g., AA1234567)"
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    value={form.nationalId}
                                    onChange={(e) => setForm({ ...form, nationalId: e.target.value })}
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    placeholder="+251 9XX XXX XXX"
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Region
                                </label>
                                <select
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                                    value={form.region}
                                    onChange={(e) => setForm({ ...form, region: e.target.value })}
                                    required
                                >
                                    <option value="">Select Region</option>
                                    {regions.map((region) => (
                                        <option key={region} value={region}>{region}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    City / Woreda
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your city or woreda"
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    value={form.city}
                                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                                    required
                                />
                            </div>
                            
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
                            >
                                {loading ? "Processing..." : "Apply for TIN"}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="bg-white p-8 rounded-xl shadow-md text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted!</h2>
                        <p className="text-gray-600 mb-6">Your TIN has been generated successfully.</p>
                        
                        <div className="bg-gray-50 p-6 rounded-lg mb-6">
                            <p className="text-sm text-gray-500 mb-1">Your TIN Number</p>
                            <p className="text-3xl font-bold text-green-700 tracking-wider">{tin.tinNumber}</p>
                        </div>
                        
                        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
                            <p className="text-yellow-800 text-sm">
                                <strong>Status:</strong> {tin.status?.toUpperCase()}
                            </p>
                            <p className="text-yellow-700 text-xs mt-1">
                                Your TIN is pending approval. You will be notified once approved.
                            </p>
                        </div>
                        
                        <button 
                            onClick={() => navigate("/dashboard")}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                        >
                            Go to Dashboard
                        </button>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}