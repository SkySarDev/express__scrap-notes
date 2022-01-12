import { NoteCategoryModel } from "../models/noteCategoryModel.js";

class NoteCategory {
  getAll(userId) {
    return NoteCategoryModel.find({ userId });
  }

  create(userId, name) {
    return NoteCategoryModel.create({ userId, name });
  }

  delete(id) {
    return NoteCategoryModel.findByIdAndDelete(id);
  }

  update(id, name) {
    return NoteCategoryModel.findByIdAndUpdate(id, { name });
  }
}

export const NoteCategoryServices = new NoteCategory();
