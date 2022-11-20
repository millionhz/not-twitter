const express = require('express');
const { insertPost } = require('../../utilities/database');
const { getPostList } = require('../../utilities/database');

const router = express.Router();

router.get('/', (req, res, next) => {
  getPostList()
    .then((postList) => {
      res.json(postList);
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
