const admin = require('firebase-admin');
const startEndUtc = require('../helpers/startEndUtc');

exports.getAllPushNotificationsToBeSent = async () => {
  let list = []

  const utc = startEndUtc.perform();
  console.log('utc -- ', utc);
  await admin.firestore().collection('push_notifications')
    .where("is_sent", "==", false)
    .where("status", "==", true)
    .where("utc_publish_timestamp", ">=", utc.startUtc)
    .where("utc_publish_timestamp", "<=", utc.endUtc)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        list.push({...doc.data(), id: doc.id})
      });
    })
    .catch(function(error) {});

  return list;
}

