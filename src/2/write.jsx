import React from "react";
import { TextField, Grid, Button, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";

function inputData(e) {
  e.preventDefault();
  axios
    .post("http://localhost:8000/post", {
      title: e.target.title.value,
      writer: e.target.writer.value,
      content: e.target.content.value,
    })
    .then((res) => {})
    .catch(() => {})
    .then(() => {});
  alert(
    `POST 요청 입력값 확인용 알림창\ntitle : ${e.target.title.value}\nwriter :  ${e.target.writer.value}\ncontent : ${e.target.content.value}`
  );
  document.getElementById("title").value = "";
  document.getElementById("writer").value = "";
  document.getElementById("content").value = "";
}

function FormData1() {
  const dispatch = useDispatch();
  return (
    <form onSubmit={inputData} method="post">
      <Grid
        container
        spacing={2}
        xs={11}
        md={11}
        sx={{ m: 2, pt: 2, rowGap: 1 }}
      >
        <Grid item xs={12}>
          <Typography align="center" variant="h3">
            POST TEST
          </Typography>
        </Grid>

        <Grid item xs={12} md={8}>
          <TextField
            id="title"
            label="title"
            size="medium"
            fullWidth
            sx={{ boxShadow: 4 }}
            required={true}
            autofocus
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            id="writer"
            label="writer"
            size="medium"
            fullWidth
            sx={{ boxShadow: 4 }}
            required={true}
            autofocus
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            id="content"
            label="content"
            size="large"
            fullWidth
            sx={{ boxShadow: 4 }}
            required={true}
            autofocus
            multiline={true}
            maxRows={10}
          />
        </Grid>
        <Grid item xs={12} sx={{ borderRadius: 2 }}>
          <Button
            label="save"
            color="primary"
            fullWidth
            children
            sx={{ boxShadow: 4, height: 50 }}
            variant="contained"
            type="submit"
            onClick={() => {
              dispatch({ type: false });
              dispatch({ type: 0 });
            }}
          >
            보내기
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default function Writer() {
  return <FormData1></FormData1>;
}
