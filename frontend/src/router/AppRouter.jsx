import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import UpdateTask from "../components/UpdateTask";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import ViewTaskPage from "../pages/ViewTaskPage";

const AppRouter = () => {
    return (
        <Router>
            <Navbar />
            <div className="mx-auto container">
                <Routes>
                    <Route path="/" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />

                    <Route path="/tasks/new" element={
                        <PrivateRoute>
                            <TaskForm />
                        </PrivateRoute>
                    } />
                    <Route path="/tasks/:id/edit" element={
                        <PrivateRoute>
                            <TaskForm />
                        </PrivateRoute>
                    } />
                    <Route path="/dashboard" element={<PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>} />

                    <Route path="/tasks/view/:id" element={
                        <PrivateRoute>
                            <ViewTaskPage />
                        </PrivateRoute>
                    } />

                    <Route path="/tasks/update/:id" element={
                        <PrivateRoute>
                            <UpdateTask />
                        </PrivateRoute>
                    } />
                </Routes>
            </div>
        </Router>
    );
};

export default AppRouter;
