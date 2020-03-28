const initState = {
  rooms: [],
  customRooms: [],
  room: null
}

const roomReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_ALL_ROOMS':
      return {
        ...state,
        rooms: action.rooms
      }
    case 'GET_CUSTOM_ROOMS':
      return {
        ...state,
        customRooms: action.customRooms
      }
    case 'GET_ROOM':
      return {
        ...state,
        room: action.room
      }
    case 'CREATE_ROOM':
      console.log('CREATE_ROOM', action.room)
      return state;
    default:
      return state;
  }
}

export default roomReducer