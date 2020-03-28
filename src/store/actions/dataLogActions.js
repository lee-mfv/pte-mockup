export const getAllDataLogs = () => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("data_logs")
      .onSnapshot(function(querySnapshot) {
        let list = {};
        querySnapshot.forEach(function(doc) {
          list[doc.id] = {...(doc.data())};
        });

        dispatch({type: 'GET_ALL_DATA_LOGS', dataLogs: list});
      });
  }
}
