const express = require('express');
const { insertComment } = require('../../utilities/database');

const router = express.Router();

router.post('/', (req, res, next) => {
  const { user_id: userId } = req.user;
  const { postId, content } = req.body;

  insertComment(postId, content, userId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
      next(err);
    });
});

module.exports = router;
