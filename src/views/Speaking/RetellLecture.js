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
import ReactMarkdown from "react-markdown/with-html";
import 'react-viewer/dist/index.css';
import Grid from "@material-ui/core/Grid";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {getBlog} from 'store/actions/blogActions'
import {getAllDescribeImages, deleteDescribeImage} from 'store/actions/describeImageActions'
import Loading from 'components/Common/Loading'
import PdfViewer from "views/Documents/PdfViewer";
import RLRepeated2019Data from "data/RLRepeated2019";
import RL2019 from "data/RL2019";
import AudioPlayer from "components/Common/AudioPlayer";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

const styles = {
  inlineContainer: {
    display: 'none',
    margin: '0 auto',
    '&$show': {
      display: 'block',
    },
  },
  show: {},
  fullWidth: {
    width: '100%'
  },
};

class RetellLecture extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAudioIndex: -1,
      selectedAudioAllIndex: -1,
      doneGetAllData: false,
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  async fetchData() {
    await this.props.getBlog('retell_lecture_key_structure');

    this.setState({
      doneGetAllData: true,
    });
  }

  handleChangeSelect = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  renderTemplate() {
    const { blog } = this.props;

    return (<ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Template</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <GridItem xs={12} sm={12} md={12}>
          <ReactMarkdown source={blog.content} escapeHtml={false} />
        </GridItem>
      </ExpansionPanelDetails>
    </ExpansionPanel>);
  }

  renderMostRepeated2019() {
    const { selectedAudioIndex } = this.state;
    const { classes } = this.props;

    const dir = process.env.REACT_APP_FIREBASE_STORAGE_LINK;
    let audioPath = null;
    if(RLRepeated2019Data[selectedAudioIndex]) {
      audioPath = `${dir}pte%2Fspeaking%2Fretell-lecture%2F2019%2Fmost-repeated%2Faudios%2F${encodeURIComponent(RLRepeated2019Data[selectedAudioIndex])}?alt=media`;
    }
    const rlRepeated2019FilePath = `${dir}pte%2Fspeaking%2Fretell-lecture%2F2019%2Fmost-repeated%2FRL%20Most%20Repeated.pdf?alt=media`;

    return (<ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Most Repeated 2019</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>

        <Grid container classes={{
          container: classes.fullWidth,
        }}>
          <GridItem xs={12} sm={12} md={12}>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="selectedAudioIndex">Audio</InputLabel>
              <Select
                fullWidth={true}
                value={selectedAudioIndex}
                onChange={this.handleChangeSelect}
                inputProps={{
                  name: 'selectedAudioIndex',
                  id: 'selectedAudioIndex',
                }}
              >
                {RLRepeated2019Data.map((file, idx) => {
                  return (<MenuItem key={idx} value={idx}>{file}</MenuItem>);
                })}
              </Select>
            </FormControl>
          </GridItem>

          {audioPath && <GridItem xs={12} sm={12} md={12}>
            <AudioPlayer url={audioPath} />
          </GridItem>}

          <GridItem xs={12} sm={12} md={12}>
            <PdfViewer filePath={rlRepeated2019FilePath} />
          </GridItem>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>);
  }

  renderAllRetellLecture() {
    const { selectedAudioAllIndex } = this.state;
    const { classes } = this.props;

    const dir = process.env.REACT_APP_FIREBASE_STORAGE_LINK;
    let audioPath = null;
    if(RL2019[selectedAudioAllIndex]) {
      audioPath = `${dir}pte%2Fspeaking%2Fretell-lecture%2F2019%2Fall%2Faudios%2F${encodeURIComponent(RL2019[selectedAudioAllIndex])}?alt=media`;
    }
    const rlAllFilePath = `${dir}pte%2Fspeaking%2Fretell-lecture%2F2019%2Fall%2FRL%20script.pdf?alt=media`;

    return (<ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>All Retell Lecture</Typography>
      </ExpansionPanelSummary>

      <ExpansionPanelDetails>
        <Grid container classes={{
          container: classes.fullWidth,
        }}>
          <GridItem xs={12} sm={12} md={12}>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="selectedAudioAllIndex">Audio</InputLabel>
              <Select
                fullWidth={true}
                value={selectedAudioAllIndex}
                onChange={this.handleChangeSelect}
                inputProps={{
                  name: 'selectedAudioAllIndex',
                  id: 'selectedAudioAllIndex',
                }}
              >
                {RL2019.map((file, idx) => {
                  return (<MenuItem key={idx} value={idx}>{file}</MenuItem>);
                })}
              </Select>
            </FormControl>
          </GridItem>

          {audioPath && <GridItem xs={12} sm={12} md={12}>
            <AudioPlayer url={audioPath} />
          </GridItem>}

          <GridItem xs={12} sm={12} md={12}>
            <PdfViewer filePath={rlAllFilePath} />
          </GridItem>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>);
  }

  render() {
    const { doneGetAllData } = this.state;
    if(!doneGetAllData) {
      return (<Loading/>);
    }

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} container justify="flex-end">
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
          {this.renderTemplate()}

          {this.renderMostRepeated2019()}

          {this.renderAllRetellLecture()}
        </GridItem>
      </GridContainer>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBlog: (blogId) => dispatch(getBlog(blogId)),
    deleteDescribeImage: (describeImageId) => dispatch(deleteDescribeImage(describeImageId)),
    getAllDescribeImages: () => dispatch(getAllDescribeImages()),
  }
};

const mapStateToProps = state => {
  return {
    describeImages: state.describeImage.describeImages,
    blog: state.blog.blog,
  };
};

RetellLecture.propTypes = {
  classes: PropTypes.object
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(RetellLecture);
