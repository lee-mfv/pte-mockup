import React from 'react'
import ReactPlayer from 'react-player'

const AudioPlayer = (props) => {
  const {url, ...rest} = props;
  return (
    <ReactPlayer
      url={url}
      controls={true}
      width={'50%'}
      height={'100px'}
      // style={{
      //   // padding: '20px 0px',
      //   // margin: '10px 0px',
      // }}
      {...rest}
    />
  )
}

export default AudioPlayer;
