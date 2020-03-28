const initState = {
  dataLogs: {},
  dataLog: null
}

const dataLogReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_LOGS':
      return {
        ...state,
        dataLogs: action.dataLogs
      }
    default:
      return state;
  }
}

export default dataLogReducer
