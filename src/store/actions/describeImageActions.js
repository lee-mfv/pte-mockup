import moment from 'moment-timezone'

export const createDescribeImage = (describeImage) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const currentUserId = getState().firebase.auth.uid;
    const currentTime = moment().unix();

    return firestore.collection('describe_images').add({
      ...describeImage,
      created_by: currentUserId,
      created_at: currentTime,
      updated_at: null,
      updated_by: null,
    }).then(() => {
      dispatch({type: 'CREATE_DESCRIBE_IMAGE', describeImage});
    }).catch((err) => {
      dispatch({type: 'CREATE_DESCRIBE_IMAGE_ERROR', err});
    })
  }
}

export const deleteDescribeImage = (describeImageId) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("describe_images").doc(describeImageId).delete().then(() => {
      dispatch({type: 'DELETE_DESCRIBE_IMAGE'});
    }).catch((err) => {
      dispatch({type: 'DELETE_DESCRIBE_IMAGE_ERROR', err});
    });
  }
}

export const getDescribeImage = (describeImageId) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("describe_images").doc(describeImageId).get().then((doc) => {
      if (doc.exists) {
        dispatch({type: 'GET_DESCRIBE_IMAGE', describeImage: {...doc.data(), id: describeImageId}});
      } else {
        // doc.data() will be undefined in this case
        console.log(`No such describeImage ${describeImageId}!`);
        dispatch({type: 'GET_DESCRIBE_IMAGE', describeImage: null});
      }
    }).catch((err) => {
      dispatch({type: 'GET_DESCRIBE_IMAGE_ERROR', err});
    });
  }
}

export const getAllDescribeImages = () => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("describe_images").orderBy("created_at", "asc").get()
      .then(querySnapshot => {
        var describeImages = []
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          describeImages.push({...doc.data(), id: doc.id})
        });

        dispatch({type: 'GET_ALL_DESCRIBE_IMAGES', describeImages});
      })
      .catch(err => {
        console.log("describeImages err:", err);
      });
  }
}

export const updateDescribeImage = (describeImageId, describeImage) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const currentTime = moment().unix();
    const currentUserId = getState().firebase.auth.uid;

    return firestore.collection("describe_images").doc(describeImageId).update({
      ...describeImage,
      updated_at: currentTime,
      updated_by: currentUserId,
    }).then(() => {
      dispatch({type: 'UPDATE_DESCRIBE_IMAGE', describeImage});
    }).catch((err) => {
      dispatch({type: 'UPDATE_DESCRIBE_IMAGE_ERROR', err});
    });
  }
}
