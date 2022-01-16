import { NoteItemServices } from "../services/noteItemServices.js";
import AppErrors from "../utils/appErrors.js";

class NoteItem {
  async getAll(req, res, next) {
    try {
      const noteItems = await NoteItemServices.getAll(req.user.id);

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
        return next(AppErrors.badRequest("Заметка не найдена!"));
      }

      return res.json(deletedNote);
    } catch (err) {
      return next(err);
    }
  }

  async update(req, res, next) {
    try {
      const response = await NoteItemServices.update(req.params.id, req.body);

      if (!response) {
        return next(AppErrors.badRequest("Ошибка редактирования заметки!"));
      }

      return res.json(response);
    } catch (err) {
      return next(err);
    }
  }
}

export const NoteItemController = new NoteItem();
