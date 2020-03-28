const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
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

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Add middleware to authenticate requests
// e.g: https://github.com/firebase/functions-samples/blob/3bbad47cdab8606bf3a52e0119f7b2cc5ca53992/authorized-https-endpoint/functions/index.js
// app.use(myMiddleware);

// build multiple CRUD interfaces:
app.get('/:id', (req, res) => res.send(USERS.find(user => user.id === parseInt(req.params.id))));

// app.post('/', (req, res) => res.send(Widgets.create()));
app.post('/', (req, res) => res.send({...req.body}));

// app.put('/:id', (req, res) => res.send(Widgets.update(req.params.id, req.body)));
// app.put('/:id', (req, res) => res.send({id: req.params.id, ...req.body}));
app.patch('/:id', (req, res) => res.send({id: req.params.id, ...req.body}));

// app.delete('/:id', (req, res) => res.send(Widgets.delete(req.params.id)));
app.delete('/:id', (req, res) => res.send({id: req.params.id}));

app.get('/', (req, res) => res.send(USERS));

// Expose Express API as a single Cloud Function:
// exports.widgets = functions.https.onRequest(app);
// exports = module.exports = functions.https.onRequest(app);