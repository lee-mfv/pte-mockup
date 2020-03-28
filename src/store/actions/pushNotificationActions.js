import currentTimeStamp from '../../helpers/currentTimeStamp'
import startEndUtc from '../../helpers/startEndUtc'

export const createPushNotification = (pushNotification) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const currentUserId = getState().firebase.auth.uid;

    return firestore.collection('push_notifications').add({
      ...pushNotification,
      is_sent: false,
      created_by: currentUserId,
      created_at: currentTimeStamp(),
      updated_at: null,
    }).then(() => {
      dispatch({type: 'CREATE_PUSH_NOTIFICATION', pushNotification});
    }).catch((err) => {
      dispatch({type: 'CREATE_PUSH_NOTIFICATION_ERROR', err});
    })
  }
}

export const deletePushNotification = (pushNotificationId) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("push_notifications").doc(pushNotificationId).delete().then(() => {
      dispatch({type: 'DELETE_PUSH_NOTIFICATION'});
    }).catch((err) => {
      dispatch({type: 'DELETE_PUSH_NOTIFICATION_ERROR', err});
    });
  }
}

export const getPushNotification = (pushNotificationId) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("push_notifications").doc(pushNotificationId).get().then((doc) => {
      if (doc.exists) {
        dispatch({type: 'GET_PUSH_NOTIFICATION', pushNotification: doc.data()});
      } else {
        // doc.data() will be undefined in this case
        console.log(`No such pushNotification ${pushNotificationId}!`);
      }
    }).catch((err) => {
      dispatch({type: 'GET_PUSH_NOTIFICATION_ERROR', err});
    });
  }
}

export const updatePushNotification = (pushNotificationId, pushNotification) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("push_notifications").doc(pushNotificationId).update({
      ...pushNotification,
      updated_at: currentTimeStamp(),
    }).then(() => {
      dispatch({type: 'UPDATE_PUSH_NOTIFICATION', pushNotification});
    }).catch((err) => {
      dispatch({type: 'UPDATE_PUSH_NOTIFICATION_ERROR', err});
    });
  }
}

export const getAllPushNotifications = (filter = 'all') => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    let process = firestore.collection("push_notifications");
    switch (filter) {
      case 'public':
        process = process.where("status", "==", true);
        break;
      case 'unpublic':
        process = process.where("status", "==", false);
        break;
      case 'sent':
        process = process.where("is_sent", "==", true);
        break;
      case 'pending':
        process = process.where("is_sent", "==", false);
        break;
      default:
        break;
    }
    return process
      .get()
      .then(querySnapshot => {
        let push_notifications = []
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          push_notifications.push({...doc.data(), id: doc.id})
        });

        dispatch({type: 'GET_ALL_PUSH_NOTIFICATIONS', pushNotifications: push_notifications});
      })
      .catch(err => {
        console.log("push_notifications err:", err);
      });
  }
}

export const getAllPushNotificationsCons = () => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    const utc = startEndUtc();
    console.log(utc)

    return firestore.collection("push_notifications")
      .where("is_sent", "==", false)
      .where("status", "==", true)
      .where("utc_publish_timestamp", ">=", utc.startUtc)
      .where("utc_publish_timestamp", "<=", utc.endUtc)
      .get()
      .then(querySnapshot => {
        let push_notifications = []
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          push_notifications.push({...doc.data(), id: doc.id})
        });

        console.log('push_notifications', push_notifications)
      })
      .catch(err => {
        console.log("push_notifications err:", err);
      });
  }
}

export const getGuestsHaveToken = () => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    const utc = startEndUtc();
    console.log(utc)

    return firestore.collection("guests")
      .where("device_token", ">", '')
      .get()
      .then(querySnapshot => {
        let list = []
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          list.push({...doc.data(), id: doc.id})
        });

        const deviceTokens = list.map(item => {
          return item.device_token;
        })

        console.log('getGuestsHaveToken -- deviceTokens', deviceTokens)
      })
      .catch(err => {
        console.log("getGuestsHaveToken err:", err);
      });
  }
}
