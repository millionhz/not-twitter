const express = require('express');
const users = require('../../utilities/users');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Sign up' });
});

router.post('/', (req, res) => {
  users.push({
    ...req.body,
  });

  const { email } = req.body;

  res.json({ message: `User ${email} created` });
});

module.exports = router;
