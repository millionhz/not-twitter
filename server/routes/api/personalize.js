const express = require('express');
const { updateName, updateBio } = require('../../utilities/database');

const router = express.Router();

router.post('/name', (req, res, next) => {
  const { user_id: userId } = req.user;
  const { newName } = req.body;
  updateName(userId, newName)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
      next(err);
    });
});

router.post('/bio', (req, res, next) => {
  const { user_id: userId } = req.user;
  const { newBio } = req.body;
  updateBio(userId, newBio)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
      next(err);
    });
});

module.exports = router;
