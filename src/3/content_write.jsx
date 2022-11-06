import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const GetData = (num) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/question/list/detail/${num}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {});
  }, [num]);
  return data;
};

const Detail = ({ num }) => {
  const [newData, setNewData] = useState({ subject: "", content: "" });
  const writeSet = useSelector((state) => state.contentWriteBoolean.CWBool);

  const data = GetData(num);

  return (
    <div>
      <div class="mb-3">
        <label for="Input1" class="form-label">
          제목 :
        </label>
        <input
          type="text"
          class="form-control"
          id="Input1"
          placeholder="Subject"
          defaultValue={data.subject}
          disabled={writeSet}
          onChange={(e) => {
            setNewData({ subject: e.target.value });
          }}
        ></input>
      </div>
      <div class="mb-3">
        <label for="Textarea1" class="form-label">
          본문 :
        </label>
        <textarea
          class="form-control"
          id="Textarea1"
          rows="5"
          defaultValue={data.content}
          disabled={writeSet}
          onChange={(e) => {
            setNewData({ content: e.target.value });
          }}
        ></textarea>
      </div>
    </div>
  );
};

const ContentPage = () => {
  const num = useSelector((state) => state.detailNumber.num);
  return (
    <div>
      <Detail num={num} />
    </div>
  );
};

export default ContentPage;
