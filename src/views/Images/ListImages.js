import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { compose } from "redux";
import {getFirebase} from "react-redux-firebase";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import {CopyToClipboard} from "react-copy-to-clipboard";
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import {isMobile, isTablet} from "react-device-detect";

import {getAllImages, deleteImage} from 'store/actions/imageActions'
import Loading from 'components/Common/Loading'
import Snackbar from "components/Snackbar/Snackbar";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    // width: 500,
    // height: 450,
  },
  title: {
    maxWidth: '150px',
  },
  icon: {
    color: blue[900],
    "&:hover": {
      backgroundColor: blue[500]
    },
    "&.delete": {
      color: red[900],
      "&:hover": {
        backgroundColor: red[500]
      },
    }
  },
});

class ListImages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doneGetAllData: false,
      openSuccess: false,
    };

    this.handleDeleteImage = this.handleDeleteImage.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    this.fetchData();
  }

  async fetchData() {
    await this.props.getAllImages();

    this.setState({doneGetAllData: true,});
  }

  handleDeleteImage(image) {
    const r = window.confirm("Are you sure?");
    if (r === true) {
      this.props.deleteImage(image.id).then(async res => {
        const firebase = getFirebase();
        // Get a reference to the storage service, which is used to create references in your storage bucket
        const storage = firebase.storage();
        // Create a storage reference from our storage service
        const storageRef = storage.ref();

        var desertRef = storageRef.child(image.image_metadata.fullPath);
        // Delete the file
        await desertRef.delete();

        this.setState({
          openSuccess: true,
        }, () => {
          this.fetchData();
        });
      }).catch(error => {});
    }
  }

  handleClose(open) {
    this.setState({openSuccess: open})
  }

  render() {
    const { classes, images } = this.props;
    const {doneGetAllData, openSuccess} = this.state;

    if(!doneGetAllData) {
      return (<Loading/>);
    }

    if(images.length === 0) {
      return (<div>
        No images found
      </div>);
    }

    let cols = 4;
    if(isMobile) {
      cols = 1;
    }
    if(isTablet) {
      cols = 2;
    }

    return (
      <div>
        <GridItem xs={12} sm={12} md={12} container justify="flex-end">
          <Button type="button" color="primary" onClick={() => this.props.history.push('/admin/other/images/upload')}>Add New Image
            <AddIcon />
          </Button>
        </GridItem>

        <GridList cellHeight={180} className={classes.gridList} cols={cols}>
          <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
            <ListSubheader component="div">All Images</ListSubheader>
          </GridListTile>
          {images.map(image => {
            const image_metadata = image.image_metadata;

            return (
            <GridListTile key={image.id}>
              <img src={`${process.env.REACT_APP_FIREBASE_STORAGE_LINK}${encodeURIComponent(image_metadata.fullPath)}?alt=media`} alt={image_metadata.name} />
              <GridListTileBar
                classes={{
                  title: classes.title
                }}
                title={image_metadata.name}
                actionIcon={
                  <div>
                    <IconButton aria-label={`info about ${image_metadata.name}`} classes={{
                      root: classes.icon
                    }}>
                      <CopyToClipboard text={image_metadata.fullPath}>
                        <FileCopyIcon />
                      </CopyToClipboard>
                    </IconButton>
                    <IconButton aria-label={`info about ${image_metadata.name}`} classes={{
                      root: classes.icon
                    }} className="delete" onClick={() => this.handleDeleteImage(image)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                }
              />
            </GridListTile>
          )})}
        </GridList>

        <div>
          <Snackbar
            place={'br'}
            color={'success'}
            icon={DoneIcon}
            message="Deleted successfully!"
            autoHideDuration={2000}
            onClose={() => this.handleClose(false)}
            open={openSuccess}
            closeNotification={() => this.handleClose(false)}
            close
          />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllImages: () => dispatch(getAllImages()),
    deleteImage: (imageId) => dispatch(deleteImage(imageId)),
  }
};

const mapStateToProps = state => {
  return {
    images: state.image.images,
  };
};

ListImages.propTypes = {
  classes: PropTypes.object
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(ListImages);
