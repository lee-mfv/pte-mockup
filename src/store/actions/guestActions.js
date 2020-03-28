export const getGuestByUuid = (uuid) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("guests").where("uuid", "==", uuid)
      .get()
      .then(function(querySnapshot) {
        console.log(querySnapshot.empty)
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  }
}

export const listenGuestById = (guestId) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();


    firestore.collection("statistic_topics")
      .onSnapshot(function(querySnapshot) {
        let list = [];
        querySnapshot.forEach(function(doc) {
          list.push(doc.id);
        });
        console.log("statistic_topics", list);
      });

    firestore.collection("statistic_floors")
      .onSnapshot(function(querySnapshot) {
        let list = [];
        querySnapshot.forEach(function(doc) {
          list.push(doc.id);
        });
        console.log("statistic_floors", list);
      });

    // firestore.collection("guests").doc(guestId)
    //   .onSnapshot(function(doc) {
    //     console.log("Current id: ", doc.id);
    //     console.log("Current data: ", doc.data());
    //   }, function(error) {
    //     console.log("document -- error ", error);
    //   });

    // firestore.collection("guests").doc(guestId)
    //   .collection("votes")
    //   .onSnapshot(function(querySnapshot) {
    //     let items = [];
    //     querySnapshot.forEach(function(doc) {
    //       items.push(doc.id);
    //     });
    //     console.log("Current votes in document: ", `[${items.join(", ")}]`);
    //   }, function(error) {
    //     console.log("sub-collection -- error ", error);
    //   });

    return null;
  }
}

export const getAllGuests = (guestId) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    // const firestore = getFirestore();

    // firestore.collection("guests").doc(guestId)
    //   .get()
    //   .then(function(doc) {
    //     if (doc.exists) {
    //       console.log("Document data:", doc.data());
    //     } else {
    //       // doc.data() will be undefined in this case
    //       console.log("No such document!");
    //     }
    //   })
    //   .catch(function(error) {
    //     console.log("getAllGuests ONE -- Error getting documents: ", error);
    //   });

    // firestore.collection("guests").doc(guestId)
    //   .collection("votes")
    //   .get()
    //   .then(function(doc) {
    //     if (doc.exists) {
    //       console.log("Document data:", doc.data());
    //     } else {
    //       // doc.data() will be undefined in this case
    //       console.log("No such document!");
    //     }
    //   })
    //   .catch(function(error) {
    //     console.log("getAllGuests ONE -- Error getting documents: ", error);
    //   });

    // return firestore.collection("votes")
    //   .get()
    //   .then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //       console.log(doc.id, " => ", doc.data());
    //     });
    //   })
    //   .catch(function(error) {
    //     console.log("getAllGuests ALL -- Error getting documents: ", error);
    //   });


    // return firestore.collection("guests")
    //   .get()
    //   .then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //       console.log(doc.id, " => ", doc.data());
    //     });
    //   })
    //   .catch(function(error) {
    //     console.log("getAllGuests ALL -- Error getting documents: ", error);
    //   });

    return null;
  }
}
