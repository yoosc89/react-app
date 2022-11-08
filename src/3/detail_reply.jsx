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
          <div class="mt-4">
            <div>
              <textarea
                type="text"
                class="form-control"
                defaultValue={answer.content}
                rows="2"
                maxLength={10}
                readOnly={true}
              />
            </div>
            <div class=" text-sm-end fs-6">
              <a>작성 날짜 : {answer.create_date}</a>
            </div>
          </div>
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
