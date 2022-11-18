import axios from "axios";
import { useState, useEffect } from "react";

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

export const Loginfastapi = (e, mode, callback) => {
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
      localStorage.setItem("mode", res.data.mode);
      localStorage.setItem("islogin", true);
    })
    .catch((err) => console.log(err.data))
    .finally(() => callback());
};

export const AxiosProductList = (load, page = 0, size = 10) => {
  const [data, setdata] = useState([]);
  const url = `${hosturl}/api/shopping/product/list`;
  const params = { page: page, size: size };
  const headers = { accept: "application/json" };

  useEffect(() => {
    axios({
      method: "get",
      url: url,
      data: params,
      headers: headers,
    })
      .then((res) => setdata(res.data))
      .catch((err) => {})
      .finally(() => {});
  }, [load, page, size]);

  return data;
};

export const AxoisProductDetail = (id) => {
  const [data, setData] = useState([]);
  const url = `${hosturl}/api/shopping/product/list/detail/${id}`;
  const headers = { accept: "application/json" };

  useEffect(() => {
    axios({
      method: "get",
      url: url,
      headers: headers,
    })
      .then((res) => setData(res.data))
      .catch((err) => {
        console.log(err.data);
      })
      .finally(() => {});
  }, [id]);

  return data;
};

export const AxiosProductCreate = (e, callback) => {
  const url = `${hosturl}/api/shopping/product/create`;
  const params = {
    item_name: e.target.item_name.value,
    item_content: e.target.item_content.value,
    cache: Number(e.target.cache.value),
    discount: Number(e.target.discount.value),
    shipping_fee: Number(e.target.shipping_fee.value),
  };
  const headers = {
    accept: "application/json",
    Authorization: "Bearer " + localStorage.getItem("access_token"),
    "Content-Type": "application/json",
  };
  axios({
    method: "post",
    url: url,
    data: params,
    headers: headers,
  })
    .then((res) => callback(res.data))
    .catch((err) => {})
    .finally(() => callback());
};
