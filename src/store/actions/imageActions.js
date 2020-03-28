import moment from 'moment-timezone'

export const createImage = (image) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const currentUserId = getState().firebase.auth.uid;
    const currentTime = moment().unix();

    return firestore.collection('images').add({
      ...image,
      created_by: currentUserId,
      created_at: currentTime,
      updated_at: null,
      updated_by: null,
    }).then(() => {
      dispatch({type: 'CREATE_IMAGE', image});
    }).catch((err) => {
      dispatch({type: 'CREATE_IMAGE_ERROR', err});
    })
  }
}

export const deleteImage = (imageId) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("images").doc(imageId).delete().then(() => {
      dispatch({type: 'DELETE_IMAGE'});
    }).catch((err) => {
      dispatch({type: 'DELETE_IMAGE_ERROR', err});
    });
  }
}

export const getImage = (imageId) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("images").doc(imageId).get().then((doc) => {
      if (doc.exists) {
        dispatch({type: 'GET_IMAGE', image: doc.data()});
      } else {
        // doc.data() will be undefined in this case
        console.log(`No such image ${imageId}!`);
        dispatch({type: 'GET_IMAGE', image: null});
      }
    }).catch((err) => {
      dispatch({type: 'GET_IMAGE_ERROR', err});
    });
  }
}

export const getAllImages = () => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("images").orderBy("created_at", "desc").get()
      .then(querySnapshot => {
        var images = []
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          images.push({...doc.data(), id: doc.id})
        });

        dispatch({type: 'GET_ALL_IMAGES', images});
      })
      .catch(err => {
        console.log("images err:", err);
      });
  }
}

export const updateImage = (imageId, image) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const currentTime = moment().unix();
    const currentUserId = getState().firebase.auth.uid;

    return firestore.collection("images").doc(imageId).update({
      ...image,
      updated_by: currentUserId,
      updated_at: currentTime,
    }).then(() => {
      dispatch({type: 'UPDATE_IMAGE', image});
    }).catch((err) => {
      dispatch({type: 'UPDATE_IMAGE_ERROR', err});
    });
  }
}
