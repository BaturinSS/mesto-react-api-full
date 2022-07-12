const cors = require('cors');

const allowedCors = {
  origin: [
    'http://localhost:3000',
    'https://localhost:3000',
  ],
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

module.exports = cors(allowedCors);

// origin: [
//   'https://msprod.nomoredomains.xyz',
//   'http://msprod.nomoredomains.xyz',
//   'http://localhost:3000',
//   'http://localhost:3001',
// ],
