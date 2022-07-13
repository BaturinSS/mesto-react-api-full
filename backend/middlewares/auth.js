//* Импортируем модуль jsonwebtoken для верификации токена
const jwt = require('jsonwebtoken');

//* Подключаем модуль для проверки данных на тип
const validator = require('validator');

//* Импорт констант
const { textErrorAuthRequired } = require('../utils/constants');

//* Импорт классового элемента ошибки
const AuthError = require('../errors/AuthError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;

  let token;

  const checkedTokenCookies = () => {
    const tokenJwt = req.cookies.jwt;
    const validToken = validator.isJWT(tokenJwt);
    if (!tokenJwt || !validToken) {
      throw (new AuthError(textErrorAuthRequired));
    }
    token = tokenJwt;
  };

  const checkedTokenHeaders = () => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw (new AuthError(textErrorAuthRequired));
    }
    token = authorization.replace(/^\S+/, '').trim();
  };

  if (NODE_ENV) {
    checkedTokenCookies();
  } else {
    checkedTokenHeaders();
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
