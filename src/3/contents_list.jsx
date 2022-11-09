import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector, batch } from "react-redux";
import ContentPage from "./content_write";
import dayjs from "dayjs";
import { ContentList } from "./sync";
import Pagination from "./pagination";
import { useState } from "react";

const CRowList = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation;
  const Isloginstate = (path) => {
    if (!localStorage.getItem("islogin")) {
      navigate("/login", { state: pathname });
    } else {
      navigate(`detail/${path}`);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      batch(() => {
        dispatch({ type: "detailTrue" });
        dispatch({ type: "CWBfalse" });
      });
    }
  };
  return (
    props.data.question_list &&
    props.data.question_list.map((row) => (
      <tr>
        <td>{row.id}</td>
        <td>
          <a
            class="text-decoration-none text-dark"
            onClick={() => {
              Isloginstate(row.id);
            }}
          >
            {row.subject}
          </a>
          <a class="text-primary text-decoration-none">
            [{row.answers.length}]
          </a>
        </td>
        <td>{row.user && true ? row.user.user_id : null}</td>
        <td>{dayjs(row.create_date).format("YYYY-MM-DD HH:mm:ss")}</td>
      </tr>
    ))
  );
};

const CBody = (props) => {
  console.log(props.load);

  return (
    <table class="table table-hover ">
      <thead>
        <tr>
          <th>번호</th>
          <th class="w-50">게시글</th>
          <th class="w-25">작성자</th>
          <th class="">작성시간</th>
        </tr>
      </thead>
      <tbody>
        <CRowList data={ContentList(props.load)} />
      </tbody>
    </table>
  );
};

const ContentsPage = () => {
  const show = useSelector((state) => state.contentShowSetting.bool);
  const [load, reload] = useState("");

  return (
    <div class="m-lg-3">
      <div>{show && true ? <ContentPage reload={reload} /> : null}</div>
      <div class="mt-4">
        <CBody load={load} />
      </div>
      <div class="position-relative">{<Pagination />}</div>
    </div>
  );
};

export default ContentsPage;
