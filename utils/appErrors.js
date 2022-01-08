class AppErrors {
  badRequest(message, errors = []) {
    return {
      status: 400,
      message,
      errors,
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
