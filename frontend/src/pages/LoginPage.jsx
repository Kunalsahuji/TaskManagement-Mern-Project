import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData.email, formData.password);
            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-100 shadow mx-auto p-4 rounded max-w-md">
            <h2 className="mb-4 font-bold text-lg">Login</h2>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="mb-2 p-2 border rounded w-full"
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="mb-2 p-2 border rounded w-full"
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white">
                Login
            </button>
        </form>
    );
};

export default LoginPage;
