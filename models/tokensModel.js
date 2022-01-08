import mongoose from "mongoose";

const { Schema, model } = mongoose;

const Tokens = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

export default model("Tokens", Tokens);
