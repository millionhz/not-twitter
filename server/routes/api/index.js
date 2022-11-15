const express = require('express');
const signup = require('./signup');
const login = require('./login');
const authenticate = require('./authenticate');

const router = express.Router();

router.use('/signup', signup);
router.use('/login', login);
router.use('/authenticate', authenticate);

module.exports = router;
