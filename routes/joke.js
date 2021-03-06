const express = require('express');
const router = express.Router();
const cors = require('cors');
const request = require('request');
const dotenv = require('dotenv');
dotenv.config();

// set dynamic CORS whitelist - UPDATE cors() WITH cors(CorsOptions) to restrict
var whitelist = ['http://somesite.som', 'http://localhost:5500'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// route for /api/joke/random
router.get('/random', cors(), (req, res, next) => {
  request(
    { url: 'https://joke-api-strict-cors.appspot.com/jokes/random' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }
      res.json(JSON.parse(body));
    }
  );
});

module.exports = router;
