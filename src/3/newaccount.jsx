import { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { FloatingInput } from "./style";

const CreateUser = (e) => {
  return;
};

const NewAccount = () => {
  const [input, setInput] = useState({
    id: "",
    pwd: "",
    pwd2: "",
    email: "",
    phone: "",
    address: "",
    addressdetail: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const PostCode = (data) => {
    setInput({
      address: `${data.zonecode} ${data.jibunAddress}(${data.buildingName})`,
    });
  };
  const [modal, setModal] = useState(false);

  return (
    <>
      <div class="mt-5 container ">
        <form
          class="d-grid gap-3 "
          onSubmit={(e) => {
            CreateUser(e);
          }}
        >
          <FloatingInput
            label="ID"
            name="id"
            type="text"
            value={input.id}
            requried={true}
            onChange={(e) => {
              onChange(e);
            }}
          />
          <FloatingInput
            label="E-mail"
            name="email"
            type="email"
            value={input.email}
            requried={true}
            onChange={(e) => {
              onChange(e);
            }}
          />
          <FloatingInput
            label="Password"
            name="pwd"
            type="password"
            value={input.pwd}
            required={true}
            onChange={(e) => {
              onChange(e);
            }}
          />
          <FloatingInput
            label="Confirm Password"
            name="pwd2"
            type="password"
            value={input.pwd2}
            required={true}
            onChange={(e) => {
              onChange(e);
            }}
          />
          <FloatingInput
            label="Phone Number"
            name="phone"
            type="text"
            maxLength="11"
            required={true}
            onChange={(e) => {
              onChange(e);
            }}
          />
          <FloatingInput
            label="Address"
            name="address"
            type="text"
            value={input.address}
            onClick={(e) => {
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
            value={input.addressdetail}
            onChange={(e) => {
              onChange(e);
            }}
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
