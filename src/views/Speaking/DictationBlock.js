import React, {Component} from 'react'
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Hidden from "@material-ui/core/Hidden";
import Fab from '@material-ui/core/Fab';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Quote from "components/Typography/Quote.jsx";
import TextToSpeechIcon from 'components/Common/TextToSpeechIcon'
import Danger from "components/Typography/Danger.jsx";
import Success from "components/Typography/Success.jsx";

const styles = {};

class DictationBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: 0,
      answer: '',
      showAnwser: false,
      errors: 0,
      isVerifying: false,
      goTo: -1,
    };

    this.handleChangeSwitch = this.handleChangeSwitch.bind(this);
  }

  intersectArrays (x, y) {
    return x.filter(value => -1 !== y.indexOf(value));
  }

  handleVerify = () => {
    const {question, answer} = this.state;
    if(answer.length === 0) {
      return false;
    }
    const {data} = this.props;
    const result = data[question];

    let ansWords = result.split(" ");
    let inputWords = answer.split(" ");

    ansWords = ansWords.filter(function(n){ return n !== "" });
    inputWords = inputWords.filter(function(n){ return n !== "" });

    const u = this.intersectArrays(inputWords, ansWords);
    const count = ansWords.length - u.length;

    this.setState({
      errors: count,
      isVerifying: true,
    });
  }

  handlePrevious = () => {
    const num = this.state.question === 0 ? this.state.question : (this.state.question - 1);
    this.setState({question: num});
  }

  handleNext = () => {
    const num = this.state.question === this.props.data.length - 1 ? this.state.question : (this.state.question + 1);
    this.setState({question: num});
  }

  handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    this.setState({
      isVerifying: false,
      [id]: value
    });
  }

  handleChangeGoTo = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    this.setState({
      [id]: value
    });
  }

  goTo = (e) => {
    const {goTo} = this.state;
    const num = goTo >= this.props.data.length ? this.props.data.length : goTo;
    this.setState({question: +num - 1});
  }

  handleChangeSwitch = (name) => {
    this.setState((prevState, props) => {
      return ({
        [name]: !prevState[name]
      });
    })
  };

  render() {
    const {question, showAnwser, answer, errors, isVerifying} = this.state;
    const {data, isDictation} = this.props;

    return (
      <GridContainer>
        <GridItem xs={6} sm={6} md={6} container justify="flex-end">
          <Fab color="primary" aria-label="number">
            {`${question + 1}/${data.length}`}
          </Fab>
        </GridItem>
        <GridItem xs={6} sm={6} md={6} container justify="flex-start">
          <FormControlLabel
            control={
              <Switch
                checked={showAnwser}
                onChange={() => this.handleChangeSwitch('showAnwser')}
                value="showAnwser"
                color="secondary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            }
            label="Show result"
          />
        </GridItem>

        <GridItem xs={12} sm={12} md={12} container direction="row" justify="center" alignItems="center">
          <CustomInput
            labelText="Go to"
            id="goTo"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: this.handleChangeGoTo,
            }}
          />
          <Fab color="primary" aria-label="enter" onClick={this.goTo}>
            <ArrowRightAltIcon />
          </Fab>
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
          {showAnwser && <Quote
            text={data[question] ? data[question] : 'No question found.'}
          />}
        </GridItem>

        {isDictation && <GridItem xs={12} sm={12} md={12}>
          <CustomInput
            labelText="Answer"
            id="answer"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              multiline: true,
              onChange: this.handleChange,
              rows: 3
            }}
          />
        </GridItem>}

        {isVerifying && <GridItem xs={12} sm={12} md={12}>
          {answer.length > 0 && errors > 0 &&
          <Danger>There are {errors} errors</Danger>
          }
          {answer.length > 0 && errors === 0 &&
          <Success>Pass all</Success>
          }
        </GridItem>}

        <GridItem xs={3} sm={3} md={3} container justify="flex-end">
          <Hidden smUp implementation="css">
            <Button type="button" color="info" justIcon round size="sm" onClick={this.handlePrevious}><NavigateBeforeIcon /></Button>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Button type="button" color="info" size="sm" onClick={this.handlePrevious}>Previous</Button>
          </Hidden>
        </GridItem>
        <GridItem xs={3} sm={3} md={3} container justify="center">
          <Hidden smUp implementation="css">
            <TextToSpeechIcon text={data[question]} type="button"
                              buttonIsIcon={true}
                              buttonText="Play"
                              buttonProps={{
                                color: 'primary',
                                size: 'sm',
                                justIcon: true,
                                round: true,
                              }}
            />
          </Hidden>
          <Hidden xsDown implementation="css">
            <TextToSpeechIcon text={data[question]} type="button"
                              buttonText="Play"
                              buttonProps={{
                                color: 'primary',
                                size: 'sm',
                              }}
            />
          </Hidden>
        </GridItem>
        <GridItem xs={3} sm={3} md={3} container justify="center">
          {isDictation && <Hidden smUp implementation="css">
            <Button type="button" color="danger" justIcon round size="sm" onClick={this.handleVerify}><VerifiedUserIcon /></Button>
          </Hidden>}

          {isDictation && <Hidden xsDown implementation="css">
            <Button type="button" color="danger" size="sm" onClick={this.handleVerify}>Verify</Button>
            </Hidden>}
        </GridItem>
        <GridItem xs={3} sm={3} md={3} container justify="flex-start">
          <Hidden smUp implementation="css">
            <Button type="button" color="info" justIcon round size="sm" onClick={this.handleNext}><NavigateNextIcon /></Button>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Button type="button" color="info" size="sm" onClick={this.handleNext}>Next</Button>
          </Hidden>
        </GridItem>

      </GridContainer>
    )
  }
}


DictationBlock.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.array,
  isDictation: PropTypes.bool,
};

export default withStyles(styles)(DictationBlock);
