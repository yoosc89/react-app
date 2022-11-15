import axios from "axios";

export const CreateConsumer = (data, callback) => {
  headers = {};
  params = {};
  url = ``;
  axios({
    method: "post",
    url: url,
    data: params,
    headers: headers,
  })
    .then((res) => {})
    .catch((err) => console.log(err))
    .finally((res) => {});
};
