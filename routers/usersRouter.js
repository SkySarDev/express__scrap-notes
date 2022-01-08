import { Router } from "express";

import registrationValidator from "../middlewares/registrationValidatorMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { UserController } from "../controllers/userController.js";

const router = Router();

router
  .post("/registration", registrationValidator(), UserController.registration)
  .post("/login", UserController.login)
  .get("/logout", UserController.logout)
  .get("/refresh", UserController.refresh)
  .get("/auth", authMiddleware, UserController.auth);

export default router;
