export default function (err, req, res, next) {
  if (!err.status || !err.message) {
    err.status = 500;
    err.message = "Ошибка сервера";
  }

  return res
    .status(err.status)
    .json({ message: err.message, errorsArray: err.errorsArray || [] });
}
