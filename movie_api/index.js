const express = require("express");
const morgan = require("morgan");
const app = express();

//Middleware
app.use(express.static('public/documentation.html'))
app.use(morgan("common"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to myFlix!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
  res.json(movies);
});

// listen for requests
app.listen(8080, function(){ console.log('Server listening on 8080...')});
