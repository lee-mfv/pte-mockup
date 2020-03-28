const initState = {
  images: [],
  image: null
}

const imageReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_ALL_IMAGES':
      return {
        ...state,
        images: action.images
      }
    case 'GET_IMAGE':
      return {
        ...state,
        image: action.image
      }
    case 'CREATE_IMAGE':
      return state;
    default:
      return state;
  }
}

export default imageReducer