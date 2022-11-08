import axios from "axios";
import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FloatingInput } from "./style";

const PreviousPage = () => {
  const navigate = useNavigate();
  navigate(-1);
};

const Loginsystem = (e) => {
  e.preventDefault();

  axios
    .post(
      "http://localhost:8000/api/user/login",
      { username: e.target.id.value, password: e.target.pwd.value },
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    )
    .then((res) => {
      localStorage.clear();
      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("user_id", res.data.user_id);
      localStorage.setItem("islogin", true);
    })
    .then(() => {
      window.location.replace("/");
    })
    .catch((err) => console.log(err));

  return;
};

const LoginPage = () => {
  const [input, setInput] = useState({ id: "", pwd: "" });

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  return (
    <>
      <form
        class="container  mt-5 d-grid gap-4 rounded"
        onSubmit={(e) => {
          Loginsystem(e);
        }}
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
    </>
  );
};

export default LoginPage;
