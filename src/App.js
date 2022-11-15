import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "animate.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import LoginPage from "./app/freeboard/login";
import MainPage from "./app/freeboard/mainpage";
import NewAccount from "./app/freeboard/newaccount";
import SearchAccoute from "./app/freeboard/searchaccount";
import ContentsPage from "./app/freeboard/contents_list";
import store from "./app/store";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import MenuItems from "./app/menu";
import CreateUser from "./app/shopping/createuser";

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

            <Route path={"contents"}>
              <Route path={`:contents/*`} element={<ContentsPage />}></Route>
            </Route>

            <Route caseSensitive exact path="/" element={<MainPage />}></Route>
          </Routes>
          <Routes>
            <Route path="/shopping">
              <Route
                caseSensitive
                path="createuser"
                element={<CreateUser />}
              ></Route>
            </Route>
          </Routes>
        </div>
      </Provider>
    </>
  );
}

export default App;
