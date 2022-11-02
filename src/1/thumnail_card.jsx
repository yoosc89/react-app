import { ImageList, ImageListItem } from "@mui/material/";

function thumNail() {
  let cards = [];
  for (let i = 0; i < 9; i++) {
    cards.push("https://picsum.photos/80" + i);
  }
  return (
    <ImageList xs={12} md={12} variant="quitlred" cols={3} rowHeight={300}>
      {cards.map((item) => {
        return (
          <ImageListItem>
            <img
              src={item}
              loading="loading"
              onClick={(e) => {
                window.open(e.target.src);
              }}
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
}

export default thumNail;
