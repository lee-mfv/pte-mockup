const admin = require('firebase-admin');

exports.getById = async (id) => {
  let data = null

  await admin.firestore().collection('settings').doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        data = {id: id, ...doc.data()}
      }
    })
    .catch(function(error) {});

  return data;
}