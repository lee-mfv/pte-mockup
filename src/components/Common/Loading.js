import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

const Loading = () => {

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} container justify="center">
          <CircularProgress color="secondary" />
        </GridItem>
      </GridContainer>
    </div>
  )
}

export default Loading;
