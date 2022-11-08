import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { batch, useDispatch } from "react-redux";
import { LastPageNumber } from "./sync";
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
            });
          }
        }}
      >
        글쓰기
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

export default Pagination;
