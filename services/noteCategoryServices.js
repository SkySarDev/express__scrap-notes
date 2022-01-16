import { NoteCategoryModel } from "../models/noteCategoryModel.js";

class NoteCategory {
  getAll(userId) {
    return NoteCategoryModel.find({ userId });
  }

  create(userId, title) {
    return NoteCategoryModel.create({ userId, title });
  }

  delete(id) {
    return NoteCategoryModel.findByIdAndDelete(id);
  }

  update(id, title) {
    return NoteCategoryModel.findByIdAndUpdate(id, { title });
  }
}

export const NoteCategoryServices = new NoteCategory();
