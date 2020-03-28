import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { compose } from "redux";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import RepeatedDictation2019 from "data/RepeatedDictation2019";
import RepeatedRs2019 from "data/RepeatedRs2019";
import RsUpdate092019 from "data/RsUpdate092019.js";
import RsAll2019 from "data/RsAll2019";
import DictationBlock from "views/Speaking/DictationBlock";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

const styles = {};

class RepeatSentence extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Repeated Dictation 2019</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <GridItem xs={12} sm={12} md={12}>
                <DictationBlock data={RepeatedDictation2019} isDictation={true} />
              </GridItem>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Repeated RS 2019</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <GridItem xs={12} sm={12} md={12}>
                <DictationBlock data={RepeatedRs2019} isDictation={false} />
              </GridItem>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>RS 09/2019</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <GridItem xs={12} sm={12} md={12}>
                <DictationBlock data={RsUpdate092019} isDictation={false} />
              </GridItem>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>RS All 2019</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <GridItem xs={12} sm={12} md={12}>
                <DictationBlock data={RsAll2019} isDictation={false} />
              </GridItem>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </GridItem>
      </GridContainer>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

const mapStateToProps = state => {
  return {
  };
};

RepeatSentence.propTypes = {
  classes: PropTypes.object
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(RepeatSentence);
