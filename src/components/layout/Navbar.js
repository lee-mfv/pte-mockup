import React from 'react'
import {Link} from "react-router-dom";
import SignedInLinks from './SignedInLinks'
import SiginedOutLinks from './SignedOutLinks'
import DropdownContents from './DropdownContents'
import {connect} from 'react-redux'

const Navbar = (props) => {
  const {auth, profile} = props;
  // console.log(auth)
  const links = auth.uid ? <SignedInLinks profile={profile} /> : <SiginedOutLinks />;

  return (
    <nav className="nav-wrapper grey darken-3">
      {auth.uid && <DropdownContents/>}
      <div className="container">
        <Link to='/' className="brand-logo left">MF Expo</Link>
        {links}
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(Navbar)