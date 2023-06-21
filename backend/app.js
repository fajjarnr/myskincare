const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const db = require('./utils/db');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const homepageRouter = require('./routes/homepage');
const campaignRouter = require('./routes/campaign');
const productRouter = require('./routes/product');
const dashboardRouter = require('./routes/dashboard');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
// db.connect();

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/homepage', homepageRouter);
app.use('/api/campaign', campaignRouter);
app.use('/api/product', productRouter);
app.use('/api/dashboard', dashboardRouter);

module.exports = app;
