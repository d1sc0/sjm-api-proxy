const express = require('express');
const app = express();

//Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('App is running!'));

//Define Routes
app.use('/api/joke', require('./routes/joke'));
app.use('/api/oldquote', require('./routes/oldquote'));
app.use('/api/airquote', require('./routes/airquote'));

// listen here
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
