const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mustacheExpress = require('mustache-express');
const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('views', `${__dirname}/public`);
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());

app.use('/', indexRouter);

module.exports = app;
