import moment from 'moment-timezone'

export const createTopic = (topic) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const currentUserId = getState().firebase.auth.uid;
    const currentTime = moment().unix();

    return firestore.collection('topics').add({
      ...topic,
      created_by: currentUserId,
      created_at: currentTime,
      updated_at: null,
    }).then(() => {
      dispatch({type: 'CREATE_TOPIC', topic});
    }).catch((err) => {
      dispatch({type: 'CREATE_TOPIC_ERROR', err});
    })
  }
}

export const deleteTopic = (topicId) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("topics").doc(topicId).delete().then(() => {
      dispatch({type: 'DELETE_TOPIC'});
    }).catch((err) => {
      dispatch({type: 'DELETE_TOPIC_ERROR', err});
    });
  }
}

export const getTopic = (topicId) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("topics").doc(topicId).get().then((doc) => {
      if (doc.exists) {
        dispatch({type: 'GET_TOPIC', topic: doc.data()});
      } else {
        // doc.data() will be undefined in this case
        // console.log(`No such topic ${topicId}!`);
      }
    }).catch((err) => {
      dispatch({type: 'GET_TOPIC_ERROR', err});
    });
  }
}

export const updateTopic = (topicId, topic) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const currentTime = moment().unix();

    return firestore.collection("topics").doc(topicId).update({
      ...topic,
      updated_at: currentTime,
    }).then(() => {
      dispatch({type: 'UPDATE_TOPIC', topic});
    }).catch((err) => {
      dispatch({type: 'UPDATE_TOPIC_ERROR', err});
    });
  }
}

export const updateTopicByField = (topicId, updates) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const currentTime = moment().unix();

    return firestore.collection("topics").doc(topicId).update({
      ...updates,
      updated_at: currentTime,
    }).then(() => {
      dispatch({type: 'UPDATE_TOPIC_FIELD'});
    }).catch((err) => {
      dispatch({type: 'UPDATE_TOPIC_FIELD_ERROR', err});
    });
  }
}

export const getAllTopics = () => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("topics").get()
      .then(querySnapshot => {
        var topics = []
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          topics.push({...doc.data(), id: doc.id})
        });

        dispatch({type: 'GET_ALL_TOPICS', topics});
      })
      .catch(err => {
        console.log("topics err:", err);
      });
  }
}