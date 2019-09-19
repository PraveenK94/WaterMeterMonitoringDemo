import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import IconButton from "@material-ui/core/IconButton";
import { Typography } from "@material-ui/core";

export default class Header extends React.Component {
  render() {
    var today = new Date();
    return (
      <AppBar position="fixed">
        <Toolbar>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <Typography color="inherit" variant="h5">
            Water Meter Monitoring
          </Typography>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>

          <Typography variant="caption">{today.toUTCString()}</Typography>
        </Toolbar>
      </AppBar>
    );
  }
}
