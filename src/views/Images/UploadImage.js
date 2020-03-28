import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { compose } from "redux";
import {getFirebase} from "react-redux-firebase";
import InfoIcon from '@material-ui/icons/Info';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {cloneDeep, unset} from "lodash";

import {createImage} from 'store/actions/imageActions'
import BasicUploader from 'components/Common/BasicUploader'
import Constant from 'config/constants'
import Loading from 'components/Common/Loading'

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Snackbar from "components/Snackbar/Snackbar";


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

class UploadImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        image_metadata: {},
      },
      file: null,
      isProcessing: false,
      open: false,
    };

    this.handleClose = this.handleClose.bind(this);
  }

  onFilesDrop = (files) => {
    if(files.length) {
      this.setState({
        file: files[0]
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // validate
    if(!this.state.file) {
      alert('You have to select image');
      return false;
    }

    this.setState((prevState, props) => ({
      isProcessing: true
    }), ()=>{
      // upload first
      const firebase = getFirebase();
      firebase.uploadFile(Constant.UPLOAD_PATH.IMAGES, this.state.file).then(res => {
        const metadata = res.uploadTaskSnapshot.metadata;
        this.setState((prevState, props) => ({
          form: {
            ...prevState.form,
            image_metadata: metadata
          }
        }), () => {
          let form = cloneDeep(this.state.form);
          unset(form, 'image_metadata.cacheControl')
          unset(form, 'image_metadata.contentLanguage')
          unset(form, 'image_metadata.customMetadata')
          this.props.createImage(form)
            .then(() => {
              this.setState({
                open: true
              }, () => {
                setTimeout(function() {
                  this.setState({
                    file: null,
                    open: false,
                    isProcessing: false
                  })
                }.bind(this), 1000);
              })
              // this.props.history.push('/admin/images/list');
            })
            .catch(() => {
              // this.props.history.push('/admin/images/list');
            });
        });

        return res;
      }).catch(err => {
        alert('Something went wrong. Please try again.')
        window.location = window.location.href;
        return false;
      });
    });
  }

  handleClose(open) {
    this.setState({open: open})
  }

  render() {
    const { classes } = this.props;
    const { isProcessing, open, file } = this.state;

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} container justify="flex-start">
            <Button onClick={() => this.props.history.goBack()} type="button" color="info" size="sm" round justIcon> <ArrowBackIcon /></Button>
          </GridItem>
        </GridContainer>

        <form onSubmit={this.handleSubmit}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Upload Image</h4>
                </CardHeader>

                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <BasicUploader onFilesDrop={this.onFilesDrop} selectedFiles={file} />
                    </GridItem>

                    {isProcessing && <GridItem xs={12} sm={12} md={12}>
                      <Loading />
                    </GridItem>}
                  </GridContainer>
                </CardBody>

                <CardFooter>
                  <Button type="submit" color="primary" disabled={isProcessing ? true : false}>Upload</Button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </form>

        <Snackbar
          place={'br'}
          color={'success'}
          icon={InfoIcon}
          message="Uploaded successfully!"
          open={open}
          closeNotification={() => this.handleClose(false)}
          close
        />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createImage: (image) => dispatch(createImage(image)),
  }
};

const mapStateToProps = state => {
  return {
  };
};

UploadImage.propTypes = {
  classes: PropTypes.object
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(UploadImage);
