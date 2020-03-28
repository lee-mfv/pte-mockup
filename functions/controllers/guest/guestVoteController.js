const moment = require('moment-timezone');

const guestsUtil = require('../../util/guestsUtil');
const speakerUtil = require('../../util/speakerUtil')
const topicUtil = require('../../util/topicUtil')
const {HEADER_TOKEN_KEY, VIEWER_TIMEZONE} = require('../../config/constants');

exports.perform = async (req, res) => {
  const uuid = req.get(HEADER_TOKEN_KEY);
  const speakerId = req.body.speaker_id
  const topicId = req.body.topic_id
  const score = parseInt(req.body.score)
  // validation
  if(!uuid) {
    return res.status(400).json({success: false, error: '端末IDが見つけおりません。もう一度試してください。'})
  }
  if(!speakerId) {
    return res.status(400).json({success: false, error: '登壇者IDが見つかりません。もう一度試してください。'})
  }
  if(!topicId) {
    return res.status(400).json({success: false, error: 'スピーチIDが見つかりません。もう一度試してください。'})
  }
  if(score <= 0) {
    return res.status(400).json({success: false, error: 'ポイント情報が見つかりません。もう一度試してください。'})
  }

  // process
  const currentGuest = await guestsUtil.currentGuest(uuid);
  if(!currentGuest) {
    return res.status(400).json({success: false, error: 'ユーザ情報が見つかりません。もう一度試してください。'})
  }
  if(currentGuest.remaining_score === 0 || currentGuest.remaining_score < score) {
    return res.status(400).json({success: false, error: 'ポイントが送信できませんでした。利用可能なポイントを確認する上で再度実行してください。'})
  }

  const speaker = await speakerUtil.getById(speakerId);
  if(!speaker) {
    return res.status(400).json({success: false, error: '登壇者情報が見つかりません。もう一度試してください。'})
  }

  const topic = await topicUtil.getById(topicId);
  if(!topic) {
    return res.status(400).json({success: false, error: 'スピーチ情報が見つかりません。もう一度試してください。'})
  }
  if(!topic.is_contest) {
    return res.status(400).json({success: false, error: 'このスピーチは投票対象ではありません。'})
  }
  if(!topic.speaker_ids.includes(speakerId)) {
    return res.status(400).json({success: false, error: 'この登壇者は該当のスーピちに参加しておりません。'})
  }

  // validate start/end time of topic
  // const formatDate = 'YYYY-MM-DD';
  // const formatTime = 'HH:mm';
  // const format = `${formatDate} ${formatTime}`;

  const viewerNow = moment.tz(VIEWER_TIMEZONE);
  const currentDate = viewerNow.format('YYYY-MM-DD');
  const inputStartTimeMoment = moment.tz(`${currentDate} ${topic.start_time}`, VIEWER_TIMEZONE);
  const inputEndTimeMoment = moment.tz(`${currentDate} ${topic.end_time}`, VIEWER_TIMEZONE);

  const canVote = (viewerNow.diff(inputStartTimeMoment) > 0 && viewerNow.diff(inputEndTimeMoment) < 0) ? true : false
  if(!canVote) {
    return res.status(400).json({success: false, error: `現在、投票はできません。${topic.start_time}~${topic.end_time}の間にご投票ください。`})
  }

  // add vote
  const voteData = {
    guest_id: currentGuest.id,
    speaker_id: speaker.id,
    topic_id: topic.id,
    scores: score,
  };
  const voteId = await speakerUtil.addVoting(voteData);

  // update `total_score` of speaker
  speaker.total_score = !speaker.total_score ? score : (speaker.total_score + score);
  await speakerUtil.update(speaker.id, {total_score: speaker.total_score})

  // update `remaining_score` of guest
  currentGuest.remaining_score = currentGuest.remaining_score - score;
  await guestsUtil.update(currentGuest.id, {remaining_score: currentGuest.remaining_score})

  // update `votes` in `guest` document
  await guestsUtil.addVote(currentGuest.id, voteData);

  // end
  const guestData = currentGuest ? guestsUtil.serialize(currentGuest) : null;
  return res.json({success: true, data: guestData});
}