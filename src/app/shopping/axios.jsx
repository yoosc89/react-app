import axios from "axios";
import { useState } from "react";

export const CreateConsumer = (e, callback) => {
  e.preventDefault();

  const headers = { "Content-Type": "application/json" };
  const params = {
    user_id: e.target.user_id.value,
    email: e.target.email.value,
    user_name: e.target.name.value,
    password1: e.target.password.value,
    password2: e.target.passwordconfirm.value,
    phone_number: e.target.phonenumber.value,
    address1: e.target.address.value,
    address2: e.target.adrressdetail.value,
    point: 0,
    cache: 0,
  };

  const url = `http://localhost:8000/api/shopping/consumer/create`;
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
    user_name: e.target.name.value,
    password1: e.target.password.value,
    password2: e.target.passwordconfirm.value,
    phone_number: e.target.phonenumber.value,
    regist_number: e.target.registnumber.value,
    address1: e.target.address.value,
    address2: e.target.adrressdetail.value,
    point: 0,
    cache: 0,
  };

  const url = `http://localhost:8000/api/shopping/seller/create`;
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
    url = "http://localhost:8000/api/shopping/consumer/existing";
  } else {
    url = "http://localhost:8000/api/shopping/seller/existing";
  }

  axios({
    method: "post",
    url: url,
    data: params,
    headers: headers,
  }).then((res) => callback(res.data.exist));
};
