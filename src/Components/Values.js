import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";

export class Values extends Component {
  constructor() {
    super();
    this.state = {
      date: "",
      time: ""
    };
  }

  getDateandTime = () => {
    let date = { currentDate: new Date().toLocaleDateString() };
    let time = { currentTime: new Date().toLocaleTimeString() };
    this.setState({
      date: date,
      time: time
    });
  };
  componentDidMount() {
    this.getDateandTime();
  }

  render() {
    const useStyles = makeStyles({
      unitContext: {
        flex: 1
      }
    });

    return (
      <React.Fragment>
        <Title>Unit consumed</Title>
        <Typography component="p" variant="h6">
          432.48Kl
        </Typography>
        <Typography color="textSecondary" className={useStyles.unitContext}>
          Details
        </Typography>
        <p>{this.getDateandTime}</p>
      </React.Fragment>
    );
  }
}

export default Values;
