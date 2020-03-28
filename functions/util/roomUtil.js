const admin = require('firebase-admin');

exports.getAllRooms = async () => {
  let list = []

  await admin.firestore().collection('rooms')
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        list.push({...doc.data(), id: doc.id})
      });
    })
    .catch(function(error) {});

  return list;
}

