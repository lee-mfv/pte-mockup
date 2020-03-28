const initState = {
  blogs: [],
  blog: null
}

const blogReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_ALL_BLOGS':
      return {
        ...state,
        blogs: action.blogs
      }
    case 'GET_BLOG':
      return {
        ...state,
        blog: action.blog
      }
    case 'CREATE_BLOG':
      console.log('CREATE_BLOG', action.blog)
      return state;
    default:
      return state;
  }
}

export default blogReducer