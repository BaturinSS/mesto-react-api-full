const cors = require('cors');

const allowedCors = {
  origin: 'https://server-mesto.ru',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

module.exports = cors(allowedCors);
