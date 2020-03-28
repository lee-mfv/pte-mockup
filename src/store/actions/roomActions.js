import moment from 'moment-timezone'

export const createRoom = (room) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const currentUserId = getState().firebase.auth.uid;
    const currentTime = moment().unix();

    return firestore.collection('rooms').add({
      ...room,
      created_by: currentUserId,
      created_at: currentTime,
      updated_at: null,
    }).then(() => {
      dispatch({type: 'CREATE_ROOM', room});
    }).catch((err) => {
      dispatch({type: 'CREATE_ROOM_ERROR', err});
    })
  }
}

export const deleteRoom = (roomId) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("rooms").doc(roomId).delete().then(() => {
      dispatch({type: 'DELETE_ROOM'});
    }).catch((err) => {
      dispatch({type: 'DELETE_ROOM_ERROR', err});
    });
  }
}

export const getRoom = (roomId) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("rooms").doc(roomId).get().then((doc) => {
      console.log('doc: ', doc);
      if (doc.exists) {
        dispatch({type: 'GET_ROOM', room: doc.data()});
      } else {
        // doc.data() will be undefined in this case
        console.log(`No such room ${roomId}!`);
      }
    }).catch((err) => {
      dispatch({type: 'GET_ROOM_ERROR', err});
    });
  }
}

export const getRoomsByType = (type) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("rooms").where("type", "==", type).get()
      .then(querySnapshot => {
        var customRooms = []
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          customRooms.push({...doc.data(), id: doc.id})
        });

        dispatch({type: 'GET_CUSTOM_ROOMS', customRooms});
      })
      .catch(err => {
        console.log("rooms err:", err);
      });
  }
}

export const updateRoom = (roomId, room) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const currentTime = moment().unix();

    return firestore.collection("rooms").doc(roomId).update({
      ...room,
      updated_at: currentTime,
    }).then(() => {
      dispatch({type: 'UPDATE_ROOM', room});
    }).catch((err) => {
      dispatch({type: 'UPDATE_ROOM_ERROR', err});
    });
  }
}

export const getAllRooms = () => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("rooms").get()
      .then(querySnapshot => {
        var rooms = []
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          rooms.push({...doc.data(), id: doc.id})
        });

        dispatch({type: 'GET_ALL_ROOMS', rooms});
      })
      .catch(err => {
        console.log("rooms err:", err);
      });
  }
}