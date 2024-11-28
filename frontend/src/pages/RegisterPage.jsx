import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const RegisterPage = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => {
            const updated = { ...prev, [e.target.name]: e.target.value };
            console.log("Updated Form Data:", updated);
            return updated;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axiosInstance.post("/auth/register", formData);
            console.log("Registration successful:", data);
            localStorage.setItem("authToken", data.token);
            navigate("/login");
        } catch (error) {
            console.error("Failed to register:", error.response?.data || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-100 shadow mx-auto p-4 rounded max-w-md">
            <h2 className="mb-4 font-bold text-lg">Register</h2>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="mb-2 p-2 border rounded w-full"
            />
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
                Register
            </button>
        </form>
    );
};

export default RegisterPage;
