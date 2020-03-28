import React, {Component} from 'react'

import PdfViewer from "./PdfViewer";

class PteStructureTest extends Component {

  render() {
    const filePath = `${process.env.REACT_APP_FIREBASE_STORAGE_LINK}other%2FPTE%20TEST%26%20COURSE%20STRUCTURE.pdf?alt=media`;

    return (
      <PdfViewer filePath={filePath} />
    )
  }
}

export default PteStructureTest;
