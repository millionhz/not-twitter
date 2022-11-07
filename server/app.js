const express = require('express');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api/index');

const app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRouter);
app.use('/', indexRouter);

module.exports = app;
