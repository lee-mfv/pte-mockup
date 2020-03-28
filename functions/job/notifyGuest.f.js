// const admin = require('firebase-admin')
// const functions = require('firebase-functions');
// const moment = require('moment-timezone');
//
// const {VIEWER_TIMEZONE, RANGE_MINUTES, SETTING_DEFAULT_ID} = require('../config/constants');
// const settingUtil = require('../util/settingUtil');
//
// exports.informBeforeTopicStart = functions.pubsub
//   .schedule('* * * * *')
//   .timeZone('Asia/Tokyo')
//   .onRun(async context => {
//     console.log('informBeforeTopicStart -- START')
//     const setting = await settingUtil.getById(SETTING_DEFAULT_ID);
//     if(!setting || !setting.conference_date) {
//       console.log('informBeforeTopicStart -- STOP - no specific `conference_date`')
//       return false;
//     }
//
//     const formatDate = 'YYYY-MM-DD';
//     const formatTime = 'HH:mm';
//     const format = `${formatDate} ${formatTime}`;
//     const viewerNow = moment.tz(VIEWER_TIMEZONE);
//     const currentDate = viewerNow.format(formatDate);
//     console.log('informBeforeTopicStart -- currentDate', currentDate)
//     console.log('informBeforeTopicStart -- setting.conference_date', setting.conference_date)
//     if(currentDate !== setting.conference_date) {
//       console.log('informBeforeTopicStart -- STOP - current date is different `conference_date` value')
//       return false;
//     }
//     console.log('informBeforeTopicStart -- ', viewerNow.format(format))
//     viewerNow.add(RANGE_MINUTES, 'minutes');
//     const currentTime = viewerNow.format(formatTime);
//     console.log('informBeforeTopicStart -- currentTime RANGE_MINUTES -- ', currentTime)
//
//     // get all guests
//     let guests = []
//     await admin.firestore().collection('guests')
//       .get()
//       .then(function(querySnapshot) {
//         querySnapshot.forEach(function(doc) {
//           guests.push({...doc.data(), id: doc.id})
//         });
//       })
//       .catch(function(error) {});
//
//     await admin.firestore().collection('topics')
//       .get()
//       .then(function(querySnapshot) {
//         querySnapshot.forEach(function(doc) {
//           let deviceTokens = [];
//           const topicId = doc.id;
//           const topic = doc.data();
//           if(currentTime === topic.start_time) {
//             console.log(`informBeforeTopicStart -- starting soon -- id=${topicId}, title=${topic.title}, start=${topic.start_time}`)
//             // get guests have favorited this topic
//             guests.map(guest => {
//               if(guest.favorite_topic_ids && guest.favorite_topic_ids.includes(topicId)) {
//                 if(guest.device_token) {
//                   deviceTokens.push(guest.device_token)
//                 }
//               }
//               return guest;
//             });
//           }
//
//           if(deviceTokens.length) {
//             // console.log(`informBeforeTopicStart -- send to deviceTokens -- `, deviceTokens)
//             // send push notification
//             const payload = {
//               notification: {
//                 title: `${topic.title} starts soon`,
//                 body: `${topic.title} starts soon - content`,
//               },
//               data: {
//                 type: 'push_topic_start',
//                 topic_id: topicId,
//                 start_time: topic.start_time,
//               }
//             };
//
//             admin.messaging().sendToDevice(deviceTokens, payload)
//               .then((response) => {
//                 console.log("informBeforeTopicStart -- Successfully sent message:", response);
//               })
//               .catch((error)=> {
//                 console.log("informBeforeTopicStart -- Error sending message:", error);
//               })
//           }
//         });
//       })
//       .catch(function(error) {});
//
//     console.log('informBeforeTopicStart -- END')
//
//   });
