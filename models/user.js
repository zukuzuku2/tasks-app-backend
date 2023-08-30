const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'No es una dirección email válida',
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Credenciales incorrectas'));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Credenciales incorrectas'));
        }
        return user;
      });
    });
};

module.exports = mongoose.model('User', userSchema);
