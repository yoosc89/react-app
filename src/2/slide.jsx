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
    <Grid container sx={{ pt: 8, borderRadius: 10 }}>
      <Grid item xs={12} sx={{ m: 2, boxShadow: 10, borderRadius: 3 }}>
        <Carousel
          sx={{ borderRadius: 3 }}
          style={{ height: 550 }}
          interval={50000}
        >
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
