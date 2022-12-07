const express = require('express');
const auth = require('../../utilities/auth');
const {
  searchName,
  getUserDataById,
  toggleFollow,
  updatePassword,
  updateProfile,
} = require('../../utilities/database');

const router = express.Router();

router.patch('/', (req, res, next) => {
  const { userName, userBio } = req.body;
  const { user_id: userId } = req.user;

  updateProfile(userId, userName, userBio)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
      next(err);
    });
});

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

  if (parseInt(userId, 10) === parseInt(myUserId, 10)) {
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

router.patch(
  '/password',
  (req, res, next) => {
    const { email } = req.user;
    req.body.email = email;
    next();
  },
  auth.authenticate('local', { session: false }),
  (req, res, next) => {
    const { user_id: userId } = req.user;
    const { newPassword } = req.body;

    updatePassword(userId, newPassword)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
        next(err);
      });
  }
);

module.exports = router;
