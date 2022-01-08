import mongoose from "mongoose";

const { Schema, model } = mongoose;

const NoteItemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "note-categories",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

export const NoteItemModel = model("note-items", NoteItemSchema);
