import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { FloatingInput } from "./style";

const Loginsystem = (e) => {
  alert(e.target.id.value);

  return;
};

const LoginPage = () => {
  const [input, setInput] = useState({ id: "", pwd: "" });

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  return (
    <Fragment>
      <div>
        <form
          class="container  mt-5 d-grid gap-4 rounded"
          onSubmit={(e) => {
            Loginsystem(e);
          }}
          action="/"
          method="post"
        >
          <FloatingInput
            name="id"
            value={input.id}
            onChange={onChange}
            required={true}
            label="ID"
            type="text"
          />
          <FloatingInput
            name="pwd"
            value={input.pwd}
            onChange={onChange}
            required={true}
            label="Password"
            type="password"
          />
          <button class="shadow btn btn-outline-primary btn-lg" type="summit">
            로그인
          </button>
        </form>
        <Link
          class="container mt-4 d-grid text-decoration-none"
          to="/searchaccoute"
        >
          <button class="shadow btn btn-outline-primary btn-lg">
            비밀번호를 잊어 버렸는가? 이것은 비밀번호 찾기다 (끄덕)
          </button>
        </Link>
        <Link
          class="container mt-4 d-grid gap-3 text-decoration-none"
          to="/newaccount"
        >
          <button class="shadow btn btn-outline-primary btn-lg animate__slideInUp">
            회원가입
          </button>
        </Link>
      </div>
    </Fragment>
  );
};

export default LoginPage;
