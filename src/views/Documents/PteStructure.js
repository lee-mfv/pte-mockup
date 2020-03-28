import React, {Component} from 'react'

import PdfViewer from "./PdfViewer";

class PteStructure extends Component {

  render() {
    const filePath = `${process.env.REACT_APP_FIREBASE_STORAGE_LINK}other%2FPTE%20STRUCTURE.pdf?alt=media`;

    return (
      <PdfViewer filePath={filePath} />
    )
  }
}

export default PteStructure;
