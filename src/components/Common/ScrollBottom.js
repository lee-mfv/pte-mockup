import React from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.spacing(7),
    right: theme.spacing(2),
    zIndex: "9999",
  },
}));

const ScrollBottom = (props) => {
  const { children } = props;
  const classes = useStyles();

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector('#go-to-bottom-anchor');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={true}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollBottom.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ScrollBottom;
