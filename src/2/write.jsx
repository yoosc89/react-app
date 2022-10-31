import React, { useState } from "react";
import { TextField, Grid, Button, Typography } from "@mui/material";
import axios from "axios";

function handleSumit(e) {
  e.preventDefault();
  const title = e.target.title.value;
  const writer = e.target.writer.value;
  inputData(title, writer);
  alert([
    `POST 요청 입력값 확인용 알림창\ntitle : ${title}\nwriter :  ${writer}`,
  ]);
  document.getElementById("title").value = "";
  document.getElementById("writer").value = "";
}

function inputData(title1, writer1) {
  axios
    .post("http://localhost:8000/post", { title: title1, writer: writer1 })
    .then((res) => {})
    .catch(() => {})
    .then(() => {});
}

function FormData1() {
  return (
    <form onSubmit={handleSumit} method="post">
      <Grid
        container
        spacing={2}
        xs={11}
        md={11}
        sx={{ m: 2, pt: 6, rowGap: 1 }}
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
