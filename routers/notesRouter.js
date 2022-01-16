import { Router } from "express";

import { NoteCategoryController } from "../controllers/noteCategoryController.js";
import { NoteItemController } from "../controllers/noteItemController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router
  .get("/categories", authMiddleware, NoteCategoryController.getAll)
  .post("/categories", authMiddleware, NoteCategoryController.create)
  .delete("/categories/:id", authMiddleware, NoteCategoryController.delete)
  .put("/categories/:id", authMiddleware, NoteCategoryController.update)

  .get("/items", authMiddleware, NoteItemController.getAll)
  .post("/items", authMiddleware, NoteItemController.create)
  .delete("/items/:id", authMiddleware, NoteItemController.delete)
  .put("/items/:id", authMiddleware, NoteItemController.update);

export default router;
