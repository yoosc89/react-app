import axios from "axios";
import { useEffect, useState } from "react";

export const ReplyList = (id, load) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/question/list/detail/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {});
  }, [id, load]);

  return data;
};

export const ContentList = (load) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/question/list`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {});
  }, [load]);
  return data;
};

export const WriteReply = (num, e) => {
  e.preventDefault();

  const params = { content: e.target.reply1.value };

  axios
    .post(`http://localhost:8000/api/answer/answer_create/${num}`, params, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then((res) => {
      window.location.reload();
    })
    .catch((err) => {});
};

export const Loginsystem = (e) => {
  e.preventDefault();

  axios
    .post(
      "http://localhost:8000/api/user/login",
      { username: e.target.id.value, password: e.target.pwd.value },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((res) => {
      localStorage.clear();
      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("user_id", res.data.user_id);
      localStorage.setItem("token_type", res.data.token_type);
      localStorage.setItem("islogin", true);
    })
    .then(() => {
      window.location.replace("/");
    })
    .catch((err) => {});
};

export const LastPageNumber = () => {
  const [data, setData] = useState(0);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/contents/lastnumber`)
      .then((res) => setData(res.data))
      .catch((err) => {});
  }, []);

  return data;
};

export const CreatePost = (e) => {
  e.preventDefault();

  const params = {
    subject: e.target.Input1.value,
    content: e.target.Textarea1.value,
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("access_token"),
  };

  axios
    .post("http://localhost:8000/api/question/create", params, {
      headers: headers,
    })
    .then((res) => {})
    .catch((err) => {
      console.log(err);
    });
};

export const ModifyPost = (e, id) => {
  e.preventDefault();
  console.log(e.target);
  const params = {
    question_id: id,
    subject: e.target.postsubject.value,
    content: e.target.postcontent.value,
  };
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("access_token"),
    "Content-Type": "application/json",
  };
  axios
    .post("http://localhost:8000/api/question/update", params, {
      headers: headers,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
};

const sync = () => {
  return;
};

export default sync;
