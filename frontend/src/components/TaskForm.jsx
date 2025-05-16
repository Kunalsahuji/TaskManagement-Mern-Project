// import React, { useState } from "react";
// import axiosInstance from "../utils/axiosInstance";
// import { useNavigate } from "react-router-dom";

// const TaskForm = ({ fetchTasks, onTaskCreated }) => {
//     const navigate = useNavigate()
//     const [formData, setFormData] = useState({
//         title: "",
//         description: "",
//         dueDate: "",
//         priority: "Low",
//     });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const { data } = await axiosInstance.post(`/tasks`, formData);
//             if (onTaskCreated) onTaskCreated();
//             navigate(`/tasks/view/${data._id}`);

//         } catch (error) {
//             console.error("Failed to save task:", error.response?.data || error.message);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="bg-gray-100 shadow mx-auto p-4 rounded max-w-md">
//             <h2 className="mb-4 font-bold text-lg">Create Task</h2>
//             <input
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 placeholder="Title"
//                 className="block mb-2 p-2 border rounded w-full"
//                 required
//             />
//             <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 placeholder="Description"
//                 className="block mb-2 p-2 border rounded w-full"
//                 required
//             />
//             <input
//                 name="dueDate"
//                 value={formData.dueDate}
//                 onChange={handleChange}
//                 type="date"
//                 className="block mb-2 p-2 border rounded w-full"
//                 required
//             />
//             <select
//                 name="priority"
//                 value={formData.priority}
//                 onChange={handleChange}
//                 className="block mb-2 p-2 border rounded w-full"
//             >
//                 <option value="Low">Low</option>
//                 <option value="Medium">Medium</option>
//                 <option value="High">High</option>
//             </select>
//             <button
//                 type="submit"
//                 className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
//             >
//                 Save Task
//             </button>
//         </form>
//     );
// };

// export default TaskForm;

import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const TaskForm = ({ fetchTasks, onTaskCreated }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        dueDate: "",
        priority: "Low",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axiosInstance.post(`/tasks`, formData);
            if (onTaskCreated) onTaskCreated();
            navigate(`/tasks/view/${data._id}`);
        } catch (error) {
            console.error("Failed to save task:", error.response?.data || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-100 shadow mx-auto p-4 rounded max-w-md">
            <h2 className="mb-4 font-bold text-lg">Create Task</h2>
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
                Save Task
            </button>
        </form>
    );
};

export default TaskForm;
