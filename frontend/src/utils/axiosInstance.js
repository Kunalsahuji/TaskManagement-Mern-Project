import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "/api", 
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor: Attach Authorization token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Handle 401 Unauthorized
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("authToken");
            window.location.href = "/login"; // or use your router to navigate
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
