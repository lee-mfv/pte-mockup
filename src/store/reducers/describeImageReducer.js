const initState = {
  describeImages: [],
  describeImage: null
}

const describeImageReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_ALL_DESCRIBE_IMAGES':
      return {
        ...state,
        describeImages: action.describeImages
      }
    case 'GET_DESCRIBE_IMAGE':
      return {
        ...state,
        describeImage: action.describeImage
      }
    case 'CREATE_DESCRIBE_IMAGE':
      console.log('CREATE_DESCRIBE_IMAGE', action.describeImage)
      return state;
    default:
      return state;
  }
}

export default describeImageReducer