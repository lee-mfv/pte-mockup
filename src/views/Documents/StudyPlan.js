import React, {Component} from 'react'

import PdfViewer from "./PdfViewer";

class StudyPlan extends Component {
  render() {
    const filePath = `${process.env.REACT_APP_FIREBASE_STORAGE_LINK}other%2FSTUDY%20PLAN.pdf?alt=media`;

    return (
      <PdfViewer filePath={filePath} />
    )
  }
}

export default StudyPlan;
