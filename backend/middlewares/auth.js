//* Импортируем модуль jsonwebtoken для верификации токена
const jwt = require('jsonwebtoken');

//* Импорт констант
const { textErrorAuthRequired } = require('../utils/constants');

//* Импорт классового элемента ошибки
const AuthError = require('../errors/AuthError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const token = req.cookies.jwt;
  if (!token) {
    throw (new AuthError(textErrorAuthRequired));
  }
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production'
        ? JWT_SECRET
        : 'b83c3dde3d27152bd25553962',
    );
  } catch (err) {
    next(new AuthError(textErrorAuthRequired));
  }
  req.user = payload;
  next();
};
