import React, { Component } from "react";
import { Line } from "react-chartjs-2";

export class Chart extends Component {
  constructor() {
    super();
    this.state = {
      date: "",
      deviceData: "",
      chartData: {
        data: {
          labels: [
            "Jan 2019",
            "Feb 2019",
            "Mar 2019",
            "Apr 2019",
            "May 2019",
            "Jun 2019",
            "Jul 2019"
          ],

          datasets: [
            {
              label: "Unit Consumed ",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [320, 352, 401, 449, 516, 577, 634]
            }
          ]
        }
      },
      chartOptions: {
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Water Meter Reading"
              }
            }
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Time"
              }
            }
          ]
        }
      }
    };
  }

  // static defaultProps = ,

  //   options: ;

  getData = () => {
    this.setState({
      date: this.state.date,
      deviceData: this.state.deviceData
    });
  };

  manipulateChartData = (dateVar, devData) => {
    var date = new Date(dateVar);
    var deviceData = devData;
    var chartYaxisData = [0, 0, 0, 0, 0, 0, 0];
    var chartXaxisData = ["", "", "", "", "", "", ""];
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
    chartYaxisData[6] = deviceData;
    chartXaxisData[6] =
      "" + dateMonth[date.getMonth()] + " " + date.getFullYear();

    function randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    for (let i = chartYaxisData.length - 1; i > 0; i--) {
      chartYaxisData[i - 1] = Math.round(
        chartYaxisData[i] -
          (chartYaxisData[i] / 100) * randomIntFromInterval(10, 15)
      );
      date.setMonth(date.getMonth() - 1);
      chartXaxisData[i - 1] =
        "" + dateMonth[date.getMonth()] + " " + date.getFullYear();
    }
    console.log("@@@@@@@@@@@@ chart DAta: ", this.state.chartData);

    this.setState({
      chartData: { data: { labels: chartXaxisData } }
    });
    this.setState({
      chartData: {
        data: {
          datasets: [
            {
              label: "Units Consumed for Customer A ",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: chartYaxisData
            }
          ]
        }
      }
    });
    console.log("@@@@@@@@@@@@ chart DAta: ", this.state.chartData);
    for (let i = 0; i < chartYaxisData.length; i++) {
      console.log(
        "next data: ",
        chartYaxisData[i],
        "Date: ",
        chartXaxisData[i]
      );
    }
  };

  componentDidMount() {
    fetch(`/api/devicedata?devEUI=3930323567378703`)
      .then(res => res.json())
      .then(data => {
        console.log(JSON.parse(data).decodedData.meterReading);
        console.log(JSON.parse(data).datetime);
        console.log(JSON.parse(data).devEUI);

        this.setState({ date: JSON.parse(data).datetime });
        this.setState({
          deviceData: JSON.parse(data).decodedData.meterReading
        });
        this.manipulateChartData(
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
    return (
      <div>
        <Line
          data={this.state.chartData.data}
          options={this.state.chartOptions}
        />
      </div>
    );
  }
}

export default Chart;
