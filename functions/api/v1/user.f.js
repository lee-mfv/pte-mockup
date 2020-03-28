const functions = require('firebase-functions');
const express = require('express');
const app = express();

const USERS = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Smith'
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Williams'
  }
];

app.get('/', (req, res, next) => {
  res.json(USERS);
});

app.get('/:userId', (req, res, next) => {
  res.json(USERS.find(user => user.id === parseInt(req.params.userId)));
});

// module.exports = {
//   app
// };

// exports.entries = functions.https.onRequest(app);
// exports = module.exports = functions.https.onRequest(app);
