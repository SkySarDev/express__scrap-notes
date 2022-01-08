import mongoose from "mongoose";

const { Schema, model } = mongoose;

const NoteCategoriesModel = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "UsersModel" },
  name: { type: String, required: true },
});

export default model("note-categories", NoteCategoriesModel);
