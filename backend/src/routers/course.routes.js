import express from "express";
import { CourseController } from "../controllers/course.controller.js";
import { courseValidation } from "../middlewares/courseValidator.js";
import { TokenController } from "../services/generateToken.js";
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

function useMiddlewares(type) {
  if (type == "post" || type == "put") {
    return [tokenController.verifyToken, checkRole("admin"), courseValidation];
  }
  if (type == "delete") {
    return [tokenController.verifyToken, checkRole("admin")];
  }
}
// const tokenAndRoleMiddleWared

courseRoutes.post(
  "/create",
  useMiddlewares("post"),
  courseController.createCourse
);
courseRoutes.get("/", courseController.getAllCourses);
courseRoutes.put(
  "/update/:id",
  useMiddlewares("put"),
  courseController.updateCourse
);
courseRoutes.delete(
  "/delete/:id",
  useMiddlewares("delete"),
  courseController.deleteCourse
);
courseRoutes.get("/data", courseController.getCourseData);

export default courseRoutes;
