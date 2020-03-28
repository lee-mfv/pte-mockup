import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Container from '@material-ui/core/Container';
import Icon from '@material-ui/core/Icon';
import red from '@material-ui/core/colors/red';

// other
import { signIn } from "store/actions/authActions";
import ChangeBodyClass from 'components/Common/ChangeBodyClass';

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Danger from "components/Typography/Danger.jsx";

const styles = {
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  center: {
    textAlign: "center"
  },
  warning: {
    color: red["400"],
  },
};

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    isProcessing: false,
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state);
  };

  render() {
    const { authError, auth, classes } = this.props;
    if (auth.uid) return <Redirect to="/" />;

    return (
      <div className="container page-login">
        <ChangeBodyClass bodyClassname="teal" />
        <ChangeBodyClass bodyClassname="lighten-2" />

        <Container maxWidth="sm">
          <form className="col s12 m12" onSubmit={this.handleSubmit}>
            <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={`${classes.cardTitleWhite} ${classes.center}`}>Login</h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem container xs={2} md={1} alignItems="center">
                      <Icon>account_circle</Icon>
                    </GridItem>
                    <GridItem xs={10} md={11}>
                      <CustomInput
                        labelText="Email"
                        id="email"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: this.handleChange,
                          type: 'text',
                        }}
                      />
                    </GridItem>
                    <GridItem container xs={2} sm={2} md={1} alignItems="center">
                      <Icon>lock</Icon>
                    </GridItem>
                    <GridItem xs={10} sm={10} md={11}>
                      <CustomInput
                        labelText="Password"
                        id="password"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: this.handleChange,
                          type: 'password',
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} container justify="center">
                      <Button type="submit" color="primary" disabled={this.state.isProcessing ? true : false}>Login</Button>
                    </GridItem>
                    {authError && <GridItem xs={12} container justify="center">
                      <Danger>{authError ? <p>{authError}</p> : null}</Danger>
                    </GridItem>}

                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
          </form>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds))
  };
};

SignIn.propTypes = {
  signIn: PropTypes.func,
  auth: PropTypes.object,
  authError: PropTypes.string
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(SignIn);
