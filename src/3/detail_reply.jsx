import { useState } from "react";
import { useParams } from "react-router-dom";
import { WriteReply } from "./sync";

const ReplyInput = (props) => {
  console.log(1);
  return (
    <>
      <form
        method="post"
        onSubmit={(e) => {
          WriteReply(props.num, e);
          props.reload(Math.random());
        }}
      >
        <textarea
          type="text"
          class="form-control mt-4"
          id="reply1"
          name="reply1"
          defaultValue={props.content}
          rows="3"
        />
        {props.user === localStorage.getItem("user_id") ||
        props.content === undefined ? (
          <button type="summit" class="btn btn-secondary mt-4 w-100 mb-4">
            {props.content === undefined ? "댓글작성" : "댓글수정"}
          </button>
        ) : null}
      </form>
    </>
  );
};

const ReplyListpage = (props) => {
  const answers = props.data.answers;
  console.log(answers);

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
              <div class="row pt-2 pb-2 ">
                <ReplyInput
                  content={answer.content}
                  user={answer.user.user_id}
                />
              </div>
            </div>
            <div></div>
          </>
        ))}
    </>
  );
};

const Reply = (props) => {
  const num = useParams();

  return (
    <>
      <ReplyInput num={num.id} />
      <ReplyListpage data={props.data} reload={props.reload} />
    </>
  );
};
export default Reply;
