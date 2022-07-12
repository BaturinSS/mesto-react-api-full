const cors = require('cors');

const allowlist = () => {
  const { NODE_ENV } = process.env;
  let list = [];
  if (NODE_ENV) {
    list = [
      'https://server-mesto.ru',
      'https://www.server-mesto.ru',
    ];
  } else {
    list = [
      'https://server-mesto.ru',
      'https://www.server-mesto.ru',
      'http://localhost:3000',
      'http://localhost:3001',
    ];
  }
  return list;
};

const allowedCors = {
  origin: allowlist(),
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

module.exports = cors(allowedCors);
