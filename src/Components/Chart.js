import React, { Component } from "react";
import { Line } from "react-chartjs-2";

const data = {
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
      label: "Consumption trends",
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
};

const options = {
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
};

export class Chart extends Component {
  render() {
    return (
      <div>
        <Line data={data} options={options} />
      </div>
    );
  }
}

export default Chart;
