class AppErrors {
  badRequest(message, errorsArray = []) {
    return {
      status: 400,
      message,
      errorsArray,
    };
  }

  unauthorized(message) {
    return {
      status: 401,
      message,
    };
  }
}

export default new AppErrors();
