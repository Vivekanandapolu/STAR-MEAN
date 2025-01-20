import express from "express";
import { SupportController } from "../controllers/support.controller.js";
import { TokenController } from "../services/generateToken.js";

const supportController = new SupportController();
// const tokenController = new TokenController();
const supportRoutes = express.Router();

supportRoutes.post(
  "/create",
  // tokenController.verifyToken,
  supportController.createSupport
);

export default supportRoutes;
