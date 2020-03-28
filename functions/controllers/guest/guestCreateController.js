const guestsUtil = require('../../util/guestsUtil');
const moment = require('moment-timezone');
const admin = require('firebase-admin');

exports.perform = async (req, res) => {
  // validation
  if(!req.body.uuid) {
    return res.status(400).json({success: false, error: '端末IDが見つかりません。もう一度試してください。'})
  }

  const uuid = req.body.uuid;
  const currentGuest = await guestsUtil.currentGuest(uuid);
  if(currentGuest) {
    return res.status(400).json({success: false, error: 'この端末 ID は既に存在しており、重複して登録することはできません。'})
  }

  // process
  const currentTime = moment().unix();
  let data = null;
  await admin.firestore().collection('guests')
    .add({
      uuid: uuid,
      total_score: 100,
      remaining_score: 100,
      favorite_topic_ids: [],
      created_at: currentTime,
      updated_at: null,
    })
    .then(doc => {
      console.log('guests added', doc.id)
      data = {id: doc.id}
      return doc.id
    });

  await admin.firestore().collection('guests')
    .doc(data.id).get().then(doc => {
      const newGuest = doc.data();
      data = {...data, ...newGuest}
      return data
    })

  // end
  const guestData = data ? guestsUtil.serialize(data) : null;
  return data ? res.json({success: true, data: guestData}) : res.status(400).json({success: false, error: 'Something is wrong. Please try again.'})
}