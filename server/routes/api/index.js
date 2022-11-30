const express = require('express');
const auth = require('../../utilities/auth');
const signupRouter = require('./signup');
const loginRouter = require('./login');
const authenticateRouter = require('./authenticate');
const postRouter = require('./post');
const changePasswordRouter = require('./changePassword');
const userRouter = require('./user');

const router = express.Router();

router.use('/signup', signupRouter);
router.use('/login', loginRouter);

router.use(auth.authenticate('jwt', { session: false }));
router.use('/authenticate', authenticateRouter);
router.use('/user', userRouter);
router.use('/post', postRouter);
router.use('/changePassword', changePasswordRouter);

module.exports = router;
