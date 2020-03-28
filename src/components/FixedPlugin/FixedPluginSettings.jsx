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
import React, { Component } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classnames from "classnames";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import withStyles from "@material-ui/core/styles/withStyles";
import { compose } from "redux";
import {connect} from 'react-redux'

import {setVoice} from 'store/actions/globalActions'
import {getAllDataLogs} from 'store/actions/dataLogActions'
import Loading from 'components/Common/Loading'
import Constants from "config/constants";

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  camTable: {
    fontSize: '10px',
    background: '#292929',
    borderCollapse: 'collapse',
    borderSpacing: '0',
    width: '150px',
  },
  camTdFirst: {
    padding: '0',
    background: 'none',
    border: 'none',
  },
  camTdSecond: {
    width:'68px',
    background:'none',
    border:'none',
    padding:'4px',
  },
  camTdThird: {
    width:'50px',
    background:'none',
    border:'none',
    padding:'0 4px 0 0',
  },
  camTdA: {
    display: 'block',
    background: 'transparent url(/external/images/freesearch/sbl.png?version=4.0.94) no-repeat 5px 6px',
    height: '32px',
  },
  camInputFirst: {
    width:'100%',
    display:'block',
    fontSize:'10px',
    padding:'2px',
    border:'none',
  },
  camInputSecond: {
    width:'100%',
    display:'block',
    fontSize:'10px',
    padding:'2px',
    border:'none',
    float:'right',
    background:'#d0a44c',
  },
});

class FixedPluginSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doneGetAllData: false,
      classes: "dropdown show",
      bg_checked: true,
      bgImage: this.props.bgImage,
      voices: [],
      selectedVoice: {
        key: 'UK English Female',
      }
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.fetchData();
    this.setState({voices: window.responsiveVoice.getVoices()})
  }

  async fetchData() {
    await this.props.getAllDataLogs();

    this.setState({
      doneGetAllData: true,
    });
  }

  handleClick() {
    this.props.handleFixedClick();
  }

  handleChange(event) {
    this.setState((prevState, props) => {
      return ({
        selectedVoice: {
          ...prevState.selectedVoice,
          [event.target.name]: event.target.value
        }
      });
    }, () => {
      this.props.setVoice(this.state.selectedVoice.key);
    })
  }

  loading() {
    return (<div
      className={classnames("fixed-plugin", {
        "rtl-fixed-plugin": this.props.rtlActive
      })}
    >
      <div id="fixedPluginClasses" className={this.props.fixedClasses}>
        <div onClick={this.handleClick}>
          <i className="fa fa-cog fa-2x" />
        </div>
        <ul className="dropdown-menu">
          <li><Loading/></li>
        </ul>
      </div>
    </div>);
  }

  render() {
    const { classes, dataLogs } = this.props;
    const { selectedVoice, voices, doneGetAllData} = this.state;
    if(!doneGetAllData) {
      return this.loading();
    }

    const latestFibrwId = dataLogs['latest_fibrw_id'] ? dataLogs['latest_fibrw_id'] : null;
    return (
      <div
        className={classnames("fixed-plugin", {
          "rtl-fixed-plugin": this.props.rtlActive
        })}
      >
        <div id="fixedPluginClasses" className={this.props.fixedClasses}>
          <div onClick={this.handleClick}>
            <i className="fa fa-cog fa-2x" />
          </div>
          <ul className="dropdown-menu">
            <li className="header-title">Voices</li>
            <li className="adjustments-line">
              <FormControl className={classes.formControl}>
                <Select
                  value={selectedVoice.key}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'key',
                  }}
                >
                  {voices.map((voice, idx) => {
                    return (<MenuItem key={idx} value={voice.name}>{voice.name}</MenuItem>);
                  })}
                </Select>
              </FormControl>
            </li>

            <li className="header-title">Statistic</li>
            <li className="adjustments-line">
              {latestFibrwId && <div>Latest FIB-RW: <b>{latestFibrwId.id}</b></div>}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

FixedPluginSettings.propTypes = {
  classes: PropTypes.object,
  bgImage: PropTypes.string,
  handleFixedClick: PropTypes.func,
  rtlActive: PropTypes.bool,
  fixedClasses: PropTypes.string,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  handleColorClick: PropTypes.func,
  handleImageClick: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
  return {
    setVoice: (voice) => dispatch(setVoice(voice)),
    getAllDataLogs: () => dispatch(getAllDataLogs()),
  }
}

const mapStateToProps = state => {
  return {
    dataLogs: state.dataLog.dataLogs,
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(FixedPluginSettings);
