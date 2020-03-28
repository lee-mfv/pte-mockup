import React from 'react'

const BackButton = ({backUrl}) => {
  return (
    <div className="section action-buttons">
      <div className="left">
        <a className="waves-effect waves-light btn" href={backUrl}><i className="material-icons left">arrow_back</i></a>
      </div>
    </div>
  )
}

export default BackButton;