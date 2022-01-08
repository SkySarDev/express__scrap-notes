import { Router } from "express";

import { NoteCategoryController } from "../controllers/noteCategoryController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router
  .get("/categories", authMiddleware, NoteCategoryController.getAll)
  .post("/categories", authMiddleware, NoteCategoryController.create)
  .delete("/categories/:id", authMiddleware, NoteCategoryController.delete)
  .put("/categories/:id", authMiddleware, NoteCategoryController.update);

export default router;
