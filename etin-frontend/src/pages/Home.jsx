import Navbar from "../components/Navbar";

export default function Home() {
    return (
        <div>
            <Navbar />
            <header className="text-center mt-16">
                <h1 className="text-4xl font-bold mb-4">Ethiopian Digital TIN System</h1>
                <p className="text-lg text-gray-700">
                    Apply for your TIN online, verify TINs, and manage your tax identification securely.
                </p>
            </header>
        </div>
    );
}