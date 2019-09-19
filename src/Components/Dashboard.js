import React from "react";
import { Redirect } from "react-router-dom";
import clsx from "clsx";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "./Chart";
import Orders from "./consumptionRate";
import Values from "./Values";
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
      totalcount: "",
      getDeviceData: "abc",
      devEUI: "1234",
      datetime: "500233",
      meterReading: "18273912",

      devicesList: [
        {
          devEUI: "3930323567378703",
          meterReading: "",
          datetime: "",
          deviceName: ""
        },
        {
          devEUI: "70b3d5499433287e",
          meterReading: "",
          datetime: "",
          deviceName: ""
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

  // getTotalCount = () => {
  //   this.setState({ totalcount: this.getTotalCount, devEUI: this.devEUI });
  // };

  // getDeviceData = () => {
  //   this.setstate({
  //     deviceName: this.getDeviceData,
  //     meterReading: this.getDeviceData,
  //     datetime: this.getDeviceData
  //   });
  // };

  componentDidMount() {
    let { devicesList } = this.state;
    let newDevList = [...devicesList];
    fetch("/api/devicelist")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          totalcount: JSON.parse(data).totalCount
        });
        console.log(JSON.parse(data).totalCount);
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

    const { devicesList, redirect } = this.state;

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
                <Grid item xs={12} md={4} lg={4}>
                  <Paper className={clsx(theme.paper, theme.fixedHeight)}>
                    <Values />

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
                      {" "}
                      Device ID : {devicesList[0].devEUI}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4} lg={4}>
                  <Paper className={clsx(theme.paper, theme.fixedHeight)}>
                    <Values />

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

                <Grid item xs={12} md={4} lg={4}>
                  <Paper className={clsx(theme.paper, theme.fixedHeight)}>
                    <Values />

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
