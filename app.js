const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();

// set dynamic CORS whitelist
var whitelist = ['http://localhost', 'http://localhost:5500'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// route for jokes API
app.get('/joke', cors(corsOptions), (req, res, next) => {
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

//route for quote API
app.get('/quote', cors(corsOptions), (req, res, next) => {
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
