import { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { FloatingInput } from "./style";
import { CreateUser } from "./sync";

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
          method="post"
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
          >
            회원가입
          </button>
        </form>
      </div>
    </>
  );
};

export default NewAccount;
