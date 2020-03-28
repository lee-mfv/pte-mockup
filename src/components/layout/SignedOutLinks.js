import React from 'react'
import {NavLink} from "react-router-dom";

const SiginedOutLinks = () => {
  return (
    <ul className="right">
      <li><NavLink to='/signin'>Log In</NavLink></li>
    </ul>
  )
}

export default SiginedOutLinks