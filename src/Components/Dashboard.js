import React from "react";
import { Redirect, Route } from "react-router-dom";
import clsx from "clsx";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "./Chart";
import Orders from "./consumptionRate";
import Header from "./Header";
import Typography from "@material-ui/core/Typography";
import "./Dashboard.css";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const drawerWidth = 240;

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      totalcount: "",
      devicesList: [
        {
          devEUI: "3930323567378703",
          datetime: "",
          decodedData: {
            deviceName: "",
            meterReading: ""
          }
        },
        {
          devEUI: "70b3d5499433287e",
          datetime: "",
          decodedData: {
            deviceName: "",
            meterReading: ""
          }
        },
        {
          devEUI: "70b3d549902e26e1",
          meterReading: "",
          datetime: "",
          deviceName: ""
        }
      ]
    };
  }

  componentDidMount() {
    let { devicesList } = this.state;
    let newDevList = [...devicesList];
    fetch("/api/devicelist")
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        this.setState({
          totalcount: JSON.parse(data).totalCount
        });
        // console.log(JSON.parse(data).totalCount);
      });

    console.log("device list fetch", newDevList);
    for (let index in newDevList) {
      console.log("index::::", newDevList[index]);
      fetch(`/api/devicedata?devEUI=${newDevList[index].devEUI}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          console.log(JSON.parse(data).decodedData.deviceName);
          console.log(JSON.parse(data).decodedData.meterReading);
          console.log(JSON.parse(data).datetime);
          console.log(JSON.parse(data).devEUI);
          console.log("before>>>>>> device data", newDevList[index]);
          newDevList[index].datetime = JSON.parse(data).datetime;
          newDevList[index].meterReading = JSON.parse(
            data
          ).decodedData.meterReading;
          newDevList[index].deviceName = JSON.parse(
            data
          ).decodedData.deviceName;
          this.setState({ devicesList: newDevList });
          console.log("newDevList data>>>", newDevList[index]);
          console.log("device List", devicesList);
        });
    }
    console.log("device List", devicesList);
  }

  HandleChartEvent = () => {
    console.log("******************* Chart");
    return <Route exact path="/Chart" component={Chart} />;
  };

  render() {
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
        width: `calc(100% - ${drawerWidth}px)`,
        right: "17px  "
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
    //Grid with info
    const useStyles = makeStyles(theme => ({
      root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper
      },
      gridList: {
        flexWrap: "nowrap",
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: "translateZ(0)"
      },
      title: {
        color: theme.palette.primary.light
      },
      titleBar: {
        background:
          "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
      }
    }));

    const { devicesList, redirect } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <ThemeProvider theme={theme}>
        <div className="bashboardCnt">
          <CssBaseline />
          <main
            style={{
              flexGrow: 1,
              height: "100vh",
              overflow: "auto"
            }}
          >
            <div />
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
            />
            <Header />

            <Container
              maxWidth="lg"
              style={{
                marginTop: "55px"
              }}
            >
              <Grid container spacing={3}>
                <Grid
                  onClick={this.HandleChartEvent}
                  item
                  xs={12}
                  md={4}
                  lg={3}
                >
                  <Paper className={clsx(theme.paper, theme.fixedHeight)}>
                    <Typography variant="h6" color="primary">
                      Customer A
                    </Typography>

                    <Typography variant="h6">
                      Current Reading : {devicesList[0].meterReading}
                    </Typography>

                    <Typography variant="caption">
                      Timestamp : {devicesList[0].datetime}
                      <br />
                    </Typography>

                    <Typography variant="caption">
                      Device ID : {devicesList[0].devEUI}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid
                  onClick={this.HandleChartEvent}
                  item
                  xs={12}
                  md={4}
                  lg={3}
                >
                  <Paper className={clsx(theme.paper, theme.fixedHeight)}>
                    <Typography variant="h6" color="primary">
                      Customer B
                    </Typography>

                    <Typography variant="h6">
                      Current Reading : {devicesList[1].meterReading}
                    </Typography>

                    <Typography variant="caption">
                      Timestamp : {devicesList[1].datetime}
                      <br />
                    </Typography>

                    <Typography variant="caption">
                      {" "}
                      Device ID : {devicesList[1].devEUI}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4} lg={3}>
                  <Paper className={clsx(theme.paper, theme.fixedHeight)}>
                    <Typography variant="h6" color="primary">
                      Customer C
                    </Typography>

                    <Typography variant="h6">
                      Current Reading : {devicesList[2].meterReading}
                    </Typography>

                    <Typography variant="caption">
                      Timestamp : {devicesList[2].datetime}
                      <br />
                    </Typography>

                    <Typography variant="caption">
                      {" "}
                      Device ID : {devicesList[2].devEUI}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={8} lg={9}>
                  <Paper>
                    <Chart />
                  </Paper>
                </Grid>

                <Grid item xs={12} md={8} lg={9}>
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
