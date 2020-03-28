import moment from 'moment-timezone'

const startEndUtc = () => {
  const currentUtc = moment().utc().format('YYYY-MM-DD HH:mm');
  const startUtc = moment.utc(`${currentUtc}:00`).unix();
  const endUtc = moment.utc(`${currentUtc}:59`).unix();
  return {startUtc, endUtc};
}

export default startEndUtc;