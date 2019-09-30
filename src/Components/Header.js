import React from "react";
import Box from "@material-ui/core/Box";

import { Typography, Toolbar, Button, Container } from "@material-ui/core";
import makeStyles from "@material-ui/styles/makeStyles";
import { ok, fail } from "assert";

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
          <Typography variant="h5">
            Water Meter Monitoring
            <br />
            <Typography variant="caption">{Date()}</Typography>
          </Typography>
        </Container>

        <Container>
          <Box position="right">
            <Button onClick={logout} variant="outlined">
              Logout
            </Button>
          </Box>
        </Container>
      </Toolbar>
    );
  }
}
