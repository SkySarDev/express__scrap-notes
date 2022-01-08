import mongoose from "mongoose";

const { Schema, model } = mongoose;

const NoteCategorySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "users" },
  name: { type: String, required: true },
});

export const NoteCategoryModel = model("note-categories", NoteCategorySchema);
