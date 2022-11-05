import { Link } from "react-router-dom";
import { useState } from "react";

const LoginState = () => {
  return (
    <div class="mt-5 mb-5 text-center h1">
      <Link to="/login" class="text-decoration-none">
        로그인을 하라
      </Link>
    </div>
  );
};

const MainBody = () => {
  const [text, setText] = useState({
    title: "이것은 메인 페이지다.",
    context: "왜냐하면 이것은 메인 페이지이기 때문이다.(끄덕)",
  });
  return (
    <>
      <LoginState />
      <div>
        <figure class="text-center">
          <blockquote class="blockquote">
            <p>{text.title}</p>
          </blockquote>
          <figcaption class="blockquote-footer">{text.context}</figcaption>
        </figure>
      </div>
    </>
  );
};

const MainPage = () => {
  return (
    <div>
      <MainBody />
    </div>
  );
};

export default MainPage;
