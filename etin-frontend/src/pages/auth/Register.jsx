import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        try {
            await API.post("/auth/register", form);
            alert("Registered Successfully ✅");
            navigate("/");
        } catch (err) {
            alert(err.response?.data?.message || "Error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow w-96">

                <h2 className="text-2xl font-bold mb-6 text-center">
                    Create Account
                </h2>

                <input
                    name="fullName"
                    placeholder="Full Name"
                    onChange={handleChange}
                    className="w-full p-3 border mb-3 rounded"
                />

                <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full p-3 border mb-3 rounded"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full p-3 border mb-4 rounded"
                />

                <button
                    onClick={handleSubmit}
                    className="w-full bg-green-600 text-white py-3 rounded"
                >
                    Register
                </button>

                <p className="mt-4 text-center">
                    Already have account? <Link to="/">Login</Link>
                </p>

            </div>
        </div>
    );
}