const admin = require('firebase-admin');

exports.getAllFloors = async () => {
  let list = []

  await admin.firestore().collection('floors')
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        list.push({...doc.data(), id: doc.id})
      });
    })
    .catch(function(error) {});

  return list;
}

