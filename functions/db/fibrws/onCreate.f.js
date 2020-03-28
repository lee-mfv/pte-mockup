const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment-timezone');
const {DATA_LOGS: {LATEST_FIBRW_ID}} = require('../../config/constants');

exports = module.exports = functions.firestore
  .document('fibrws/{fibrwId}')
  .onCreate(doc => {
    const id = doc.id;
    const currentTime = moment().unix();

    return admin.firestore().collection('data_logs')
      .doc(LATEST_FIBRW_ID).set({
        id: id,
        created_at: currentTime,
        updated_at: null,
      });
  });