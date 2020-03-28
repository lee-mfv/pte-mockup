const guestsUtil = require('../../util/guestsUtil');
const {HEADER_TOKEN_KEY} = require('../../config/constants');

exports.perform = async (req, res) => {
  const uuid = req.get(HEADER_TOKEN_KEY);

  // validation
  if(!uuid) {
    return res.status(400).json({success: false, error: '端末IDが見つけおりません。もう一度試してください。'})
  }

  // process
  const currentGuest = await guestsUtil.currentGuest(uuid);
  const guestData = currentGuest ? guestsUtil.serialize(currentGuest) : null;

  // end
  return res.json({success: true, data: guestData});
}