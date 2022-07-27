//* Импортируем модуль jsonwebtoken для верификации токена
const jwt = require('jsonwebtoken');

//* Импорт констант
const { keywordTokenDev } = require('../utils/constants');

//* Импорт классового элемента ошибки
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
<<<<<<< Updated upstream
  const { NODE_ENV, JWT_SECRET = keywordTokenDev } = process.env;
=======
  const { NODE_ENV, JWT_SECRET } = process.env;
>>>>>>> Stashed changes

  const checkedToken = (token) => {
    if (!token) {
      throw new AuthError();
    }
    try {
      return jwt.verify(
        token,
        NODE_ENV === 'production'
          ? JWT_SECRET
          : 'keyword-for-token-generation',
      );
    } catch (err) {
      throw new AuthError();
    }
  };

  if (NODE_ENV) {
    const tokenJwt = req.cookies.jwt;
    req.user = checkedToken(tokenJwt);
  } else {
    const { authorization } = req.headers;
    const tokenJwt = (authorization && authorization.startsWith('Bearer ')) ? authorization.substring(7) : null;
    req.user = checkedToken(tokenJwt);
  }

  next();
};
