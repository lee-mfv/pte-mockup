import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import ReactMarkdown from "react-markdown/with-html";

import ConfirmDialog from 'components/Common/ConfirmDialog'

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  paper: {
    width: '80%',
    maxHeight: 435,
  },
}));

export default function OneBlog({blog, ordering, expanded, handleChange, deleteBlog, isProcessing}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function onDelete(e) {
    e.preventDefault();
    setOpen(true);

    return false;
  }

  function handleClose(type = 'cancel') {
    setOpen(false);

    if(type === 'ok') {
      deleteBlog(blog.id);
    }
  }

  return (
    <div className={classes.root}>
      <ExpansionPanel expanded={expanded === blog.id} onChange={handleChange(blog.id)}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>{ordering}</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.heading}>{blog.id}</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>{blog.title}</Typography>
          </div>
        </ExpansionPanelSummary>
        <Divider />
        <ExpansionPanelActions>
          <Button size="sm" color="danger" onClick={(e) => onDelete(e)} disabled={isProcessing}>
            Delete
          </Button>
          <Button size="sm" color="primary" href={`/admin/blog/edit/${blog.id}`}>
            Edit
          </Button>

          <ConfirmDialog
            classes={{
              paper: classes.paper,
            }}
            id="delete_blog_confirm"
            keepMounted
            open={open}
            onClose={handleClose}
            headerTitle="Delete Blog"
            bodyContent="Are you sure?"
          />

        </ExpansionPanelActions>
        <Divider />
        <ExpansionPanelDetails className={classes.details}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <ReactMarkdown source={blog.content} escapeHtml={false} />
            </GridItem>
          </GridContainer>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}