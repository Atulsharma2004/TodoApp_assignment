// require("dotenv").config();
import "dotenv/config";
import express from "express";
import apiRoute, { apiProtected } from "./routes/api.js";
import { DB_CONNECT } from "./utils/constants.js";
import mongoose from "mongoose";
import AuthMiddleware from "./middlewares/AuthMiddleware.js";
import cors from "cors";
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// Import routes
// const authRoutes = require("./routes/authRoutes");
// const taskRoutes = require("./routes/taskRoutes");
// const subtaskRoutes = require("./routes/subtaskRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use("/api/", apiRoute);
app.use("/api/", AuthMiddleware, apiProtected);

// Middleware
// app.use(cors());
// app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(DB_CONNECT, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// // Routes
// app.use("/auth", authRoutes);
// app.use("/tasks", taskRoutes);
// app.use("/subtasks", subtaskRoutes);

// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "Something went wrong!" });
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
