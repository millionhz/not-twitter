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
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
      next(err);
    });
});

module.exports = router;
