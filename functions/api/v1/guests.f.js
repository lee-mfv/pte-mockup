const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const app = express();

// load controllers
const guestInfoController = require('../../controllers/guest/guestInfoController');
const guestCreateController = require('../../controllers/guest/guestCreateController');
const guestFavoriteController = require('../../controllers/guest/guestFavoriteController');
const guestUnfavoriteController = require('../../controllers/guest/guestUnfavoriteController');
const guestDeviceController = require('../../controllers/guest/guestDeviceController');
const guestVoteController = require('../../controllers/guest/guestVoteController');

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// build multiple CRUD interfaces:
app.get('/info', async (req, res) => {
  return guestInfoController.perform(req, res);
});

app.post('/favorite', async (req, res) => {
  return guestFavoriteController.perform(req, res);
});

app.post('/unfavorite', async (req, res) => {
  return guestUnfavoriteController.perform(req, res);
});

app.post('/device', async (req, res) => {
  return guestDeviceController.perform(req, res);
});

app.post('/vote', async (req, res) => {
  return guestVoteController.perform(req, res);
});

app.post('/', async (req, res) => {
  return guestCreateController.perform(req, res);
});

// Expose Express API as a single Cloud Function:
// exports = module.exports = functions.https.onRequest(app);