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
  Button,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import Writer from "./write";
import { batch, useSelector, useDispatch } from "react-redux";

import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export function Test(page) {
  const load = useSelector((state) => state.TableReload.reload);
  const [data, setdata] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/select/${page}`)
      .then((res) => setdata(res.data))
      .catch((err) => {});
  }, [page, load]);

  return data;
}

export function Loadcontent(id) {
  const load = useSelector((state) => state.TableReload.reload);
  const [data, setdata] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/content/${id}`)
      .then((res) => setdata(res.data))
      .catch((err) => {});
  }, [id, load]);

  return { type: data[0] };
}

export function Ttitle({ text_id, text_title }) {
  const dispatch = useDispatch();
  const data = Loadcontent(text_id);
  return (
    <Typography
      onClick={() => {
        batch(() => {
          dispatch({ type: "WRload" });
          dispatch({ type: "MModify" });
          dispatch(data);
        });
      }}
    >
      {text_title}
    </Typography>
  );
}
export function Items(data) {
  return data.map((row) => (
    <>
      <TableRow>
        <TableCell>{row.id}</TableCell>
        <TableCell>
          <Ttitle text_id={row.id} text_title={row.title} />
        </TableCell>
        <TableCell>{row.writer}</TableCell>
        <TableCell>{row.date}</TableCell>
      </TableRow>
    </>
  ));
}

function BodyNumber() {
  const number = useSelector((state) => state.PageNumber.number);

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
  const bool = useSelector((state) => state.WriteLoadButton.bool);
  const id = useSelector((state) => state.DefaultContent.id);

  const dispatch = useDispatch();

  return (
    <>
      <SwipeableDrawer
        anchor="bottom"
        open={bool}
        onClose={() => {
          dispatch({ type: "WRclose" });
        }}
        onOpen={() => dispatch({ type: "WRload" })}
      >
        {bool && Writer(id)}
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
          batch(() => {
            dispatch({ type: "WRload" });
            dispatch({ type: "MWrite" });
          });
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
