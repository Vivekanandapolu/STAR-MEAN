import express from "express";
import { ContactCourseController } from "../controllers/contact.course.controller.js";

const contactCourseRoutes = express.Router();
const contactController = new ContactCourseController();

contactCourseRoutes.post("/create", contactController.addContactCourse);

export default contactCourseRoutes;
