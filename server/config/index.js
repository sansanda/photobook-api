require('dotenv').config('');

const config = {
  server: {
    hostname: process.env.SERVER_IP,
    port: process.env.SERVER_PORT,
  },
};

module.exports = config;