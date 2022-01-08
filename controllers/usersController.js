import { validationResult } from "express-validator";

import * as config from "../config.js";
import AppErrors from "../utils/appErrors.js";
import UsersServices from "../services/usersServices.js";

class UsersController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(
          AppErrors.badRequest("Ошибка при регистрации", errors.array())
        );
      }

      const { email, password, login } = req.body;
      const newUserTokens = await UsersServices.registration(
        email,
        password,
        login
      );

      return res
        .cookie(
          "refreshToken",
          newUserTokens.refreshToken,
          config.COOKIE_OPTIONS
        )
        .json({ token: newUserTokens.accessToken, login });
    } catch (err) {
      return next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await UsersServices.login(email, password);

      return res
        .cookie("refreshToken", userData.refreshToken, config.COOKIE_OPTIONS)
        .json({ token: userData.accessToken, login: userData.login });
    } catch (err) {
      return next(err);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) {
        return next(AppErrors.unauthorized("Неверный токен!"));
      }

      await UsersServices.logout(refreshToken);

      return res
        .clearCookie("refreshToken")
        .json({ message: "Пользователь разлогинен!" });
    } catch (err) {
      return next(err);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const newTokens = await UsersServices.refresh(refreshToken);

      return res
        .cookie("refreshToken", newTokens.refreshToken, config.COOKIE_OPTIONS)
        .json({ token: newTokens.accessToken });
    } catch (err) {
      return next(err);
    }
  }

  async auth(req, res, next) {
    try {
      const { login, email } = await UsersServices.auth(req.user.email);

      return res.json({ login, email });
    } catch (err) {
      return next(err);
    }
  }
}

export default new UsersController();
