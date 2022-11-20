const express = require('express');
const {
  insertPost,
  getPostsByUserId,
  getPostById,
} = require('../../utilities/database');
const { getPosts } = require('../../utilities/database');

const router = express.Router();

router.get('/', (req, res, next) => {
  const { userId } = req.body;

  const posts = userId ? getPostsByUserId(userId) : getPosts();

  posts
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
      next(err);
    });
});

router.get('/:postId', (req, res, next) => {
  const { postId } = req.params;

  getPostById(postId)
    .then((data) => {
      // TODO: add comments to post

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

router.post('/', (req, res, next) => {
  const { user_id: userId } = req.user;
  const { postContent } = req.body;

  insertPost(postContent, userId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
      next(err);
    });
});

module.exports = router;
