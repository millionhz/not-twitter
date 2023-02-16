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
  unreportPost,
  insertComment,
  getImage,
  insertPostWithImage,
  getAllReportedPosts,
} = require('../../utilities/database');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

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

router.get('/report', (req, res, next) => {
  getAllReportedPosts()
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
      const isLiked = await isLikedByUser(postId, userId);

      if (data) {
        res.json({ ...data, isLiked });
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
      next(err);
    });
});

router.get('/:postId/comment', (req, res, next) => {
  const { postId } = req.params;

  getCommentsById(postId)
    .then((data) => {
      res.json(data);
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

router.get('/image/:imageId', (req, res, next) => {
  const { imageId } = req.params;

  getImage(imageId)
    .then((data) => {
      if (data) {
        res.json(data.data);
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
  const { buffer } = req.file;

  insertPostWithImage(buffer, userId)
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

router.post('/:postId/unreport', (req, res, next) => {
  const { postId } = req.params;

  unreportPost(postId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
      next(err);
    });
});

module.exports = router;
