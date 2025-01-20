import express from "express";
import { CourseController } from "../controllers/course.controller.js";
import { courseValidation } from "../middlewares/courseValidator.js";
import {
  tokenAndRoleMiddlewares,
  TokenController,
} from "../services/generateToken.js";
import { checkRole } from "../middlewares/roleValidatio.js";

const courseRoutes = express.Router();
const courseController = new CourseController();

const tokenController = new TokenController();
//Course collection routes

const middlewares = [
  tokenController.verifyToken,
  checkRole("admin"),
  courseValidation,
];

// const tokenAndRoleMiddleWared

courseRoutes.post("/create", middlewares, courseController.createCourse);
courseRoutes.get("/", courseController.getAllCourses);
courseRoutes.put("/update/:id", middlewares, courseController.updateCourse);
courseRoutes.delete(
  "/delete/:id",
  tokenController.verifyToken,
  checkRole("admin"),
  courseController.deleteCourse
);
courseRoutes.get("/data", courseController.getCourseData);

export default courseRoutes;
