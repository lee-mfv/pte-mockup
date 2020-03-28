import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getFirebase} from 'react-redux-firebase'
import {cloneDeep, unset} from 'lodash';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { compose } from "redux";

import {createFibrw} from 'store/actions/fibrwActions'
import filterFibrw from 'helpers/filterFibrw'
import BasicUploader from 'components/Common/BasicUploader'
import Constant from 'config/constants'
import Loading from 'components/Common/Loading'

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";

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

class CreateFibrw extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        ordering: 0,
        sentence: [],
        result: [],
        image_metadata: {},
      },
      file: null,
      isProcessing: false,
    }
  }

  handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    this.setState((prevState, props) => {
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
      firebase.uploadFile(Constant.UPLOAD_PATH.FIB_RW, this.state.file).then(res => {
        const metadata = res.uploadTaskSnapshot.metadata;
        this.setState((prevState, props) => ({
          form: {
            ...prevState.form,
            image_metadata: metadata
          }
        }), () => {
          const sentence = filterFibrw(this.state.form.sentence);
          const result = filterFibrw(this.state.form.result);

          if(sentence.length !== result.length) {
            this.setState({isProcessing: false});
            alert('Sentence and Result length do not equal.');
            return false;
          }

          let form = cloneDeep(this.state.form);
          form = {...form, sentence, result}
          unset(form, 'image_metadata.cacheControl')
          unset(form, 'image_metadata.contentLanguage')
          unset(form, 'image_metadata.customMetadata')
          this.props.createFibrw(form.ordering, form)
            .then(() => {
              alert('Added successfully!')
              window.location.href = "/admin/fibrw/create";
            })
            .catch(() => {
              alert('Got error!')
              window.location.href = "/admin/fibrw/create";
            });
        });

        return res;
      }).catch(err => {
        alert('Something went wrong. Please try again.')
        window.location.href = "/";
        return false;
      });
    });
  }

  onFilesDrop = (files) => {
    if(files.length) {
      this.setState({
        file: files[0]
      });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Create Fibrw</h4>
                </CardHeader>

                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Ordering"
                        id="ordering"
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
                        labelText="Sentence"
                        id="sentence"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          multiline: true,
                          onChange: this.handleChange,
                          rows: 5
                        }}
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Result"
                        id="result"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.handleChange,
                        }}
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                      <BasicUploader onFilesDrop={this.onFilesDrop} />
                    </GridItem>

                    {this.state.isProcessing && <GridItem xs={12} sm={12} md={12}>
                      <Loading />
                    </GridItem>}

                  </GridContainer>
                </CardBody>

                <CardFooter>
                  <Button type="submit" color="primary" disabled={this.state.isProcessing ? true : false}>Create</Button>
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
    createFibrw: (id, fibrw) => dispatch(createFibrw(id, fibrw))
  }
}

CreateFibrw.propTypes = {
  classes: PropTypes.object
};

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withStyles(styles)
)(CreateFibrw);
