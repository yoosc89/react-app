import { Grid, CardMedia, Container, CardActionArea } from "@mui/material/";

import Card from "@mui/material/Card";

let cards = [];
for (let i = 0; i < 8; i++) {
  cards.push("https://picsum.photos/80" + i);
}

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
                  image={card}
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
