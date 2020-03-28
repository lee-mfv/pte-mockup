import React, {Component} from 'react'
import withStyles from "@material-ui/core/styles/withStyles";
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';
import lightBlue from '@material-ui/core/colors/lightBlue';
import classNames from "classnames";
import {connect} from 'react-redux'
import { compose } from "redux";
import PropTypes from "prop-types";

import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

import TextToSpeechIcon from 'components/Common/TextToSpeechIcon'

const styles = theme => ({
  container: {
    display: 'inline-block'
  },
  fab: {
    margin: theme.spacing(1),
  },
  start: {
    backgroundColor: green[500],
  },
  pause: {
    backgroundColor: yellow[500],
  },
  reset: {
    backgroundColor: lightBlue[500],
  },
  white: {
    color: '#fff'
  },
  inputUnderline: {
    "&:before": {
      borderBottom: '1px solid rgba(255, 255, 255, 0.9)',
    },
    "&:hover:not(.Mui-disabled):before": {
      borderBottom: '1px solid rgba(255, 255, 255, 0.9)',
    }
  }
});

class TextToSpeech extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textToSpeechHeader: '',
    }
  }

  handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    this.setState({[id]: value});
  }

  render() {
    const { classes } = this.props;
    const { textToSpeechHeader } = this.state;

    return (
      <div className={classNames(classes.container, 'pte-text-to-speech-block')}>
        <FormControl>
          <Input
            classes={{
              underline: classes.inputUnderline,
              input: classes.white,
            }}
            id="textToSpeechHeader"
            type="text"
            onChange={this.handleChange}
            endAdornment={
              <InputAdornment position="end">
                <TextToSpeechIcon text={textToSpeechHeader} type="icon" />
              </InputAdornment>
            }
          />
        </FormControl>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    voice: state.global.voice,
  };
};

TextToSpeech.propTypes = {
  classes: PropTypes.object
};

export default compose(
  connect(
    mapStateToProps,
    null
  ),
  withStyles(styles)
)(TextToSpeech);
