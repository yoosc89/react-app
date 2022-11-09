import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Reply from "./detail_reply";
import { CreatePost, ReplyList, ModifyPost } from "./sync";

const Detail = (props) => {
  const writeSet = useSelector((state) => state.contentWriteBoolean.CWBool);
  const { data } = props;

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
          userauth(data) ? CreatePost(e) : ModifyPost(e, data.id);
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
              <button class="mt-3 btn btn-secondary w-100" type="submit">
                글쓰기
              </button>
            ) : data.user &&
              data.user.user_id === localStorage.getItem("user_id") ? (
              <button class="mt-3 btn btn-secondary w-100" type="submit">
                수정하기
              </button>
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
  const data = ReplyList(props.id);

  return (
    <>
      <div>
        <Detail data={data} reload={props.reload} />
      </div>
      <div>
        {replyview && true ? (
          <Reply id={props.id} data={data} reload={props.reload} />
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
