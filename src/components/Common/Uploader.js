import React from 'react'
import { map } from 'lodash'
import { firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import { compose, withHandlers, setPropTypes } from 'recompose'
import PropTypes from 'prop-types'

// Path within Database for metadata (also used for file Storage path)
// const filesPath = 'uploadedFiles'
const filesPath = 'pte-mockup'
// const filesPath = 'fibrws'

const handlers = {
  // Uploads files and push's objects containing metadata to database at dbPath
  onFilesDrop: props => files => {
    // uploadFiles(storagePath, files, dbPath)
    return props.firebase.uploadFiles(filesPath, files, filesPath)
  },
  onFileDelete: props => (file, key) => {
    // deleteFile(storagePath, dbPath)
    return props.firebase.deleteFile(file.fullPath, `${filesPath}/${key}`)
  }
}

const enhancerPropsTypes = {
  firebase: PropTypes.object.isRequired
}

// Component Enhancer that adds props.firebase and creates a listener for
// files them passes them into props.uploadedFiles
const enhance = compose(
  // Create listeners for Real Time Database which write to redux store
  firebaseConnect([{ path: filesPath }]),
  // connect redux state to props
  connect(({ firebase: { data } }) => ({
    uploadedFiles: data[filesPath]
  })),
  // Set proptypes of props used within handlers
  setPropTypes(enhancerPropsTypes),
  // Add handlers as props
  withHandlers(handlers)
)

function Uploader({ uploadedFiles, onFileDelete, onFilesDrop }) {
  return (
    <div>
      <Dropzone onDrop={onFilesDrop}>
        <div>Drag and drop files here or click to select</div>
      </Dropzone>
      {uploadedFiles && (
        <div>
          <h3>Uploaded file(s):</h3>
          {map(uploadedFiles, (file, key) => (
            <div key={file.name + key}>
              <span>{file.name}</span>
              <button onClick={() => onFileDelete(file, key)}>
                Delete File
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

Uploader.propTypes = {
  firebase: PropTypes.object.isRequired,
  uploadedFiles: PropTypes.object
}

// Apply enhancer to component on export
export default enhance(Uploader)