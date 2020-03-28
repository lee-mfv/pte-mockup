import React, {Component} from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import {getSetting, updateSetting} from '../../store/actions/settingActions'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment-timezone'
import cloneDeep from 'lodash/cloneDeep';
import Constants from '../../config/constants'

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      conference_date: '',
      doneGetAllData: false,
      isProcessing: false,
    }

    this.fetchData = this.fetchData.bind(this)
    this.handleChangeData = this.handleChangeData.bind(this)
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    Promise.all([
      this.props.getSetting(Constants.SETTING_DEFAULT_ID),
    ]).then(res => {
      const conferenceDate = (this.props.setting && this.props.setting.conference_date) ? this.props.setting.conference_date : ''
      this.setState({
          doneGetAllData: true,
          conference_date: conferenceDate.length ? new Date(conferenceDate) : ''
        },
        () => {}
      )
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleChangeData(value) {
    this.setState({
      conference_date: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let conferenceDate = cloneDeep(this.state.conference_date);
    const data = {
      conference_date: moment(conferenceDate).format('YYYY-MM-DD'),
    };

    this.setState({
      isProcessing: true
    });
    this.props.updateSetting(Constants.SETTING_DEFAULT_ID, data)
      .then(() => {
        this.setState({
            isProcessing: false,
          },
          () => {
            window.M.toast({html: 'Update successfully', class: 'rounded'})
          }
        )
      })
      .catch(() => {
      });

    // this.setState((prevState, props) => ({
    //   cover_photo: !prevState.cover_photo.length ? defaultTopicImage : prevState.cover_photo
    // }), ()=>{
    //   this.props.createTopic(this.state)
    //     .then(() => {
    //       this.props.history.push('/topic');
    //     })
    //     .catch(() => {
    //       this.props.history.push('/topic');
    //     });
    // });
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
      <div className="settings container row">
        <form onSubmit={this.handleSubmit} className="col s12 white">
          <div className="row">
            <div className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  Conference Date:
                  <DatePicker
                    selected={this.state.conference_date}
                    onChange={this.handleChangeData}
                    dateFormat="yyyy-MM-dd"
                  />
                </div>
              </div>

              {this.state.isProcessing && <div className="progress">
                <div className="indeterminate"></div>
              </div>}
              <button className={`waves-effect waves-light btn ${this.state.isProcessing ? 'disabled' : null}`}><i className="material-icons right">cloud</i>Update</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    setting: state.setting.setting,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSetting: (id) => dispatch(getSetting(id)),
    updateSetting: (id, data) => dispatch(updateSetting(id, data)),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
  ])
)(Settings);
