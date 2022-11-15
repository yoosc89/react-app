import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { WriteReply, ModifyReply, Deletereply, QuesionReplyList } from "./sync";
import dayjs from "dayjs";

const ReplyList = (props) => {
  const [submit, setsubmit] = useState(0);
  const [modify, setmodify] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (submit === 1) {
      ModifyReply(e, props.data.id, (callback) => {
        props.setload(Math.random());
      });
    } else if (submit === 2) {
      Deletereply(e, props.data.id, () => {
        props.setload(Math.random());
      });
    }
  };

  return (
    <>
      <form method="post" onSubmit={onSubmit}>
        <textarea
          type="text"
          class="form-control mt-4"
          name="reply"
          defaultValue={props.data.content}
          readOnly={!modify}
          rows="3"
        />
        {props.data.user?.user_id === localStorage.getItem("user_id") ? (
          modify ? (
            <div>
              <button
                type="submit"
                class="btn btn-primary mt-4 w-75 mb-4"
                onClick={() => {
                  setsubmit(1);
                  setmodify(false);
                }}
              >
                수정완료
              </button>
              <button
                type="submit"
                class="btn btn-danger mt-4 w-25 mb-4"
                onClick={() => setmodify(false)}
              >
                취소
              </button>
            </div>
          ) : (
            <div>
              <button
                class="btn btn-warning mt-4 w-75 mb-4"
                type="submit"
                onClick={() => setmodify(true)}
              >
                댓글수정
              </button>

              <button
                class="btn btn-danger mt-4 w-25 mb-4"
                type="submit"
                onClick={() => setsubmit(2)}
              >
                삭제
              </button>
            </div>
          )
        ) : null}
      </form>
    </>
  );
};

const ReplyListpage = (props) => {
  const { detail } = useParams();
  const data = QuesionReplyList(detail, props.load);
  console.log(props.load);

  return (
    <>
      {data.answers &&
        data.answers.map((answer) => (
          <>
            <div
              class="row mt-2 pt-2 pb-2 text-bg-secondary"
              ref={(ele) => (props.inputref.current[`${answer.id}`] = ele)}
            >
              <div class="col text-start ms-3">{answer.user?.user_id}</div>
              <div class="col text-end me-3">
                작성 날짜 :{" "}
                {dayjs(answer.create_date).format("YYYY-MM-DD HH:mm:ss")}
              </div>
            </div>
            <div class="row pt-2 pb-2 ">
              <ReplyList data={answer} setload={props.setload} />
            </div>
          </>
        ))}
    </>
  );
};

const ReplyInput = (props) => {
  const [data, setdata] = useState([]);
  const { detail } = useParams();
  return (
    <>
      <form
        method="post"
        onSubmit={(e) => {
          WriteReply(detail, e, async (callback) => {
            await setdata({ content: "" });
            await props.setload(Math.random());
            await props.inputref.current?.at(-1).scrollIntoView({
              behavior: "auto",
              block: "start",
            });
          });
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
          ref={(ele) => (props.inputref.current["createreply"] = ele)}
        />
        <button type="summit" class="btn btn-primary mt-4 w-100 mb-4">
          댓글작성
        </button>
      </form>
    </>
  );
};

export const ReplyToggle = (props) => {
  return (
    <div class="justify-content-center">
      {props.toggle ? (
        <button
          type="button"
          class="btn btn-outline-primary"
          onClick={() => {
            props.settoggle(false);
          }}
        >
          댓글닫기
        </button>
      ) : (
        <button
          type="button"
          class="btn btn-outline-primary"
          onClick={async (e) => {
            await setTimeout(props.settoggle(true), 2000);
            await props.inputref.current["createreply"].scrollIntoView({
              block: "center",
            });
          }}
        >
          댓글보기
        </button>
      )}
    </div>
  );
};

const Reply = (props) => {
  const [toggle, settoggle] = useState(false);

  const inputref = useRef([]);

  return (
    <>
      <ReplyToggle toggle={toggle} inputref={inputref} settoggle={settoggle} />
      <>
        {toggle ? (
          <>
            <ReplyInput inputref={inputref} setload={props.setload} />
            <ReplyListpage
              inputref={inputref}
              load={props.load}
              setload={props.setload}
            />
          </>
        ) : null}
      </>
    </>
  );
};

export default Reply;
