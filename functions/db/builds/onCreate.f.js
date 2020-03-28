const functions = require('firebase-functions');
const admin = require('firebase-admin');
// try { admin.initializeApp() } catch (e) { console.log(e) }

// building `statistic_topics`
let topics = [];
let speakers = [];
let floors = [];
let rooms = [];
let companies = [];
const getAllTopics = (() => {
  return admin.firestore().collection('topics')
    .get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        topics.push({...doc.data(), id: doc.id})
      });
    })
})
const getAllSpeakers = (() => {
  return admin.firestore().collection('speakers')
    .get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        speakers.push({...doc.data(), id: doc.id})
      });
    })
})
const getAllFloors = (() => {
  return admin.firestore().collection('floors')
    .get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        floors.push({...doc.data(), id: doc.id})
      });
    })
})
const getAllRooms = (() => {
  return admin.firestore().collection('rooms')
    .get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        rooms.push({...doc.data(), id: doc.id})
      });
    })
})
const getAllCompanies = (() => {
  return admin.firestore().collection('companies')
    .get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        companies.push({...doc.data(), id: doc.id})
      });
    })
})

const getRoom = ((roomId) => {
  let result = {};
  result = getRoomById(roomId, false);
  if(result) {
    result['floor'] = getFloorById(result.floor_id, false);
  }
  return result;
})
const getRoomById = ((roomId, findName = true) => {
  let result = null;
  if(rooms) {
    rooms.map(item => {
      if(roomId === item.id) {
        result = findName ? item.title : item;
      }
    })
  }

  return result;
})
const getFloorById = ((floorId, findName = true) => {
  let result = null;
  if(floors) {
    floors.map(item => {
      if(floorId === item.id) {
        result = findName ? item.title : item;
      }
    })
  }

  return result;
})
const getSpeaker = ((speaker_ids) => {
  let result = {};

  speaker_ids.map(speakerId => {
    speakers.map(item => {
      if(speakerId === item.id) {
        result[speakerId] = item;
      }
    })
  })

  return result;
})
const floorGetRooms = ((floorId) => {
  let result = {};

  rooms.map(item => {
    if(floorId === item.floor_id) {
      item['topics'] = roomGetTopics(item.id);
      result[item.id] = item;
    }
  })

  return result;
})
const roomGetTopics = ((roomId) => {
  let result = {};

  topics.map(item => {
    if(roomId === item.room_id) {
      result[item.id] = item;
    }
  })

  return result;
})

const createStatisticTopics = (() => {
  let statisticTopics = {}
  topics.map(topic => {
    topic['room'] = getRoom(topic.room_id)
    topic['speakers'] = getSpeaker(topic.speaker_ids)

    if(topic.start_time && !statisticTopics[topic.start_time]) {
      statisticTopics[topic.start_time] = {}
    }

    if(statisticTopics[topic.start_time]) {
      statisticTopics[topic.start_time][topic.id] = {...topic}
    }
  })

  for (let key in statisticTopics) {
    console.log('key', key)
    if (statisticTopics.hasOwnProperty(key)) {
      admin.firestore().collection('statistic_topics')
        .doc(key).set(statisticTopics[key])
        .then(doc => console.log('statistic_topics added', doc));
    }
  }

  return true;
})

const createStatisticFloors = (() => {
  let statisticFloors = {}
  floors.map(floor => {
    // floor['rooms'] = floorGetRooms(floor.id)

    if(floor.title && !statisticFloors[floor.title]) {
      statisticFloors[floor.title] = {}
    }

    if(statisticFloors[floor.title]) {
      statisticFloors[floor.title] = floor
    }
  })

  for (let key in statisticFloors) {
    console.log('key', key)
    if (statisticFloors.hasOwnProperty(key)) {
      console.log('statisticFloors[key]', statisticFloors[key])
      admin.firestore().collection('statistic_floors')
        .doc(key).set(statisticFloors[key])
        .then(doc => console.log('statistic_floors added', doc));
    }
  }

  return true;
})

// building `statistic_floos`
// exports.buildCreated = functions.firestore
// exports = module.exports = functions.firestore
//   .document('builds/{buildId}')
//   .onCreate(doc => {
//     console.log('doc: ', doc);
//     return true;
//     // return Promise.all([getAllTopics(),getAllSpeakers(),getAllFloors(),getAllRooms(),getAllCompanies(),]).then(res => {
//     //   // createStatisticTopics();
//     //   createStatisticFloors();
//     //   return res;
//     // });
//   });