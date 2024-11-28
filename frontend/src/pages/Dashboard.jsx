import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import axiosInstance from "../utils/axiosInstance";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = useCallback(async () => {
        try {
            const { data } = await axiosInstance.get("/tasks");
            console.log(data)
            setTasks(data);
        } catch (error) {
            console.error("Failed to fetch tasks:", error.response?.data || error.message);
        }
    }, []);

    return (
        <div className="p-4">

            {/* Task Form Component */}
            <TaskForm fetchTasks={fetchTasks} />

            {/* Task List Component */}
            <TaskList tasks={tasks} fetchTasks={fetchTasks} />
        </div>
    );
};

export default Dashboard;