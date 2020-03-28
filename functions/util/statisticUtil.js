const admin = require('firebase-admin');

exports.getAllStatisticTopics = async () => {
  let list = []

  await admin.firestore().collection('statistic_topics')
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        list.push({...doc.data(), id: doc.id})
      });
    })
    .catch(function(error) {});

  return list;
}

exports.getAllStatisticFloors = async () => {
  let list = []

  await admin.firestore().collection('statistic_floors')
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        list.push({...doc.data(), id: doc.id})
      });
    })
    .catch(function(error) {});

  return list;
}

