import React, {Component} from 'react'
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import YouTube from 'react-youtube';

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class Other extends Component {
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
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
              <Typography>Microphone Position Image</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <GridItem xs={12} sm={12} md={12}>
                <img src={`${process.env.REACT_APP_FIREBASE_STORAGE_LINK}other%2Fmic_location.jpg?alt=media`} alt="mic_location" />
              </GridItem>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Microphone Position Video</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <GridItem xs={12} sm={12} md={12}>
                <YouTube
                  videoId="tHNMumrS_uU"
                  onReady={this._onReady}
                />
              </GridItem>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </GridItem>
      </GridContainer>
    )
  }
}

Other.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(Other)
