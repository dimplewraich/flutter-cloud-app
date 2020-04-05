// Imports
const cors = require('cors');
const express = require('express');
const queries = require('./queries');
const bodyParser = require('body-parser');

// Variables
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup routes
app.get('/', (req, res) => {
  res.send('Hi');
});

app.get('/users', (req, res) => queries.getUsers(req, res));
app.post('/user', (req, res) => queries.createUser(req, res));

// Enable listening on port
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on port ${port}`);
});
