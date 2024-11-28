const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

// logger 
const logger = require('morgan')
app.use(logger("tiny"))


// body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const cookieparser = require('cookie-parser')
app.use(cookieparser())
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Global error-handling middleware
app.use((err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`);

    // Send error response
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
