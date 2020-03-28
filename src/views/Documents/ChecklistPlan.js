import React, {Component} from 'react'

import PdfViewer from "./PdfViewer";

class ChecklistPlan extends Component {
  render() {
    const filePath = `${process.env.REACT_APP_FIREBASE_STORAGE_LINK}other%2FPTE%20MAGIC%20COURSE%20CHECKLIST.pdf?alt=media`;

    return (
      <PdfViewer filePath={filePath} />
    )
  }
}

export default ChecklistPlan;
