import axios from "axios";

export const hosturl = "http://localhost:8000";

export const CreateConsumer = (e, callback) => {
  e.preventDefault();

  const headers = { "Content-Type": "application/json" };
  const params = {
    user_id: e.target.user_id.value,
    email: e.target.email.value,
    user_name: e.target.user_name.value,
    password1: e.target.password.value,
    password2: e.target.passwordconfirm.value,
    phone_number: e.target.phonenumber.value,
    address1: e.target.address.value,
    address2: e.target.adrressdetail.value,
    point: 0,
    cache: 0,
  };

  const url = `${hosturl}/api/shopping/consumer/create`;
  axios({
    method: "post",
    url: url,
    data: params,
    headers: headers,
  })
    .then((res) => callback(res.data))
    .catch((err) => {
      alert(err.response.data.detail);
      callback(err);
    })
    .finally((res) => callback(res.data));
};

export const CreateSeller = (e, callback) => {
  e.preventDefault();

  const headers = { "Content-Type": "application/json" };
  const params = {
    user_id: e.target.user_id.value,
    email: e.target.email.value,
    user_name: e.target.user_name.value,
    password1: e.target.password.value,
    password2: e.target.passwordconfirm.value,
    phone_number: e.target.phonenumber.value,
    regist_number: e.target.regist_number.value,
    address1: e.target.address.value,
    address2: e.target.adrressdetail.value,
    point: 0,
    cache: 0,
  };

  const url = `${hosturl}/api/shopping/seller/create`;
  axios({
    method: "post",
    url: url,
    data: params,
    headers: headers,
  })
    .then((res) => callback(res.data))
    .catch((err) => {
      alert(err.response.data.detail);
      callback(err);
    })
    .finally((res) => callback(res.data));
};

export const ExistUser = (params, mode, callback) => {
  let url = ``;
  console.log(params);
  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
  };
  if (!mode) {
    url = `${hosturl}/api/shopping/consumer/existing`;
  } else {
    url = `${hosturl}/api/shopping/seller/existing`;
  }

  axios({
    method: "post",
    url: url,
    data: params,
    headers: headers,
  }).then((res) => callback(res.data.exist));
};

export const Loginfastapi = (e, mode) => {
  const params = {
    username: e.target.id.value,
    password: e.target.password.value,
  };

  const url = !mode
    ? `${hosturl}/api/shopping/consumer/login`
    : `${hosturl}/api/shopping/seller/login`;

  const headers = {
    accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  };
  axios({
    method: "post",
    url: url,
    data: params,
    headers: headers,
  })
    .then((res) => {
      localStorage.setItem("user_id", res.data.user_id);
      localStorage.setItem("access_token", res.data.access_token);
    })
    .catch((err) => console.log(err.data));
};
