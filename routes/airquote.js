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

//route for airtable /api/airquote/count
router.get('/count', cors(), (req, res, next) => {
  request(
    {
      url:
        'https://api.airtable.com/v0/appbg8J7uh1qMZme5/quoteStats/recsvt1KqLxrX2tr1',
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      },
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      res.json(JSON.parse(body));
    }
  );
});

// route for airtable random airquote /api/airquote/random
router.get('/random', cors(corsOptions), (req, res, next) => {
  request(
    {
      url:
        'https://api.airtable.com/v0/appbg8J7uh1qMZme5/quotes?fields%5B%5D=linktoStats',
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      },
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
