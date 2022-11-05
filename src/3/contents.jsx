import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Usb } from "@mui/icons-material";

const CRowData = ({ data }) => {
  return data.map((row) => (
    <tr>
      <td>{row.id}</td>
      <td>
        <Link to="" class="text-decoration-none text-dark">
          {row.title}
        </Link>
      </td>
      <td>{row.writer}</td>
      <td>{row.date}</td>
    </tr>
  ));
};

const GetData = (page, load) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/contents/${page}`)
      .then((res) => setData(res.data))
      .catch((err) => {});
  }, [page, load]);

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

const CBody = ({ page }) => {
  return (
    <table class="table table-hover ">
      <thead>
        <tr>
          <th>번호</th>
          <th class="w-50">게시글</th>
          <th class="w-10">작성자</th>
          <th class="w-25">작성시간</th>
        </tr>
      </thead>
      <tbody>
        <CRowData data={GetData(page)} />
      </tbody>
    </table>
  );
};

const Pagination = () => {
  const { id } = useParams();
  const lastid = LastPageNumber();
  const pages = [
    Number(id) - 10,
    Number(id) - 2,
    Number(id) - 1,
    Number(id),
    Number(id) + 1,
    Number(id) + 2,
    Number(id) + 10,
  ];

  const pageSize =
    Number(lastid) % 10 > 0 ? Number(lastid) / 10 : Number(lastid) / 10 - 1;

  return (
    <nav aria-label="navigation ">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link">
            <Link
              to={`/contents/${Number(id) === 1 ? Number(id) : Number(id) - 1}`}
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
              <Link class="page-link" to={`/contents/${number}`}>
                {number}
              </Link>
            </li>
          ))}

        <li class="page-item">
          <a class="page-link">
            <Link
              to={`/contents/${
                Number(id) <= pageSize ? Number(id) + 1 : Number(id)
              }`}
              class="text-decoration-none"
            >
              Next
            </Link>
          </a>
        </li>
      </ul>
    </nav>
  );
};

const ContentsPage = () => {
  const { id } = useParams();

  return (
    <div class="m-lg-3">
      <div>
        <CBody page={id} />
      </div>
      <div>
        <Pagination id={id} />
      </div>
    </div>
  );
};

export default ContentsPage;
