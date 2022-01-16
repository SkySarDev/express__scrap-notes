import { NoteCategoryServices } from "../services/noteCategoryServices.js";
import { NoteItemServices } from "../services/noteItemServices.js";
import AppErrors from "../utils/appErrors.js";

class NoteCategory {
  async getAll(req, res, next) {
    try {
      const categoryList = await NoteCategoryServices.getAll(req.user.id);

      if (!categoryList) {
        return next(AppErrors.badRequest("Ошибка получения списка категорий!"));
      }

      return res.json(categoryList);
    } catch (err) {
      return next(err);
    }
  }

  async create(req, res, next) {
    try {
      const response = await NoteCategoryServices.create(
        req.user.id,
        req.body.title
      );

      if (!response) {
        return next(AppErrors.badRequest("Ошибка создания категории!"));
      }

      return res.json(response);
    } catch (err) {
      return next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const [responseDeleteCategory, responseDeleteNoteItems] =
        await Promise.all([
          NoteCategoryServices.delete(id),
          NoteItemServices.deleteAllByCategory(id),
        ]);

      if (!responseDeleteCategory || !responseDeleteNoteItems) {
        return next(AppErrors.badRequest("Ошибка удаления категории!"));
      }

      return res.json(responseDeleteCategory);
    } catch (err) {
      return next(err);
    }
  }

  async update(req, res, next) {
    try {
      const response = await NoteCategoryServices.update(
        req.params.id,
        req.body.title
      );

      if (!response) {
        return next(AppErrors.badRequest("Ошибка редактирования категории!"));
      }

      return res.json(response);
    } catch (err) {
      return next(err);
    }
  }
}

export const NoteCategoryController = new NoteCategory();
