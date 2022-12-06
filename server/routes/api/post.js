const express = require('express');
const multer = require('multer');
const {
  insertPost,
  getPostsByUserId,
  getPostById,
  getPosts,
  getCommentsById,
  isLikedByUser,
  toggleLike,
  searchPost,
  deletePost,
  reportPost,
  insertComment,
  getImage,
  insertPostWithImage,
} = require('../../utilities/database');

const router = express.Router();
const upload = multer({ dest: './uploads/' });

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
  const { user_id: userId } = req.user;
  const { postId } = req.params;

  getPostById(postId)
    .then(async (data) => {
      const comments = await getCommentsById(postId);
      const isLiked = await isLikedByUser(postId, userId);

      if (data) {
        res.json({ ...data, comments, isLiked });
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
      next(err);
    });
});

router.get('/user/:userId', (req, res, next) => {
  const { userId } = req.params;

  getPostsByUserId(userId)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
      next(err);
    });
});

router.get('/image/:imageId', (req, res) => {
  const { imageId } = req.params;

  getImage(imageId).then((data) => {
    res.json(data);
  });
});

router.post('/', (req, res, next) => {
  const { user_id: userId } = req.user;
  const { content } = req.body;

  insertPost(content, userId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
      next(err);
    });
});

router.post('/search', (req, res, next) => {
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

router.post('/image', upload.single('image'), (req, res, next) => {
  const { user_id: userId } = req.user;
  const { path } = req.file;

  insertPostWithImage(path, userId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
      next(err);
    });
});

router.post('/:postId/like', (req, res, next) => {
  const { user_id: userId } = req.user;
  const { postId } = req.params;

  toggleLike(postId, userId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
      next(err);
    });
});

router.post('/:postId/comment', (req, res, next) => {
  const { user_id: userId } = req.user;
  const { content } = req.body;
  const { postId } = req.params;

  insertComment(postId, content, userId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
      next(err);
    });
});

router.delete('/:postId', (req, res, next) => {
  const { user_id: userId, is_admin: isAdmin } = req.user;
  const { postId } = req.params;

  deletePost(postId, userId, isAdmin)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
      next(err);
    });
});

router.post('/:postId/report', (req, res, next) => {
  const { postId } = req.params;

  reportPost(postId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
      next(err);
    });
});

module.exports = router;
