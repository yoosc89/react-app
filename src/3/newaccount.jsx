import axios from "axios";
import { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { FloatingInput } from "./style";

const CreateUser = (e) => {
  const params = {
    user_id: String(e.target.id.value),
    password1: String(e.target.pwd.value),
    password2: String(e.target.pwd2.value),
    email: String(e.target.email.value),
    phonenumber: String(e.target.phone.value),
    address1: String(e.target.address.value),
    address2: String(e.target.addressdetail.value),
  };
  console.log(params);
  axios
    .post("http://localhost:8000/api/user/create", params, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {})
    .catch((err) => alert(err.response.data.detail));
  return;
};

const NewAccount = () => {
  const [address, setAddress] = useState("");

  const PostCode = (data) => {
    setAddress(`${data.zonecode} ${data.jibunAddress}(${data.buildingName})`);
  };
  const [modal, setModal] = useState(false);

  return (
    <>
      <div class="mt-5 container ">
        <form
          action="/"
          class="d-grid gap-3 "
          onSubmit={(e) => {
            CreateUser(e);
          }}
        >
          <FloatingInput label="ID" name="id" type="text" requried={true} />
          <FloatingInput
            label="E-mail"
            name="email"
            type="email"
            requried={true}
          />
          <FloatingInput
            label="Password"
            name="pwd"
            type="password"
            required={true}
          />
          <FloatingInput
            label="Confirm Password"
            name="pwd2"
            type="password"
            required={true}
          />
          <FloatingInput
            label="Phone Number"
            name="phone"
            type="text"
            maxLength="11"
            required={true}
          />
          <FloatingInput
            label="Address"
            name="address"
            type="text"
            value={address}
            onFocus={() => {
              setModal(true);
            }}
            onClick={() => {
              setModal(true);
            }}
            readOnly
          />

          {modal === true ? (
            <div class="form-control shadow-sm">
              <DaumPostcode
                onComplete={PostCode}
                onClose={() => {
                  setModal(false);
                }}
              />
            </div>
          ) : null}
          <FloatingInput
            label="AddressDetail"
            name="addressdetail"
            type="text"
          />

          <input
            id="user_image"
            name="user_image"
            class="form-control form-control-lg"
            type="file"
            multiple
          />

          <button
            class="btn btn-outline-primary btn-lg shadow-sm"
            type="summit"
            action="/"
          >
            회원가입
          </button>
        </form>
      </div>
    </>
  );
};

export default NewAccount;
