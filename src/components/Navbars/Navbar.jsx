/*!

=========================================================
* Material Dashboard React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";

import MenuIcon from '@material-ui/icons/Menu';

// core components
import AdminNavbarLinks from "./AdminNavbarLinks.jsx";
import RTLNavbarLinks from "./RTLNavbarLinks.jsx";
import Button from "components/CustomButtons/Button.jsx";

import CountDownTimer from 'components/Common/CountDownTimer'
import TextToSpeech from 'components/Common/TextToSpeech'

import headerStyle from "assets/jss/material-dashboard-react/components/headerStyle.jsx";

function Header({ ...props }) {
  function getName(prop) {
    let name = null;
    if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
      name = prop.rtlActive ? prop.rtlName : prop.name;
    }
    return name;
  }

  function makeBrand() {
    var name = 'PTE Mockup';
    props.routes.map(prop => {
      if(prop.has_nested) {
        prop.sub_menus.map(propSub => {
          if(getName(propSub)) {
            name = getName(propSub);
          }
          return null;
        });
      } else {
        if(getName(prop)) {
          name = getName(prop);
        }
      }
      return null;
    });
    return name;
  }
  const { classes, color, showVoice, showToolbar } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color
  });
  return (
    <AppBar position="fixed"
            // className={classes.appBar + appBarClasses}
            className={classNames(classes.appBar, appBarClasses, {
              [classes.appBarShift]: props.open,
            })}

    >
      <Toolbar
        className={classes.container}
      >
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Hidden smDown implementation="css" className={classes.menuIcon}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={props.handleSidebarToggle}
              edge="start"
              className={classNames(classes.menuButton, props.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>

          {showToolbar && <Button color="transparent" href="#" className={classes.title}>
            {makeBrand()}
          </Button>}

          <CountDownTimer />

          {showVoice && <TextToSpeech />}

        </div>
        <Hidden smDown implementation="css">
          {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  showVoice: PropTypes.bool,
  showToolbar: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  handleSidebarToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object)
};

export default withStyles(headerStyle)(Header);
