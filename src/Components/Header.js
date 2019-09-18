import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";

import IconButton from "@material-ui/core/IconButton";
import { Typography } from "@material-ui/core";
export default class Header extends React.Component {
  render() {
    return (
      <AppBar position="fixed">
        <Toolbar>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>

          <Typography color="inherit" variant="h4" align="right">
            Water Meter Monitoring
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}
