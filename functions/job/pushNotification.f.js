// const admin = require('firebase-admin')
// const functions = require('firebase-functions');
//
// const pushNotificationUtil = require('../util/pushNotificationUtil');
// const guestsUtil = require('../util/guestsUtil');
//
// exports.pushNotification = functions.pubsub
//   .schedule('* * * * *')
//   .timeZone('Asia/Tokyo')
//   .onRun(async context => {
//     console.log('pushNotification -- START')
//
//     // get all notifications which need to be sent
//     const notifications = await pushNotificationUtil.getAllPushNotificationsToBeSent();
//     console.log(`pushNotification -- there are ${notifications.length} notifications which need to be sent`);
//
//     if(notifications.length) {
//       const guests = await guestsUtil.getAllGuestsHaveToken();
//       if(guests.length) {
//         const deviceTokens = guests.map(guest => {
//           return guest.device_token;
//         })
//
//         console.log(`pushNotification -- there are ${deviceTokens.length} devices`);
//         const db = admin.firestore();
//         const batch = db.batch();
//         notifications.map(notification => {
//           // send push notification
//           const payload = {
//             notification: {
//               title: notification.title,
//               body: notification.description,
//             },
//             data: {
//               type: 'push_all',
//               sub_type: notification.type,
//               url_schema: notification.url_schema,
//               topic_id: notification.topic_id ? notification.topic_id : '',
//               floor_id: notification.floor_id ? notification.floor_id : '',
//             }
//           };
//
//           admin.messaging().sendToDevice(deviceTokens, payload)
//             .then((response) => {
//               console.log("pushNotification -- Successfully sent message:", response);
//             })
//             .catch((error)=> {
//               console.log("pushNotification -- Error sending message:", error);
//             })
//
//           // update notification
//           let doc = db.collection('push_notifications').doc(notification.id);
//           batch.update(doc, {is_sent: true});
//         });
//
//         // Commit the batch
//         console.log('pushNotification - batching commit');
//         await batch.commit().then(function () {
//           console.log('pushNotification -- batch DONE')
//         });
//       }
//     }
//
//     console.log('pushNotification -- END')
//
//   });
