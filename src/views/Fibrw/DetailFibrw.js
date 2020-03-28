import React, {Component} from 'react'
import {connect} from 'react-redux'
import {cloneDeep, unset} from 'lodash';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { compose } from "redux";
import {getFirebase} from 'react-redux-firebase'
import classNames from "classnames";
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';
import Hidden from "@material-ui/core/Hidden";
import {
  Magnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION
} from "react-image-magnifiers";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { red, green, grey } from '@material-ui/core/colors';
import FormLabel from '@material-ui/core/FormLabel';
import Divider from '@material-ui/core/Divider';

import {getFibrw, updateFibrw} from 'store/actions/fibrwActions'
import Loading from 'components/Common/Loading'
import BasicUploader from 'components/Common/BasicUploader'
import Constant from 'config/constants'

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

const styles = theme => ({
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  media: {
    [theme.breakpoints.down("md")]: {
      maxWidth: '100%',
      objectFit: 'contain',
      maxHeight: '200px',
    },
  },
  correct: {
    backgroundColor: green["200"]
  },
  wrong: {
    backgroundColor: red["200"],
  },
  radioGroup: {
    width: '100%',
    marginBottom: '10px',
  },
  divider: {
    backgroundColor: grey['500'],
    width: '100%',
  },
  formLabel: {
    width: '100%',
    color: grey["900"],
  },
  inlineContainer: {
    display: 'none',
    margin: '0 auto',
    '&$show': {
      display: 'block',
    },
  },
  show: {},
});

class DetailFibrw extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfSentence: 0,
      sentence: {},
      editForm: {},
      file: null,
      isShowEdit: false,
      isProcessing: false,
      visible: false,
      mode: 'inline',
    };

    this.updateData = this.updateData.bind(this)
    this.refreshData = this.refreshData.bind(this)
  }

  componentWillMount() {
    this.fetchData();
  }

  // componentWillUpdate(nextProps, nextState, nextContext) {
  //   console.log('componentWillUpdate');
  //   console.log('nextProps', nextProps);
  //   console.log('this.props', this.props);
  //
  //   // const { match: { params } } = this.props;
  //   // const { match: { nextParams } } = nextProps;
  //   // if(params && nextParams && (params.id !== nextParams.id)) {
  //   //   this.fetchData();
  //   // }
  // }

  componentDidUpdate(prevProps, prevState, snapshot) {

    const params = this.props.match.params;
    const prevParams = prevProps.match.params;
    if(params && prevParams && (params.id !== prevParams.id)) {
      this.setState({
        doneGetAllData: false,
      }, () => {
        this.fetchData();
      });
    }
  }

  async fetchData() {
    const { match: { params } } = this.props;
    await this.props.getFibrw(params.id);

    // process
    const {fibrw} = this.props;
    if(fibrw) {
      const editForm = cloneDeep(fibrw);
      let sentence = {};
      fibrw.sentence.map((item, index) => {
        sentence[index] = {isCorrect: -1, selected: ''};
        return item;
      });

      this.setState({
        sentence: sentence,
        editForm: editForm,
      });
    }

    this.setState({
      doneGetAllData: true,
    });
  }

  handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    this.setState({
      [id]: value
    })
  }

  handleChangeRadio = (e) => {
    const id = e.target.name;
    const value = e.target.value;
    this.setState((prevState, props) => ({
      sentence: {
        ...prevState.sentence,
        [id]: {
          isCorrect: -1,
          selected: value
        }
      },
    }))
  }

  handleCheck = () => {
    const {fibrw} = this.props;

    let sentenceTmp = cloneDeep(this.state.sentence);
    for (let key in sentenceTmp) {
      if (sentenceTmp.hasOwnProperty(key)) {
        const line = sentenceTmp[key];
        if(line.selected === fibrw.result[parseInt(key)]) {
          line.isCorrect = 1;
        } else {
          line.isCorrect = 0;
        }
      }
    }

    this.setState({sentence: sentenceTmp});
  }

  handleStartWith = () => {
    this.props.history.push(`/admin/fibrw/detail/${this.state.numberOfSentence}`);
    return false;
  }

  handleNext = () => {
    const {match: { params }} = this.props;
    this.setState({
      numberOfSentence: parseInt(params.id) + 1,
    }, () => {
      this.handleStartWith();
    });
  }

  handlePrevious = () => {
    const {match: { params }} = this.props;
    this.setState({
      numberOfSentence: parseInt(params.id) - 1,
    }, () => {
      this.handleStartWith();
    });
  }

  handleEdit = () => {
    this.setState((prevState, props) => ({
      isShowEdit: !prevState.isShowEdit,
    }));
  }

  handleEditLine = (e) => {
    const target = e.target;
    const value = target.value;
    const index = target.getAttribute("data-index");
    const keyform = target.getAttribute("data-keyform");

    const {editForm} = this.state;
    let data = cloneDeep(editForm[keyform]);
    data[index] = value;
    this.setState((prevState, props) => ({
      editForm: {
        ...prevState.editForm,
        [keyform]: data
      },
    }));
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

    this.setState((prevState, props) => ({
      isProcessing: true
    }), ()=>{
      if(this.state.file) {
        // upload first
        const firebase = getFirebase();
        const {editForm} = this.state;
        firebase.deleteFile(editForm.image_metadata.fullPath)
          .then(res => {
            firebase.uploadFile(Constant.UPLOAD_PATH.FIB_RW, this.state.file).then(res => {
              let metadata = res.uploadTaskSnapshot.metadata;
              unset(metadata, 'cacheControl')
              unset(metadata, 'contentLanguage')
              unset(metadata, 'customMetadata')
              this.setState((prevState, props) => ({
                editForm: {
                  ...prevState.editForm,
                  image_metadata: metadata
                }
              }), () => {
                this.updateData();
              });

              return res;
            }).catch(err => {
              alert('Something went wrong. Please try again.')
              window.location.href = "/";
              return false;
            });
          })
          .catch(err => {
            console.log('Cannot delete file', err)
          });
      } else {
        this.updateData();
      }
    });
  }

  updateData = () => {
    this.props.updateFibrw(`${this.state.editForm.ordering}`, this.state.editForm)
      .then(() => {
        this.refreshData();
      })
      .catch(() => {
        this.refreshData();
      });
  }

  refreshData = () => {
    this.setState({
      doneGetAllData: false,
      isProcessing: false,
    }, () => {
      this.fetchData();
    });
  }

  handleReset = () => {
    this.refreshData();
  }

  render() {
    const {doneGetAllData, sentence, editForm, isShowEdit} = this.state;
    if(!doneGetAllData) {
      return (<Loading/>);
    }

    const {classes, fibrw, match: { params }} = this.props;
    if(!fibrw) {
      return window.location.href = "/admin/fibrw/list";
    }
    const imageHost = process.env.REACT_APP_FIREBASE_STORAGE_LINK;

    const inline = this.state.mode === 'inline';
    const inlineContainerClass = classNames('inlineContainer', {
      show: this.state.visible && inline,
    });

    return (<div className="pte-fibrw-detail">
      <Hidden smDown implementation="css">
        <Viewer
          visible={this.state.visible}
          onClose={() => { this.setState({ visible: false }); } }
          container={this.container}
          images={[{src: `${imageHost}${encodeURIComponent(fibrw.image_metadata.fullPath)}?alt=media`, alt: fibrw.image_metadata.name}]}
        />
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} container justify="center">
            <Button type="button" color="primary" onClick={() => { this.setState({ visible: !this.state.visible }); } }>Show</Button>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <div className={inlineContainerClass} ref={ref => {this.container = ref;}}></div>
          </GridItem>
        </GridContainer>
      </Hidden>

      <Hidden mdUp implementation="css">
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Magnifier
              imageSrc={`${imageHost}${encodeURIComponent(fibrw.image_metadata.fullPath)}?alt=media`}
              imageAlt={fibrw.image_metadata.name}
              largeImageSrc={`${imageHost}${encodeURIComponent(fibrw.image_metadata.fullPath)}?alt=media`}
              mouseActivation={MOUSE_ACTIVATION.DOUBLE_CLICK} // Optional
              touchActivation={TOUCH_ACTIVATION.DOUBLE_TAP} // Optional
            />
          </GridItem>
        </GridContainer>
      </Hidden>

      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Detail Fibrw - Sentence {params.id}</h4>
            </CardHeader>

            <CardBody>
              <GridContainer>
                {fibrw.sentence.map((item, index) => {
                  const list = item.split('--');
                  return (
                    <RadioGroup
                      key={index}
                      className={classNames(classes.radioGroup, {
                        [classes.correct]: (sentence[index].isCorrect === 1),
                        [classes.wrong]: (sentence[index].isCorrect === 0),
                      })}
                      name={`${index}`}
                      value={sentence[index].selected}
                      onChange={this.handleChangeRadio}
                    >
                      {list.length > 0 && list.map((word, idx) => {
                        return (<GridItem key={idx} xs={12} sm={6} md={3} >
                            <FormControlLabel classes={{
                              root: classes.formLabel
                            }} value={word} control={<Radio />} label={word} />
                          </GridItem>
                          );
                      })}
                      <Divider classes={{
                        root: classes.divider,
                      }} />
                    </RadioGroup>
                  );
                })}
              </GridContainer>
            </CardBody>

            <CardFooter justify="center">
              <GridItem xs={12} container justify="center">
                <Button type="button" color="success" onClick={this.handlePrevious}>Previous</Button>
                <Button type="button" color="primary" onClick={this.handleCheck}>Check</Button>
                <Button type="button" color="primary" onClick={this.handleReset}>Reset</Button>
                <Button type="button" color="success" onClick={this.handleNext}>Next</Button>
              </GridItem>
            </CardFooter>
            <CardFooter justify="center">
              <GridItem xs={12} container justify="center">
                <CustomInput
                  labelText="Number of Sentence"
                  id="numberOfSentence"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: this.handleChange,
                    type: 'number',
                    value: this.state.numberOfSentence,
                  }}
                />
                <Button type="button" color="primary" onClick={this.handleStartWith}>GO</Button>
              </GridItem>
            </CardFooter>
            <CardFooter justify="center">
              <GridItem xs={12} container justify="center">
                <Button type="button" color="success" onClick={this.handleEdit}>Edit</Button>
              </GridItem>
            </CardFooter>
          </Card>
        </GridItem>

        {isShowEdit && <form onSubmit={this.handleSubmit}><GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Update Form</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <FormLabel component="legend">Sentence</FormLabel>
                {editForm.sentence.map((item, index) => {
                  return (
                    <GridItem key={index} xs={12} sm={12} md={12}>
                      <strong>Line {index}</strong>
                      <input
                        className="MuiInputBase-input MuiInput-input pte-input-custom"
                        onChange={this.handleEditLine}
                        value={item}
                        data-index={index}
                        data-keyform="sentence"
                      />
                    </GridItem>
                  );
                })}

                <FormLabel component="legend">Result</FormLabel>
                {editForm.result.map((item, index) => {
                  return (
                    <GridItem key={index} xs={12} sm={12} md={12}>
                      <strong>Result {index}</strong>
                      <input
                        className="MuiInputBase-input MuiInput-input pte-input-custom"
                        onChange={this.handleEditLine}
                        value={item}
                        data-index={index}
                        data-keyform="result"
                      />
                    </GridItem>
                  );
                })}

                <GridItem xs={12} sm={12} md={12}>
                  <BasicUploader onFilesDrop={this.onFilesDrop} />
                </GridItem>

                {this.state.isProcessing && <GridItem xs={12} sm={12} md={12}>
                  <Loading />
                </GridItem>}

              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button type="submit" color="primary" disabled={this.state.isProcessing ? true : false}>Update</Button>
            </CardFooter>
          </Card>
        </GridItem></form>}
      </GridContainer>
    </div>);
  }
}

const mapStateToProps = state => {
  return {
    fibrw: state.fibrw.fibrw,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFibrw: (fibrwId) => dispatch(getFibrw(fibrwId)),
    updateFibrw: (id, fibrw) => dispatch(updateFibrw(id, fibrw)),
  };
};

DetailFibrw.propTypes = {
  classes: PropTypes.object,
  fibrw: PropTypes.object,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(DetailFibrw);
