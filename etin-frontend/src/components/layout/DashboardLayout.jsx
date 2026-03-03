import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex">

            <Sidebar />

            <div className="ml-64 w-full min-h-screen bg-gray-100 p-8">
                {children}
            </div>

        </div>
    );
}
