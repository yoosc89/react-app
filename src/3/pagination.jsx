import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { batch, useDispatch } from "react-redux";
import { ContentList } from "./sync";

const Pagination = (props) => {
  const page = Number(props.page);
  const size = props.size;
  const total = Math.ceil(props.data.total / size);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation;

  const Pagenumber = (page) => {
    const pagelist = [];
    for (let i = 0; i < total; i++) {
      if (i >= page - 2 && i <= page + 2) {
        pagelist.push(
          <li class="page-item">
            <Link
              class={`page-link ${i === page ? "active" : ""}`}
              to={`/contents/${i}`}
            >
              {i}
            </Link>
          </li>
        );
      }
    }
    return pagelist;
  };

  return (
    <>
      <div class="">
        <div class=" row">
          <div>
            <div class="btn-group me-2">
              <button
                type="button"
                class="btn btn-danger dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                페이지 표시 ({size})
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" onClick={() => props.setsize(10)}>
                    10
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" onClick={() => props.setsize(20)}>
                    20
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" onClick={() => props.setsize(30)}>
                    30
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" onClick={() => props.setsize(50)}>
                    50
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" onClick={() => props.setsize(100)}>
                    100
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" onClick={() => props.setsize(500)}>
                    500
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" onClick={() => props.setsize(1000)}>
                    1000
                  </a>
                </li>
              </ul>
            </div>
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
          </div>
        </div>
      </div>
      <nav aria-label="navigation ">
        <ul class="pagination justify-content-center">
          <li class="page-item">
            <a class="page-link">
              <Link
                to={`/contents/${page === 0 ? page : page - 1}`}
                class="text-decoration-none"
              >
                Previous
              </Link>
            </a>
          </li>
          {Pagenumber(page)}
          <li class="page-item">
            <a class="page-link">
              <Link
                to={`/contents/${page <= total ? page + 1 : page}`}
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
