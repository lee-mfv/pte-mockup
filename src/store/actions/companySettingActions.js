import moment from 'moment-timezone'

export const updateCompanySetting = (id, data) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const currentUserId = getState().firebase.auth.uid;
    const currentTime = moment().unix();

    return firestore.collection('company_settings').doc(id).set({
      ...data,
      updated_by: currentUserId,
      updated_at: currentTime,
    }).then((res) => {
      dispatch({type: 'UPDATE_COMPANY_SETTING', data: data});
    }).catch((err) => {
      console.log('err', err)
    })
  }
}

export const getCompanySetting = (id) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("company_settings").doc(id).get().then((doc) => {
      if (doc.exists) {
        dispatch({type: 'GET_COMPANY_SETTING', data: doc.data()});
      } else {
      }
    }).catch((err) => {
      console.log('err', err)
    });
  }
}