const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    timestamp: { type: Date, required: true }
});

module.exports = mongoose.model("Task", TaskSchema);