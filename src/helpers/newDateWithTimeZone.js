import moment from 'moment-timezone'
import Constant from '../config/constants'

const newDateWithTimeZone = () => {
  const viewerNow = moment.tz(Constant.VIEWER_TIMEZONE);
  return new Date(viewerNow.format('YYYY-MM-DD HH:mm:ss'));
}

export default newDateWithTimeZone;