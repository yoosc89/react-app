import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const SearchTitle = () => {
  return (
    <div class="mt-5 mb-5 text-center h1">
      <Link to="/" class="text-decoration-none">
        비밀번호 찾기다
      </Link>
    </div>
  );
};

const SearchAccoute = () => {
  const [text, setText] = useState({
    title: "이것은 비밀번호 찾기 페이지다.",
    context: "왜냐하면 이것은 비밀번호를 찾기 때문이다.",
  });
  return (
    <>
      <SearchTitle />
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

export default SearchAccoute;
