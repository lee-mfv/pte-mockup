import authReducer from './authReducer'
import fibrwReducer from './fibrwReducer'
import blogReducer from './blogReducer'
import globalReducer from './globalReducer'
import imageReducer from './imageReducer'
import describeImageReducer from './describeImageReducer'
import dataLogReducer from './dataLogReducer'
import {combineReducers} from 'redux'
import {firestoreReducer} from 'redux-firestore'
import {firebaseReducer} from 'react-redux-firebase'

const rootReducer = combineReducers({
  auth: authReducer,
  fibrw: fibrwReducer,
  blog: blogReducer,
  global: globalReducer,
  image: imageReducer,
  describeImage: describeImageReducer,
  dataLog: dataLogReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
})

export default rootReducer