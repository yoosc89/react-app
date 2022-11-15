import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export const MenuItems = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.Reload.RLset);
  const [load, reload] = useState(0.0);

  useEffect(() => {
    reload(selector);
  }, [selector]);

  return (
    <>
      <nav class="navbar navbar-expand-lg bg-primary fixed-top">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggler"
            aria-controls="#navbarToggler"
            aria-expanded="true"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <a class="navbar-brand">
            <Link to="/" class="text-decoration-none text-bg-primary">
              {localStorage.getItem("islogin") && true
                ? localStorage.getItem("user_id")
                : "(끄덕)"}
            </Link>
          </a>

          <div class="collapse navbar-collapse" id="navbarToggler">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              {localStorage.getItem("islogin") && true ? null : (
                <>
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page">
                      <Link
                        to="/newaccount"
                        class="text-decoration-none text-bg-primary"
                      >
                        회원가입
                      </Link>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page">
                      <Link
                        to="/searchaccoute"
                        class="text-decoration-none text-bg-primary"
                      >
                        계정찾기
                      </Link>
                    </a>
                  </li>
                </>
              )}
              <li class="nav-item">
                <a class="nav-link active" aria-current="page">
                  {localStorage.getItem("islogin") && true ? (
                    <Link
                      to="/"
                      class="text-decoration-none text-bg-primary"
                      onClick={() => {
                        localStorage.clear();
                        dispatch({ typeof: "RLset" });
                      }}
                    >
                      로그아웃
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      class="text-decoration-none text-bg-primary"
                    >
                      로그인
                    </Link>
                  )}
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link active  text-bg-primary" aria-current="page">
                  <Link
                    to="/contents/0"
                    class="text-decoration-none text-bg-primary"
                  >
                    게시판
                  </Link>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link active  text-bg-primary" aria-current="page">
                  <Link
                    to="/shopping/createuser"
                    class="text-decoration-none text-bg-primary"
                  >
                    쇼핑회원가입
                  </Link>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div>&nbsp;</div>
    </>
  );
};

export default MenuItems;
