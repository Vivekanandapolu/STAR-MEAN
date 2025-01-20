import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import "./src/validators/env.validator.js";
import path from "path";
import helmet from "helmet";
import fs from "fs";
import { connectDB } from "./src/configs/mongoose.connect.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import courseRoutes from "./src/routers/course.routes.js";
import fileUploadRoutes from "./src/routers/upload.routes.js";
import cors from "cors";
import contactCourseRoutes from "./src/routers/contact.course.routes.js";
import batchRoutes from "./src/routers/upcoming-batch.routes.js";
import userRoutes from "./src/routers/users.routes.js";
import supportRoutes from "./src/routers/support.routes.js";
import mongoose from "mongoose";

//Start of the Application

const app = express();

// load all enviranment variables
dotenv.config();

//Allow cors for api's access to the external devices
app.use(cors());
app.use(helmet());

//Parsing the request & response body in json fomrat
app.use(express.json());

const port = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadPath = path.join(__dirname, "/uploads");

//Check the uploads folder is exist or not
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

//Serve statice files
app.use(express.static(uploadPath));

app.use("/api/auth/user", userRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/upload", fileUploadRoutes);
app.use("/api/course-contact", contactCourseRoutes);
app.use("/api/batch", batchRoutes);

//Globalized error handle
app.use(errorHandler);

//Port Listening on 5000
const server = app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on port ${port}`);
});

// Graceful shutdown function
const gracefulShutdown = async (signal) => {
  console.log(`Received ${signal}. Shutting down gracefully...`);

  // Close server
  server.close(() => {
    console.log("HTTP server closed.");
  });

  // Close database connection
  await mongoose.connection.close(false);
  console.log("Database connection closed.");

  // Exit process
  process.exit(0);
};

// Process Handlers
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  gracefulShutdown("uncaughtException");
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  gracefulShutdown("unhandledRejection");
});

process.on("exit", (code) => {
  console.log(`Process exited with code: ${code}`);
});
