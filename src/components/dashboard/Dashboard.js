import React, {Component} from 'react'
import Notifications from './Notifications'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'

class Dashboard extends Component {
  render() {
    const {auth, notifications} = this.props

    if (!auth.uid) return <Redirect to="/signin"/>

    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications notifications={notifications} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
  ])
)(Dashboard);
