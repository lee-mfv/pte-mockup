const admin = require('firebase-admin');
const moment = require('moment');

exports.getById = async (id) => {
  let data = null

  await admin.firestore().collection('speakers').doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        data = {id: id, ...doc.data()}
      }
    })
    .catch(function(error) {});

  return data;
}

exports.addVoting = async (data) => {
  let id = null
  const currentTime = moment().unix();

  await admin.firestore().collection('votes').add({
    ...data,
    created_at: currentTime,
    updated_at: null,
  }).then(doc => {
    id = doc.id
    return doc.id
  });

  return id;
}

exports.update = async (id, data) => {
  const currentTime = moment().unix();

  await admin.firestore().collection("speakers").doc(id).update({
    ...data,
    updated_at: currentTime,
  });

  return id;
}

exports.getAllSpeakers = async () => {
  let list = []

  await admin.firestore().collection('speakers')
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        list.push({...doc.data(), id: doc.id})
      });
    })
    .catch(function(error) {});

  return list;
}