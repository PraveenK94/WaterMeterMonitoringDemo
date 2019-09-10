import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

function logout() {
  window.confirm("Are you sure to logout");
  localStorage.removeItem("token");
  window.location.href = "/";
}

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText />
    </ListItem>
    <ListItem button onClick={logout}>
      <ExitToAppIcon></ExitToAppIcon>
      <ListItemText />
    </ListItem>
  </div>
);
