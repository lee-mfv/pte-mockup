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

import {createBlog, createBlogWithId} from 'store/actions/blogActions'
import Loading from 'components/Common/Loading'

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";

const styles = {};

class CreateBlog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        category: '',
        content: '',
        tags: '',
        title: '',
      },
      blog_id: null,
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

  handleChangeId = (e) => {
    const value = e.target.value;
    this.setState({blog_id: value})
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({
      isProcessing: true
    }, ()=>{
      if(this.state.blog_id) {
        this.props.createBlogWithId(this.state.blog_id, this.state.form)
          .then(() => {
            this.props.history.push('/admin/blog/list');
          })
          .catch(() => {
            this.props.history.push('/admin/blog/list');
          });
      } else {
        this.props.createBlog(this.state.form)
          .then(() => {
            this.props.history.push('/admin/blog/list');
          })
          .catch(() => {
            this.props.history.push('/admin/blog/list');
          });
      }
    });
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
                  <h4 className={classes.cardTitleWhite}>Create Blog</h4>
                </CardHeader>

                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="ID (optional)"
                        id="blog_id"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: this.handleChangeId,
                        }}
                      />
                    </GridItem>

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
                            <ReactMarkdown source={this.state.form.content} escapeHtml={false} />
                          </GridItem>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
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
    createBlog: (blog) => dispatch(createBlog(blog)),
    createBlogWithId: (id, blog) => dispatch(createBlogWithId(id, blog)),
  }
}

CreateBlog.propTypes = {
  classes: PropTypes.object
};

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withStyles(styles)
)(CreateBlog);
