import React from "react";
import { Redirect } from "react-router-dom";
import clsx from "clsx";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "./Chart";
import Orders from "./payment";
import Values from "./Values";
import axios from "axios";
import Header from "./Header";
import Sidenav from "./sideNav";
import Typography from "@material-ui/core/Typography";
import "./Dashboard.css";

const drawerWidth = 240;

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      datetime: "",
      decodedData: {
        deviceName: "",
        levelPct: ""
      }
    };
  }

  componentDidMount() {
    let token = sessionStorage.getItem("token");

    if (token === null) {
      this.setState({ redirect: true });
      return;
    }
    axios
      .get(
        `https://ec2-52-66-213-31.ap-south-1.compute.amazonaws.com:7452/cmVzdGZ1bCBhcGk/cmlybyBsb3JhIHByb3h5IHNlcnZlciA/5d5ec20aedc3268530f1659c/2/737374706c000ff5/getDeviceData`,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
            "Content-Type": "Application/json"
          }
        }
      )
      .then(res => {
        const device_data = res.data;
        console.log(device_data);
        this.setState({
          deviceName: res.data.decodedData.deviceName,
          levelPct: res.data.decodedData.levelPct,
          datetime: res.data.datetime
        });
      });
  }

  render() {
    const useStyles = makeStyles(theme => ({
      toolbar: {
        paddingRight: 24 // keep right padding when drawer closed
      },
      toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar
      },
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        })
      },
      appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen
        })
      },
      drawerPaper: {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen
        })
      },
      drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9)
        }
      },
      appBarSpacer: theme.mixins.toolbar,
      content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto"
      },
      container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
      },

      fixedHeight: {
        height: 240
      }
    }));

    const theme = createMuiTheme({
      root: {
        display: "flex"
      },
      toolbar: {
        paddingRight: 24 // keep right padding when drawer closed
      },
      toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px"
      },
      appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`
      },
      menuButton: {
        marginRight: 36
      },
      menuButtonHidden: {
        display: "none"
      },
      title: {
        flexGrow: 1
      },
      drawerPaper: {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth
      },
      drawerPaperClose: {
        overflowX: "hidden"
      },
      content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto"
      },
      paper: {
        display: "flex",
        overflow: "auto",
        flexDirection: "column"
      },
      fixedHeight: {
        height: 240
      }
    });

    const { redirect, deviceName, levelPct, datetime } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <ThemeProvider theme={theme}>
        <div className="bashboardCnt">
          <CssBaseline />
          <Header />
          <Sidenav />

          <main
            style={{
              flexGrow: 1,
              height: "100vh",
              overflow: "auto"
            }}
          >
            <div />
            <Container
              maxWidth="lg"
              style={{
                marginTop: "85px",
                marginLeft: "193px"
              }}
            >
              <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                  <Paper>
                    <Chart />
                  </Paper>
                </Grid>

                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper className={clsx(theme.paper, theme.fixedHeight)}>
                    <Values />
                    <div>
                      <Typography>Water Level Point:{levelPct}</Typography>
                    </div>
                    <div>
                      <Typography>DeviceName:{deviceName}</Typography>
                    </div>
                    <div>
                      <Typography>{datetime}</Typography>
                    </div>
                  </Paper>
                </Grid>

                {/* Recent Orders */}
                <Grid item xs={12}>
                  <Paper className="paper">
                    <Orders />
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </main>
        </div>
      </ThemeProvider>
    );
  }
}
export default Dashboard;
