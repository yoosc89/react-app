import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const WriteReply = (num, e) => {
  e.preventDefault();

  const params = { content: e.target.reply1.value };

  axios
    .post(`http://localhost:8000/api/answer/answer_create/${num}`, params, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {})
    .catch((err) => {});
};

const ReplyInput = (props) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  return (
    <div>
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
    </div>
  );
};

const ReplyListpage = ({ data }) => {
  const answers = data.answers;
  return (
    <div>
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
    </div>
  );
};

const Reply = ({ data }) => {
  const num = useParams();
  return (
    <div>
      <div>
        <ReplyInput num={num.id} />
        <ReplyListpage data={data} />
      </div>
    </div>
  );
};
export default Reply;
