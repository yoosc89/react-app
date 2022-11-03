import React from "react";
import { TextField, Grid, Button, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch, batch, useSelector } from "react-redux";

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
  /*   alert(
    `POST 요청 입력값 확인용 알림창\ntitle : ${e.target.title.value}\nwriter :  ${e.target.writer.value}\ncontent : ${e.target.content.value}`
  ); */
  document.getElementById("title").value = "";
  document.getElementById("writer").value = "";
  document.getElementById("content").value = "";
}

function ModifyData(e, id) {
  axios
    .post("http://localhost:8000/content/modify", {
      id: id,
      title: e.target.title.value,
      writer: e.target.writer.value,
      content: e.target.content.value,
    })
    .then((res) => {})
    .catch(() => {})
    .then(() => {});
}

function FormData() {
  const data = useSelector((state) => state.DefaultContent);
  const ModifyWrite = useSelector((state) => state.ModifyWrite);

  return (
    <Grid container spacing={2} xs={11} md={11} sx={{ m: 2, pt: 2, rowGap: 1 }}>
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
          defaultValue={data.title}
          multiline
          maxRows={1}
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
          defaultValue={data.writer}
          multiline
          maxRows={1}
          disabled={data.disablewriter}
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
          defaultValue={data.content}
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
          onClick={() => {}}
        >
          {ModifyWrite.modifyname}
        </Button>
      </Grid>
    </Grid>
  );
}

export default function Writer(id) {
  const dispatch = useDispatch();
  console.log(id);
  return (
    <form
      onSubmit={(e) => {
        if (id === undefined) {
          inputData(e);
        } else if (id >= 0) {
          ModifyData(e, id);
        }

        batch(() => {
          dispatch({ type: "MWrite" });
          dispatch({ type: "Treload" });
          dispatch({ type: "WRclose" });
        });
      }}
      method="post"
    >
      <FormData />
    </form>
  );
}
