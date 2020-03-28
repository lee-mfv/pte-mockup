const admin = require('firebase-admin');

exports.getById = async (id) => {
  let data = null

  await admin.firestore().collection('topics').doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        data = {id: id, ...doc.data()}
      }
    })
    .catch(function(error) {});

  return data;
}

exports.getAllTopics = async () => {
  let list = []

  await admin.firestore().collection('topics')
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        list.push({...doc.data(), id: doc.id})
      });
    })
    .catch(function(error) {});

  return list;
}