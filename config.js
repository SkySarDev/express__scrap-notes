import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const DB_URL = process.env.DB_URL;
export const SITE_URL = process.env.SITE_URL;
export const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
export const SECRET_REFRESH_KEY = process.env.SECRET_REFRESH_KEY;

export const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 30 * 24 * 60 * 60 * 1000,
};
