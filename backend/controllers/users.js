//* Импортируем модуль jsonwebtoken для создания токена
const jwt = require('jsonwebtoken');

//* Импортируем модуль bcrypt для хеширования пароля
const bcrypt = require('bcryptjs');

//* Импорт модели данных
const User = require('../models/user');

//* Импорт констант
const {
  codCreated, textErrorNoUser,
  textErrorValidation, textErrorConflict,
} = require('../utils/constants');

//* Импорт классового элемента ошибки
const NotFoundError = require('../errors/NotFoundError');

//* Импорт классового элемента ошибки
const ValidationError = require('../errors/ValidationError');

//* Импорт классового элемента ошибки
const ConflictError = require('../errors/ConflictError');

//* Экспорт функций в routes
module.exports.getUsers = (req, res, next) => {
  User
    .find({})
    .then((users) => {
      res
        .send(users);
    })
    .catch(next);
};
module.exports.getUser = (req, res, next) => {
  User
    .findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(textErrorNoUser);
      }
      res
        .send(user);
    })
    .catch(next);
};
module.exports.updateUser = (req, res, next) => {
  User
    .findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(textErrorNoUser);
      }
      res
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(textErrorValidation));
      } else {
        next(err);
      }
    });
};
module.exports.updateUserAvatar = (req, res, next) => {
  User
    .findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(textErrorNoUser);
      }
      res
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(textErrorValidation));
      } else {
        next(err);
      }
    });
};
//* Контроллер добавления в базу нового пользователя
//* router.post('/sign-up', createUser);
module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      req.body.password = hash;
      User
        .create(req.body)
        .then((user) => {
          if (!user) {
            throw new NotFoundError(textErrorNoUser);
          }
          res
            .status(codCreated)
            .send({
              name: user.name,
              about: user.about,
              avatar: user.avatar,
              email: user.email,
              _id: user._id,
            });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new ValidationError(textErrorValidation));
          } else if (err.name === 'MongoServerError') {
            next(new ConflictError(textErrorConflict));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};
//* Контроллер аутентификации(вход в приложение)
//* router.post('/sign-in', login)
module.exports.login = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  User
    .findUserByCredentials(req.body)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production'
          ? JWT_SECRET
          : 'b83c3dde3d27152bd25553962',
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
          secure: false,
        })
        .send({ message: 'Всё верно!' });
    })
    .catch(next);
};
module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(textErrorNoUser);
      }
      res
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(textErrorValidation));
      } else {
        next(err);
      }
    });
};
