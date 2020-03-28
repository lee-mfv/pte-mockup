const initState = {
  pushNotifications: [],
  pushNotification: null
}

const pushNotificationReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_ALL_PUSH_NOTIFICATIONS':
      return {
        ...state,
        pushNotifications: action.pushNotifications
      }
    case 'GET_PUSH_NOTIFICATION':
      return {
        ...state,
        pushNotification: action.pushNotification
      }
    case 'CREATE_PUSH_NOTIFICATION':
      console.log('CREATE_PUSH_NOTIFICATION', action.pushNotification)
      return state;
    default:
      return state;
  }
}

export default pushNotificationReducer