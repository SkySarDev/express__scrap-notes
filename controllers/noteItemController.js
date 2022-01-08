import { NoteItemServices } from "../services/noteItemServices.js";
import AppErrors from "../utils/appErrors.js";

class NoteItem {
  async getAllByCategory(req, res, next) {
    try {
      const noteItems = await NoteItemServices.getAllByCategory(
        req.params.categoryId
      );

      return res.json(noteItems);
    } catch (err) {
      return next(err);
    }
  }

  async create(req, res, next) {
    try {
      const newNote = await NoteItemServices.create(req.body, req.user.id);

      return res.json(newNote);
    } catch (err) {
      return next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const deletedNote = await NoteItemServices.delete(req.params.id);

      if (!deletedNote) {
        return next(AppErrors.badRequest("Заметка не найдена"));
      }

      return res.json(deletedNote);
    } catch (err) {
      return next(err);
    }
  }
}

export const NoteItemController = new NoteItem();
