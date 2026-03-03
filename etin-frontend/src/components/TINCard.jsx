export default function TINCard({ tin }) {
    const getStatusColor = (status) => {
        switch (status) {
            case "approved":
                return "bg-green-100 text-green-800 border-green-200";
            case "pending":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "rejected":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "approved":
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case "pending":
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case "rejected":
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-green-700 to-green-600 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-green-100 text-xs">Federal Democratic Republic of Ethiopia</p>
                            <p className="text-white font-bold">Tax Identification Number</p>
                        </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border ${getStatusColor(tin.status)}`}>
                        {getStatusIcon(tin.status)}
                        {tin.status?.toUpperCase()}
                    </div>
                </div>
            </div>
            
            <div className="p-6">
                <div className="text-center mb-6">
                    <p className="text-gray-500 text-sm mb-1">TIN Number</p>
                    <p className="text-4xl font-bold text-gray-800 tracking-widest">{tin.tinNumber}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-500 text-xs mb-1">National ID</p>
                        <p className="font-semibold text-gray-800">{tin.nationalId}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-500 text-xs mb-1">Phone</p>
                        <p className="font-semibold text-gray-800">{tin.phone}</p>
                    </div>
                    <div className="col-span-2 bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-500 text-xs mb-1">Address</p>
                        <p className="font-semibold text-gray-800">{tin.address}</p>
                    </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500">
                    <span>Issued: {new Date(tin.createdAt).toLocaleDateString()}</span>
                    <span>ID: {tin._id?.slice(-8).toUpperCase()}</span>
                </div>
            </div>
        </div>
    );
}
