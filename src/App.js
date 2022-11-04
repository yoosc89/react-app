import "./App.css";
import LoginPage from "./3/login";
import MainPage from "./3/mainpage";
import NewAccount from "./3/newaccount";
import SearchAccoute from "./3/searchaccount";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route caseSensitive path="/login" element={<LoginPage />}></Route>
        <Route
          exact
          caseSensitive
          path="/newaccount"
          element={<NewAccount />}
        ></Route>
        <Route
          caseSensitive
          path="/searchaccoute"
          element={<SearchAccoute />}
        ></Route>
        <Route caseSensitive exact path="/" element={<MainPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
