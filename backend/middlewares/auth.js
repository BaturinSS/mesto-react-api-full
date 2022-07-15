//* Импортируем модуль jsonwebtoken для верификации токена
const jwt = require('jsonwebtoken');

//* Импорт констант
const { textErrorAuthRequired, keywordTokenDev } = require('../utils/constants');

//* Импорт классового элемента ошибки
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET = keywordTokenDev } = process.env;

  const checkedToken = (token) => {
    if (!token) {
      throw new AuthError(textErrorAuthRequired);
    }
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (err) {
      throw new AuthError(textErrorAuthRequired);
    }
  };

  if (NODE_ENV) {
    const tokenJwt = req.cookies.jwt;
    req.user = checkedToken(tokenJwt);
  } else {
    const { authorization } = req.headers;
    const tokenJwt = (authorization && authorization.startsWith('Bearer '))
      ? authorization.substring(7)
      : null;
    req.user = checkedToken(tokenJwt);
  }

  next();
};
