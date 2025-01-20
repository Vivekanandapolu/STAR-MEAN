import express from "express";
import {
  multipleFileUpload,
  singleFileUpload,
  upload,
} from "../controllers/upload.controller.js";
import { TokenController } from "../services/generateToken.js";
import { checkRole } from "../middlewares/roleValidatio.js";

const fileUploadRoutes = express.Router();

const tokenController = new TokenController();

//Middleware to check the Valid Token ,Admin role
const middlewares = [tokenController.verifyToken, checkRole("admin")];

fileUploadRoutes.post(
  "/single",
  middlewares,
  upload.single("file"),
  singleFileUpload
);
fileUploadRoutes.post(
  "/multiple",
  middlewares,
  upload.array("files", 10),
  multipleFileUpload
);

export default fileUploadRoutes;
