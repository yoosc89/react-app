import "./App.css";
import Pagetable from "./2/table";
import RawList from "./2/rawlist";
import slidePage from "./2/slide";
import Writer from "./2/write";
import imageCard from "./1/image_card";
import LoginPage from "./1/login_name";
import thumNail from "./1/thumnail_card";
import useScrollSnap from "react-use-scroll-snap";
import React, { useRef } from "react";
import FileUpload1 from "./2/fileupload";

function App() {
  const scrollRef = useRef(null);
  useScrollSnap({ ref: scrollRef, duration: 200, delay: 100 });
  return (
    <div>
      <div ref={scrollRef}>{thumNail()}</div>
      <div ref={scrollRef}>{imageCard()}</div>

      <div ref={scrollRef}>{slidePage()}</div>
      <Pagetable ref={scrollRef} sx={{ pt: 8 }} />
      <RawList ref={scrollRef} sx={{ pt: 8 }} />
      <Writer ref={scrollRef} sx={{ pt: 8 }} />
      <div>{FileUpload1()}</div>
      <LoginPage ref={scrollRef} sx={{ pt: 8 }} />
    </div>
  );
}

export default App;
