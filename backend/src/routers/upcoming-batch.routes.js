import express from "express";
import { UpcomingBacthController } from "../controllers/upcoming-batch.controller.js";
import { batchValidator } from "../middlewares/batchValidation.js";
import { TokenController } from "../services/generateToken.js";
import { checkRole } from "../middlewares/roleValidatio.js";

const batchController = new UpcomingBacthController();

const tokenController = new TokenController();

//Middleware to check the Valid Token ,Admin role
const middlewares = [tokenController.verifyToken, checkRole("admin")];

const batchRoutes = express.Router();

batchRoutes.post(
  "/create",
  middlewares,
  batchValidator,
  batchController.createBatch
);
batchRoutes.get("/", batchController.getAllBatchs);

export default batchRoutes;
