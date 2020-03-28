import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from "react-router-dom";

const DropdownContents = () => {
  return (
    <div>
      <ul id="dropdownSystem" className="dropdown-content">
        <li><NavLink to='/settings'>Settings</NavLink></li>
        <li><NavLink to='/statistic'>Statistic</NavLink></li>
        <li className="divider"></li>
        <li><NavLink to='/pnotification'>Notifications</NavLink></li>
      </ul>
    </div>
  )
}

export default connect(null, null)(DropdownContents)