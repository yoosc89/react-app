import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, batch } from "react-redux";
import { ReplyList } from "./content_write";

const WriteReply = (num, e) => {
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
      ReplyList(null, Math.random());
    })
    .catch((err) => {});
};

const ReplyInput = (props) => {
  const [value, setValue] = useState("");

  return (
    <>
      <form
        method="post"
        onSubmit={(e) => {
          WriteReply(props.num, e);
          setValue("");
        }}
      >
        <textarea
          type="text"
          class="form-control mt-4"
          id="reply1"
          name="reply1"
          value={value}
          rows="3"
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="summit" class="btn btn-primary mt-4 w-100 b">
          보내기
        </button>
      </form>
    </>
  );
};

const ReplyListpage = ({ data }) => {
  const answers = data.answers;

  return (
    <>
      {answers &&
        answers.map((answer) => (
          <>
            <div class="row mt-2 pt-2 pb-2 text-bg-secondary">
              <div class="col text-start ms-3">{answer.user.user_id}</div>
              <div class="col text-end me-3">
                작성 날짜 : {answer.create_date}
              </div>
            </div>
            <div class="">
              <div class="row ms-3 pt-2 pb-2 ">{answer.content}</div>
            </div>
          </>
        ))}
    </>
  );
};

const Reply = ({ data }) => {
  const num = useParams();
  return (
    <>
      <ReplyInput num={num.id} />
      <ReplyListpage data={data} />
    </>
  );
};
export default Reply;
