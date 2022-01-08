import { NoteCategoryModel } from "../models/noteCategoryModel.js";

class NoteCategory {
  async getAll(req, res, next) {
    try {
      const userId = req.user.id;
      const categoryList = await NoteCategoryModel.find({ userId });

      return res.json(categoryList);
    } catch (err) {
      return next(err);
    }
  }

  async create(req, res, next) {
    try {
      const userId = req.user.id;
      const { name } = req.body;
      const request = await NoteCategoryModel.create({ userId, name });

      return res.json(request);
    } catch (err) {
      return next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const request = await NoteCategoryModel.findByIdAndDelete(id);

      return res.json(request);
    } catch (err) {
      return next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const request = await NoteCategoryModel.findByIdAndUpdate(id, { name });

      return res.json(request);
    } catch (err) {
      return next(err);
    }
  }
}

export const NoteCategoryController = new NoteCategory();
