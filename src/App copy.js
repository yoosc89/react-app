import "./App.css";
import LoginPage from "./1/login_name";
import LoginPage2 from "./1/login";
import imageCard from "./1/image_card";
import thumnail from "./1/thumnail_card";

function App() {
  return (
    <div>
      <div class="border">{LoginPage()}</div>
      <div class="border">{LoginPage2()}</div>
      <div class="border">{imageCard()}</div>
      <div class="border">{thumnail()}</div>
    </div>
  );
}

export default App;
