const express = require('express');
const {
  insertLike,
  getLikesById,
  deleteLike,
} = require('../../utilities/database');

const router = express.Router();

router.get('/', (req, res, next) => {
  const { postId } = req.body;

  getLikesById(postId)
    .then((data) => {
      res.json({ count: data.length });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
      next(err);
    });
});

router.post('/', async (req, res, next) => {
  const { user_id: userId } = req.user;
  const { postId } = req.body;

  try {
    await insertLike(postId, userId);
    res.sendStatus(200);
  } catch (err) {
    if (err.errno === 1062) {
      try {
        await deleteLike(postId, userId);
        res.sendStatus(200);
      } catch (err) {
        res.status(500).json({ message: err.message });
        next(err);
      }
    }
  }
});

module.exports = router;
