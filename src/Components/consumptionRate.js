import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";

export default class consumptionRate extends Component {
  constructor() {
    super();
    this.state = {
      deviceData: "",
      rows: [
        {
          id: 0,
          date: "",
          pct: 12
        },
        {
          id: 1,
          date: "",
          pct: 12
        },
        {
          id: 2,
          date: "",
          pct: 12
        },
        {
          id: 3,
          date: "",
          pct: 12
        },
        {
          id: 4,
          date: "",
          pct: 12
        },
        {
          id: 5,
          date: "",
          pct: 12
        }
      ]
    };
  }

  manipulateConsumptionRate = (dateVar, devData) => {
    var date = new Date(dateVar);
    var deviceData = devData;
    var devArrData = [0, 0, 0, 0, 0, 0, 0];
    var dateArrData = ["", "", "", "", "", "", ""];
    var dateMonth = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    var percentageIncreaseInUsage = [0, 0, 0, 0, 0, 0];
    devArrData[6] = deviceData;
    dateArrData[6] = "" + dateMonth[date.getMonth()] + " " + date.getFullYear();

    function randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    for (let i = devArrData.length - 1; i > 0; i--) {
      devArrData[i - 1] = Math.round(
        devArrData[i] - (devArrData[i] / 100) * randomIntFromInterval(10, 15)
      );
      date.setMonth(date.getMonth() - 1);
      dateArrData[i - 1] =
        "" + dateMonth[date.getMonth()] + " " + date.getFullYear();
    }

    for (let i = 0; i < devArrData.length; i++) {
      console.log("next data: ", devArrData[i], "Date: ", devArrData[i]);
    }

    for (let i = 0, k = 0; i < devArrData.length - 1; i++) {
      k = devArrData[i + 1] - devArrData[i];
      percentageIncreaseInUsage[i] = Math.round((k / devArrData[i]) * 100);
      console.log("pct increase: ", percentageIncreaseInUsage[i]);
    }

    this.setState({
      rows: [
        {
          id: 0,
          date: dateArrData[1],
          pct: percentageIncreaseInUsage[0]
        },
        {
          id: 1,
          date: dateArrData[2],
          pct: percentageIncreaseInUsage[1]
        },
        {
          id: 2,
          date: dateArrData[3],
          pct: percentageIncreaseInUsage[2]
        },
        {
          id: 3,
          date: dateArrData[4],
          pct: percentageIncreaseInUsage[3]
        },
        {
          id: 4,
          date: dateArrData[5],
          pct: percentageIncreaseInUsage[4]
        },
        {
          id: 5,
          date: dateArrData[6],
          pct: percentageIncreaseInUsage[5]
        }
      ]
    });
  };

  componentDidMount() {
    fetch(`/api/devicedata?devEUI=3930323567378703`)
      .then(res => res.json())
      .then(data => {
        console.log(JSON.parse(data).decodedData.meterReading);
        console.log(JSON.parse(data).datetime);
        this.setState({
          deviceData: JSON.parse(data).decodedData.meterReading
        });
        this.manipulateConsumptionRate(
          JSON.parse(data).datetime,
          JSON.parse(data).decodedData.meterReading
        );
        console.log(
          "###################### date: ",
          this.state.date,
          " reading: ",
          this.state.deviceData
        );
      });
  }
  render() {
    const { rows } = this.state;

    return (
      <React.Fragment>
        <Title>Monthly Unit Consumption Details</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">Month</TableCell>
              <TableCell align="center">Consumption Rate (%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{row.pct}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

// // Generate Order Data
// function createData(id, date, consumption_value, amount) {
//   return { id, date, consumption_value, amount };
// }

// const rows = [
//   createData(0, "16 Jan, 2019", "320"),
//   createData(1, "13 Feb, 2019", "352"),
//   createData(2, "16 Mar, 2019", "401"),
//   createData(3, "16 Apr, 2019", "449"),
//   createData(4, "15 May, 2019", "516"),
//   createData(5, "15 jun, 2019", "577"),
//   createData(6, "15 july, 2019", "634")
// ];
