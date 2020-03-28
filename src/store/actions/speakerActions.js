import moment from 'moment-timezone'

export const createSpeaker = (speaker) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const currentUserId = getState().firebase.auth.uid;
    const currentTime = moment().unix();

    return firestore.collection('speakers').add({
      ...speaker,
      total_score: 0,
      created_by: currentUserId,
      created_at: currentTime,
      updated_at: null,
    }).then(() => {
      dispatch({type: 'CREATE_SPEAKER', speaker});
    }).catch((err) => {
      dispatch({type: 'CREATE_SPEAKER_ERROR', err});
    })
  }
}

export const deleteSpeaker = (speakerId) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("speakers").doc(speakerId).delete().then(() => {
      dispatch({type: 'DELETE_SPEAKER'});
    }).catch((err) => {
      dispatch({type: 'DELETE_SPEAKER_ERROR', err});
    });
  }
}

export const getSpeaker = (speakerId) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("speakers").doc(speakerId).get().then((doc) => {
      console.log('doc: ', doc);
      if (doc.exists) {
        dispatch({type: 'GET_SPEAKER', speaker: doc.data()});
      } else {
        // doc.data() will be undefined in this case
        console.log(`No such speaker ${speakerId}!`);
      }
    }).catch((err) => {
      dispatch({type: 'GET_SPEAKER_ERROR', err});
    });
  }
}

export const getAllSpeakers = () => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("speakers").get()
      .then(querySnapshot => {
        var speakers = []
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          speakers.push({...doc.data(), id: doc.id})
        });

        dispatch({type: 'GET_ALL_SPEAKERS', speakers});
      })
      .catch(err => {
        console.log("speakers err:", err);
      });
  }
}

// export const getAllSpeakers = async () => {
//   return async (dispatch, getState, {getFirebase, getFirestore}) => {
//     // make async call to database
//     const firestore = getFirestore();
//
//     const snapshot = await firestore.collection('speakers').get();
//     return snapshot.docs.map(doc => doc.data());
//   }
//   // const snapshot = await firebase.firestore().collection('events').get()
//   // return snapshot.docs.map(doc => doc.data());
// }

export const updateSpeaker = (speakerId, speaker) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const currentTime = moment().unix();

    return firestore.collection("speakers").doc(speakerId).update({
      ...speaker,
      updated_at: currentTime,
    }).then(() => {
      dispatch({type: 'UPDATE_SPEAKER', speaker});
    }).catch((err) => {
      dispatch({type: 'UPDATE_SPEAKER_ERROR', err});
    });
  }
}
