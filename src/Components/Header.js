import React from "react";
import Box from "@material-ui/core/Box";
import InputIcon from "@material-ui/icons/Input";
import { Typography, Toolbar, Button, Container } from "@material-ui/core";
import makeStyles from "@material-ui/styles/makeStyles";

function logout() {
  if (window.confirm("Are you sure to logout")) {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/";
  } else {
    console.log("Please log out!!!");
  }
}

export default class Header extends React.Component {
  render() {
    return (
      <Toolbar style={{ backgroundColor: "#3F51B5" }}>
        <Container>
          <Typography style={{ color: "#FFFFFF" }} variant="h5">
            Water Meter Monitoring
            <br />
            <Typography variant="caption">{Date()}</Typography>
          </Typography>
        </Container>

        <Container>
          <InputIcon
            onClick={logout}
            style={{ color: "#FFFFFF" }}
            variant="outlined"
          ></InputIcon>

          <Typography style={{ color: "#FFFFFF" }}>Logout</Typography>
        </Container>
      </Toolbar>
    );
  }
}
