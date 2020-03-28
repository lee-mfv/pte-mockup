const admin = require('firebase-admin');

exports.getAllTopicCategories = async () => {
  let list = []

  await admin.firestore().collection('topic_categories')
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        list.push({...doc.data(), id: doc.id})
      });
    })
    .catch(function(error) {});

  return list;
}

