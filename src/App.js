import "./App.css";
import LoginPage from "./3/login";
import MainPage from "./3/mainpage";
import NewAccount from "./3/newaccount";
import SearchAccoute from "./3/searchaccount";
import ContentsPage from "./3/contents_list";
import store from "./3/store";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import MenuItems from "./3/menu";
import ContentPage from "./3/content_write";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "animate.css";

function App() {
  return (
    <>
      <Provider store={store}>
        <div>
          <MenuItems />
        </div>
        <div></div>
        <div class="mt-5 mb-5">
          <Routes>
            <Route caseSensitive path="/login" element={<LoginPage />}></Route>
            <Route
              exact
              caseSensitive
              path="/newaccount"
              element={<NewAccount />}
            ></Route>
            <Route
              exact
              caseSensitive
              path="/searchaccoute"
              element={<SearchAccoute />}
            ></Route>

            <Route
              caseSensitive
              path={`/contents/:id`}
              element={<ContentsPage />}
            >
              <Route path={"detail/:id"} element={<ContentPage />} />
            </Route>

            <Route caseSensitive exact path="/" element={<MainPage />}></Route>
          </Routes>
        </div>
      </Provider>
    </>
  );
}

export default App;
