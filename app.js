import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import * as config from "./config.js";

import usersRouter from "./routers/usersRouter.js";
import notesRouter from "./routers/notesRouter.js";

import errorsMiddleware from "./middlewares/errorsMiddleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: config.SITE_URL }));

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/notes", notesRouter);

app.use(errorsMiddleware);

app.get("/", (req, res) => {
  res.send("Express server");
});

const startApp = async () => {
  try {
    await mongoose.connect(config.DB_URL);

    app.listen(config.PORT, () => {
      console.log(`App listening at ${config.PORT} port`);
    });
  } catch (err) {
    console.log(err);
  }
};

startApp();
