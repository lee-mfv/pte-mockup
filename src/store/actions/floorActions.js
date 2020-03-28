import moment from 'moment-timezone'

export const createFloor = (floor) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const currentUserId = getState().firebase.auth.uid;
    const currentTime = moment().unix();

    return firestore.collection('floors').add({
      ...floor,
      created_by: currentUserId,
      created_at: currentTime,
      updated_at: null,
    }).then(() => {
      dispatch({type: 'CREATE_FLOOR', floor});
    }).catch((err) => {
      dispatch({type: 'CREATE_FLOOR_ERROR', err});
    })
  }
}

export const deleteFloor = (floorId) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("floors").doc(floorId).delete().then(() => {
      dispatch({type: 'DELETE_FLOOR'});
    }).catch((err) => {
      dispatch({type: 'DELETE_FLOOR_ERROR', err});
    });
  }
}

export const getFloor = (floorId) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("floors").doc(floorId).get().then((doc) => {
      console.log('doc: ', doc);
      if (doc.exists) {
        dispatch({type: 'GET_FLOOR', floor: doc.data()});
      } else {
        // doc.data() will be undefined in this case
        console.log(`No such floor ${floorId}!`);
      }
    }).catch((err) => {
      dispatch({type: 'GET_FLOOR_ERROR', err});
    });
  }
}

export const updateFloor = (floorId, floor) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const currentTime = moment().unix();

    return firestore.collection("floors").doc(floorId).update({
      ...floor,
      updated_at: currentTime,
    }).then(() => {
      dispatch({type: 'UPDATE_FLOOR', floor});
    }).catch((err) => {
      dispatch({type: 'UPDATE_FLOOR_ERROR', err});
    });
  }
}

export const getAllFloors = () => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("floors").get()
      .then(querySnapshot => {
        var floors = []
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          floors.push({...doc.data(), id: doc.id})
        });

        dispatch({type: 'GET_ALL_FLOORS', floors});
      })
      .catch(err => {
        console.log("floors err:", err);
      });
  }
}