import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const UpdateTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        dueDate: "",
        priority: "Low",
    });
    const [loading, setLoading] = useState(true);

    // Fetch task details
    useEffect(() => {
        const fetchTask = async () => {
            try {
                const { data } = await axiosInstance.get(`/tasks/${id}`);
                setFormData({
                    title: data.title,
                    description: data.description,
                    dueDate: data.dueDate.split("T")[0],
                    priority: data.priority,
                });
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch task:", error.response?.data || error.message);
                setLoading(false);
            }
        };
        fetchTask();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`/tasks/${id}`, formData);
            alert("Task updated successfully!");
            navigate("/dashboard"); // Navigate back to the dashboard
        } catch (error) {
            console.error("Failed to update task:", error.response?.data || error.message);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="bg-gray-100 shadow mx-auto p-4 rounded max-w-md">
            <h2 className="mb-4 font-bold text-lg">Update Task</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="block mb-2 p-2 border rounded w-full"
                    required
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="block mb-2 p-2 border rounded w-full"
                    required
                />
                <input
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    type="date"
                    className="block mb-2 p-2 border rounded w-full"
                    required
                />
                <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="block mb-2 p-2 border rounded w-full"
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
                >
                    Update Task
                </button>
            </form>
        </div>
    );
};

export default UpdateTask;
