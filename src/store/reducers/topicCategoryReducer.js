const initState = {
  topicCategories: [],
  topicCategory: null
}

const topicCategoryReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_ALL_TOPIC_CATEGORIES':
      return {
        ...state,
        topicCategories: action.topicCategories
      }
    case 'GET_TOPIC_CATEGORY':
      return {
        ...state,
        topicCategory: action.topicCategory
      }
    case 'CREATE_TOPIC_CATEGORY':
      console.log('CREATE_TOPIC_CATEGORY', action.topicCategory)
      return state;
    default:
      return state;
  }
}

export default topicCategoryReducer