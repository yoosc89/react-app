import { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector, batch } from "react-redux";
import ContentPage from "./content_write";
import dayjs from "dayjs";

const CRowList = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation;

  const isloginstate = (path) => {
    if (!localStorage.getItem("islogin")) {
      navigate("/login", { state: pathname });
    } else {
      navigate(`detail/${path}`);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      batch(() => {
        dispatch({ type: "detailTrue" });
        dispatch({ type: "CWBtrue" });
      });
    }
  };
  return data.map((row) => (
    <tr>
      <td>{row.id}</td>
      <td>
        <a
          class="text-decoration-none text-dark"
          onClick={() => {
            isloginstate(row.id);
          }}
        >
          {row.subject}
        </a>
        <a class="text-primary text-decoration-none"> [{row.answers.length}]</a>
      </td>
      <td></td>
      <td>{dayjs(row.create_date).format("YYYY-MM-DD HH:mm:ss")}</td>
    </tr>
  ));
};

export const GetData = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/question/list`)
      .then((res) => setData(res.data))
      .catch((err) => {});
  }, []);

  return data;
};

const LastPageNumber = () => {
  const [data, setData] = useState(0);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/contents/lastnumber`)
      .then((res) => setData(res.data))
      .catch((err) => {});
  }, []);

  return data;
};

const CBody = ({ data }) => {
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
        <CRowList data={data} />
      </tbody>
    </table>
  );
};

const Pagination = () => {
  let { id } = useParams();
  id = Number(id);
  const lastid = Number(LastPageNumber());

  const pages = [id - 9, id - 4, id - 1, id, id + 1, id + 4, id + 9];

  const pageSize = lastid % 10 > 0 ? lastid / 10 : lastid / 10 - 1;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation;

  return (
    <>
      <button
        class="btn btn-primary"
        onClick={() => {
          if (!localStorage.getItem("islogin")) {
            alert("로그인 후 이용 가능합니다");
            navigate("/login", { state: pathname });
          } else {
            batch(() => {
              dispatch({ type: "detailTrue" });
              dispatch({ type: "CWBtrue" });
              dispatch({ type: "WMTrue" });
            });
          }
        }}
      >
        {" "}
        글쓰기{" "}
      </button>
      <nav aria-label="navigation ">
        <ul class="pagination justify-content-center">
          <li class="page-item">
            <a class="page-link">
              <Link
                to={`/contents/${id === 1 ? id : id - 1}`}
                class="text-decoration-none"
              >
                Previous
              </Link>
            </a>
          </li>
          {pages
            .filter((number) => number > 0 && number <= pageSize + 1)
            .map((number) => (
              <li class="page-item">
                {number === id ? (
                  <a class="page-link active">{number}</a>
                ) : (
                  <Link class="page-link" to={`/contents/${number}`}>
                    {number}
                  </Link>
                )}
              </li>
            ))}

          <li class="page-item">
            <a class="page-link">
              <Link
                to={`/contents/${id <= pageSize ? id + 1 : id}`}
                class="text-decoration-none"
              >
                Next
              </Link>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

const ContentsPage = () => {
  const { id } = useParams();
  const show = useSelector((state) => state.contentShowSetting.bool);
  const data = GetData();

  return (
    <div class="m-lg-3">
      <div>{show && true ? <ContentPage id={id} /> : null}</div>
      <div class="mt-4">
        <CBody data={data} />
      </div>
      <div class="position-relative">{<Pagination id={id} />}</div>
    </div>
  );
};

export default ContentsPage;
