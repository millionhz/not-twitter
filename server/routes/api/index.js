const express = require('express');

const router = express.Router();

router.use('/', (req, res) => {
  res.json({ message: 'Hello from the other side' });
});

module.exports = router;
