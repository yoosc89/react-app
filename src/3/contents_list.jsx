import {
  useNavigate,
  useLocation,
  useParams,
  Route,
  Routes,
  NavLink,
  Link,
} from "react-router-dom";
import dayjs from "dayjs";
import { ContentList, Deletepost } from "./sync";
import Pagination from "./pagination";
import { useState } from "react";
import { Detailcontent, Createcontent } from "./content_write";

const CRowList = (props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { contents } = useParams();

  const cheklist = (chked, id) => {
    if (chked) {
      props.setChked([...props.chked, id]);
    } else {
      props.setChked(props.chked.filter((item) => item !== id));
    }
  };

  const Isloginstate = (user_id, id) => {
    if (!localStorage.getItem("islogin")) {
      navigate("/login", { state: { pathname: pathname } });
    } else {
      window.location.replace(
        `http://localhost:3000/contents/${contents}/detail/${id}`
      );
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  };

  return (
    props.data.question_list &&
    props.data.question_list.map((row) => (
      <tr>
        <td>
          <input
            type="checkbox"
            name={`list-sel-${row.id}`}
            onChange={(e) => cheklist(e.target.checked, row.id)}
            checked={props.chked.includes(row.id) ? true : false}
          />
        </td>
        <td>{row.id}</td>
        <td>
          <a
            class="text-decoration-none text-dark"
            onClick={(e) => {
              Isloginstate(row.user.user_id, row.id);
              props.setid(row.id);
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
        <td>
          {row.user?.user_id === localStorage.getItem("user_id") ? (
            <a
              onClick={(e) => {
                Deletepost(e, row.id);
                window.location.replace(
                  `http://localhost:3000/contents/${contents}`
                );
              }}
            >
              삭제
            </a>
          ) : null}
        </td>
      </tr>
    ))
  );
};

const CBody = (props) => {
  return (
    <table class="table table-hover " onSelect={1}>
      <thead>
        <tr>
          <th>선택</th>
          <th>번호</th>
          <th class="w-50">게시글</th>
          <th class="">작성자</th>
          <th class="">작성시간</th>
          <th>삭제</th>
        </tr>
      </thead>
      <tbody>
        <CRowList
          data={props.data}
          setid={props.setid}
          answers={props.answers}
          setChked={props.setChked}
          chked={props.chked}
          setshow={props.setshow}
        />
      </tbody>
    </table>
  );
};

const ContentsPage = () => {
  const [show, setshow] = useState(false);
  const [load, reload] = useState(0.0);
  const [size, setsize] = useState(10);
  const { contents } = useParams();
  const [contentid, setcontentid] = useState(0);
  const [answers, setanswers] = useState([]);
  const data = ContentList(load, contents, size);
  const [chked, setChked] = useState([]);

  return (
    <div class="m-lg-3">
      <Routes>
        <Route path={`detail`}>
          <Route path=":detail" element={<Detailcontent />} />
          <Route path="new" element={<Createcontent />} />
        </Route>
      </Routes>

      <div class="mt-4">
        <CBody
          data={data}
          setid={setcontentid}
          answers={setanswers}
          setChked={setChked}
          chked={chked}
          setshow={setshow}
        />
      </div>
      <div class="position-relative">
        {
          <Pagination
            data={data}
            size={size}
            page={contents}
            setsize={setsize}
            setid={setcontentid}
            reload={reload}
            chked={chked}
            setChked={setChked}
          />
        }
      </div>
    </div>
  );
};

export default ContentsPage;
