import { Router } from "express";

import registrationValidator from "../middlewares/registrationValidatorMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import UsersController from "../controllers/usersController.js";

const router = Router();

router
  .post("/registration", registrationValidator(), UsersController.registration)
  .post("/login", UsersController.login)
  .get("/logout", UsersController.logout)
  .get("/refresh", UsersController.refresh)
  .get("/auth", authMiddleware, UsersController.auth);

export default router;
