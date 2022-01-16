import { NoteItemModel } from "../models/noteItemModel.js";
import AppErrors from "../utils/appErrors.js";

class NoteItem {
  getAll(userId) {
    if (!userId) {
      throw AppErrors.badRequest("Ошибка получения списка заметок");
    }

    return NoteItemModel.find({ userId });
  }

  create(itemContent, userId) {
    if (!itemContent || !userId) {
      throw AppErrors.badRequest("Ошибка создания заметки");
    }

    const { title, body, categoryId } = itemContent;
    const dateCreate = Date.now();

    return NoteItemModel.create({
      title,
      body,
      categoryId,
      userId,
      dateCreate,
    });
  }

  delete(id) {
    return NoteItemModel.findByIdAndDelete(id);
  }

  deleteAllByCategory(categoryId) {
    return NoteItemModel.deleteMany({ categoryId });
  }

  update(id, data) {
    const { title, body } = data;
    return NoteItemModel.findByIdAndUpdate(id, { title, body });
  }
}

export const NoteItemServices = new NoteItem();
