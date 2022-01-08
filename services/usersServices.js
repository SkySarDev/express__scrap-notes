import bcrypt from "bcryptjs";

import UsersModel from "../models/usersModel.js";
import AppErrors from "../utils/appErrors.js";
import TokenServices from "../services/tokensServices.js";

class UsersServices {
  async registration(email, password, login) {
    const user = await UsersModel.findOne({ email });

    if (user) {
      throw AppErrors.badRequest("Пользователь с таким email уже существует!");
    }

    const hashPassword = bcrypt.hashSync(password, 8);
    const newUser = await UsersModel.create({
      email,
      password: hashPassword,
      login,
    });
    const tokens = TokenServices.generateTokens(newUser._id, email);

    await TokenServices.saveRefreshToken(
      newUser._id,
      email,
      tokens.refreshToken
    );

    return {
      ...tokens,
    };
  }

  async login(email, password) {
    const user = await UsersModel.findOne({ email });

    if (!user) {
      throw AppErrors.badRequest("Пользователь с таким email не найден!");
    }

    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword) {
      throw AppErrors.badRequest("Неверный пароль!");
    }

    const tokens = TokenServices.generateTokens(user._id, user.email);
    await TokenServices.saveRefreshToken(user._id, email, tokens.refreshToken);

    return {
      ...tokens,
      login: user.login,
    };
  }

  async logout(refreshToken) {
    return await TokenServices.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw AppErrors.unauthorized("Неверный токен!");
    }

    const verifiedToken = TokenServices.verifyToken(refreshToken, "refresh");
    const checkedToken = await TokenServices.checkToken(refreshToken);

    if (!verifiedToken || !checkedToken) {
      throw AppErrors.unauthorized("Неверный токен!");
    }

    const { userId, userEmail } = checkedToken;
    const newTokens = TokenServices.generateTokens(userId, userEmail);
    await TokenServices.saveRefreshToken(
      userId,
      userEmail,
      newTokens.refreshToken
    );

    return newTokens;
  }

  async auth(email) {
    const user = await UsersModel.findOne({ email });

    if (!user) {
      throw AppErrors.badRequest("Пользователь не найден!");
    }

    return user;
  }
}

export default new UsersServices();
