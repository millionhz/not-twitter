const express = require('express');
const { searchName } = require('../../utilities/database');

const router = express.Router();

router.post('/search', (req, res, next) => {
  const { name } = req.body;

  searchName(name)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
      next(err);
    });
});

module.exports = router;
