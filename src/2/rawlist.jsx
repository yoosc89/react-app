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
  Button,
  SwipeableDrawer,
} from "@mui/material";
import Writer from "./write";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export function Test(page) {
  const [data, setdata] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/select/${page}`)
      .then((res) => setdata(res.data))
      .catch((err) => {});
  }, [page]);

  return data;
}

export function Items(data) {
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

function BodyNumber() {
  const number = useSelector((state) => state.number);
  return <TableBody>{Items(Test(number))}</TableBody>;
}

function BodyButton() {
  const dispatch = useDispatch();
  return (
    <>
      <ListItemButton>
        <ListItemText
          onClick={() => {
            dispatch({ type: 0 });
          }}
        >
          Table1
        </ListItemText>
      </ListItemButton>
      <ListItemButton>
        <ListItemText
          onClick={() => {
            dispatch({ type: 1 });
          }}
        >
          Table2
        </ListItemText>
      </ListItemButton>
      <ListItemButton>
        <ListItemText
          onClick={() => {
            dispatch({ type: 2 });
          }}
        >
          Table2
        </ListItemText>
      </ListItemButton>
      <ListItemButton>
        <ListItemText
          onClick={() => {
            dispatch({ type: 3 });
          }}
        >
          Table3
        </ListItemText>
      </ListItemButton>
      <ListItemButton>
        <ListItemText
          onClick={() => {
            dispatch({ type: 4 });
          }}
        >
          Table4
        </ListItemText>
      </ListItemButton>
      <ListItemButton>
        <ListItemText
          onClick={() => {
            dispatch({ type: 5 });
          }}
        >
          Table5
        </ListItemText>
      </ListItemButton>
    </>
  );
}

function WriteDrawer() {
  const bool = useSelector((state) => state.bool);
  const dispatch = useDispatch();

  return (
    <>
      <SwipeableDrawer
        anchor="bottom"
        open={bool}
        onClose={() => {
          dispatch({ type: false });
        }}
        onOpen={() => dispatch({ type: "write_true" })}
      >
        {bool && Writer()}
      </SwipeableDrawer>
    </>
  );
}

function WriteButton() {
  const dispatch = useDispatch();
  return (
    <>
      <Button
        variant="contained"
        fullWidth
        size="large"
        sx={{ m: 2, boxShadow: 8 }}
        onClick={() => {
          dispatch({ type: "write_true" });
        }}
      >
        write
      </Button>
    </>
  );
}

export default function RawList() {
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
            <BodyButton />
          </Item>
        </Grid>
        <Grid item xs={12} md={12}>
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
              <BodyNumber />
            </Table>
          </Item>
        </Grid>
        <WriteButton />
        <Grid item xs={12} md={12}></Grid>
        <WriteDrawer />
      </Grid>
    </React.Fragment>
  );
}
