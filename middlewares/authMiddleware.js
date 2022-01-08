import AppErrors from "../utils/appErrors.js";
import TokensServices from "../services/tokensServices.js";

export default function authMiddleware(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return next(AppErrors.unauthorized("Пользователь не авторизован"));
    }

    const token = authorization.split(" ")[1];
    const userData = TokensServices.verifyToken(token, "access");

    if (!userData) {
      return next(AppErrors.unauthorized("Пользователь не авторизован"));
    }

    req.user = userData;

    return next();
  } catch (err) {
    return next(AppErrors.unauthorized("Ошибка авторизации"));
  }
}
