import NoteCategoriesModel from "../models/noteCategoriesModel.js";

class NoteCategoriesController {
  async getAll(req, res, next) {
    try {
      const userId = req.user.id;
      const categoryList = await NoteCategoriesModel.find({ userId });

      return res.json(categoryList);
    } catch (err) {
      return next(err);
    }
  }

  async getOne(req, res, next) {
    try {
      const categoryList = await NoteCategoriesModel.findOne({
        _id: req.params.id,
      });

      return res.json(categoryList);
    } catch (err) {
      return next(err);
    }
  }

  async create(req, res, next) {
    try {
      const userId = req.user.id;
      const { name } = req.body;
      const request = await NoteCategoriesModel.create({ userId, name });

      return res.json(request);
    } catch (err) {
      return next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const request = await NoteCategoriesModel.findByIdAndDelete(id);

      return res.json(request);
    } catch (err) {
      return next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const request = await NoteCategoriesModel.findByIdAndUpdate(id, { name });

      return res.json(request);
    } catch (err) {
      return next(err);
    }
  }
}

export default new NoteCategoriesController();
