export const initCountDownTimer = (numSecondsOne, numSecondsTwo) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_SHOW_COUNT_DOWN_TIMER_DATA',
      countDownTimerData: {
        numSecondsOne: numSecondsOne,
        numSecondsTwo: numSecondsTwo,
      }
    });
  }
};

export const setVoice = (voice) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_VOICE',
      voice: voice
    });
  }
};
