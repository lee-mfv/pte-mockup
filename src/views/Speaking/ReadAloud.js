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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {getBlog} from 'store/actions/blogActions'
import {initCountDownTimer} from 'store/actions/globalActions'
import Loading from 'components/Common/Loading'
import PdfViewer from "views/Documents/PdfViewer";
import Constants from "config/constants";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

const styles = {};

class ReadAloud extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scale: 1.5,
      selectedFileId: 1,
      doneGetAllData: true,
    };
  }

  componentDidMount() {
    this.props.initCountDownTimer(Constants.PTE_REAL_RULES.SPEAKING.RA.PREPARE, Constants.PTE_REAL_RULES.SPEAKING.RA.PREPARE);
  }

  componentWillUnmount() {
    this.props.initCountDownTimer(null, null);
  }

  getRaFiles() {
    const dir = process.env.REACT_APP_FIREBASE_STORAGE_LINK;
    return [
      {id: 1, title: 'Book 1', startPage: 1, endPage: null, path: `${dir}pte%2Fspeaking%2Fread-aloud%2FRead%20aloud%201.pdf?alt=media`,},
      {id: 2, title: 'Book 2', startPage: 1, endPage: null, path: `${dir}pte%2Fspeaking%2Fread-aloud%2FRead%20aloud%206.pdf?alt=media`,},
      {id: 3, title: 'Book 3', startPage: 1, endPage: null, path: `${dir}pte%2Fspeaking%2Fread-aloud%2FREAD%20ALOUD.pdf?alt=media`,},
      {id: 4, title: 'Repeated 2019', startPage: 3, endPage: 6, path: `${dir}other%2FPTE%20Magic%20Repeated%20Questions%202019.pdf?alt=media`,},
    ];
  }

  handleChangeSelect = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  findFileById(fileId) {
    const files = this.getRaFiles();
    const result = files.filter(file => {
      return file.id === fileId;
    });

    return result.length > 0 ? result[0] : null;
  }

  render() {
    const { doneGetAllData, selectedFileId } = this.state;
    if(!doneGetAllData) {
      return (<Loading/>);
    }

    const files = this.getRaFiles();
    const selectedFile = this.findFileById(selectedFileId);
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <FormControl fullWidth={true}>
            <InputLabel htmlFor="selectedFilePath">Files</InputLabel>
            <Select
              fullWidth={true}
              value={selectedFileId}
              onChange={this.handleChangeSelect}
              inputProps={{
                name: 'selectedFileId',
                id: 'selectedFileId',
              }}
            >
              {files.map(file => {
                return (<MenuItem key={file.id} value={file.id}>{file.title}</MenuItem>);
              })}
            </Select>
          </FormControl>
        </GridItem>

        {selectedFile && <GridItem xs={12} sm={12} md={12}>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{selectedFile.title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <GridItem xs={12} sm={12} md={12}>
                <PdfViewer filePath={selectedFile.path} startPage={selectedFile.startPage} endPage={selectedFile.endPage} />
              </GridItem>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </GridItem>}

      </GridContainer>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBlog: (blogId) => dispatch(getBlog(blogId)),
    initCountDownTimer: (numSecondsOne, numSecondsTwo) => dispatch(initCountDownTimer(numSecondsOne, numSecondsTwo)),
  }
};

const mapStateToProps = state => {
  return {
    blog: state.blog.blog,
  };
};

ReadAloud.propTypes = {
  classes: PropTypes.object
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(ReadAloud);
