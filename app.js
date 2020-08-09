const express = require('express');
const request = require('request');

const app = express();

// set origin headers for CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5500');
  next();
});

// route for jokes API
app.get('/joke', (req, res) => {
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
app.get('/quote', (req, res) => {
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
