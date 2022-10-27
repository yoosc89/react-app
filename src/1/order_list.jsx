import * as React from "react";
import {
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Table,
  Link,
  Typography,
} from "@mui/material";

function createData(id, date, name, shipTo, paymenntMethod, amount) {
  return { id, date, name, shipTo, paymenntMethod, amount };
}

const rows = [
  createData(0, "2022/01/01", "홍길동", "서울 중랑구", "국민", 23),
  createData(1, "2022/01/02", "일자", "서울 노원구", "우리", 25),
  createData(2, "2022/01/03", "이자", "서울 도봉구", "현대", 10),
  createData(3, "2022/01/04", "삼자", "서울 용산구", "농협", 12),
  createData(4, "2022/01/05", "사자", "서울 강남구", "마스터", 50),
  createData(5, "2022/01/06", "구자", "서울 강동구", "비자", 60),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Typography variant="h5" color="primary">
        Recent Orders
      </Typography>
      <Table size="smal">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>shipTo</TableCell>
            <TableCell align="center">paymenntMethod</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell align="center">{row.paymenntMethod}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
