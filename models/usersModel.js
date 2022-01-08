import mongoose from "mongoose";

const { Schema, model } = mongoose;

const Users = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
  },
});

export default model("users", Users);
