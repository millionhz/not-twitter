const express = require('express');
const auth = require('../../utilities/auth');
const signupRouter = require('./signup');
const loginRouter = require('./login');
const authenticateRouter = require('./authenticate');
const postRouter = require('./post');
const searchRouter = require('./search');

const router = express.Router();

router.use('/signup', signupRouter);
router.use('/login', loginRouter);

router.use(auth.authenticate('jwt', { session: false }));
router.use('/authenticate', authenticateRouter);
router.use('/post', postRouter);
router.use('/search', searchRouter);

module.exports = router;
