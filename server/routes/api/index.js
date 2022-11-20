const express = require('express');
const auth = require('../../utilities/auth');
const signupRouter = require('./signup');
const loginRouter = require('./login');
const authenticateRouter = require('./authenticate');
const likesRouter = require('./like');

const router = express.Router();

router.use('/signup', signupRouter);
router.use('/login', loginRouter);

router.use(auth.authenticate('jwt', { session: false }));
router.use('/authenticate', authenticateRouter);
router.use('/like', likesRouter);

module.exports = router;
