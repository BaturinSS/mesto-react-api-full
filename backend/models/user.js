//* Подключаем модуль для работы с базой данных в MongoDB
const mongoose = require('mongoose');

//* Импортируем модуль bcrypt для хеширования пароля
const bcrypt = require('bcryptjs');

//* Подключаем модуль для проверки данных на тип
const validatorJS = require('validator');

//* Импорт констант
const { textErrorNoValidEmailPassword } = require('../utils/constants');

//* Импорт классового элемента ошибки
const AuthError = require('../errors/AuthError');

//* Создаем схему для валидации данных в MongoDB
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь океана',
  },
  avatar: {
    type: String,
    validate: {
      validator(value) {
        return /^(https?:\/\/(www\.)?([a-zA-z0-9-]{1}[a-zA-z0-9-]*\.?)*\.{1}([a-zA-z0-9]){2,8}(\/?([a-zA-z0-9-])*\/?)*\/?([-._~:?#[]@!\$&'\(\)\*\+,;=])*)/.test(value);
      },
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validatorJS.isEmail(value),
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

//* Собственные метод модели
userSchema.statics.findUserByCredentials = ({ email, password }) => this
  .findOne({ email }).select('+password')
  .then((user) => {
    if (!user) {
      throw new AuthError(textErrorNoValidEmailPassword);
    }
    return bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          throw new AuthError(textErrorNoValidEmailPassword);
        }
        return user;
      });
  });

//* Создаем модель данных в mongoose
module.exports = mongoose.model('user', userSchema);
