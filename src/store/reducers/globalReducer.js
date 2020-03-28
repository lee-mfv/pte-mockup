const initState = {
  countDownTimerData: {
    numSecondsOne: null,
    numSecondsTwo: null,
  },
  voice: 'UK English Female',
}

const globalReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_SHOW_COUNT_DOWN_TIMER_DATA':
      return {
        ...state,
        countDownTimerData: action.countDownTimerData
      }
    case 'SET_VOICE':
      return {
        ...state,
        voice: action.voice
      }
    default:
      return state;
  }
}

export default globalReducer;
