// Imports
const express = require('express');
const redis = require('redis');

// Variables
const app = express();
const port = process.env.PORT || 4000;

// Setup database connection
const redisClient = redis.createClient({
  host: 'db-server',
});

/** Set initial value of count = 0 in redis database */
redisClient.set('count', 0);

// Setup routes
app.get('/', (req, res) => {
  redisClient.get('count', (err, countString) => {
    // eslint-disable-next-line radix
    const count = parseInt(countString) + 1;
    res.send(`Count: ${count}`);
    redisClient.set('count', count);
  });
});

// Enable listening on port
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on port ${port}`);
});
