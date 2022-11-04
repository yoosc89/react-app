import React, { Fragment, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import "animate.css";

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
          <div class="form-floating">
            <input
              id="id"
              name="id"
              className="id"
              type="text"
              class="form-control shadow form-control-lg "
              placeholder="id"
              value={input.id}
              onChange={onChange}
              required
            />
            <label for="id">ID</label>
          </div>
          <div class="form-floating">
            <input
              id="pwd"
              name="pwd"
              className="pwd"
              type="password"
              class="form-control shadow form-control-lg"
              placeholder="pwd"
              value={input.pwd}
              onChange={onChange}
              required
            />
            <label for="pwd">Password</label>
          </div>
          <button class="shadow btn btn-outline-primary btn-lg" type="summit">
            로그인
          </button>
        </form>
        <Link
          class="container mt-4 d-grid text-decoration-none"
          to="/searchaccoute"
        >
          <button class="shadow btn btn-outline-primary btn-lg">
            비밀번호를 잊어 버렸는가? 이것은 비밀번호 찾기다
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
