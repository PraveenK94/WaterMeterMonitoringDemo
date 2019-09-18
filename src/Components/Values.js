import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";

export class Values extends Component {
  constructor() {
    super();
    this.state = {};
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

    return <React.Fragment></React.Fragment>;
  }
}

export default Values;
