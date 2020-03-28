import moment from 'moment-timezone'

export const createCompany = (company) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const currentUserId = getState().firebase.auth.uid;
    const currentTime = moment().unix();

    return firestore.collection('companies').add({
      ...company,
      created_by: currentUserId,
      created_at: currentTime,
      updated_at: null,
    }).then(() => {
      dispatch({type: 'CREATE_COMPANY', company});
    }).catch((err) => {
      dispatch({type: 'CREATE_COMPANY_ERROR', err});
    })
  }
}

export const deleteCompany = (companyId) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("companies").doc(companyId).delete().then(() => {
      dispatch({type: 'DELETE_COMPANY'});
    }).catch((err) => {
      dispatch({type: 'DELETE_COMPANY_ERROR', err});
    });
  }
}

export const getCompany = (companyId) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("companies").doc(companyId).get().then((doc) => {
      console.log('doc: ', doc);
      if (doc.exists) {
        dispatch({type: 'GET_COMPANY', company: doc.data()});
      } else {
        // doc.data() will be undefined in this case
        console.log(`No such company ${companyId}!`);
      }
    }).catch((err) => {
      dispatch({type: 'GET_COMPANY_ERROR', err});
    });
  }
}

export const updateCompany = (companyId, company) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const currentTime = moment().unix();

    return firestore.collection("companies").doc(companyId).update({
      ...company,
      updated_at: currentTime,
    }).then(() => {
      dispatch({type: 'UPDATE_COMPANY', company});
    }).catch((err) => {
      dispatch({type: 'UPDATE_COMPANY_ERROR', err});
    });
  }
}

export const getAllCompanies = () => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();

    return firestore.collection("companies").get()
      .then(querySnapshot => {
        var companies = []
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          companies.push({...doc.data(), id: doc.id})
        });

        dispatch({type: 'GET_ALL_COMPANIES', companies});
      })
      .catch(err => {
        console.log("companies err:", err);
      });
  }
}
