import "./scss/login.scss";

const Login = () => {
  return (
    <>
      <div class="backimg wrapper">
        &nbsp;
        <div class="mt200 justify-content-center row">
          <div class="col-6 justify-content-center m-5 rounded-4 bgwh08 shadow minheight">
            <div class="justify-content-center m-5">
              <div class=" text-center">
                <p class="h1 text-decoration-none text-black">L O G I N</p>
              </div>
              <div class="">
                <div class="mt50 form-floating">
                  <input
                    class="form-control"
                    name="id"
                    type="id"
                    placeholder=" "
                  />
                  <label for="id">아이디</label>
                </div>
                <div class="mt50 form-floating">
                  <input
                    class="form-control"
                    name="id"
                    type="id"
                    placeholder=" "
                  />
                  <label for="id">패스워드</label>
                </div>
                <div class="mt50">
                  <button class="btn btn-outline-primary w-100 h50 text12rem">
                    로그인
                  </button>
                </div>
                <div class="row mt-3">
                  <div class="col m-2">비밀번호 찾기</div>
                  <div class="col m-2 text-end">계정 생성</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
