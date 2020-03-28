import React from 'react'
import Select, { components } from 'react-select';
import Avatar from '@material-ui/core/Avatar';

const ImageOption = props => {
  const {data} = props;
  const {image_metadata} = data;
  return (
    <components.Option {...props}>
      <Avatar alt={data.label} src={`${process.env.REACT_APP_FIREBASE_STORAGE_LINK}${encodeURIComponent(image_metadata.fullPath)}?alt=media`} />
      {data.label}
    </components.Option>
  );
};

const AutoCompleteImage = (props) => {
  const {listImages, placeholder, selectedImage, onChange} = props;
  return (
    <Select
      onChange={onChange}
      components={{ Option: ImageOption }}
      options={listImages}
      placeholder={placeholder}
      value={selectedImage}
    />
  )
}

export default AutoCompleteImage;
