import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  ListItemText,
  ListItemButton,
  Paper,
  Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Test(page) {
  const [data, setdata] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/select/${page}`)
      .then((res) => setdata(res.data))
      .catch((err) => {});
  }, [page]);
  return data;
}

function Items(data) {
  return data.map((row) => (
    <TableRow>
      <TableCell>{row.id}</TableCell>
      <TableCell align="left">
        <Link color="black" underline="none" href={row.id}>
          {row.title}
        </Link>
      </TableCell>
      <TableCell>{row.writer}</TableCell>
      <TableCell>{row.date}</TableCell>
    </TableRow>
  ));
}

export default function RawList() {
  const [page, setpage] = useState(0);
  /* setinputData(inputData.concat(temp)); */
  return (
    <React.Fragment>
      <Grid container spacing={1} sx={{ pt: 8, color: "secondary" }}>
        <Grid item xs={12}>
          <Item
            sx={{
              boxShadow: 7,
              m: 1,
              display: "flex",
            }}
          >
            <ListItemButton>
              <ListItemText
                onClick={() => {
                  setpage(1);
                }}
              >
                Table1
              </ListItemText>
            </ListItemButton>
            <ListItemButton>
              <ListItemText
                onClick={() => {
                  setpage(2);
                }}
              >
                Table2
              </ListItemText>
            </ListItemButton>
            <ListItemButton>
              <ListItemText
                onClick={() => {
                  setpage(3);
                }}
              >
                Table2
              </ListItemText>
            </ListItemButton>
            <ListItemButton>
              <ListItemText
                onClick={() => {
                  setpage(4);
                }}
              >
                Table3
              </ListItemText>
            </ListItemButton>
            <ListItemButton>
              <ListItemText
                onClick={() => {
                  setpage(5);
                }}
              >
                Table4
              </ListItemText>
            </ListItemButton>
            <ListItemButton>
              <ListItemText
                onClick={() => {
                  setpage(6);
                }}
              >
                Table5
              </ListItemText>
            </ListItemButton>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item sx={{ boxShadow: 7, m: 1 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>글 번호</TableCell>
                  <TableCell align="left">제 목</TableCell>
                  <TableCell>작성자</TableCell>
                  <TableCell>글 생성날짜</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{Items(Test(page))}</TableBody>
            </Table>
          </Item>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </React.Fragment>
  );
}
