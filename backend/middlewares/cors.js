const cors = require('cors');

let allowlist = [
  'https://server-mesto.ru',
  'https://www.server-mesto.ru',
];

const list = () => {
  const { NODE_ENV } = process.env;
  if (!NODE_ENV) {
    allowlist = [
      ...allowlist,
      'http://localhost:3000',
      'http://localhost:3001',
    ];
  }
  return allowlist;
};

const allowedCors = {
  origin: list(),
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

module.exports = cors(allowedCors);
