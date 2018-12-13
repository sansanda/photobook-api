const express = require('express');
const morgan = require('morgan');
const logger = require('winston');

const app = express();

// Setup middleware
app.use(morgan('common'));

// Routes
app.get('/', (req, res, next) => {
  logger.info('API root');
  res.json({
    message: 'Welcome to the API',
  });
});

// Handle middleware errors
app.use((req, res, next) => {
  logger.info('Route not found');
  res.status(404);
  res.json({
    error: 'Route not found',
  });
});

app.use((err, req, res, next) => {
  logger.error(`Error: ${err}`);
  res.status(500);
  res.json({
    error: `${err}`,
  });
});

module.exports = app;