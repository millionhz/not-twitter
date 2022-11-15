const express = require('express');
const auth = require('../../utilities/auth');

const router = express.Router();

router.get('/', auth.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: `Authenticated ${req.user.email}` });
});

module.exports = router;
