const initState = {
  companies: [],
  company: null
}

const companyReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_ALL_COMPANIES':
      return {
        ...state,
        companies: action.companies
      }
    case 'GET_COMPANY':
      return {
        ...state,
        company: action.company
      }
    case 'CREATE_COMPANY':
      console.log('CREATE_COMPANY', action.company)
      return state;
    default:
      return state;
  }
}

export default companyReducer