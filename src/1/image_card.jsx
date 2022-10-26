import {
  CardActions,
  CardContent,
  Grid,
  Typography,
  Button,
  CardMedia,
  Container,
} from "@mui/material/";

import Card from "@mui/material/Card";

const cards = [1, 2, 3];

function imageCard() {
  return (
    <Container sx={{ py: 10 }} maxWidth="md">
      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid item key={card} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                sx={{ pt: "0%" }}
                image="https://source.unsplash.com/random"
                alt="random"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h1">
                  ~~~~~`Heading~~~~
                </Typography>
                <Typography>
                  This is media card. you can use this section to describe the
                  content.
                </Typography>
              </CardContent>
              <CardActions>
                <Button href={card} size="small">
                  View
                </Button>
                <Button href={card} size="small">
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default imageCard;
