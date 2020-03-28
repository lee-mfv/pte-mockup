import React from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: "9999",
  },
}));

const ScrollTop = (props) => {
  const { children } = props;
  // const { children } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  // const trigger = useScrollTrigger({
  //   target: window,
  //   disableHysteresis: true,
  //   threshold: 100,
  // });

  // const trigger = useScrollTrigger();
  // console.log('trigger', trigger)
  // console.log('window', window)

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    // console.log('anchor', anchor)
    if (anchor) {
      // console.log('back to top')
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
  // {/*<Zoom in={trigger}>*/}

  return (
    <Zoom in={true}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  // /**
  //  * Injected by the documentation to work in an iframe.
  //  * You won't need it on your project.
  //  */
  // window: PropTypes.func,
};

export default ScrollTop;
