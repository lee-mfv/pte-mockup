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
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import {flatten} from "lodash";

// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

// core components
import Navbar from "components/Navbars/Navbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import FixedPluginSettings from "components/FixedPlugin/FixedPluginSettings";
import ScrollTop from "components/Common/ScrollTop";
import ScrollBottom from "components/Common/ScrollBottom";

import routes from "routes.js";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import classNames from "classnames";

let ps;

const switchRoutesWithSub = () => {
  let list = routes.map((prop, key) => {
    if (prop.layout === "/admin") {
      let routeSub = [];
      if(prop.has_nested) {
        routeSub = prop.sub_menus.map((propSub, keySub) => {
          if (propSub.layout === "/admin") {
            return (
              <Route
                path={propSub.layout + propSub.path}
                component={propSub.component}
                key={keySub}
              />
            );
          }

          return null;
        });
      } else {
        routeSub.push(<Route
          path={prop.layout + prop.path}
          component={prop.component}
          key={key}
        />);
      }

      return routeSub;
    }
    return null;
  })

  return flatten(list);
};

const switchRoutes = (
  <Switch>
    {switchRoutesWithSub()}
    <Redirect from="/admin" to="/admin/dashboard" />
  </Switch>
);

class Dashboard extends React.Component {
  state = {
    image: image,
    color: "blue",
    hasImage: true,
    fixedClasses: "dropdown",
    mobileOpen: false,
    sidebarOpen: false,
    showFixedPluginSettings: false,
    showVoice: false,
    showToolbar: true,
  };
  mainPanel = React.createRef();
  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  handleSwitchSetting = (key) => {
    this.setState({ [key]: !this.state[key] });
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  handleSidebarToggle = (e) => {
    e.preventDefault();
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  };
  getRoute() {
    return window.location.pathname !== "/admin/maps";
  }
  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  };
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
    }
    window.addEventListener("resize", this.resizeFunction);
  }
  // componentDidUpdate(e) {
  //   if (e.history.location.pathname !== e.location.pathname) {
  //     this.mainPanel.current.scrollTop = 0;
  //     if (this.state.mobileOpen) {
  //       this.setState({ mobileOpen: false });
  //     }
  //   }
  // }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    const { auth, classes, ...rest } = this.props;
    if (!auth.uid) return <Redirect to="/admin/signin" />;

    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={routes}
          logoText={"PTE Mockup"}
          logo={logo}
          image={this.state.image}
          handleDrawerToggle={this.handleDrawerToggle}
          handleSidebarToggle={this.handleSidebarToggle}
          open={this.state.mobileOpen}
          sidebarOpen={this.state.sidebarOpen}
          color={this.state.color}
          showFixedPluginSettings={this.state.showFixedPluginSettings}
          showVoice={this.state.showVoice}
          showToolbar={this.state.showToolbar}
          handleSwitchSetting={this.handleSwitchSetting}
          {...rest}
        />
        <div className={classNames(classes.mainPanel, this.state.sidebarOpen && classes.hasSidebar)} ref={this.mainPanel}>
          <Navbar
            routes={routes}
            handleDrawerToggle={this.handleDrawerToggle}
            handleSidebarToggle={this.handleSidebarToggle}
            open={this.state.sidebarOpen}
            showToolbar={this.state.showToolbar}
            showVoice={this.state.showVoice}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div id="back-to-top-anchor"></div>
              <ScrollBottom {...this.props}>
                <Fab color="secondary" size="small" aria-label="got to bottom">
                  <KeyboardArrowDownIcon />
                </Fab>
              </ScrollBottom>

              <div className={classes.container}>{switchRoutes}</div>

              <ScrollTop {...this.props}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                  <KeyboardArrowUpIcon />
                </Fab>
              </ScrollTop>
              <div id="go-to-bottom-anchor"></div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
          {this.getRoute() ? <Footer /> : null}
          {this.state.showFixedPluginSettings && <FixedPluginSettings
            handleImageClick={this.handleImageClick}
            handleColorClick={this.handleColorClick}
            bgColor={this.state["color"]}
            bgImage={this.state["image"]}
            handleFixedClick={this.handleFixedClick}
            fixedClasses={this.state.fixedClasses}
          />}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(dashboardStyle)
)(Dashboard);
