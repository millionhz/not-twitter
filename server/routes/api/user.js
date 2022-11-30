const express = require('express');
const {
  searchName,
  getUserDataById,
  toggleFollow,
} = require('../../utilities/database');

const router = express.Router();

router.get('/:userId', (req, res, next) => {
  const { userId } = req.params;
  const { user_id: myUserId } = req.user;

  getUserDataById(userId, myUserId)
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
      next(err);
    });
});

router.post('/follow', (req, res, next) => {
  const { userId } = req.body;
  const { user_id: myUserId } = req.user;

  if (userId === myUserId) {
    res.status(400).json({ message: 'You cannot follow yourself' });
    return;
  }

  toggleFollow(userId, myUserId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
      next(err);
    });
});

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
