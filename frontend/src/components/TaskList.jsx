import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    const fetchTasks = useCallback(async () => {
        try {
            setLoading(true);
            const { data } = await axiosInstance.get(`/tasks/?page=${page}&limit=5`);
            setTasks(data.tasks);
            setTotalPages(data.totalPages);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Failed to fetch tasks:", error.response?.data || error.message);
        }
    }, [page]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            try {
                await axiosInstance.delete(`/tasks/${id}`);
                fetchTasks();
            } catch (error) {
                console.error("Failed to delete task:", error.response?.data || error.message);
            }
        }
    };

    return (
        <div>
            <h2 className="mb-4 font-bold text-lg">Task List</h2>

            {loading ? (
                <p className="text-gray-500 animate-pulse">Loading tasks...</p>
            ) : tasks.length === 0 ? (
                <p className="text-center text-gray-400">🚫 No tasks created yet. Start by adding one!</p>
            ) : (
                tasks.map((task) => (
                    <div key={task._id} className="bg-white shadow mb-2 p-4 rounded">
                        <h3 className="font-bold">{task.title}</h3>
                        <p className="font-semibold">{task.description}</p>
                        <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
                        <p>Priority: {task.priority}</p>
                        <p className="text-sm text-blue-500">Assigned By: {task.assignedBy?.name || "Unknown"}</p>

                        <button
                            onClick={() => navigate(`/tasks/view/${task._id}`)}
                            className="text-blue-500 hover:underline"
                        >
                            View
                        </button>
                        
                        <button
                            onClick={() => navigate(`/tasks/update/${task._id}`)}
                            className="mr-4 text-green-500"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(task._id)}
                            className="text-red-500"
                        >
                            Delete
                        </button>
                    </div>
                ))
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-4">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`px-4 py-2 border m-1 ${page === i + 1 ? "bg-blue-500 text-white" : "bg-white"}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;
