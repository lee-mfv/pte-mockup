import moment from 'moment-timezone'

// export const createStatisticTopic = (id, data) => {
//   return (dispatch, getState, {getFirebase, getFirestore}) => {
//     // make async call to database
//     const firestore = getFirestore();
//     const currentUserId = getState().firebase.auth.uid;
//     const currentTime = moment().unix();
//
//     return firestore.collection('statistic_topics').doc(id).set({
//       // ...data,
//       created_by: currentUserId,
//       created_at: currentTime,
//       updated_at: null,
//     }).then(() => {
//       dispatch({type: 'CREATE_STATISTIC_TOPIC', data});
//     }).catch((err) => {
//       dispatch({type: 'CREATE_STATISTIC_TOPIC_ERROR', err});
//     })
//   }
// }

export const createBuild = (data) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const currentUserId = getState().firebase.auth.uid;
    const currentTime = moment().unix();

    return firestore.collection('builds').add({
      ...data,
      created_by: currentUserId,
      created_at: currentTime,
    }).then(() => {
      dispatch({type: 'CREATE_BUILD', data});
    }).catch((err) => {
      dispatch({type: 'CREATE_BUILD_ERROR', err});
    })
  }
}

export const createStatisticFloor = (id, data) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection('statistic_floors').doc(id).set({
      ...data,
    }).then((res) => {
      dispatch({type: 'CREATE_STATISTIC_FLOOR', data});
    }).catch((err) => {
      dispatch({type: 'CREATE_STATISTIC_FLOOR_ERROR', err});
    })
  }
}

export const updateStatisticFloor = (id, updates) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("statistic_floors").doc(id).update({
      ...updates,
    }).then(() => {
      dispatch({type: 'UPDATE_STATISTIC_FLOOR', updates});
    }).catch((err) => {
      dispatch({type: 'UPDATE_STATISTIC_FLOOR_ERROR', err});
    });
  }
}

export const createStatisticTopic = (id, data) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection('statistic_topics').doc(id).set({
      ...data,
    }).then((res) => {
      dispatch({type: 'CREATE_STATISTIC_TOPIC', data});
    }).catch((err) => {
      dispatch({type: 'CREATE_STATISTIC_TOPIC_ERROR', err});
    })
  }
}

export const updateStatisticTopic = (id, updates) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("statistic_topics").doc(id).update({
      ...updates,
    }).then(() => {
      dispatch({type: 'UPDATE_STATISTIC_TOPIC', updates});
    }).catch((err) => {
      dispatch({type: 'UPDATE_STATISTIC_TOPIC_ERROR', err});
    });
  }
}