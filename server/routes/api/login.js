const express = require('express');
const auth = require('../../utilities/auth');
const { getToken } = require('../../utilities/jwt');

const router = express.Router();

router.post('/', auth.authenticate('local', { session: false }), (req, res) => {
  const { user_id: userId } = req.user;

  const token = getToken(userId);
  res.json({ token });
});

module.exports = router;
