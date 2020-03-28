import React from 'react';
import {useDropzone} from 'react-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';

const BasicUploader = props => {
  const {onFilesDrop, selectedFiles} = props;
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    onDrop: onFilesDrop,
    accept: 'image/*',
    multiple: false,
  });

  let files = null;
  if(selectedFiles) {
    if(Array.isArray(selectedFiles)) {
      files = selectedFiles.map(file => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
      ));
    } else {
      files = (
        <li key={selectedFiles.path}>
          {selectedFiles.path} - {selectedFiles.size} bytes
        </li>
      );
    }
  } else {
    files = acceptedFiles.map(file => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));
  }

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <Button variant="contained" color="default">
          Drag 'n' drop some files here, or click to select files <CloudUploadIcon />
        </Button>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}

export default BasicUploader;