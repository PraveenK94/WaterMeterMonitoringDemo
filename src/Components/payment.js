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
  createData(0, "16 Jan, 2019", "320"),
  createData(1, "13 Feb, 2019", "352"),
  createData(2, "16 Mar, 2019", "401"),
  createData(3, "16 Apr, 2019", "449"),
  createData(4, "15 May, 2019", "516"),
  createData(5, "15 jun, 2019", "577"),
  createData(6, "15 july, 2019", "634")
];

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Date and Consumption </Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right"> Meter Reading</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell align="right">{row.consumption_value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
