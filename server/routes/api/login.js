const express = require('express');
const auth = require('../../utilities/auth');
const { getToken } = require('../../utilities/jwt');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Log in' });
});

router.post('/', auth.authenticate('local', { session: false }), (req, res) => {
  const { email } = req.body;
  const token = getToken(email);

  res.json({ token });
});

module.exports = router;
