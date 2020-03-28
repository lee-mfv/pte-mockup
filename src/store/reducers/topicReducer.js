const initState = {
  topics: [],
  topic: null
}

const topicReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_ALL_TOPICS':
      return {
        ...state,
        topics: action.topics
      }
    case 'GET_TOPIC':
      // console.log(action.topic)
      return {
        ...state,
        topic: action.topic
      }
    case 'CREATE_TOPIC':
      console.log('CREATE_TOPIC', action.topic)
      return state;
    default:
      return state;
  }
}

export default topicReducer