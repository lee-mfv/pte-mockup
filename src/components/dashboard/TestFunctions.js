import React, {Component} from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import {getTopic, getAllTopics} from '../../store/actions/topicActions'
import {getGuestByUuid, listenGuestById} from '../../store/actions/guestActions'
import {getAllPushNotificationsCons, getGuestsHaveToken} from '../../store/actions/pushNotificationActions'
import moment from 'moment-timezone'
import aescbc from './aes-cuz'
import ReactJson from 'react-json-view'
import {GuestSerializer} from '../../serializers/api-v1'
const JSONAPISerializer = require('jsonapi-serializer').Serializer;

const timeZone = 'Asia/Tokyo'
const rangeMinutes = 10;

class TestFunctions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doneGetAllData: false,
      isProcessing: false,

      uuid: 'NOTHING',

      topicId: null,

      aesInput: null,
      aesOutput: '',

      jsonView: {
        sample: {
          "glossary": {
            "title": "example glossary",
            "GlossDiv": {
              "title": "S",
              "GlossList": {
                "GlossEntry": {
                  "ID": "SGML",
                  "SortAs": "SGML",
                  "GlossTerm": "Standard Generalized Markup Language",
                  "Acronym": "SGML",
                  "Abbrev": "ISO 8879:1986",
                  "GlossDef": {
                    "para": "A meta-markup language, used to create markup languages such as DocBook.",
                    "GlossSeeAlso": ["GML", "XML"]
                  },
                  "GlossSee": "markup"
                }
              }
            }
          }
        },
        guestNull: null,
        guest: {
          "id": "BL730Jpsn8zw4ARvSonK",
          "favorite_topic_ids": [],
          "remaining_score": 0,
          "total_score": 100,
          "uuid": "n,mnm,nxcm,vnzcxmnv1",
          "created_at": 1562916102,
          "device_token": "fb_9zPIKfBU:APA91bHfxunMSzjBC1ArnkxnXMfR1NyCn33RY_1GbzrmS1bdVt6Bv-seP3BPdEGXkHx_kBM7A_HqXvGrBsSUr2NCu3o1b5OGk_3FzHOg9c0YwLchYz3iXKkJROXOgfcz5RjuAZnbthLp",
          "updated_at": 1563157890
        },
        guestSerializer: null,
      },

      inputStartTime: '',
      inputEndTime: '',
      compareTime: {
        formatDate: 'YYYY-MM-DD',
        formatTime: 'HH:mm',
        currentDate: '',
        currentTime: '',
        outputDateTime: '',
        result: '',
      },

      currentTimeJapan: '',
    }

    this.getGuestByUuid = this.getGuestByUuid.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getTopicById = this.getTopicById.bind(this)
    this.aesProcess = this.aesProcess.bind(this)
    this.handleCompareTime = this.handleCompareTime.bind(this)
    this.renderTopicStart = this.renderTopicStart.bind(this)
    this.handleTopicStart = this.handleTopicStart.bind(this)
    this.fetchData = this.fetchData.bind(this)
  }

  componentWillMount() {
    this.props.getGuestsHaveToken();
    this.props.listenGuestById(null);
    this.fetchData();
    const guestSer = new JSONAPISerializer(GuestSerializer.key, GuestSerializer.opts);

    this.setState((prevState, props) => ({
        jsonView: {
          ...prevState.jsonView,
          guestSerializer: guestSer.serialize(prevState.jsonView.guest),
          // guestSerializer: guestSer.serialize(prevState.jsonView.guestNull),
        }
    }))
  }

  fetchData() {
    Promise.all([
      this.props.getAllTopics(),
    ]).then(res => {
      this.setState({
        doneGetAllData: true,
      },
        () => {
          const listTabBlocks = ['.tabs1', '.tabs2'];
          listTabBlocks.map(el => {
            const elem = document.querySelector(el);
            const options = {}
            window.M.Tabs.init(elem, options);

            return el;
          })
        }
      )
    });
  }

  componentDidMount() {
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  aesProcess(type = 'encrypt') {
    // let key = 'mfexpo2019111111mfexpo2019111111';
    // let key = 'mfexpo2019111111';
    // let key = 'expo2019';
    // let key = 'mfexpo2019aeskey';
    let key = 'mfexpo2019aeskey';
    let cipher = aescbc.createCipher(key);
    // let cipher = descrypto.createCipher(key);
    switch (type) {
      case 'encrypt':
        this.setState({
          aesOutput: cipher.encrypt(this.state.aesInput)
        })
        break;
      case 'decrypt':
        this.setState({
          aesOutput: cipher.decrypt(this.state.aesInput)
        })
        break;
      default:
        break;
    }
  }

  getTopicById() {
    this.setState({
      isProcessing: true,
    })

    this.props.getTopic(this.state.topicId).then(() => {
      this.setState({
        isProcessing: false,
      })
    }).catch(err => {});
  }

  getGuestByUuid() {
    this.setState({
      isProcessing: true,
    })

    this.props.getGuestByUuid(this.state.uuid).then(() => {
      this.setState({
        isProcessing: false,
      })
    }).catch(err => {});
  }

  renderUuid2Guest() {
    return <div id="Uuid2Guest" className="col s12">
      <div className="row">
        <div className="input-field">
          <input type="text" id="uuid" onChange={this.handleChange} className="validate" />
          <label htmlFor="uuid">Device Token</label>
        </div>
        <div className="input-field">
          <button onClick={this.getGuestByUuid} type="button" className={`waves-effect waves-light btn ${this.state.isProcessing ? 'disabled' : null}`}><i className="material-icons right">cloud</i>Get Guest By UUID</button>
        </div>
      </div>
    </div>
  }

  renderTopicId2Topic() {
    return <div id="TopicId2Topic" className="col s12">
      <div className="row">
        <div className="input-field">
          <input type="text" id="topicId" onChange={this.handleChange} className="validate" />
          <label htmlFor="topicId">Topic ID</label>
        </div>
        <div className="input-field">
          <button onClick={this.getTopicById} type="button" className={`waves-effect waves-light btn ${this.state.isProcessing ? 'disabled' : null}`}><i className="material-icons right">cloud</i>Get Topic By Id</button>
        </div>
      </div>
    </div>
  }

  renderEncryptDecrypt() {
    return <div id="Encrypt_Decrypt" className="col s12">
      <div className="row">
        <div className="input-field">
          <input type="text" id="aesInput" onChange={this.handleChange} className="validate" />
          <label htmlFor="aesInput">Input</label>
        </div>
        <div className="input-field">
          <button onClick={() => this.aesProcess('encrypt')} type="button" className={`waves-effect waves-light btn`}><i className="material-icons right">cloud</i>Encrypt</button>
          <button onClick={() => this.aesProcess('decrypt')} type="button" className={`waves-effect waves-light btn`}><i className="material-icons right">cloud</i>Decrypt</button>
        </div>
        <div className="input-field">
          <input type="text" className="validate" value={this.state.aesOutput} disabled />
          <label className="active">Output</label>
        </div>
      </div>
    </div>
  }

  renderJsonView() {
    return <div id="json_view" className="col s12">
      <div className="row">
        <div className="col s12">
          <ReactJson src={this.state.jsonView.guest} name="jsonView.guest"
                     theme="monokai" iconStyle="square"
                     indentWidth={2} enableClipboard={false}
                     displayObjectSize={false} displayDataTypes={false}
                     onEdit={false} onAdd={false}
                     collapseStringsAfterLength={50}
          />
        </div>
        <div className="col s12" style={{marginTop: '20px'}}>
          {this.state.jsonView.guestSerializer && this.state.jsonView.guestSerializer.data &&
          <ReactJson src={this.state.jsonView.guestSerializer.data.attributes} name="jsonView.guestSerializer"
                     theme="monokai" iconStyle="square"
                     indentWidth={2} enableClipboard={false}
                     displayObjectSize={false} displayDataTypes={false}
                     onEdit={false} onAdd={false}
                     collapseStringsAfterLength={50}
          />
          }

        </div>
      </div>
    </div>
  }

  handleTopicStart() {
    // 2019-07-18 11:11
    const formatDate = 'YYYY-MM-DD';
    const formatTime = 'HH:mm';
    const format = `${formatDate} ${formatTime}`;
    const viewerNow = moment.tz(this.state.currentTimeJapan, timeZone);
    console.log('viewerNow -- ', viewerNow.format(format))
    const currentDate = viewerNow.format('YYYY-MM-DD');
    viewerNow.add(rangeMinutes, 'minutes');
    const currentTime = viewerNow.format(formatTime);
    console.log('currentTime rangeMinutes -- ', currentTime)
    this.props.topics.map(item => {
      const startTimeMoment = moment.tz(`${currentDate} ${item.start_time}`, timeZone);
      const startTime = startTimeMoment.format(formatTime);
      if(currentTime === startTime) {
        console.log('startTimeMoment formatTime -- ', startTimeMoment.format(formatTime))
      }

      return item;
    });

  }

  renderTopicStart() {
    return <div id="topic_start" className="col s12">
      <div className="row">
        <div className="input-field">
          <input type="text" id="currentTimeJapan" onChange={this.handleChange} className="validate" />
          <label htmlFor="currentTimeJapan">Current time (Japan)</label>
        </div>
        <div className="input-field">
          <button onClick={this.handleTopicStart} type="button" className={`waves-effect waves-light btn ${this.state.isProcessing ? 'disabled' : null}`}><i className="material-icons right">cloud</i>Compare</button>
        </div>
      </div>
    </div>
  }

  renderCompareTime() {

    return <div id="compare_time" className="col s12">
      <div className="row">
        <div className="col s12">Format date: {this.state.compareTime.formatDate}</div>
        <div className="col s12">Format time: {this.state.compareTime.formatTime}</div>
        <div className="col s12">Current date: {this.state.compareTime.currentDate}</div>
        <div className="col s12">Current time: {this.state.compareTime.currentTime}</div>
        <div className="col s12">outputDateTime: <strong>{this.state.compareTime.outputDateTime}</strong></div>
        <div className="col s12">Result: <strong>{this.state.compareTime.result}</strong></div>
      </div>
      <div className="row">
        <div className="input-field">
          <input type="text" id="inputStartTime" onChange={this.handleChange} className="validate" />
          <label htmlFor="inputStartTime">Start Time</label>
        </div>
        <div className="input-field">
          <input type="text" id="inputEndTime" onChange={this.handleChange} className="validate" />
          <label htmlFor="inputEndTime">End Time</label>
        </div>
        <div className="input-field">
          <button onClick={this.handleCompareTime} type="button" className={`waves-effect waves-light btn ${this.state.isProcessing ? 'disabled' : null}`}><i className="material-icons right">cloud</i>Compare</button>
        </div>
      </div>
    </div>
  }

  handleCompareTime() {
    const formatDate = this.state.compareTime.formatDate;
    const formatTime = this.state.compareTime.formatTime;
    const now = moment();
    const currentDate = now.format(formatDate);
    const currentTime = now.format(formatTime);

    const inputStartTimeMoment = moment(`${currentDate} ${this.state.inputStartTime}`, `${formatDate} ${formatTime}`);
    const inputEndTimeMoment = moment(`${currentDate} ${this.state.inputEndTime}`, `${formatDate} ${formatTime}`);
    const outputDateTime = `${inputStartTimeMoment.format(`${formatDate} ${formatTime}`)} - ${inputEndTimeMoment.format(`${formatDate} ${formatTime}`)}`;
    const canVote = (now.diff(inputStartTimeMoment) > 0 && now.diff(inputEndTimeMoment) < 0) ? true : false

    this.setState((prevState, props) => ({
      compareTime: {
        ...prevState.compareTime,
        currentDate: currentDate,
        currentTime: currentTime,
        outputDateTime: outputDateTime,
        result: canVote ? 'can vote' : 'can NOT vote',
      }
    }))

  }

  render() {
    const {auth} = this.props

    if (!auth.uid) return <Redirect to="/signin"/>

    if(!this.state.doneGetAllData) {
      return <div className="container">
        <div className="progress">
          <div className="indeterminate">
          </div>
        </div>
      </div>
    }

    return (
      <div className="test-functions container">
        <h4>Test Functions</h4>
        <div className="row">
          <div className="col s12">
            <ul className="tabs tabs1">
              <li className="tab col s3"><a href="#Uuid2Guest">Uuid2Guest</a></li>
              <li className="tab col s3"><a href="#TopicId2Topic">TopicId2Topic</a></li>
              <li className="tab col s3"><a href="#Encrypt_Decrypt">Encrypt_Decrypt</a></li>
              <li className="tab col s3"><a href="#json_view">JSON View</a></li>
            </ul>
          </div>

          {this.renderUuid2Guest()}
          {this.renderTopicId2Topic()}
          {this.renderEncryptDecrypt()}
          {this.renderJsonView()}
        </div>

        <div className="row">
          <div className="col s12">
            <ul className="tabs tabs2">
              <li className="tab col s3"><a href="#compare_time">Compare Time</a></li>
              <li className="tab col s3"><a href="#topic_start">Topic is going to start in 10 minutes</a></li>
            </ul>
          </div>

          {this.renderCompareTime()}
          {this.renderTopicStart()}

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    topics: state.topic.topics,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGuestByUuid: (uuid) => dispatch(getGuestByUuid(uuid)),
    getTopic: (topicId) => dispatch(getTopic(topicId)),
    getAllTopics: () => dispatch(getAllTopics()),
    listenGuestById: (id) => dispatch(listenGuestById(id)),
    getAllPushNotificationsCons: () => dispatch(getAllPushNotificationsCons()),
    getGuestsHaveToken: () => dispatch(getGuestsHaveToken()),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
  ])
)(TestFunctions);