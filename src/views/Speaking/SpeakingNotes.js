import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { compose } from "redux";
import ReactMarkdown from "react-markdown";

import {getBlog} from 'store/actions/blogActions'
import Loading from 'components/Common/Loading'
import Constants from "config/constants";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

const styles = {};

class SpeakingNotes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doneGetAllData: false,
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  async fetchData() {
    await this.props.getBlog(Constants.DEFAULT_KEY_NOTES.SPEAKING);

    this.setState({
      doneGetAllData: true,
    });
  }

  render() {
    const {doneGetAllData} = this.state;
    if(!doneGetAllData) {
      return (<Loading/>);
    }
    const { blog } = this.props;

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4>Speaking Notes</h4>
              </CardHeader>

              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <ReactMarkdown source={blog.content} />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBlog: (blogId) => dispatch(getBlog(blogId)),
  }
};

const mapStateToProps = state => {
  return {
    blog: state.blog.blog,
  };
};

SpeakingNotes.propTypes = {
  classes: PropTypes.object
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(SpeakingNotes);
