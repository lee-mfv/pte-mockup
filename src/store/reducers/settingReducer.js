const initState = {
  setting: null
}

const settingReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_SETTING':
      return {
        ...state,
        setting: action.data
      }
    case 'UPDATE_SETTING':
      return {
        ...state,
        setting: action.data
      }
    default:
      return state;
  }
}

export default settingReducer