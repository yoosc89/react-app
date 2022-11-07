import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Reply from "./detail_reply";

export const ReplyList = (id, load) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/question/list/detail/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {});
  }, [id, load]);

  return data;
};

const Detail = ({ data }) => {
  const [newData, setNewData] = useState({ subject: "", content: "" });
  const writeSet = useSelector((state) => state.contentWriteBoolean.CWBool);

  return (
    <div>
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
          defaultValue={data.subject}
          disabled={writeSet}
          onChange={(e) => {
            setNewData({ subject: e.target.value });
          }}
        ></input>
      </div>
      <div class="mb-3">
        <label for="Textarea1" class="form-label">
          본문 :
        </label>
        <textarea
          class="form-control"
          id="Textarea1"
          rows="3"
          maxLength={200}
          defaultValue={data.content}
          disabled={writeSet}
          onChange={(e) => {
            setNewData({ content: e.target.value });
          }}
        ></textarea>
      </div>
    </div>
  );
};

const ContentPage = ({ id }) => {
  const replyview = useSelector((state) => state.DetialReplyview.DRVset);
  const data = ReplyList(id);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <Detail data={data} />
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
    </div>
  );
};

export default ContentPage;
