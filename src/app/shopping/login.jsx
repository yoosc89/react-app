import { useState } from "react";
import "./scss/login.scss";
import { Loginfastapi } from "./axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [mode, setmode] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div class="backimg wrapper">
        &nbsp;
        <div class="mt200 justify-content-center row">
          <div class="col-6 justify-content-center m-5 rounded-4 bgwh08 shadow minheight">
            <div class="justify-content-center m-5">
              <div class=" text-center">
                <p class="h1 text-decoration-none text-black">L O G I N</p>
                <p class="h5">{!mode ? "- CONSUMER -" : "- Seller -"}</p>
              </div>

              <form
                method="post"
                onSubmit={(e) => {
                  e.preventDefault();
                  Loginfastapi(e, mode, () => {
                    navigate("/");
                  });
                }}
              >
                <div class="mt50 form-floating">
                  <input
                    class="form-control"
                    name="id"
                    type="text"
                    placeholder=" "
                    required
                  />
                  <label for="id">아이디</label>
                </div>
                <div class="mt50 form-floating">
                  <input
                    class="form-control"
                    name="password"
                    type="passowrd"
                    placeholder=" "
                    required
                  />
                  <label for="password">패스워드</label>
                </div>
                <div class="form-switch form-check mt50 ms-3">
                  <input
                    type="checkbox"
                    class="form-check-input text13rem"
                    name="checkmode"
                    onChange={(e) => {
                      setmode(e.target.checked);
                    }}
                  />
                  <label
                    for="checkmode"
                    class="form-check-label text13rem ms-2"
                  >
                    {!mode ? "구매자 로그인" : "판매자 로그인"}
                  </label>
                </div>
                <div class="mt50">
                  <button
                    class="btn btn-outline-primary w-100 h50 text14rem"
                    type="submit"
                  >
                    로그인
                  </button>
                </div>
              </form>
              <div class="row mt-3">
                <div class="col m-2">비밀번호 찾기</div>
                <div class="col m-2 text-end">계정 생성</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
