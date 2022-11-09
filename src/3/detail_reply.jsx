import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WriteReply } from "./sync";

const ReplyInput = (props) => {
  const [data, setdata] = useState([]);

  useEffect(() => setdata(props), [props]);

  return (
    <>
      <form
        method="post"
        onSubmit={(e) => {
          WriteReply(props.num, e);
          setTimeout(() => props.reload(Math.random()), 100);
          setdata({ content: "" });
        }}
      >
        <textarea
          type="text"
          class="form-control mt-4"
          id="reply1"
          name="reply1"
          value={data.content}
          onChange={(e) => setdata({ content: e.target.value })}
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
  const [newnaswers, setnewanswers] = useState([]);
  useEffect(() => {
    setnewanswers(props.data?.answers);
  }, [props]);
  return (
    <>
      {newnaswers.map((answer) => (
        <>
          <div class="row mt-2 pt-2 pb-2 text-bg-secondary">
            <div class="col text-start ms-3">{answer.user?.user_id}</div>
            <div class="col text-end me-3">
              작성 날짜 : {answer.create_date}
            </div>
          </div>
          <div class="row pt-2 pb-2 ">
            <ReplyInput
              content={answer.content}
              user={answer.user.user_id}
              reload={props.reload}
            />
          </div>
        </>
      ))}
    </>
  );
};

const Reply = (props) => {
  return (
    <>
      <ReplyInput num={props.id} reload={props.reload} />
      <ReplyListpage data={props.data} reload={props.reload} />
    </>
  );
};
export default Reply;
