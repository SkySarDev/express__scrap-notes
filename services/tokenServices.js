import jwt from "jsonwebtoken";

import * as config from "../config.js";
import { TokenModel } from "../models/tokenModel.js";

class Token {
  generateTokens(id, email) {
    const accessToken = jwt.sign({ id, email }, config.SECRET_ACCESS_KEY, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ id, email }, config.SECRET_REFRESH_KEY, {
      expiresIn: "30d",
    });

    return { accessToken, refreshToken };
  }

  async saveRefreshToken(userId, userEmail, refreshToken) {
    const tokenInfo = await TokenModel.findOne({ userId });

    if (tokenInfo) {
      tokenInfo.refreshToken = refreshToken;
      return tokenInfo.save();
    }

    return await TokenModel.create({ userId, userEmail, refreshToken });
  }

  verifyToken(token, type) {
    try {
      let secretKey = "";

      if (type === "access") {
        secretKey = config.SECRET_ACCESS_KEY;
      } else if (type === "refresh") {
        secretKey = config.SECRET_REFRESH_KEY;
      }

      return jwt.verify(token, secretKey);
    } catch (err) {
      return null;
    }
  }

  async removeToken(refreshToken) {
    try {
      return await TokenModel.deleteOne({ refreshToken });
    } catch (err) {
      return null;
    }
  }

  async checkToken(refreshToken) {
    try {
      return await TokenModel.findOne({ refreshToken });
    } catch (err) {
      return null;
    }
  }
}

export const TokenServices = new Token();
