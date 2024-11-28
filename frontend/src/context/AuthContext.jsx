import { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        const { data } = await axiosInstance.post("/auth/login", { email, password });
        localStorage.setItem("authToken", data.token);
        setUser(data.user);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("authToken");
    };

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            axiosInstance
                .get("/verify-token")
                .then(({ data }) => setUser(data.user))
                .catch(() => logout());
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
