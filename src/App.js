import "./App.css";
import Pagetable from "./2/table";
import RawList from "./2/rawlist";
import slidePage from "./2/slide";
import Writer from "./2/write";

function App() {
  return (
    <div>
      <div sx={{ pt: 20 }}>{Pagetable()}</div>
      <div sx={{ pt: 20 }}>{RawList()}</div>
      <div sx={{ pt: 20 }}>{slidePage()}</div>
      <div sx={{ pt: 20 }}>{Writer()}</div>
    </div>
  );
}

export default App;
