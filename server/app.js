require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const path = require('path');
const auth = require('./utilities/auth');

const apiRouter = require('./routes/api/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(auth.initialize());

app.use('/api', apiRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

module.exports = app;
