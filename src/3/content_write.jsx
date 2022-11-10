import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Reply from "./detail_reply";
import { CreatePost, ReplyList, ModifyPost, Deletepost } from "./sync";

const Detail = (props) => {
  const writeSet = useSelector((state) => state.contentWriteBoolean.CWBool);
  const [submit, setsubmit] = useState(0);
  const { data } = props;
  console.log(submit);
  const [newdata, setnewdata] = useState({
    subject: "",
    content: "",
  });

  useEffect(() => {
    setnewdata(data);
  }, [data]);

  const userauth = (data) => {
    return data !== undefined
      ? writeSet === false
        ? data.user && data.user.user_id === localStorage.getItem("user_id")
          ? false
          : true
        : false
      : false;
  };

  return (
    <>
      <form
        method="post"
        class="mb-3"
        onSubmit={(e) => {
          submit === 0
            ? CreatePost(e)
            : submit === 1
            ? ModifyPost(e, data.id)
            : Deletepost(e, data.id);

          setnewdata({ subject: "", content: "" });
          setTimeout(() => props.reload(Math.random()), 100);
        }}
      >
        <div class="mb-3">
          <div class=" text-bg-secondary p-2 text-sm-center">제목</div>
          <input
            type="text"
            class="form-control mt-3"
            id="postsubject"
            name="postsubject"
            placeholder="Subject"
            value={newdata.subject}
            onChange={(e) => setnewdata({ subject: e.target.value })}
            /* readOnly={userauth(newdata.subject)} */
          ></input>
        </div>
        <div class="mb-3">
          <div class=" text-bg-secondary p-2 text-sm-center">내용</div>
          <textarea
            class="form-control mt-3"
            id="postcontent"
            name="postcontent"
            rows="3"
            maxLength={200}
            value={newdata.content}
            onChange={(e) => setnewdata({ content: e.target.value })}
            /* readOnly={userauth(newdata.content)} */
          ></textarea>
          {writeSet === false ? (
            data.user?.user_id === undefined ? (
              <button
                class="mt-3 btn btn-secondary w-100"
                type="submit"
                onClick={() => setsubmit(0)}
              >
                글쓰기
              </button>
            ) : data.user &&
              data.user.user_id === localStorage.getItem("user_id") ? (
              <>
                <button
                  class="mt-3 btn btn-secondary w-75"
                  type="submit"
                  onClick={() => setsubmit(1)}
                >
                  수정하기
                </button>
                <button
                  class="mt-3 btn btn-warning w-25"
                  type="submit"
                  onClick={() => setsubmit(2)}
                >
                  삭제
                </button>
              </>
            ) : null
          ) : null}
        </div>
      </form>
    </>
  );
};

const ContentPage = (props) => {
  const replyview = useSelector((state) => state.DetialReplyview.DRVset);
  const dispatch = useDispatch();
  const data = ReplyList(props.Qid);
  const replylist = props.answers;
  const [newdata, setnewData] = useState([]);
  useEffect(() => setnewData(data), [data]);

  return (
    <>
      <div>
        <Detail data={data} reload={props.reload} />
      </div>
      <div>
        {replyview && true ? (
          <Reply Qid={props.Qid} data={replylist} reload={props.reload} />
        ) : null}
      </div>
      <div class="justify-content-center">
        {replyview && true ? (
          <button
            type="button"
            class="btn btn-outline-primary"
            onClick={() => {
              dispatch({ type: "DRVsetFalse" });
            }}
          >
            댓글닫기
          </button>
        ) : (
          <button
            type="button"
            class="btn btn-outline-primary"
            onClick={() => {
              dispatch({ type: "DRVsetTrue" });
              setTimeout(() => props.reload(Math.random()), 100);
            }}
          >
            댓글보기
          </button>
        )}
      </div>
    </>
  );
};

export default ContentPage;
