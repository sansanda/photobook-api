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