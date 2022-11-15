import { useLocation, useNavigate, Link } from "react-router-dom";
import { Deletepost } from "./sync";

const SelectAndDelete = (props) => {
  const userfilter = (props) => {
    const list = [];
    props.data.question_list.forEach((ele) => {
      if (ele.user.user_id === localStorage.getItem("user_id")) {
        list.push(ele.id);
      }
    });
    return list;
  };

  const chkedAll = (e) => {
    if (userfilter(props).length !== props.chked.length) {
      props.setChked(userfilter(props));
    } else {
      props.setChked([]);
    }
  };

  return (
    <>
      <button type="button" class="btn btn-dark me-2" onClick={chkedAll}>
        선택 ({props.chked.length})
      </button>
      {props.chked.length > 0 ? (
        <button
          type="button"
          class="btn btn-dark me-2"
          onClick={(e) =>
            Deletepost(e, props.chked, () => window.location.reload())
          }
        >
          삭제 ({props.chked.length})
        </button>
      ) : null}
    </>
  );
};
const Dropdown = (props) => {
  return (
    <li>
      <a class="dropdown-item" onClick={() => props.setsize(props.pagesize)}>
        {props.pagesize}
      </a>
    </li>
  );
};

const PagePerButton = (props) => {
  const dropdownlist = [10, 20, 50, 100, 200, 500, 1000];
  return (
    <div class="btn-group me-2">
      <button
        type="button"
        class="btn btn-danger dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        페이지 표시 ({props.size})
      </button>
      <ul class="dropdown-menu">
        {dropdownlist &&
          dropdownlist.map((item) => (
            <Dropdown pagesize={item} setsize={props.setsize} />
          ))}
      </ul>
    </div>
  );
};

const Searchbox = (props) => {
  return (
    <form
      class="input-group"
      type="submit"
      onSubmit={(e) => {
        e.preventDefault();
        props.setkeyword(e.target.keyword.value);
      }}
    >
      <input
        type="text"
        name="keyword"
        class="form-control"
        placeholder="검색"
      />
      <button class="btn btn-outline-secondary" type="submit">
        검색
      </button>
    </form>
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
  const total = Math.ceil(props.data.total / props.size);
  const navigate = useNavigate();
  const { pathname } = useLocation;

  const ConfirmLogin = (e) => {
    if (!localStorage.getItem("islogin")) {
      alert("로그인 후 이용 가능합니다");
      navigate("/login", { state: pathname });
    } else {
      navigate("detail/new");
    }
  };
  return (
    <>
      <div class=" container-fluid">
        <div class="row">
          <div class="col-8">
            <PagePerButton size={props.size} setsize={props.setsize} />
            <SelectAndDelete
              chked={props.chked}
              setChked={props.setChked}
              data={props.data}
              setsize={props.setsize}
              reload={props.reload}
            />
            <button class="btn btn-primary" onClick={ConfirmLogin}>
              글쓰기
            </button>
          </div>
          <div class="col-4 align-items-end">
            <Searchbox setkeyword={props.setkeyword} />
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
                to={`/contents/${page < total - 1 ? page + 1 : page}`}
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
