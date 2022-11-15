const jwt = require('jsonwebtoken');

const getToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

module.exports = { getToken };
