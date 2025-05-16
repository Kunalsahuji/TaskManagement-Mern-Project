// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axiosInstance from "../utils/axiosInstance";

// const ViewTaskPage = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [task, setTask] = useState(null);

//     useEffect(() => {
//         const fetchTask = async () => {
//             try {
//                 const { data } = await axiosInstance.get(`/tasks/${id}`);
//                 setTask(data);
//             } catch (error) {
//                 console.error("Error fetching task:", error.response?.data || error.message);
//             }
//         };
//         fetchTask();
//     }, [id]);

//     if (!task) return <p>Loading task details...</p>;

//     return (
//         <div className="max-w-xl mx-auto bg-white shadow p-6 rounded">
//             <h2 className="text-2xl font-bold mb-2">{task.title}</h2>
//             <p className="text-gray-700 mb-1">{task.description}</p>
//             <p className="text-sm">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
//             <p className="text-sm">Priority: {task.priority}</p>
//             <p className="text-sm font-semibold text-blue-600">Assigned By: {task.assignedBy?.name || "Unknown"}</p>

//             <button
//                 onClick={() => navigate(-1)}
//                 className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//             >
//                 Back
//             </button>
//         </div>
//     );
// };

// export default ViewTaskPage;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const ViewTaskPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);

    // Get logged-in user ID
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const { data } = await axiosInstance.get(`/tasks/${id}`);
                setTask(data);
            } catch (error) {
                console.error("Error fetching task:", error.response?.data || error.message);
            }
        };
        fetchTask();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            try {
                await axiosInstance.delete(`/tasks/${id}`);
                navigate("/dashboard");
            } catch (error) {
                console.error("Failed to delete task:", error.response?.data || error.message);
            }
        }
    };

    if (!task) return <p>Loading task details...</p>;

    const isOwner = task.assignedBy?._id === userId;

    return (
        <div className="max-w-xl mx-auto bg-white shadow p-6 rounded">
            <h2 className="text-2xl font-bold mb-2">{task.title}</h2>
            <p className="text-gray-700 mb-1">{task.description}</p>
            <p className="text-sm">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            <p className="text-sm">Priority: {task.priority}</p>
            <p className="text-sm font-semibold text-blue-600">Assigned By: {task.assignedBy?.name || "Unknown"}</p>

            <div className="mt-4 space-x-4">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                >
                    Back
                </button>

                {isOwner && (
                    <>
                        <button
                            onClick={() => navigate(`/tasks/update/${task._id}`)}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ViewTaskPage;
