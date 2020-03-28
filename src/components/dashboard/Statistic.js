import React, {Component} from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import {createBuild} from '../../store/actions/statisticActions'
import moment from 'moment-timezone'
import axios from 'axios';

class Statistic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'Update data',
      doneGetAllData: true,
      isProcessing: false,
    }

    this.buildStatisticData = this.buildStatisticData.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fetchData = this.fetchData.bind(this)
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = () => {
    this.setState({
      isProcessing: true,
    })
    this.props.createBuild({message: this.state.message}).then(() => {
      window.M.toast({html: 'Add `build` in queue successfully', class: 'rounded'})
      this.setState({
        message: `Build at ${moment().format('LLLL')}`,
      })
      this.setState({
        isProcessing: false,
      })
    }).catch(err => {
      this.setState({
        isProcessing: false,
      })
    });
  }

  async buildStatisticData() {
    this.setState({
      isProcessing: true,
    })

    let currentToken = null;
    await this.props.firebase.auth().currentUser.getIdToken(true).then(function(token) {
      currentToken = token;
    });
    const instance = axios.create({
      baseURL: process.env.REACT_APP_FIREBASE_CLOUD_FUNCTION_ENDPOINT
    });
    instance.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
    instance.get('/apiV1Admin/buildData', {
      timeout: 10000
    }).then(res => {
      console.log('res', res)

      this.props.createBuild({message: `${this.state.message} -- ${moment().format('LLLL')}`}).then(() => {
        window.M.toast({html: 'Add `build` in queue successfully', class: 'rounded'})
        setTimeout(() => {
          this.setState({
            isProcessing: false,
          })
        }, 1000)
      }).catch(err => {});
    }).catch(err => {
      console.log('err', err)
      alert('Internal server error. Please try again.')
      window.location.href = "/statistic"
    });
  }

  render() {
    const {auth} = this.props
    const {isProcessing, doneGetAllData} = this.state

    if (!auth.uid) return <Redirect to="/signin"/>

    if(!doneGetAllData) {
      return <div className="container">
        <div className="progress">
          <div className="indeterminate">
          </div>
        </div>
      </div>
    }

    return (
      <div className="statistic container">
        <div className="row">
          <div className="col s12">
            <div className="input-field">
              <label className="active" htmlFor="message">Message</label>
              <input type="text" id="message" value={this.state.message} onChange={this.handleChange} />
            </div>
            {isProcessing && <div className="container">
              <div className="progress">
              <div className="indeterminate">
              </div>
              </div>
              </div>}
            <button onClick={this.buildStatisticData} type="button" className={`waves-effect waves-light btn ${isProcessing ? 'disabled' : null}`}><i className="material-icons right">cloud</i>Build Statistic Data</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    firebase: state.firebase,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createBuild: (data) => dispatch(createBuild(data)),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
  ])
)(Statistic);
