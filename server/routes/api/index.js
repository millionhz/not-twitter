const express = require('express');

const router = express.Router();

router.use('/', (req, res) => {
  res.json({ path: req.originalUrl });
});

module.exports = router;
