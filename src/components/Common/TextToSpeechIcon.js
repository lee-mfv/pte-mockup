import React, {Component} from 'react'
import withStyles from "@material-ui/core/styles/withStyles";
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import {connect} from 'react-redux'
import { compose } from "redux";
import PropTypes from "prop-types";
import IconButton from '@material-ui/core/IconButton';

import Button from "components/CustomButtons/Button.jsx";

const styles = {
  white: {
    color: '#fff'
  },
};

class TextToSpeechIcon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      synthesisVoices: null,
    }

    this.textToSpeech = this.textToSpeech.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.playSynthesisVoices = this.playSynthesisVoices.bind(this);
  }

  componentWillMount() {
    this.setState({
      synthesisVoices: window.speechSynthesis.getVoices(),
    });
  }

  textToSpeech() {
    if(window.speechSynthesis && this.props.text.length > 0) {
      this.playAudio(this.props.text);
    }
  }

  playAudio(text) {
    try {
      if (!this.supportsAudioType('mp3'))
        this.playSynthesisVoices(text);
      else
        window.responsiveVoice.speak(text, this.props.voice);
    } catch (err) {
      try {
        window.responsiveVoice.speak(text);
      } catch (err) {
        this.playSynthesisVoices(text);
      }
    }
  }

  playSynthesisVoices(text) {
    let utterThis = new SpeechSynthesisUtterance(text);
    for (let i = 0; i < this.state.synthesisVoices.length; i++) {
      if (this.state.synthesisVoices[i].name === this.props.voice) {
        utterThis.voice = this.state.synthesisVoices[i];
      }
    }

    window.speechSynthesis.speak(utterThis);
  }

  supportsAudioType(type) {

    let audio;
    // Allow user to create shortcuts, i.e. just"mp3"
    let formats = {
      mp3: 'audio/mpeg',
      mp4: 'audio/mp4',
      aif: 'audio/x-aiff'
    };
    if (!audio) {
      audio = document.createElement('audio')
    }

    if (audio.canPlayType){
      return audio.canPlayType(formats[type] || type);
    }

    return true;
  }

  handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    this.setState({[id]: value});
  }

  render() {
    const { classes, type, buttonIsIcon, buttonText, buttonProps } = this.props;

    if(type === 'button') {
      return (
        <Button type="button"
                onClick={this.textToSpeech}
                {...buttonProps}
        >
          {buttonIsIcon ? <VolumeUpIcon/> : buttonText}
        </Button>
      )
    }

    return (
      <IconButton
        classes={{
          label: classes.white,
        }}
        onClick={this.textToSpeech}
      >
        <VolumeUpIcon/>
      </IconButton>
    )
  }
}

const mapStateToProps = state => {
  return {
    voice: state.global.voice,
  };
};

TextToSpeechIcon.propTypes = {
  classes: PropTypes.object,
  buttonProps: PropTypes.object,
  type: PropTypes.oneOf(["button", "icon"]),
};

export default compose(
  connect(
    mapStateToProps,
    null
  ),
  withStyles(styles)
)(TextToSpeechIcon);
