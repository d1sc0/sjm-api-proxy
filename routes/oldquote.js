const express = require('express');
const router = express.Router();
const cors = require('cors');
const request = require('request');
const dotenv = require('dotenv');
dotenv.config();

// set dynamic CORS whitelist
var whitelist = [
  'http://127.0.0.1',
  'http://localhost',
  'http://localhost:5500',
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

//route for /api/oldquote/random
router.get('/random', cors(corsOptions), (req, res, next) => {
  request(
    {
      url:
        'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json',
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      res.json(JSON.parse(body));
    }
  );
});

module.exports = router;
