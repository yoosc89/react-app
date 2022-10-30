import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  ListItemText,
  ListItemButton,
  Box,
  Paper,
  Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";

function list_item(id, subject, write, date) {
  return { id, subject, write, date };
}

const Table1 = [
  list_item(1, "그냥저냥", "홍길동", "2022/01/01"),
  list_item(2, "테스트", "홍길동", "2022/01/01"),
  list_item(3, "그", "홍길동", "2022/01/01"),
  list_item(4, "그냥저냥ㅇㄹㅇㄹㅇ", "홍길동", "2022/01/01"),
  list_item(5, "그냥저ㄴㄴㄴㄴㄴㄴ냥", "홍길동", "2022/01/01"),
  list_item(6, "그냥ㄹㄹㄹㄹㄹㄹㄹㅇ저냥", "홍길동", "2022/01/01"),
  list_item(7, "그냥ㄴㅇㄹㄹㄹㄹㄹㄹㄹ저냥", "홍길동", "2022/01/01"),
  list_item(8, "그ㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴ냥저냥", "홍길동", "2022/01/01"),
  list_item(9, "그냥저ㄴㅇㄹㄴㅇㄹㅇㄹㅇㄹㅇㄹ냥", "홍길동", "2022/01/01"),
  list_item(10, "그냥232222323저냥", "홍길동", "2022/01/01"),
];

const Table2 = [
  list_item(1, "그저냥", "강남", "2022/02/01"),
  list_item(2, "테트", "서구", "2022/02/01"),
  list_item(3, "그", "길동", "2022/02/01"),
  list_item(4, "ㅇㄹㅇㄹㅇ", "홍", "2022/02/01"),
  list_item(5, "그냥저냥", "홍동", "2022/02/01"),
  list_item(6, "그냥ㄹㄹㄹㄹㄹㄹㅇ저냥", "길동", "2022/03/01"),
  list_item(7, "그냥ㄴㄹㄹㄹㄹㄹㄹ저냥", "동", "2022/04/01"),
  list_item(8, "그ㄴㄴㄴㄴㄴ냥저냥", "금", "2022/05/01"),
  list_item(9, "그냥저ㄴㄴㅇㄹㅇㄹㅇㄹㅇㄹ냥", "은", "2022/06/01"),
  list_item(10, "그냥23222323저냥", "홍길동", "2022/04/01"),
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function TableMain(Page_table) {
  return Page_table.map((row) => (
    <TableRow>
      <TableCell>{row.id}</TableCell>
      <TableCell align="left">
        <Link color="black" underline="none" href={row.id}>
          {row.subject}
        </Link>
      </TableCell>
      <TableCell>{row.write}</TableCell>
      <TableCell>{row.date}</TableCell>
    </TableRow>
  ));
}
function Page_table() {
  let [page, pageSet] = useState(Table1);
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
                  pageSet(Table1);
                }}
              >
                Table1
              </ListItemText>
            </ListItemButton>
            <ListItemButton>
              <ListItemText
                onClick={() => {
                  pageSet(Table2);
                }}
              >
                Table2
              </ListItemText>
            </ListItemButton>
            <ListItemButton>
              <ListItemText>Table2</ListItemText>
            </ListItemButton>
            <ListItemButton>
              <ListItemText>Table3</ListItemText>
            </ListItemButton>
            <ListItemButton>
              <ListItemText>Table4</ListItemText>
            </ListItemButton>
            <ListItemButton>
              <ListItemText>Table5</ListItemText>
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
              <TableBody>{TableMain(page)}</TableBody>
            </Table>
          </Item>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Page_table;
