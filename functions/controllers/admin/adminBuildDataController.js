const admin = require('firebase-admin');

const floorUtil = require('../../util/floorUtil');
const roomUtil = require('../../util/roomUtil');
const speakerUtil = require('../../util/speakerUtil');
const topicUtil = require('../../util/topicUtil');
const companyUtil = require('../../util/companyUtil');
const statisticUtil = require('../../util/statisticUtil');
const topicCategoryUtil = require('../../util/topicCategoryUtil');

let floors, rooms, speakers, topics, companies, topicCategories = [];
let db = admin.firestore();
let batch = db.batch();
let dataTopics = {};
let dataFloors = {};

exports.perform = async (req, res) => {
  console.log('BuildData - START');

  const oldStaFloors = await statisticUtil.getAllStatisticFloors();
  const oldStaTopics = await statisticUtil.getAllStatisticTopics();

  // process topics
  console.log('BuildData - process topics');
  rooms = await roomUtil.getAllRooms();
  speakers = await speakerUtil.getAllSpeakers();
  floors = await floorUtil.getAllFloors();
  topics = await topicUtil.getAllTopics();
  topicCategories = await topicCategoryUtil.getAllTopicCategories();
  buildStatisticTopic();

  // add data into batch
  console.log('BuildData - batching topics');
  for (let key in dataTopics) {
    if (dataTopics.hasOwnProperty(key)) {
      let newDocument = db.collection('statistic_topics').doc(key);
      batch.set(newDocument, dataTopics[key]);
    }
  }

  // delete old data
  console.log('BuildData - delete old data -- topics');
  oldStaTopics.map(item => {
    let canDelete = true;
    for (let key in dataTopics) {
      if(key === item.id) {
        canDelete = false;
      }
    }

    if(canDelete) {
      console.log('BuildData - delete old topic -- id', item.id);
      let deletedDoc = db.collection('statistic_topics').doc(item.id);
      batch.delete(deletedDoc);
    }
  });

  // Commit the batch
  console.log('BuildData - batching commit -- topics');
  await batch.commit().then(function () {
    console.log('BuildData -- batch DONE -- topics')
  });

  // init new batch
  batch = db.batch();

  // process floors
  console.log('BuildData - process floors');
  rooms = await roomUtil.getAllRooms();
  companies = await companyUtil.getAllCompanies();
  floors = await floorUtil.getAllFloors();
  topics = await topicUtil.getAllTopics();
  buildStatisticFloor();

  // add data into batch
  console.log('BuildData - batching floors');
  for (let key in dataFloors) {
    if (dataFloors.hasOwnProperty(key)) {
      let newDocument = db.collection('statistic_floors').doc(key);
      batch.set(newDocument, dataFloors[key].data);
      batch.update(newDocument, {rooms: dataFloors[key].rooms});

      const rooms_data = dataFloors[key].rooms_data;
      for (let key_data in rooms_data) {
        if (rooms_data.hasOwnProperty(key_data)) {
          const data = rooms_data[key_data];

          for (let key_sub in data) {
            if (data.hasOwnProperty(key_sub)) {
              let keyPath = `rooms.${key_data}.${key_sub}`;
              let updates = {};
              updates[keyPath] = data[key_sub]

              batch.update(newDocument, updates);
            }
          }
        }
      }
    }
  }

  // delete old data
  console.log('BuildData - delete old data -- floors');
  oldStaFloors.map(item => {
    let canDelete = true;
    for (let key in dataFloors) {
      if(key === item.id) {
        canDelete = false;
      }
    }

    if(canDelete) {
      console.log('BuildData - delete old floor -- id', item.id);
      let deletedDoc = db.collection('statistic_floors').doc(item.id);
      batch.delete(deletedDoc);
    }
  });

  // Commit the batch
  console.log('BuildData - batching commit');
  await batch.commit().then(function () {
    console.log('BuildData -- batch DONE -- floors')
  });

  console.log('BuildData - END');
  return res.json({success: true})
}

function buildStatisticTopic() {
  topics.map(topic => {
    addStatisticTopic(topic);
    return topic;
  })
}

function buildStatisticFloor() {
  floors.map(floor => {
    addStatisticFloor(floor);
    return floor;
  })
}

function addStatisticFloor(floor) {
  const id = floor.title;
  if (!dataFloors.hasOwnProperty(id)) {
    dataFloors[id] = {};
  }

  let rooms = floorGetRooms(floor.id);
  let rooms_data = {};
  for (let key in rooms) {
    if (rooms.hasOwnProperty(key)) {
      rooms_data[key] = {};
      if(rooms[key].type === 'topic') {
        let topics = roomGetTopics(key);
        for (let topicId in topics) {
          if (topics.hasOwnProperty(topicId)) {
            const firstSpeakerId = topics[topicId].speaker_ids.length ? topics[topicId].speaker_ids[0] : null;
            const firstSpeaker = !firstSpeakerId ? null : getSpeakerById(firstSpeakerId);
            topics[topicId].first_speaker = firstSpeaker;
          }
        }

        rooms_data[key].topics = topics;
      } else if(rooms[key].type === 'company') {
        let companies = roomGetCompanies(key);
        rooms_data[key].companies = companies;
      }
    }
  }

  dataFloors[id].data = floor;
  dataFloors[id].rooms = rooms;
  dataFloors[id].rooms_data = rooms_data;
}

function addStatisticTopic(topic) {
  const id = topic.start_time;
  topic.category = getTopicCategoryTitleById(topic.category_id);

  if (!dataTopics.hasOwnProperty(id)) {
    dataTopics[id] = {};
  }

  dataTopics[id][topic.id] = topic;

  let room = getRoom(topic.room_id)
  dataTopics[id][topic.id].room = room

  if(room) {
    dataTopics[id][topic.id].room.floor = getFloorById(room.floor_id, false)
  }

  dataTopics[id][topic.id].speakers = getSpeaker(topic.speaker_ids)
}

function getRoom(roomId) {
  return getRoomById(roomId, false);
}

function getRoomById(roomId, findName = true) {
  let result = null;
  rooms.map(item => {
    if(roomId === item.id) {
      result = findName ? item.title : item;
    }

    return item;
  })

  return result;
}

function getFloorById(floorId, findName = true) {
  let result = null;
  if(floors) {
    floors.map(item => {
      if(floorId === item.id) {
        result = findName ? item.title : item;
      }

      return item;
    })
  }

  return result;
}

function getSpeaker(speaker_ids) {
  let result = [];

  speaker_ids.map(speakerId => {
    speakers.map(item => {
      if(speakerId === item.id) {
        result.push(item);
      }

      return item;
    })

    return speakerId;
  })

  return result;
}

function floorGetRooms(floorId) {
  let result = {};

  rooms.map(item => {
    if(floorId === item.floor_id) {
      result[item.id] = item;
    }
    return item;
  })

  return result;
}

function roomGetTopics(roomId) {
  let result = {};

  topics.map(item => {
    if(!item.category || !item.category.length) {
      item.category = getTopicCategoryTitleById(item.category_id);
    }
    if(roomId === item.room_id) {
      result[item.id] = item;
    }

    return item;
  })

  return result;
}

function getSpeakerById(speakerId) {
  for (let i = 0; i < speakers.length; i++) {
    if(speakerId === speakers[i].id) {
      return speakers[i];
    }
  }

  return null;
}

function roomGetCompanies(roomId) {
  let result = {};

  companies.map(item => {
    if(roomId === item.room_id) {
      result[item.id] = item;
    }

    return item;
  })

  return result;
}

function getTopicCategoryTitleById(topicCategoryId) {
  let title = "";

  topicCategories.map(item => {
    if(topicCategoryId === item.id) {
      title = item.title;
    }

    return item;
  })

  return title;
}

function deleteCollection(collectionPath, batchSize) {
  let collectionRef = db.collection(collectionPath);
  let query = collectionRef.limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(query, batchSize, resolve, reject);
  });
}

function deleteQueryBatch(query, batchSize, resolve, reject) {
  query.get()
    .then((snapshot) => {
      // When there are no documents left, we are done
      if (snapshot.size == 0) {
        return 0;
      }

      // Delete documents in a batch
      let batchDelete = db.batch();
      snapshot.docs.forEach((doc) => {
        batchDelete.delete(doc.ref);
      });

      return batchDelete.commit().then(() => {
        return snapshot.size;
      });
    }).then((numDeleted) => {
    if (numDeleted === 0) {
      resolve();
      return;
    }

    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
      deleteQueryBatch(query, batchSize, resolve, reject);
    });
  })
    .catch(reject);
}