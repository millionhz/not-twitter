require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const auth = require('./utilities/auth');

const apiRouter = require('./routes/api/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(auth.initialize());
app.use(express.static('uploads'));

app.use('/api', apiRouter);

module.exports = app;
