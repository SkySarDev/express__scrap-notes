import { Router } from "express";

import NoteCategoriesController from "../controllers/noteCategoriesController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router
  .get("/categories", authMiddleware, NoteCategoriesController.getAll)
  .post("/categories", authMiddleware, NoteCategoriesController.create)
  .delete("/categories/:id", NoteCategoriesController.delete)
  .put("/categories/:id", NoteCategoriesController.update);

export default router;
