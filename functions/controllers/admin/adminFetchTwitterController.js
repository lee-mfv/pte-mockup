const admin = require('firebase-admin');

exports.perform = async (req, res) => {
  console.log('adminFetchTwitterController - START');

  console.log('adminFetchTwitterController - END');
  return res.json({success: true})
}
