import moment from 'moment-timezone'

export const createTopicCategory = (topicCategory) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const currentUserId = getState().firebase.auth.uid;
    const currentTime = moment().unix();

    return firestore.collection('topic_categories').add({
      ...topicCategory,
      created_by: currentUserId,
      created_at: currentTime,
      updated_at: null,
    }).then(() => {
      dispatch({type: 'CREATE_TOPIC_CATEGORY', topicCategory});
    }).catch((err) => {
      dispatch({type: 'CREATE_TOPIC_CATEGORY_ERROR', err});
    })
  }
}

export const deleteTopicCategory = (topicCategoryId) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("topic_categories").doc(topicCategoryId).delete().then(() => {
      dispatch({type: 'DELETE_TOPIC_CATEGORY'});
    }).catch((err) => {
      dispatch({type: 'DELETE_TOPIC_CATEGORY_ERROR', err});
    });
  }
}

export const getTopicCategory = (topicCategoryId) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("topic_categories").doc(topicCategoryId).get().then((doc) => {
      console.log('doc: ', doc);
      if (doc.exists) {
        dispatch({type: 'GET_TOPIC_CATEGORY', topicCategory: doc.data()});
      } else {
        // doc.data() will be undefined in this case
        console.log(`No such topicCategory ${topicCategoryId}!`);
      }
    }).catch((err) => {
      dispatch({type: 'GET_TOPIC_CATEGORY_ERROR', err});
    });
  }
}

export const updateTopicCategory = (topicCategoryId, topicCategory) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const currentTime = moment().unix();

    return firestore.collection("topic_categories").doc(topicCategoryId).update({
      ...topicCategory,
      updated_at: currentTime,
    }).then(() => {
      dispatch({type: 'UPDATE_TOPIC_CATEGORY', topicCategory});
    }).catch((err) => {
      dispatch({type: 'UPDATE_TOPIC_CATEGORY_ERROR', err});
    });
  }
}

export const getAllTopicCategories = () => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("topic_categories").get()
      .then(querySnapshot => {
        var topic_categories = []
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          topic_categories.push({...doc.data(), id: doc.id})
        });

        dispatch({type: 'GET_ALL_TOPIC_CATEGORIES', topic_categories});
      })
      .catch(err => {
        console.log("topic_categories err:", err);
      });
  }
}
