const express = require('express');
const { insertUser } = require('../../utilities/database');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Sign up' });
});

router.post('/', (req, res, next) => {
  const { email, password } = req.body;
  insertUser(email, password)
    .then(() => {
      res.json({ message: `User ${email} created` });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
