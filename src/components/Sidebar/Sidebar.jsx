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
/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.jsx";
import RTLNavbarLinks from "components/Navbars/RTLNavbarLinks.jsx";

import sidebarStyle from "assets/jss/material-dashboard-react/components/sidebarStyle.jsx";

const Sidebar = ({ ...props }) => {
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  const { classes, color, logo, image, logoText, routes, showFixedPluginSettings, showVoice, showToolbar } = props;
  const [openList, setOpenList] = useState({});

  useEffect(() => {
    let openListTmp = {};
    routes.map(prop => {
      if(prop.has_nested) {
        openListTmp[prop.key] = false;
      }
      return false;
    });
    setOpenList(openListTmp);
  }, [routes]);

  function handleClick(e, key) {
    e.preventDefault();
    setOpenList({
      ...openList,
      [key]: !openList[key]
    });
  }

  function drawMenuWithSub(prop, key) {
    if(prop.invisible) {
      return null;
    }

    var activePro = " ";
    var listItemClasses;
    if (prop.path === "/upgrade-to-pro") {
      activePro = classes.activePro + " ";
      listItemClasses = classNames({
        [" " + classes[color]]: true
      });
    } else {
      listItemClasses = classNames({
        [" " + classes[color]]: activeRoute(prop.layout + prop.path)
      });
    }
    const whiteFontClasses = classNames({
      [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
    });

    return (
      <div
        className={activePro + classes.item}
        key={key}
        onClick={(e) => handleClick(e, prop.key)}
      >
        <ListItem button className={classes.itemLink + listItemClasses}>
          {typeof prop.icon === "string" ? (
            <Icon
              className={classNames(classes.itemIcon, whiteFontClasses, {
                [classes.itemIconRTL]: props.rtlActive
              })}
            >
              {prop.icon}
            </Icon>
          ) : (
            <prop.icon
              className={classNames(classes.itemIcon, whiteFontClasses, {
                [classes.itemIconRTL]: props.rtlActive
              })}
            />
          )}
          <ListItemText
            primary={props.rtlActive ? prop.rtlName : prop.name}
            className={classNames(classes.itemText, whiteFontClasses, {
              [classes.itemTextRTL]: props.rtlActive
            })}
            disableTypography={true}
          />
          {openList[prop.key] ? <ExpandLess className={classNames(classes.itemIcon, whiteFontClasses, {
            [classes.itemIconRTL]: props.rtlActive
          }) + ` ${classes.itemIconRight}`}/> : <ExpandMore className={classNames(classes.itemIcon, whiteFontClasses, {
            [classes.itemIconRTL]: props.rtlActive
          }) + ` ${classes.itemIconRight}`}/>}

        </ListItem>
        <Collapse in={openList[prop.key]} timeout="auto" unmountOnExit>
          <List className={classes.list} component="div" disablePadding>
            {prop.sub_menus.map((subMenu, keySubMenu) => {
              if(subMenu.invisible) {
                return null;
              }

              var listItemClassesSubMenu = classNames({
                [" " + classes[color]]: activeRoute(subMenu.layout + subMenu.path)
              });
              const whiteFontClassesSubMenu = classNames({
                [" " + classes.whiteFont]: activeRoute(subMenu.layout + subMenu.path)
              });

              return (<NavLink
                to={subMenu.layout + subMenu.path}
                className={classes.item}
                activeClassName="active"
                key={keySubMenu}
              >
                <ListItem button className={classes.itemLink + listItemClassesSubMenu}>
                  {typeof prop.icon === "string" ? (
                    <Icon
                      className={classNames(classes.itemIcon, whiteFontClassesSubMenu, {
                        [classes.itemIconRTL]: subMenu.rtlActive
                      })}
                    >
                      {subMenu.icon}
                    </Icon>
                  ) : (
                    <subMenu.icon
                      className={classNames(classes.itemIcon, whiteFontClassesSubMenu, {
                        [classes.itemIconRTL]: subMenu.rtlActive
                      }) + ` ${classes.itemIconSubMenu}`}
                    />
                  )}
                  <ListItemText
                    primary={subMenu.rtlActive ? subMenu.rtlName : subMenu.name}
                    className={classNames(classes.itemText, whiteFontClassesSubMenu, {
                      [classes.itemTextRTL]: subMenu.rtlActive
                    })}
                    disableTypography={true}
                  />
                </ListItem>
              </NavLink>);
            })}
          </List>
        </Collapse>
      </div>
    );
  }

  function drawMenu(prop, key) {
    if(prop.invisible) {
      return null;
    }

    var activePro = " ";
    var listItemClasses;
    if (prop.path === "/upgrade-to-pro") {
      activePro = classes.activePro + " ";
      listItemClasses = classNames({
        [" " + classes[color]]: true
      });
    } else {
      listItemClasses = classNames({
        [" " + classes[color]]: activeRoute(prop.layout + prop.path)
      });
    }
    const whiteFontClasses = classNames({
      [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
    });

    return (
      <NavLink
        to={prop.layout + prop.path}
        className={activePro + classes.item}
        activeClassName="active"
        key={key}
      >
        <ListItem button className={classes.itemLink + listItemClasses}>
          {typeof prop.icon === "string" ? (
            <Icon
              className={classNames(classes.itemIcon, whiteFontClasses, {
                [classes.itemIconRTL]: props.rtlActive
              })}
            >
              {prop.icon}
            </Icon>
          ) : (
            <prop.icon
              className={classNames(classes.itemIcon, whiteFontClasses, {
                [classes.itemIconRTL]: props.rtlActive
              })}
            />
          )}
          <ListItemText
            primary={props.rtlActive ? prop.rtlName : prop.name}
            className={classNames(classes.itemText, whiteFontClasses, {
              [classes.itemTextRTL]: props.rtlActive
            })}
            disableTypography={true}
          />
        </ListItem>
      </NavLink>
    );
  }

  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        let content = '';
        if(prop.has_nested) {
          content = drawMenuWithSub(prop, key);
        } else {
          content = drawMenu(prop, key);
        }

        return content;
      })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <a
        href="#!"
        onClick={props.handleSidebarToggle}
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive
        })}
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>

      {!props.open && <IconButton onClick={props.handleSidebarToggle} className={classes.hideSidebar}>
        {!props.rtlActive ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>}
    </div>
  );

  const settings = (
    <div className={classNames(classes.buttonSetting)}>
      <FormControlLabel
        control={<Switch
          checked={showFixedPluginSettings}
          onChange={() => props.handleSwitchSetting('showFixedPluginSettings')}
          value="showFixedPluginSettings"
          classes={{
            switchBase: classes.switchBase,
            track: classes.track,
            checked: classes.checked,
          }}
        />}
        label="Show Setting"
      />
      <FormControlLabel
        control={<Switch
          checked={showVoice}
          onChange={() => props.handleSwitchSetting('showVoice')}
          value="showVoice"
          classes={{
            switchBase: classes.switchBase,
            track: classes.track,
            checked: classes.checked,
          }}
        />}
        label="Show Voice"
      />
      <FormControlLabel
        control={<Switch
          checked={showToolbar}
          onChange={() => props.handleSwitchSetting('showToolbar')}
          value="showToolbar"
          classes={{
            switchBase: classes.switchBase,
            track: classes.track,
            checked: classes.checked,
          }}
        />}
        label="Show Toolbar"
      />
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}

            {links}

            {settings}
          </div>

          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? "right" : "left"}
          variant="persistent"
          open={props.sidebarOpen}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {settings}
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  handleSidebarToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
  sidebarOpen: PropTypes.bool,
};

export default withStyles(sidebarStyle)(Sidebar);
