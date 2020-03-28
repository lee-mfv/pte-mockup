const initState = {
  companySetting: null
}

const companySettingReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_COMPANY_SETTING':
      return {
        ...state,
        companySetting: action.data
      }
    case 'UPDATE_COMPANY_SETTING':
      return {
        ...state,
        companySetting: action.data
      }
    default:
      return state;
  }
}

export default companySettingReducer