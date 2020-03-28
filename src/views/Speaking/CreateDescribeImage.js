import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { compose } from "redux";
import ReactMarkdown from "react-markdown/with-html";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import {createDescribeImage} from 'store/actions/describeImageActions'
import {getAllImages} from 'store/actions/imageActions'
import Loading from 'components/Common/Loading'
import AutoCompleteImage from 'components/Common/AutoCompleteImage'

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";

const styles = {
  previewImage: {
    width: '100%',
  }
};

class CreateDescribeImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        content: '',
        title: '',
        image_id: '',
        full_path: '',
      },
      viewImages: [],
      selectedImage: null,
      isProcessing: false,
      doneGetAllData: false,
    }

    this.selectImage = this.selectImage.bind(this);
  }

  componentWillMount() {
    this.fetchData();
  }

  async fetchData() {
    await this.props.getAllImages();
    const { images } = this.props;

    const viewImages = images.map(image => {
      return {...image,
        value: image.id,
        label: image.image_metadata.name,
      };
    });

    this.setState({
      doneGetAllData: true,
      viewImages: viewImages,
    });
  }

  handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    this.setState((prevState) => {
      return ({
        form: {
          ...prevState.form,
          [id]: value
        }
      });
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({
      isProcessing: true
    }, ()=>{
      this.props.createDescribeImage(this.state.form)
        .then(() => {
          alert('Added successfully!')
          this.props.history.push('/admin/speaking/describe-image');
        })
        .catch(() => {
          alert('Got error!')
          window.location.href = "/admin/speaking/describe-image-create";
        });
    });
  }

  selectImage (image) {
    this.setState((prevState) => {
      return ({
        selectedImage: image,
        form: {
          ...prevState.form,
          image_id: image.id,
          full_path: image.image_metadata.fullPath,
        }
      });
    })
  }

  render() {
    const { classes } = this.props;
    const { doneGetAllData, isProcessing, selectedImage, viewImages, form: {content}} = this.state;
    if(!doneGetAllData) {
      return (<Loading/>);
    }

    let placeholder = <span>&#9786; Select Image</span>;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} container justify="flex-start">
            <Button onClick={() => this.props.history.push('/admin/speaking/describe-image')} type="button" color="info" size="sm" round justIcon> <ArrowBackIcon /></Button>
          </GridItem>
        </GridContainer>
        <form onSubmit={this.handleSubmit}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Create Sample DI</h4>
                </CardHeader>

                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <AutoCompleteImage onChange={this.selectImage} listImages={viewImages} placeholder={placeholder} selectedImage={selectedImage} />
                    </GridItem>

                    {selectedImage && <GridItem xs={12} sm={12} md={12}>
                      <p>Preview Image</p>
                      <img className={classes.previewImage} src={`${process.env.REACT_APP_FIREBASE_STORAGE_LINK}${encodeURIComponent(selectedImage.image_metadata.fullPath)}?alt=media`} alt={selectedImage.image_metadata.name} />
                    </GridItem>}

                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Title"
                        id="title"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: this.handleChange,
                        }}
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Content"
                        id="content"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          multiline: true,
                          onChange: this.handleChange,
                          rows: 20
                        }}
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                      <ExpansionPanel>
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>Preview</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          <GridItem xs={12} sm={12} md={12}>
                            <ReactMarkdown source={content} escapeHtml={false} />
                          </GridItem>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    </GridItem>

                    {isProcessing && <GridItem xs={12} sm={12} md={12}>
                      <Loading />
                    </GridItem>}

                  </GridContainer>
                </CardBody>

                <CardFooter>
                  <Button type="submit" color="primary" disabled={isProcessing ? true : false}>Create</Button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createDescribeImage: (describeImage) => dispatch(createDescribeImage(describeImage)),
    getAllImages: () => dispatch(getAllImages()),
  }
}

const mapStateToProps = state => {
  return {
    images: state.image.images,
  };
};

CreateDescribeImage.propTypes = {
  classes: PropTypes.object
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(CreateDescribeImage);
