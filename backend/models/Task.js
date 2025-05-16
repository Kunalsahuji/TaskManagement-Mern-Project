const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ["pending", "completed"], default: "pending" },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "low" },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId, ref: "User", required: true,
        required: true,
    },
});

module.exports = mongoose.model("Task", TaskSchema);
