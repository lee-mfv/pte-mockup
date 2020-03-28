const admin = require('firebase-admin');
const JSONAPISerializer = require('jsonapi-serializer').Serializer;
const moment = require('moment');

const GuestSerializer = {
  key: 'guest',
  opts: {
    attributes: [
      'id',
      'favorite_topic_ids',
      'remaining_score',
      'total_score',
      'created_at',
      'updated_at',
    ],
    keyForAttribute: 'underscore_case',
  },
}

exports.currentGuest = async (uuid) => {
  let data = null

  await admin.firestore().collection('guests').where("uuid", "==", uuid)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        data = {id: doc.id, ...doc.data()}
      });
    })
    .catch(function(error) {});

  return data;
}

exports.serialize = (data) => {
  const guestSer = new JSONAPISerializer(GuestSerializer.key, GuestSerializer.opts);
  return (data ? guestSer.serialize(data).data.attributes : null);
}

exports.update = async (id, data) => {
  const currentTime = moment().unix();

  await admin.firestore().collection("guests").doc(id).update({
    ...data,
    updated_at: currentTime,
  });

  return id;
}

exports.addVote = async (guestId, voteData) => {
  const currentTime = moment().unix();

  await admin.firestore().collection("guests").doc(guestId)
    .collection('votes').add({
    ...voteData,
    created_at: currentTime,
  });

  return guestId;
}

exports.getAllGuestsHaveToken = async () => {
  let list = []

  await admin.firestore().collection('guests')
    .where("device_token", ">", '')
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        list.push({...doc.data(), id: doc.id})
      });
    })
    .catch(function(error) {});

  return list;
}
