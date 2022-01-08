export default function (err, req, res, next) {
  if (!err.status || !err.message) {
    err.status = 500;
    err.message = "Ошибка сервера";
  }

  console.log(err);

  return res
    .status(err.status)
    .json({ message: err.message, errors: err.errors || [] });
}
