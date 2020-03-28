const admin = require('firebase-admin');
const moment = require('moment-timezone');

const guestsUtil = require('../../util/guestsUtil');
const topicUtil = require('../../util/topicUtil')
const {HEADER_TOKEN_KEY} = require('../../config/constants');

exports.perform = async (req, res) => {
  const uuid = req.get(HEADER_TOKEN_KEY);
  const topicId = req.body.topic_id;
  // validation
  if(!uuid) {
    return res.status(400).json({success: false, error: '端末IDが見つけおりません。もう一度試してください。'})
  }
  if(!req.body.topic_id) {
    return res.status(400).json({success: false, error: 'スピーチIDが見つかりません。もう一度試してください。'})
  }

  // process
  const currentGuest = await guestsUtil.currentGuest(uuid);
  if(!currentGuest) {
    return res.status(400).json({success: false, error: 'ユーザ情報が見つかりません。もう一度試してください。'})
  }

  const topic = await topicUtil.getById(topicId);
  if(!topic) {
    return res.status(400).json({success: false, error: 'スピーチ情報が見つかりません。もう一度試してください。'})
  }
  if(!currentGuest.favorite_topic_ids.includes(topicId)) {
    return res.status(400).json({success: false, error: 'このスピーチをお気になりに追加しておりません。'})
  }

  // remove by `topic_id`
  currentGuest.favorite_topic_ids = currentGuest.favorite_topic_ids.filter(function(value, index, arr){
    return value !== topicId;
  });
  const currentTime = moment().unix();
  await admin.firestore().collection('guests').doc(currentGuest.id).update({
    favorite_topic_ids: currentGuest.favorite_topic_ids,
    updated_at: currentTime,
  });

  // end
  const guestData = currentGuest ? guestsUtil.serialize(currentGuest) : null;
  return res.json({success: true, data: guestData});
}