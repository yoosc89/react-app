import { useDispatch, useSelector } from "react-redux";
import Reply from "./detail_reply";
import { CreatePost, ReplyList, ModifyPost } from "./sync";

const Detail = (props) => {
  const writeSet = useSelector((state) => state.contentWriteBoolean.CWBool);
  const userauth = (props) => {
    const result =
      props !== undefined
        ? writeSet !== true
          ? props.data.user.user_id === localStorage.getItem("user_id")
            ? true
            : false
          : false
        : false;
  };
  return (
    <>
      <form
        method="post"
        class="mb-3"
        onSubmit={(e) => {
          userauth ? ModifyPost(e, props.data.id) : CreatePost(e);
          props.reload(Math.random());
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
            defaultValue={props.data === undefined ? "" : props.data.subject}
            readOnly={!userauth(props)}
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
            defaultValue={props.data === undefined ? "" : props.data.content}
            readOnly={!userauth(props)}
          ></textarea>
          {writeSet === false ? (
            props.data === undefined ? (
              <button class="mt-3 btn btn-secondary w-100" type="submit">
                "글쓰기"
              </button>
            ) : props.data.user &&
              props.data.user.user_id === localStorage.getItem("user_id") ? (
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
  const writeSet = useSelector((state) => state.contentWriteBoolean.CWBool);
  const dispatch = useDispatch();
  const data = ReplyList(props.id);

  return (
    <>
      <div>
        <Detail data={data} reload={props.reload} />
      </div>
      <div>
        {replyview && true ? <Reply data={data} reload={props.reload} /> : null}
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
