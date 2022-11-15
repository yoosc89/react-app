import { useState } from "react";
import { CreateuserInput } from "./style";
import DaumPostcode from "react-daum-postcode";

const CreateUser = () => {
  const [mode, setmode] = useState(false);
  const [Address, setAddress] = useState("");
  const [pwd1, setpwd1] = useState("");
  const [complete, setcomplete] = useState({
    ID: false,
    NAME: false,
    PASSWORD: false,
    PASSWORDCONFIRM: false,
    EMAIL: false,
    PHONENUMBER: false,
    REGISTNUMBER: false,
    ADRRESS: false,
    ADDRESSDETAIL: false,
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
    pwd1 === e.target.value
      ? setcomplete({ ...complete, PASSWORDCONFIRM: 1 })
      : setcomplete({ ...complete, PASSWORDCONFIRM: 2 });
  };

  return (
    <div class="d-grid row col-8 mx-auto">
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
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <CreateuserInput
            name="ID"
            type="text"
            onBlur={inputcomplete}
            complete={complete.ID}
          />
          <CreateuserInput
            name="NAME"
            type="text"
            onBlur={inputcomplete}
            complete={complete.NAME}
          />
          <CreateuserInput
            name="PASSWORD"
            type="password"
            onChange={(e) => setpwd1(e.target.value)}
            onBlur={inputcomplete}
            complete={complete.PASSWORD}
          />
          <CreateuserInput
            name="PASSWORDCONFIRM"
            type="password"
            onBlur={pwdconfirm}
            complete={complete.PASSWORDCONFIRM}
          />
          <CreateuserInput
            name="EMAIL"
            type="email"
            onBlur={inputcomplete}
            complete={complete.EMAIL}
          />
          <CreateuserInput
            name="PHONENUMBER"
            type="number"
            onBlur={inputcomplete}
            complete={complete.PHONENUMBER}
          />
          {!mode ? null : (
            <CreateuserInput
              name="REGISTNUMBER"
              type="text"
              onBlur={inputcomplete}
              complete={complete.REGISTNUMBER}
            />
          )}
          <CreateuserInput
            name="ADRRESS"
            readOnly={true}
            value={Address}
            onClick={(e) => setaddressmodal(true)}
            onBlur={inputcomplete}
            complete={complete.ADRRESS}
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
              name="ADRRESSDETAIL"
              type="text"
              onBlur={inputcomplete}
              complete={complete.ADRRESSDETAIL}
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
