import React from "react";
import { TextField, Grid, Button, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch, batch, useSelector } from "react-redux";

function inputData(e) {
  e.preventDefault();
  axios
    .post("http://192.168.0.43:8000/post", {
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
    .post("http://192.168.0.43:8000/content/modify", {
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
    <Grid
      container
      columnSpacing={1}
      rowSpacing={4}
      sx={{ mt: 2, width: "100%", p: 2 }}
    >
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
          rows={2}
          maxRows={1}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="writer"
          label="writer"
          size="medium"
          fullWidth
          sx={{ boxShadow: 8 }}
          required={true}
          autofocus
          defaultValue={data.writer}
          multiline
          rows={2}
          maxRows={1}
          disabled={data.disablewriter}
        />
      </Grid>
      <Grid item sx={{ width: "100%" }}>
        <TextField
          id="content"
          label="content"
          size="large"
          fullWidth
          required={true}
          autofocus
          multiline={true}
          rows={4}
          maxRows={10}
          defaultValue={data.content}
          sx={{ boxShadow: 8 }}
        />
      </Grid>
      <Grid item sx={{ borderRadius: 2, width: "100%" }}>
        <Button
          label="save"
          color="primary"
          fullWidth
          children
          sx={{ boxShadow: 8, height: 50 }}
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
