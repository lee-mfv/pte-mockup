import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { compose } from "redux";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";

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
};

class ListFibrw extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfSentence: 0,
    };
  }

  handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    this.setState({
      [id]: value
    })
  }

  handleStartWith = () => {
    return this.props.history.push(`/admin/fibrw/detail/${this.state.numberOfSentence}`);
  }

  render() {
    const {classes} = this.props;

    return (<div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>List Fibrw</h4>
            </CardHeader>

            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Number of Sentence"
                      id="numberOfSentence"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: this.handleChange,
                        type: 'number',
                      }}
                    />
                  </GridItem>
                </GridItem>
              </GridContainer>
            </CardBody>

            <CardFooter justify="center">
              <GridItem xs={12} container justify="center">
                <Button type="button" color="primary" onClick={this.handleStartWith}>Start With</Button>
              </GridItem>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>);
  }
}

ListFibrw.propTypes = {
  classes: PropTypes.object,
};

export default compose(
  connect(
    null,
    null
  ),
  withStyles(styles)
)(ListFibrw);
