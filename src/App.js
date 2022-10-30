import "./App.css";
import Pagetable from "./2/table";
import RawList from "./2/rawlist";

function App() {
  return (
    <div>
      <div>{Pagetable()}</div>
      <div>{RawList()}</div>
    </div>
  );
}

export default App;
