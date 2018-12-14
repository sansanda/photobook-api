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
  let {
    statusCode = 500,
  } = err;
  const {
    message,
  } = err;

  // Validation Errors
  if (err.message.startsWith('ValidationError')) {
    statusCode = 422;
  }

  logger.error(`Error: ${message}`);
  res.status(statusCode);
  res.json({
    error: true,
    statusCode,
    message,
  });
});

module.exports = app;