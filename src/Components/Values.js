import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";

const useStyles = makeStyles({
  unitContext: {
    flex: 1
  }
});

export class Values extends Component {
  render() {
    return (
      <React.Fragment>
        <Title>Unit consumed</Title>
        <Typography component="p" variant="h4">
          320.48
        </Typography>
        <Typography color="textSecondary" className={useStyles.unitContext}>
          last updated 1, june 2019, 5:08am
        </Typography>
      </React.Fragment>
    );
  }
}

export default Values;
