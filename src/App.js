import "./App.css";
import Pagetable from "./2/table";
import RawList from "./2/rawlist";
import slidePage from "./2/slide";
import imageCard from "./1/image_card";
import LoginPage from "./1/login_name";
import thumNail from "./1/thumnail_card";

import React, { useRef } from "react";
import FileUpload1 from "./2/fileupload";
import { Provider } from "react-redux";
import store from "./2/store";
import TableGrid from "./2/datagrid";

function App() {
  return (
    <Provider store={store}>
      <>
        <>{thumNail()}</>
        <>{imageCard()}</>

        <>{slidePage()}</>

        <>{RawList()}</>
        <TableGrid></TableGrid>

        <>{FileUpload1()}</>
        <LoginPage sx={{ pt: 8 }} />
      </>
    </Provider>
  );
}

export default App;
