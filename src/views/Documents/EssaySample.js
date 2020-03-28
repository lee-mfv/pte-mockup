import React, {Component} from 'react'

import PdfViewer from "./PdfViewer";

class EssaySample extends Component {
  render() {
    const filePath = `${process.env.REACT_APP_FIREBASE_STORAGE_LINK}other%2FEssay%20samples.pdf?alt=media`;

    return (
      <PdfViewer filePath={filePath} />
    )
  }
}

export default EssaySample;
