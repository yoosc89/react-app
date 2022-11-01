import React, { useState } from "react";
import { Button, Grid, Card, CardMedia } from "@mui/material";
import axios from "axios";

export default function FileUpload1() {
  const [upImage, setUpimage] = useState("");

  const saveImg = (e) => {
    const img = e.target.files[0];
    setUpimage(URL.createObjectURL(img));
    const formdata = new FormData();
    const file = e.target.files[0];
    formdata.append("file", file);
    axios.post("http://localhost:8000/files", formdata, {
      heades: { "Content-Type": "multipart/form-data" },
    });
  };

  const previewImage = (e) => {
    return (
      <Grid item sx={{ m: 4 }}>
        <Card sx={{ maxWidth: 500, alignContent: "center", boxShadow: 8 }}>
          <CardMedia
            component="img"
            height="500"
            image={e}
            alt="previewImage"
          />
        </Card>
      </Grid>
    );
  };

  return (
    <React.Fragment>
      <Grid container xs={12} md={12} sx={{ m: 2, pt: 8 }}>
        <Grid item xs={12} md={12}>
          {previewImage(upImage)}
        </Grid>
        <Grid item alignContent="center" xs={12} md={12}>
          <Button variant="contained" component="label" size="large" fullWidth>
            Auto_File_Upload && previewImage
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={saveImg}
              name="file"
            />
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
