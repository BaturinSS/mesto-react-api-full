// const allowedCors = [
//   'https://novo.nomoredomains.xyz',
//   'http://novo.nomoredomains.xyz',
//   'localhost:3000',
// ];

module.exports = ((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
