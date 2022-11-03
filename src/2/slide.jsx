import React from "react";
import Carousel from "react-material-ui-carousel";
import { Grid } from "@mui/material";

export default function slidePage() {
  const items = [
    { img: "https://picsum.photos/1920" },
    { img: "https://picsum.photos/1921" },
    { img: "https://picsum.photos/1922" },
    { img: "https://picsum.photos/1923" },
  ];

  return (
    <Grid container xs={12} md={12} sx={{ pt: 8 }}>
      <Grid item xs={12} md={12}>
        <Carousel sx={{ height: 550 }} interval={1000}>
          {items.map((item) => {
            return (
              <div
                style={{
                  height: 500,
                }}
              >
                <img
                  src={item.img}
                  style={{
                    width: "100%",
                  }}
                />
              </div>
            );
          })}
        </Carousel>
      </Grid>
    </Grid>
  );
}
