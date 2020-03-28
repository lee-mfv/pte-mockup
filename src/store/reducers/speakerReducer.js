const initState = {
  speakers: [],
  speaker: null
}

const speakerReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_ALL_SPEAKERS':
      return {
        ...state,
        speakers: action.speakers
      }
    case 'GET_SPEAKER':
      return {
        ...state,
        speaker: action.speaker
      }
    case 'CREATE_SPEAKER':
      console.log('CREATE_SPEAKER', action.speaker)
      return state;
    default:
      return state;
  }
}

export default speakerReducer