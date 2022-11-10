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

export const ContentList = (load, page = 0, size = 10) => {
  const [data, setData] = useState([]);
  const params = { page: Number(page), size: Number(size) };

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/question/list`,
        { params },
        {
          headers: { accept: "application/json" },
        }
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {});
  }, [load, page, size]);

  return data;
};

export const WriteReply = (question_id, e) => {
  e.preventDefault();

  const params = { content: e.target.reply1.value };

  axios
    .post(
      `http://localhost:8000/api/answer/answer_create/${question_id}`,
      params,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    )
    .then((res) => {})
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
    subject: e.target.postsubject.value,
    content: e.target.postcontent.value,
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

  return;
};

export const ModifyPost = (e, id) => {
  e.preventDefault();

  const params = {
    question_id: id,
    subject: e.target.postsubject.value,
    content: e.target.postcontent.value,
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("access_token"),
  };

  axios
    .put("http://localhost:8000/api/question/update", params, {
      headers: headers,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
};

export const ModifyReply = (e, id) => {
  e.preventDefault();

  const params = {
    answer_id: id,
    content: e.target.reply1.value,
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("access_token"),
  };

  axios
    .put("http://localhost:8000/api/answer/update", params, {
      headers: headers,
    })
    .then((res) => {})
    .catch((err) => console.log(err));
};

const sync = () => {
  return;
};

export const Deletepost = (e, id) => {
  e.preventDefault();
  if (window.confirm("삭제하시겠습니까?")) {
    const params = { question_id: id };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };

    axios
      .delete(
        "http://localhost:8000/api/question/delete",
        { params },
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export const Getreply = (id, load) => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/answer/detail/${id}`)
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) => {});
  }, [id, load]);

  return data;
};

export const Deletereply = (e, id) => {
  e.preventDefault();
  if (window.confirm("삭제하시겠습니까?")) {
    const params = { answer_id: id };

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    };

    axios
      .delete("http://localhost:8000/api/answer/delete", params, {
        headers: headers,
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }
};

export default sync;
