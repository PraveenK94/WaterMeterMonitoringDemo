import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";

import {
  Typography,
  Grid,
  Toolbar,
  Button,
  Container
} from "@material-ui/core";
import makeStyles from "@material-ui/styles/makeStyles";
import { textAlign } from "@material-ui/system";

function logout() {
  window.confirm("Are you sure to logout");
  localStorage.removeItem("token");
  window.location.href = "/";
}

export default class Header extends React.Component {
  render() {
    const useStyles = makeStyles(theme => ({
      root: {
        width: "100%",
        display: "flex"
      },

      toolbar: {
        flexWrap: "wrap",
        backgroundColor: "#3f51b5"
      },
      toolbarTitle: {
        flexGrow: 1
      },
      appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`
      },
      link: {
        margin: theme.spacing(1, 1.5)
      }
    }));

    return (
      // <AppBar color="default" elevation={0} className={useStyles.appBar}>

      <Toolbar style={{ backgroundColor: "#3F51B5" }} width="100px">
        <Container>
          <Typography color="colorTextPrimary" variant="h5">
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

      // {/* <Typography variant="caption">{Date()}</Typography> */}
      // </AppBar>
    );
  }
}

{
  /* <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
<header class="MuiPaper-root-18 MuiPaper-elevation0-20 MuiAppBar-root-9 MuiAppBar-positionStatic-13 jss1 MuiAppBar-colorDefault-15">
  <div class="MuiToolbar-root-45 MuiToolbar-regular-47 jss2 MuiToolbar-gutters-46">
    <h6 class="MuiTypography-root-49 jss3 MuiTypography-h6-59 MuiTypography-colorInherit-71 MuiTypography-noWrap-68">
      Company name
    </h6>
    <nav>
      <a
        class="MuiTypography-root-49 MuiLink-root-79 MuiLink-underlineHover-81 jss4 MuiTypography-button-53 MuiTypography-colorTextPrimary-74"
        href="#"
      >
        Features
      </a>
      <a
        class="MuiTypography-root-49 MuiLink-root-79 MuiLink-underlineHover-81 jss4 MuiTypography-button-53 MuiTypography-colorTextPrimary-74"
        href="#"
      >
        Enterprise
      </a>
      <a
        class="MuiTypography-root-49 MuiLink-root-79 MuiLink-underlineHover-81 jss4 MuiTypography-button-53 MuiTypography-colorTextPrimary-74"
        href="#"
      >
        Support
      </a>
    </nav>
    <a
      class="MuiButtonBase-root-102 MuiButton-root-85 jss4 MuiButton-outlined-90 MuiButton-outlinedPrimary-91"
      tabindex="0"
      aria-disabled="false"
      href="#"
    >
      <span class="MuiButton-label-86">Login</span>
      <span class="MuiTouchRipple-root-236"></span>
    </a>
  </div>
</header>;
</AppBar> */
}
