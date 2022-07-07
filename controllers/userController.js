import { validationResult } from "express-validator";

import * as config from "../config.js";
import AppErrors from "../utils/appErrors.js";
import { UserServices } from "../services/usersServices.js";

class User {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(
          AppErrors.badRequest("Ошибка при регистрации", errors.array())
        );
      }

      const { email, password, login } = req.body;
      const formattedEmail = email.toLowerCase();
      const newUserTokens = await UserServices.registration(
        formattedEmail,
        password,
        login
      );

      return res
        .cookie(
          "snRefreshToken",
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
      const formattedEmail = email.toLowerCase();
      const userData = await UserServices.login(formattedEmail, password);

      return res
        .cookie("snRefreshToken", userData.refreshToken, config.COOKIE_OPTIONS)
        .json({ token: userData.accessToken, login: userData.login });
    } catch (err) {
      return next(err);
    }
  }

  async logout(req, res, next) {
    try {
      const { snRefreshToken } = req.cookies;

      if (!snRefreshToken) {
        return next(AppErrors.unauthorized("Неверный токен!"));
      }

      await UserServices.logout(snRefreshToken);

      return res
        .clearCookie("snRefreshToken")
        .json({ message: "Пользователь разлогинен!" });
    } catch (err) {
      return next(err);
    }
  }

  async refresh(req, res, next) {
    try {
      const { snRefreshToken } = req.cookies;
      const newTokens = await UserServices.refresh(snRefreshToken);

      return res
        .cookie("snRefreshToken", newTokens.refreshToken, config.COOKIE_OPTIONS)
        .json({ token: newTokens.accessToken });
    } catch (err) {
      return next(err);
    }
  }

  async auth(req, res, next) {
    try {
      const { login, email } = await UserServices.auth(req.user.email);

      return res.json({ login, email });
    } catch (err) {
      return next(err);
    }
  }
}

export const UserController = new User();
