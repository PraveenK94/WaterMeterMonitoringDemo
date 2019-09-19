import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { Typography, Grid } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListItemText from "@material-ui/core/ListItemText";

function logout() {
  window.confirm("Are you sure to logout");
  localStorage.removeItem("token");
  window.location.href = "/";
}

export default class Header extends React.Component {
  render() {
    return (
      <AppBar position="fixed">
        <Toolbar>
          <IconButton></IconButton>
          <IconButton></IconButton>
          <IconButton></IconButton>

          <IconButton></IconButton>
          <Grid
            justify="space-between" // Add it here :)
            container
            spacing={24}
          >
            <Typography color="inherit" variant="h5">
              Water Meter Monitoring
              <br />
              <Typography variant="caption">{Date()}</Typography>
            </Typography>
          </Grid>

          {/* <Typography variant="caption">{Date()}</Typography> */}
        </Toolbar>
      </AppBar>
    );
  }
}
