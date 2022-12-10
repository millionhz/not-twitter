const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const { user } = req;
  res.json({
    userId: user.user_id,
    name: user.name,
    email: user.email,
    isAdmin: Boolean(user.is_admin),
  });
});

module.exports = router;
