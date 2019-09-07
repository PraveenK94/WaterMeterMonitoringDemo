import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";

// Generate Order Data
function createData(id, date, consumption_value, amount) {
  return { id, date, consumption_value, amount };
}

const rows = [
  createData(0, "16 Jan, 2019", "10", 31.44),
  createData(1, "13 Feb, 2019", "25", 86.99),
  createData(2, "16 Mar, 2019", "4.8", 10.81),
  createData(3, "16 Apr, 2019", "22", 65.39),
  createData(4, "15 May, 2019", "7.8", 22.79)
];

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Date and Consumption Value</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Consumption Value </TableCell>

            <TableCell align="right">Total Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.consumption_value}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
