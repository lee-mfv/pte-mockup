import moment from 'moment-timezone'
import Constant from '../config/constants'

const displayTimeCalendar = (timestampSecond) => {
  return moment.tz(timestampSecond * 1000, Constant.VIEWER_TIMEZONE).format('YYYY-MM-DD HH:mm:ss');
}

export default displayTimeCalendar;