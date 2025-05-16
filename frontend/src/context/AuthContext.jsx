import { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));

    const login = async (email, password) => {
        try {
            const { data } = await axiosInstance.post("/auth/login", { email, password });
            localStorage.setItem("authToken", data.token);
            setAuthToken(data.token);
            setUser(data.user);
        } catch (error) {
            console.error("Login failed:", error.response?.data?.message || error.message);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setAuthToken(null);
        localStorage.removeItem("authToken");
    };

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            axiosInstance
                .get("/auth/verify-token", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(({ data }) => {
                    setUser(data.user);
                })
                .catch((err) => {
                    console.error("Token verification failed:", err);
                    logout();
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) return <div className="text-center py-10">Loading authentication...</div>;

    return (
        <AuthContext.Provider value={{ user, login, logout, authToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
