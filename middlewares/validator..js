const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (e) {
    const err = new Error(e.errors.map((element) => element.message));
    err.statusCode = 400;
    next(err);
  }
};

module.exports = {
  validateSchema,
};
