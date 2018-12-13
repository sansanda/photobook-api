const express = require('express');
const morgan = require('morgan');
const logger = require('winston');
const apiRouter = require('./api/v1/index');
const database = require('./database');
const bodyParser = require('body-parser');


// Connect to database
database.connect();

// Initialize Express app
const app = express();

// Setup middleware
app.use(morgan('common'));

// Setup router and routes
app.use('/api', apiRouter);
app.use('/api/v1', apiRouter);

// Handle middleware errors
app.use((req, res, next) => {
  const {statusCode = 404, message = 'Resource not found'} = null;
  logger.info(message);
  res.status(statusCode);
  res.json({
    error: true,
    statusCode: statusCode,
    message: message,
  });
});

app.use((err, req, res, next) => {
  const {statusCode = 500, message} = err;
  logger.error(`Error Message: ${message}`);
  res.status(statusCode);
  res.json({
    error: true,
    statusCode: statusCode,
    message: message,
  });
});

module.exports = app;