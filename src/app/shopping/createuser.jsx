import { useState } from "react";
import { CreateuserInput } from "./style";
import DaumPostcode from "react-daum-postcode";
import { CreateConsumer, CreateSeller, ExistUser } from "./axios";
import "./scss/createuser.scss";

const CreateUser = () => {
  const [mode, setmode] = useState(false);
  const [Address, setAddress] = useState("");
  const [pwd1, setpwd1] = useState("");
  const [complete, setcomplete] = useState({
    user_id: false,
    user_name: false,
    password: false,
    passwordconfirm: false,
    email: false,
    phonenumber: false,
    regist_number: false,
    address: false,
    adrressdetail: false,
  });
  const [params, setparams] = useState({
    user_id: "",
    email: "1@2.as",
    phone_number: "",
    regist_number: "",
  });
  const [addressmodal, setaddressmodal] = useState(false);
  const PostCode = (data) => {
    setAddress(`${data.zonecode} ${data.jibunAddress}(${data.buildingName})`);
  };
  const inputcomplete = (e) => {
    const { name } = e.target;
    e.target.value
      ? setcomplete({ ...complete, [name]: 1 })
      : setcomplete({ ...complete, [name]: 0 });
  };
  const pwdconfirm = (e) => {
    e.target.value
      ? pwd1 === e.target.value
        ? setcomplete({ ...complete, passwordconfirm: 1 })
        : setcomplete({ ...complete, passwordconfirm: 2 })
      : setcomplete({ ...complete, passwordconfirm: 0 });
  };

  const existOnchange = (e) => {
    setparams({ ...params, [e.target.name]: e.target.value });
  };

  const existing = (e) => {
    e.target.value
      ? ExistUser(params, mode, (callback) => {
          callback
            ? setcomplete({ ...complete, [e.target.name]: 2 })
            : setcomplete({ ...complete, [e.target.name]: 1 });
        })
      : setcomplete({ ...complete, [e.target.name]: 0 });
  };

  const existingToggle = async (e) => {
    !mode ? existing(e) : existing(e);
  };

  return (
    <div class="d-grid row col-8 mx-auto mt10vh maxwidth600">
      <>
        <div class="text-center">
          <h2>회원가입({!mode ? "구매자용" : "판매자용"})</h2>
          <div class="form-check-center form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              name="mode"
              onChange={(e) => setmode(e.target.checked)}
            />
            <label class="form-check-label" for="mode">
              {!mode ? "구매자용" : "판매자용"}
            </label>
          </div>
        </div>
      </>
      <div>
        <form
          method="post"
          class="form-floating mt-3"
          onSubmit={(e) =>
            !mode
              ? CreateConsumer(e, (callback) => {})
              : CreateSeller(e, (callback) => {})
          }
        >
          <CreateuserInput
            name="user_id"
            label="아이디"
            type="text"
            onChange={existOnchange}
            onBlur={existingToggle}
            complete={complete.user_id}
          />
          <CreateuserInput
            name="user_name"
            label="이름"
            type="text"
            onBlur={inputcomplete}
            complete={complete.user_name}
          />
          <CreateuserInput
            name="password"
            type="password"
            label="비밀번호"
            onChange={(e) => setpwd1(e.target.value)}
            onBlur={inputcomplete}
            complete={complete.password}
          />
          <CreateuserInput
            name="passwordconfirm"
            type="password"
            label="비밀번호(재확인)"
            onBlur={pwdconfirm}
            complete={complete.passwordconfirm}
          />
          <CreateuserInput
            name="email"
            type="email"
            label="E-mail"
            onChange={existOnchange}
            onBlur={existingToggle}
            complete={complete.email}
          />
          <CreateuserInput
            name="phonenumber"
            type="number"
            label="연락처(휴대폰)"
            onChange={existOnchange}
            onBlur={existingToggle}
            complete={complete.phonenumber}
          />
          {!mode ? null : (
            <CreateuserInput
              name="regist_number"
              label="사업자번호"
              type="text"
              onChange={existOnchange}
              onBlur={existingToggle}
              complete={complete.regist_number}
            />
          )}
          <CreateuserInput
            name="address"
            label="주소"
            readOnly={true}
            value={Address}
            onClick={(e) => setaddressmodal(true)}
            onBlur={inputcomplete}
            complete={complete.address}
          />
          {addressmodal ? (
            <div class="mt-3 shadow">
              <DaumPostcode
                onComplete={PostCode}
                onClose={() => {
                  setaddressmodal(false);
                }}
              />
            </div>
          ) : null}
          {Address !== "" ? (
            <CreateuserInput
              name="adrressdetail"
              label="주소(상세)"
              type="text"
              onBlur={inputcomplete}
              complete={complete.adrressdetail}
            />
          ) : null}

          <div class="d-grid col-6 mx-auto mt-5 shadow">
            <button class="btn btn-primary">회원가입</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
