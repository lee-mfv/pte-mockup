const initState = {
  fibrws: [],
  fibrw: null
}

const fibrwReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_ALL_FIBRWS':
      return {
        ...state,
        fibrws: action.fibrws
      }
    case 'GET_FIBRW':
      return {
        ...state,
        fibrw: action.fibrw
      }
    case 'CREATE_FIBRW':
      console.log('CREATE_FIBRW', action.fibrw)
      return state;
    default:
      return state;
  }
}

export default fibrwReducer
