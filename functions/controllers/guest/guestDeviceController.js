const admin = require('firebase-admin');
const moment = require('moment-timezone');

const guestsUtil = require('../../util/guestsUtil');
const aescbc = require('../../util/aescbc')
const {HEADER_TOKEN_KEY, ENCRYPT_DECRYPT_KEY} = require('../../config/constants');

exports.perform = async (req, res) => {
  const uuid = req.get(HEADER_TOKEN_KEY);
  const token = req.body.token
  // validation
  if(!uuid) {
    return res.status(400).json({success: false, error: '端末IDが見つけおりません。もう一度試してください。'})
  }
  if(!token) {
    return res.status(400).json({success: false, error: 'トークンが見つかりません。もう一度試してください。'})
  }

  // process
  const currentGuest = await guestsUtil.currentGuest(uuid);
  if(!currentGuest) {
    return res.status(400).json({success: false, error: 'ユーザ情報が見つかりません。もう一度試してください。'})
  }

  const cipher = aescbc.createCipher(ENCRYPT_DECRYPT_KEY);
  let realToken = null
  try{
    realToken = cipher.decrypt(token)
  }catch(err) {
    console.log('device -- err', err)
    return res.status(500).json({success: false, error: 'Something went wrong'})
  }

  const currentTime = moment().unix();
  await admin.firestore().collection('guests').doc(currentGuest.id).update({
    device_token: realToken,
    updated_at: currentTime,
  });

  // end
  return res.json({success: true});
}