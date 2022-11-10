import { useEffect, useState } from "react";
import { WriteReply, ModifyReply, Deletereply } from "./sync";

const ReplyList = (props) => {
  const [data, setdata] = useState([]);
  const [del, setdel] = useState(false);
  useEffect(() => setdata(props.data), [props]);

  return (
    <>
      <form
        method="post"
        onSubmit={(e) => {
          del ? Deletereply(e, props.data?.id) : ModifyReply(e, props.data?.id);
          setTimeout(() => props.reload(Math.random()), 100);
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
        {props.data.user?.user_id === localStorage.getItem("user_id") ? (
          <>
            <button
              type="submit"
              class="btn btn-secondary mt-4 w-75 mb-4"
              onClick={() => {
                setdel(false);
              }}
            >
              댓글수정
            </button>
            <button
              type="summit"
              class="btn btn-warning mt-4 w-25 mb-4"
              onClick={() => setdel(true)}
            >
              삭제
            </button>
          </>
        ) : null}
      </form>
    </>
  );
};

const ReplyListpage = (props) => {
  const [newnaswers, setnewanswers] = useState([]);

  useEffect(() => {
    setnewanswers(props.data?.data);
  }, [props]);

  return (
    <>
      {newnaswers &&
        newnaswers.map((answer) => (
          <>
            <div class="row mt-2 pt-2 pb-2 text-bg-secondary">
              <div class="col text-start ms-3">{answer.user?.user_id}</div>
              <div class="col text-end me-3">
                작성 날짜 : {answer.create_date}
              </div>
            </div>
            <div class="row pt-2 pb-2 ">
              <ReplyList data={answer} reload={props.relaod} />
            </div>
          </>
        ))}
    </>
  );
};

const ReplyInput = (props) => {
  const [data, setdata] = useState([]);

  return (
    <>
      <form
        method="post"
        onSubmit={(e) => {
          WriteReply(props.Qid, e);
          setdata({ content: "" });
          setTimeout(() => props.reload(Math.random()), 100);
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

        <button type="summit" class="btn btn-secondary mt-4 w-100 mb-4">
          댓글작성
        </button>
      </form>
    </>
  );
};

const Reply = (props) => {
  const [newprops, setprops] = useState([]);
  useEffect(() => {
    setprops(props);
  }, [props]);

  return (
    <>
      <ReplyInput Qid={newprops.Qid} reload={props.reload} />
      <ReplyListpage data={newprops} reload={props.reload} />
    </>
  );
};
export default Reply;
