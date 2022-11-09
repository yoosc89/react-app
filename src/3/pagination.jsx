import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { batch, useDispatch } from "react-redux";

const Dropdown = (props) => {
  return (
    <li>
      <a class="dropdown-item" onClick={() => props.setsize(props.pagesize)}>
        {props.pagesize}
      </a>
    </li>
  );
};
const Pagenumber = (page, total) => {
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

const Pagination = (props) => {
  const page = Number(props.page);
  const size = props.size;
  const total = Math.ceil(props.data.total / size);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation;
  const dropdownlist = [10, 20, 50, 100, 200, 500, 1000];

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
                {dropdownlist &&
                  dropdownlist.map((item) => (
                    <Dropdown pagesize={item} setsize={props.setsize} />
                  ))}
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
          {Pagenumber(page, total)}
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
