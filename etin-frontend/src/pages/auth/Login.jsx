import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";

export default function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleLogin = async () => {
        try {
            const res = await API.post("/auth/login", form);

            localStorage.setItem("token", res.data.token);

            navigate("/dashboard");
        } catch (err) {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-700 to-yellow-500">

            <div className="bg-white p-8 rounded-xl shadow w-96">

                <h2 className="text-2xl font-bold mb-6 text-center">
                    eTIN Login
                </h2>

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
                    onClick={handleLogin}
                    className="w-full bg-green-600 text-white py-3 rounded"
                >
                    Login
                </button>

                <p className="mt-4 text-center">
                    No account? <Link to="/register">Register</Link>
                </p>

            </div>
        </div>
    );
}