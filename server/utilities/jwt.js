const jwt = require('jsonwebtoken');

const getToken = (email) =>
  jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

module.exports = { getToken };
