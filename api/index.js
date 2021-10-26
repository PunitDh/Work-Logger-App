const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT;
const Task = require("./models/Task");

const origin = { origin: process.env.CLIENT_URL };

app.use(express.static(path.join(__dirname, "client", "build")))
app.use(cors(origin));
app.use(express.json());

// Connect to database
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Database connection successful"))
    .catch((error) => console.log("Database connection failed", error));

// Routes
app.get("/tasks", async (req, res) => {
    console.log("Started GET /tasks at", new Date().toString());
    try {
        tasks = await Task.find();
        res.status(200).json(tasks);
        console.log("Completed 200 OK");
    } catch (err) {
        res.status(500).json(err);
        console.log("500 Internal Server Error", err);
    }
});

app.post("/tasks", async (req, res) => {
    console.log("Started POST /tasks at", new Date().toString());
    const newTask = new Task(req.body);
    console.log(req.body);
    try {
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
        console.log("Completed 201 Created");
    } catch (err) {
        res.status(500).json(err);
        console.log("500 Internal Server Error", err);
    }
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Run the server on specified PORT
app.listen(PORT, () => console.log("Listening on port", PORT));