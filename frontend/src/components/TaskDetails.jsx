import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const TaskDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);

    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                const { data } = await axiosInstance.get(`/tasks/${id}`);
                setTask(data);
            } catch (error) {
                console.error("Failed to fetch task details:", error.response?.data || error.message);
            }
        };
        fetchTaskDetails();
    }, [id]);

    if (!task) return <p>Loading...</p>;

    return (
        <div className="bg-gray-100 shadow hover:shadow-lg p-6 rounded transition">
            <h2 className="font-bold text-xl hover:underline">{task.title}</h2>
            <p className="text-gray-700">{task.description}</p>
            <p className="text-sm">Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
            <p className="text-sm">Priority: {task.priority}</p>
            <button
                onClick={() => navigate(-1)}
                className="bg-blue-500 hover:bg-blue-600 mt-4 px-4 py-2 rounded text-white transition"
            >
                Back
            </button>
        </div>
    );
};

export default TaskDetails;
