import React, {Component} from 'react'

import PdfViewer from "./PdfViewer";

class FibVocab extends Component {
  render() {
    const filePath = `${process.env.REACT_APP_FIREBASE_STORAGE_LINK}other%2FFIB-L%20Vocab.pdf?alt=media`;

    return (
      <PdfViewer filePath={filePath} />
    )
  }
}

export default FibVocab;
