import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Reply from "./detail_reply";
import { CreatePost, ReplyList } from "./sync";

const Detail = ({ data }) => {
  const writeSet = useSelector((state) => state.contentWriteBoolean.CWBool);

  return (
    <>
      <form
        class="mb-3"
        onSubmit={(e) => {
          CreatePost(e);
        }}
      >
        <div class="mb-3">
          <label for="Input1" class="form-label">
            제목 :
          </label>
          <input
            type="text"
            class="form-control"
            id="Input1"
            name="Input1"
            placeholder="Subject"
            defaultValue={data === undefined ? "" : data.subject}
            readOnly={writeSet}
          ></input>
        </div>
        <div class="mb-3">
          <label for="Textarea1" class="form-label">
            본문 :
          </label>
          <textarea
            class="form-control"
            id="Textarea1"
            name="Textarea1"
            rows="3"
            maxLength={200}
            defaultValue={data === undefined ? "" : data.content}
            readOnly={writeSet}
          ></textarea>
          {writeSet && true ? null : (
            <button class="mt-3 btn btn-primary w-100" type="submit">
              글쓰기
            </button>
          )}
        </div>
      </form>
    </>
  );
};

const ContentPage = () => {
  const { id } = useParams();
  const replyview = useSelector((state) => state.DetialReplyview.DRVset);
  const writeSet = useSelector((state) => state.contentWriteBoolean.CWBool);
  const dispatch = useDispatch();
  const data = ReplyList(id);

  return (
    <>
      <div>
        {writeSet && true ? (
          <Detail data={data} />
        ) : (
          <Detail data={undefined} />
        )}
      </div>
      <div>{replyview && true ? <Reply data={data} /> : null}</div>
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
