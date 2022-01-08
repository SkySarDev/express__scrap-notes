import { NoteItemModel } from "../models/noteItemModel.js";
import AppErrors from "../utils/appErrors.js";

class NoteItem {
  getAllByCategory(categoryId) {
    if (!categoryId) {
      throw AppErrors.badRequest("Категория не найдена");
    }

    return NoteItemModel.find({ categoryId });
  }

  create(itemContent, userId) {
    if (!itemContent || !userId) {
      throw AppErrors.badRequest("Ошибка создания заметки");
    }

    const { title, body, categoryId } = itemContent;

    return NoteItemModel.create({ title, body, categoryId, userId });
  }

  delete(id) {
    return NoteItemModel.findByIdAndDelete(id);
  }
}

export const NoteItemServices = new NoteItem();
