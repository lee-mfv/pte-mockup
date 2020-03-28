import moment from 'moment-timezone'

export const createBlog = (blog) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const currentUserId = getState().firebase.auth.uid;
    const currentTime = moment().unix();

    return firestore.collection('blogs').add({
      ...blog,
      created_by: currentUserId,
      created_at: currentTime,
      updated_at: null,
      updated_by: null,
    }).then(() => {
      dispatch({type: 'CREATE_BLOG', blog});
    }).catch((err) => {
      dispatch({type: 'CREATE_BLOG_ERROR', err});
    })
  }
}

export const createBlogWithId = (id, blog) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const currentUserId = getState().firebase.auth.uid;
    const currentTime = moment().unix();

    return firestore.collection('blogs').doc(id).set({
      ...blog,
      created_by: currentUserId,
      created_at: currentTime,
      updated_at: null,
      updated_by: null,
    }).then(() => {
      dispatch({type: 'CREATE_BLOG', blog});
    }).catch((err) => {
      dispatch({type: 'CREATE_BLOG_ERROR', err});
    })
  }
}

export const deleteBlog = (blogId) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("blogs").doc(blogId).delete().then(() => {
      dispatch({type: 'DELETE_BLOG'});
    }).catch((err) => {
      dispatch({type: 'DELETE_BLOG_ERROR', err});
    });
  }
}

export const getBlog = (blogId) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("blogs").doc(blogId).get().then((doc) => {
      if (doc.exists) {
        dispatch({type: 'GET_BLOG', blog: {...doc.data(), id: blogId}});
      } else {
        // doc.data() will be undefined in this case
        console.log(`No such blog ${blogId}!`);
        dispatch({type: 'GET_BLOG', blog: null});
      }
    }).catch((err) => {
      dispatch({type: 'GET_BLOG_ERROR', err});
    });
  }
}

export const getAllBlogs = () => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("blogs").orderBy("created_at", "asc").get()
      .then(querySnapshot => {
        var blogs = []
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          blogs.push({...doc.data(), id: doc.id})
        });

        dispatch({type: 'GET_ALL_BLOGS', blogs});
      })
      .catch(err => {
        console.log("blogs err:", err);
      });
  }
}

export const updateBlog = (blogId, blog) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const currentTime = moment().unix();
    const currentUserId = getState().firebase.auth.uid;

    return firestore.collection("blogs").doc(blogId).update({
      ...blog,
      updated_at: currentTime,
      updated_by: currentUserId,
    }).then(() => {
      dispatch({type: 'UPDATE_BLOG', blog});
    }).catch((err) => {
      dispatch({type: 'UPDATE_BLOG_ERROR', err});
    });
  }
}
