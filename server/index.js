const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
  res.json({
    message: 'Welcome to the API'
  });
});

app.use( (req, res, next) => {
  res.status(404);
  res.json({
    error: 'Error. Route not found'
  });
});

app.use( (err, req, res, next) => {
  const {
    statusCode = 500,
    message,
  } = err;

  res.status(statusCode);
  res.json({
    message,
  });
});


module.exports = app;