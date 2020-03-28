import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { compose } from "redux";

import {getAllBlogs, deleteBlog} from 'store/actions/blogActions'
import Loading from 'components/Common/Loading'
import OneBlog from "./OneBlog"

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent";

const styles = {};

class ListBlog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      doneGetAllData: false,
      isProcessing: false,
    };

    this.deleteBlog = this.deleteBlog.bind(this);
  }

  componentWillMount() {
    this.fetchData();
  }

  async fetchData() {
    await this.props.getAllBlogs();

    this.setState({
      doneGetAllData: true,
    });
  }

  handleChange = panel => (event, isExpanded) => {
    this.setState({
      expanded: isExpanded ? panel : false,
    });
  };

  deleteBlog(blogId) {
    this.setState({
      isProcessing: true,
    }, async () => {
      await this.props.deleteBlog(blogId);
      this.setState({
        isProcessing: false,
        doneGetAllData: true,
      }, () => {
        this.fetchData();
      });
    });
  }

  render() {
    const {doneGetAllData, isProcessing} = this.state;
    if(!doneGetAllData) {
      return (<Loading/>);
    }
    const { blogs } = this.props;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              {blogs.map((blog, index) => {
                return (<OneBlog key={index} ordering={index + 1} blog={blog} expanded={this.state.expanded} handleChange={this.handleChange} deleteBlog={this.deleteBlog} isProcessing={isProcessing} />);
              })}

              {blogs.length === 0 && <SnackbarContent message={'No blogs found'} color="info"/>}
            </GridItem>
          </GridContainer>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBlogs: () => dispatch(getAllBlogs()),
    deleteBlog: (blogId) => dispatch(deleteBlog(blogId)),
  }
};

const mapStateToProps = state => {
  return {
    blogs: state.blog.blogs,
  };
};

ListBlog.propTypes = {
  classes: PropTypes.object
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(ListBlog);
