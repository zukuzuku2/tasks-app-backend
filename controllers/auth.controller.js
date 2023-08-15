const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const { NODE_ENV, JWT_SECRET } = process.env;

const register = (req, res, next) => {
  const { email, password, username } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        const error = new Error('El email ya existe');
        error.statusCode = 400;
        next(error);
      }
    })
    .catch(() => {
      const error = new Error('Error al crear el usuario');
      error.statusCode = 500;
      next(error);
    });

  bcrypt.hash(password, 10).then((hash) => {
    const user = new User({
      username,
      email,
      password: hash,
    });
    user
      .save()
      .then((userData) => {
        const token = jwt.sign(
          { _id: userData._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          {
            expiresIn: '1d',
          },
        );
        res.json({
          id: userData._id,
          username: userData.username,
          email: userData.email,
          token,
        });
      })
      .catch(() => {
        const error = new Error('Error al crear el usuario');
        error.statusCode = 500;
        next(error);
      });
  });
};
const login = (req, res, next) => {
  // password = ZukuZuku
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        {
          expiresIn: '1d',
        },
      );
      res.json({
        id: user._id,
        username: user.username,
        email: user.email,
        token,
      });
    })
    .catch(() => {
      const err = new Error('No autorizado');
      err.statusCode = 401;
      next(err);
    });
};
const logout = (req, res, next) => {
  req.headers.authorization = '';
  res.status(204).send();
};
const profile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.json({
        id: user._id,
        username: user.username,
        email: user.email,
      });
    })
    .catch(() => {
      const err = new Error('Usuario no encontrado');
      err.statusCode = 400;
      next(err);
    });
};

module.exports = {
  register,
  login,
  logout,
  profile,
};
