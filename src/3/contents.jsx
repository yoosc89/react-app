import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const CRowData = ({ data }) => {
  return data.map((row) => (
    <tr>
      <td>{row.id}</td>
      <td>{row.title}</td>
      <td>{row.writer}</td>
      <td>{row.date}</td>
    </tr>
  ));
};

const GetData = (page, load) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/contents/${page}`, {})
      .then((res) => setData(res.data))
      .catch((err) => {});
  }, [page, load]);

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

const ContentsPage = () => {
  const { id } = useParams();
  const [page, setPage] = useState(id);

  return (
    <div class="m-lg-3">
      <CBody page={page} />
      <div>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a
                class="page-link"
                onClick={() => {
                  setPage(Number(page) - 1);
                }}
              >
                Previous
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                1
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                2
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                3
              </a>
            </li>
            <li class="page-item">
              <a
                class="page-link"
                onClick={() => {
                  setPage(Number(page) + 1);
                }}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ContentsPage;
