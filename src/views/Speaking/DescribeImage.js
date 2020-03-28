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
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ImageIcon from '@material-ui/icons/Image';
import ReactMarkdown from "react-markdown/with-html";
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';
import Hidden from "@material-ui/core/Hidden";
import {
  Magnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION
} from "react-image-magnifiers";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {getBlog} from 'store/actions/blogActions'
import {getAllDescribeImages, deleteDescribeImage} from 'store/actions/describeImageActions'
import Loading from 'components/Common/Loading'
import PdfViewer from "views/Documents/PdfViewer";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Muted from "components/Typography/Muted";

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

class DescribeImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doneGetAllData: false,
      isProcessing: false,
      selectedDescribeImageIdSample: '',
      selectedFileId: 1,
      scale: 1.5,
      visible: false,
      mode: 'inline',
    };

    this.deleteDescribeImage = this.deleteDescribeImage.bind(this);
    this.findSelectedDescribeImageSample = this.findSelectedDescribeImageSample.bind(this);
  }

  componentWillMount() {
    this.fetchData();
  }

  async fetchData() {
    await this.props.getBlog('describe_image_key_structure');
    await this.props.getAllDescribeImages();

    this.setState({
      doneGetAllData: true,
    });
  }

  deleteDescribeImage(describeImageId) {
    const r = window.confirm("Are you sure?");
    if (r === true) {
      this.setState({
        isProcessing: true,
      }, async () => {
        await this.props.deleteDescribeImage(describeImageId);
        this.setState({
          isProcessing: false,
          doneGetAllData: false,
        }, () => {
          this.fetchData();
        });
      });
    }
  }

  handleChangeSelect = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  findSelectedDescribeImageSample(findDescribeImageId) {
    const { describeImages } = this.props;
    const result = describeImages.filter(describeImage => {
      return describeImage.id === findDescribeImageId;
    });

    return result.length > 0 ? result[0] : null;
  }

  getDiFiles() {
    const dir = process.env.REACT_APP_FIREBASE_STORAGE_LINK;
    return [
      {id: 1, title: 'Book 1', startPage: 1, endPage: null, path: `${dir}pte%2Fspeaking%2Fdi%2FDescribe%20image%201.pdf?alt=media`,},
      {id: 2, title: 'Book 2', startPage: 1, endPage: null, path: `${dir}pte%2Fspeaking%2Fdi%2FDescribe%20image%202.pdf?alt=media`,},
      {id: 3, title: 'Book 3', startPage: 1, endPage: null, path: `${dir}pte%2Fspeaking%2Fdi%2FDescribe%20Image_Updated%20Image.pdf?alt=media`,},
      {id: 4, title: 'Repeated 2019', startPage: 13, endPage: 25, path: `${dir}other%2FPTE%20Magic%20Repeated%20Questions%202019.pdf?alt=media`,},
    ];
  }

  findFileById(fileId) {
    const files = this.getDiFiles();
    const result = files.filter(file => {
      return file.id === fileId;
    });

    return result.length > 0 ? result[0] : null;
  }

  render() {
    const { doneGetAllData, mode, visible, isProcessing, selectedDescribeImageIdSample, selectedFileId } = this.state;
    if(!doneGetAllData) {
      return (<Loading/>);
    }

    const { classes, blog, describeImages } = this.props;
    const imageHost = process.env.REACT_APP_FIREBASE_STORAGE_LINK;

    const selectedDescribeImageSample = this.findSelectedDescribeImageSample(selectedDescribeImageIdSample);
    const inline = mode === 'inline';
    const inlineContainerClass = classNames('inlineContainer', {
      show: visible && inline,
    });

    const files = this.getDiFiles();
    const selectedFile = this.findFileById(selectedFileId);

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} container justify="flex-end">
          <Button type="button" color="primary" onClick={() => this.props.history.push('/admin/speaking/describe-image-create')}>Create Sample DI
            <AddIcon />
          </Button>
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
          <ExpansionPanel>
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
          </ExpansionPanel>

          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              Samples <Muted>({describeImages.length})</Muted>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container classes={{
                container: classes.fullWidth,
              }}>
                <GridItem xs={12} sm={12} md={12}>
                  <FormControl fullWidth={true}>
                    <InputLabel htmlFor="selectedDescribeImageIdSample">Sample</InputLabel>
                    <Select
                      fullWidth={true}
                      value={selectedDescribeImageIdSample}
                      onChange={this.handleChangeSelect}
                      inputProps={{
                        name: 'selectedDescribeImageIdSample',
                        id: 'selectedDescribeImageIdSample',
                      }}
                    >
                      {describeImages.map(describeImage => {
                        return (<MenuItem key={describeImage.id} value={describeImage.id}>{describeImage.title}</MenuItem>);
                      })}
                    </Select>
                  </FormControl>
                </GridItem>

                {selectedDescribeImageSample && <GridItem xs={12} sm={12} md={12}>
                  <GridItem xs={12} sm={12} md={12}>
                    <Hidden smDown implementation="css">
                      <Viewer
                        visible={visible}
                        container={this.container}
                        images={[{src: `${imageHost}${encodeURIComponent(selectedDescribeImageSample.full_path)}?alt=media`, alt: ''}]}
                      />
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12} container justify="center">
                          <Button type="button" color="info" onClick={() => { this.setState({ visible: !visible }); } }>Image <ImageIcon /></Button>
                          <Button type="button" color="primary" href={`/admin/speaking/describe-image-edit/${selectedDescribeImageSample.id}`} disabled={isProcessing}>Edit</Button>
                          <Button type="button" color="danger" onClick={(e) => this.deleteDescribeImage(selectedDescribeImageSample.id)} disabled={isProcessing}>Delete</Button>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <div className={inlineContainerClass} ref={ref => {this.container = ref;}}></div>
                        </GridItem>
                      </GridContainer>
                    </Hidden>

                    <Hidden mdUp implementation="css">
                      <GridItem xs={12} sm={12} md={12} container justify="center">
                        <Button type="button" color="primary" href={`/admin/speaking/describe-image-edit/${selectedDescribeImageSample.id}`} disabled={isProcessing} justIcon round size="sm"><EditIcon /></Button>
                        <Button type="button" color="danger" onClick={(e) => this.deleteDescribeImage(selectedDescribeImageSample.id)} disabled={isProcessing} justIcon round size="sm"><DeleteIcon /></Button>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12} container justify="center">
                        <Magnifier
                          imageSrc={`${imageHost}${encodeURIComponent(selectedDescribeImageSample.full_path)}?alt=media`}
                          imageAlt=""
                          largeImageSrc={`${imageHost}${encodeURIComponent(selectedDescribeImageSample.full_path)}?alt=media`}
                          mouseActivation={MOUSE_ACTIVATION.DOUBLE_CLICK} // Optional
                          touchActivation={TOUCH_ACTIVATION.DOUBLE_TAP} // Optional
                        />
                      </GridItem>
                    </Hidden>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={12}>
                      <ReactMarkdown source={selectedDescribeImageSample.content} escapeHtml={false} />
                  </GridItem>

                </GridItem>}
              </Grid>

            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              Files <Muted>({files.length})</Muted>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails>
              <Grid container classes={{
                container: classes.fullWidth,
              }}>
                <GridItem xs={12} sm={12} md={12}>
                  <FormControl fullWidth={true}>
                    <InputLabel htmlFor="selectedFileId">Sample</InputLabel>
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

              </Grid>
            </ExpansionPanelDetails>

          </ExpansionPanel>

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

DescribeImage.propTypes = {
  classes: PropTypes.object
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(DescribeImage);
