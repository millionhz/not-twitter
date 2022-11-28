const express = require('express');
const { searchPost, searchName } = require('../../utilities/database');

const router = express.Router();

router.post('/post', (req, res, next) => {
  const { word } = req.body;

  searchPost(word)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
      next(err);
    });
});

router.post('/user', (req, res, next) => {
  const { inputName } = req.body;

  searchName(inputName)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
      next(err);
    });
});

module.exports = router;
