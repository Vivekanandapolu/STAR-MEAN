import express from "express";
import { UsersController } from "../controllers/users.controller.js";
import { userValidator } from "../middlewares/userValidator.js";
import { TokenController } from "../services/generateToken.js";

const userController = new UsersController();
const tokenController = new TokenController();

const userRoutes = express.Router();

userRoutes.post("/create", userValidator, userController.createUser);
userRoutes.post("/login", userController.loginUser);
userRoutes.put(
  "/change_password",
  tokenController.verifyToken,
  userController.changePassword
);

export default userRoutes;
