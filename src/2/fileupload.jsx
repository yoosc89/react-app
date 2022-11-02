import React, { useState } from "react";
import { Button, Card, CardMedia, Box } from "@mui/material";
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
      <Card
        sx={{
          maxWidth: 500,
          boxShadow: 8,
          m: 4,
        }}
      >
        <CardMedia component="img" height="500" image={e} alt="" />
      </Card>
    );
  };

  return (
    <React.Fragment>
      <Box sx={{ m: 3 }}>
        <Box
          xs={12}
          md={12}
          sx={{ display: "block", alignContent: "center", mb: 2 }}
        >
          {previewImage(upImage)}
        </Box>
        <Box alignContent="center" xs={12} md={12}>
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
        </Box>
      </Box>
    </React.Fragment>
  );
}
