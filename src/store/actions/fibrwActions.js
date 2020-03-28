import moment from 'moment-timezone'

export const createFibrw = (id, fibrw) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const currentUserId = getState().firebase.auth.uid;
    const currentTime = moment().unix();

    return firestore.collection('fibrws').doc(id).set({
      ...fibrw,
      created_by: currentUserId,
      created_at: currentTime,
      updated_at: null,
      updated_by: null,
    }).then(() => {
      dispatch({type: 'CREATE_FIBRW', fibrw});
    }).catch((err) => {
      dispatch({type: 'CREATE_FIBRW_ERROR', err});
    })
  }
}

export const deleteFibrw = (fibrwId) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("fibrws").doc(fibrwId).delete().then(() => {
      dispatch({type: 'DELETE_FIBRW'});
    }).catch((err) => {
      dispatch({type: 'DELETE_FIBRW_ERROR', err});
    });
  }
}

export const getFibrw = (fibrwId) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("fibrws").doc(fibrwId).get().then((doc) => {
      if (doc.exists) {
        dispatch({type: 'GET_FIBRW', fibrw: doc.data()});
      } else {
        // doc.data() will be undefined in this case
        console.log(`No such fibrw ${fibrwId}!`);
        dispatch({type: 'GET_FIBRW', fibrw: null});
      }
    }).catch((err) => {
      dispatch({type: 'GET_FIBRW_ERROR', err});
    });
  }
}

export const getAllFibrws = () => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("fibrws").get()
      .then(querySnapshot => {
        var fibrws = []
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          fibrws.push({...doc.data(), id: doc.id})
        });

        dispatch({type: 'GET_ALL_FIBRWS', fibrws});
      })
      .catch(err => {
        console.log("fibrws err:", err);
      });
  }
}

export const updateFibrw = (fibrwId, fibrw) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const currentTime = moment().unix();
    const currentUserId = getState().firebase.auth.uid;

    return firestore.collection("fibrws").doc(fibrwId).update({
      ...fibrw,
      updated_by: currentUserId,
      updated_at: currentTime,
    }).then(() => {
      dispatch({type: 'UPDATE_FIBRW', fibrw});
    }).catch((err) => {
      dispatch({type: 'UPDATE_FIBRW_ERROR', err});
    });
  }
}
