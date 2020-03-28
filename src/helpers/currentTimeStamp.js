import moment from 'moment-timezone'
import Constant from '../config/constants'

const currentTimeStamp = () => {
  return moment.tz(Constant.VIEWER_TIMEZONE).unix();
}

export default currentTimeStamp;