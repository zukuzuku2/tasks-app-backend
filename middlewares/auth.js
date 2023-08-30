const jwt = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    return res.status(401).send({ error: 'No autorizado' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (e) {
    const err = new Error('No autorizado');
    err.statusCode = 401;
    next(err);
  }
  req.user = payload;
  return next();
};

module.exports = { auth };
