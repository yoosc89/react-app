import "./App.css";
import Pagetable from "./2/table";
import RawList from "./2/rawlist";
import slidePage from "./2/slide";
import Writer from "./2/write";
import imageCard from "./1/image_card";
import LoginPage from "./1/login_name";
import thumNail from "./1/thumnail_card";

function App() {
  return (
    <div>
      <div>{thumNail()}</div>
      <div>{imageCard()}</div>

      <div>{slidePage()}</div>
      <Pagetable sx={{ pt: 8 }} />
      <RawList sx={{ pt: 8 }} />
      <Writer sx={{ pt: 8 }} />
      <LoginPage sx={{ pt: 8 }} />
    </div>
  );
}

export default App;
