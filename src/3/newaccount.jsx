import { useState } from "react";
import { Link } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";

const CreateUser = (e) => {
  alert([e.target.pwd.value, e.target.pwd2.value]);
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
      address: `${data.zonecode} ${data.jibunAddress},(${data.buildingName})`,
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
          <div class="form-floating">
            <input
              id="id"
              name="id"
              class="form-control form-control-lg shadow-sm"
              placeholder="ID"
              type="text"
              required
              value={input.id}
              onChange={(e) => {
                onChange(e);
              }}
            />
            <label for="id">ID</label>
          </div>
          <div class="form-floating">
            <input
              id="email"
              name="email"
              class="form-control form-control-lg shadow-sm"
              placeholder="E-mail"
              type="email"
              value={input.email}
              required
              onChange={(e) => {
                onChange(e);
              }}
            />
            <label for="email">E-mail</label>
          </div>
          <div class="form-floating">
            <input
              id="pwd"
              name="pwd"
              class="form-control form-control-lg shadow-sm"
              placeholder="PASSWORD"
              type="text"
              value={input.pwd}
              required
              onChange={(e) => {
                onChange(e);
              }}
            />
            <label for="pwd">Password</label>
          </div>
          <div class="form-floating">
            <input
              id="pwd2"
              name="pwd2"
              class="form-control form-control-lg shadow-sm"
              placeholder="Retry_PASSWORD"
              type="text"
              value={input.pwd2}
              required
              onChange={(e) => {
                onChange(e);
              }}
            />
            <label for="pwd2">Confirm Password </label>
          </div>
          <div class="form-floating">
            <input
              id="phone"
              name="phone"
              class="form-control form-control-lg shadow-sm"
              type="text"
              placeholder="Phone Number 010-0000-0000"
              maxLength="11"
              value={input.phone}
              required
              onChange={(e) => {
                onChange(e);
              }}
            />
            <label for="phone">Phone Number </label>
          </div>
          <div class="form-floating">
            <input
              id="address"
              name="address"
              class="form-control form-control-lg shadow-sm"
              type="text"
              placeholder="Search Address"
              value={input.address}
              onClick={() => {
                setModal(true);
              }}
              readOnly
            />
            <label for="address">Address</label>
          </div>
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
          <div class="form-floating">
            <input
              id="addressdetail"
              name="addressdetail"
              class="form-control form-control-lg shadow-sm"
              type="text"
              placeholder="Detail Address"
              value={input.addressdetail}
              onChange={(e) => {
                onChange(e);
              }}
            />
            <label for="addressdetail">AddressDetail</label>
          </div>
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
