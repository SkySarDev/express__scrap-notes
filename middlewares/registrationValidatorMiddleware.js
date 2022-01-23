import { check } from "express-validator";

export default function registrationValidator() {
  return [
    check("email").isEmail().withMessage("Некорректный email"),

    check("login").notEmpty().withMessage("Некорректный login"),

    check("password")
      .isLength({ min: 4 })
      .withMessage("Пароль не может быть короче 4 символов"),
  ];
}
