import { Grid, CardMedia, Container, CardActionArea } from "@mui/material/";

import Card from "@mui/material/Card";

const cards = [1, 2, 3, 4, 5, 6, 7];

function thumNail() {
  return (
    <Container sx={{ py: 20 }} maxWidth="xl">
      <Grid container spacing={2}>
        {cards.map((card) => (
          <Grid item key={card} xs={12} sm={6} md={3}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardActionArea href={card}>
                <CardMedia
                  height="250"
                  component="img"
                  image="https://source.unsplash.com/random"
                  alignItems="center"
                  alt="random"
                />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default thumNail;
