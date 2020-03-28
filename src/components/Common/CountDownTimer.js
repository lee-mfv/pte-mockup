import React, {Component} from 'react'
import Countdown  from 'react-countdown-now';
import withStyles from "@material-ui/core/styles/withStyles";
import Fab from '@material-ui/core/Fab';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';
import lightBlue from '@material-ui/core/colors/lightBlue';
import classNames from "classnames";
import {connect} from 'react-redux'
import { compose } from "redux";
import PropTypes from "prop-types";

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
});

class CountDownTimer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: null,
      isStepTwo: false,
      isPlay: false,
      countdownApi: null,
    }

    this.handleUpdate = this.handleUpdate.bind(this);
    this.setRef = this.setRef.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handlePauseClick = this.handlePauseClick.bind(this);
    this.isPaused = this.isPaused.bind(this);
    this.isCompleted = this.isCompleted.bind(this);
    this.alert = this.alert.bind(this);
    this.renderer = this.renderer.bind(this);
    this.startStepTwo = this.startStepTwo.bind(this);
  }

  alert() {
    const soundfile = '/files/alert.mp3';
    return (
      <audio src={soundfile} autoPlay/>
    )
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      date: Date.now() + (nextProps.countDownTimerData.numSecondsOne * 1000),
      isStepTwo: false,
      isPlay: false,
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevState.isStepTwo === false && this.state.isStepTwo === true) {
      setTimeout(function(){
        this.handleStartClick();
      }.bind(this), 100);
    }
  }

  handleUpdate() {
    this.forceUpdate();
  };

  handleStartClick() {
    this.state.countdownApi && this.state.countdownApi.start();
  };

  handleResetClick() {
    this.state.countdownApi && this.state.countdownApi.pause();
    this.setState({
      date: Date.now() + (this.props.countDownTimerData.numSecondsOne * 1000),
      isStepTwo: false,
      isPlay: false,
    })
  };

  startStepTwo() {
    this.setState({
      date: Date.now() + (this.props.countDownTimerData.numSecondsTwo * 1000),
      isStepTwo: true,
      isPlay: true,
    })
  }

  handlePauseClick() {
    this.state.countdownApi && this.state.countdownApi.pause();
  };

  setRef (countdown) {
    if (countdown) {
      this.setState({
        countdownApi: countdown.getApi()
      })
    }
  };

  isPaused(){
    return !!(this.state.countdownApi && this.state.countdownApi.isPaused());
  }

  isCompleted() {
    return !!(this.state.countdownApi && this.state.countdownApi.isCompleted());
  }

  renderer({ hours, minutes, seconds, completed }) {
    if (completed) {
      if(!this.state.isStepTwo) {
        // Render a complete state
        setTimeout(function(){
          this.startStepTwo();
        }.bind(this), 100);
        return <span>0:0:0</span>;;
      } else {
        return <span>DONE</span>;
      }
    } else {
      // Render a countdown
      return <span>{hours}:{minutes}:{seconds}</span>;
    }
  }

  render() {
    const { classes, countDownTimerData } = this.props;
    if(!countDownTimerData.numSecondsOne) {
      return null;
    }
    const { date, isPlay } = this.state;

    return (
      <div className={classes.container}>
        {isPlay && this.alert()}

        <Countdown
          key={date}
          ref={this.setRef}
          date={date}
          renderer={this.renderer}
          autoStart={false}
          onMount={this.handleUpdate}
          onStart={this.handleUpdate}
          onPause={this.handleUpdate}
          onComplete={this.handleUpdate}
        />
        <Fab size="small" aria-label="start"
             className={classNames(classes.fab, {
               [classes.start]: this.isPaused(),
               [classes.pause]: !this.isPaused(),
             })}
             onClick={() => this.isPaused() ? this.handleStartClick() : this.handlePauseClick()}
        >
          {this.isPaused() && <PlayArrowIcon />}
          {!this.isPaused() && <StopIcon />}
        </Fab>
        <Fab size="small" aria-label="start"
             className={classNames(classes.fab, classes.reset)}
             onClick={this.handleResetClick}
        >
          <RotateLeftIcon />
        </Fab>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    countDownTimerData: state.global.countDownTimerData,
  };
};

CountDownTimer.propTypes = {
  classes: PropTypes.object
};

export default compose(
  connect(
    mapStateToProps,
    null
  ),
  withStyles(styles)
)(CountDownTimer);
