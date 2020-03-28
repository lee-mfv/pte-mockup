const initState = {
  floors: [],
  floor: null
}

const floorReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_ALL_FLOORS':
      return {
        ...state,
        floors: action.floors
      }
    case 'GET_FLOOR':
      return {
        ...state,
        floor: action.floor
      }
    case 'CREATE_FLOOR':
      console.log('CREATE_FLOOR', action.floor)
      return state;
    default:
      return state;
  }
}

export default floorReducer