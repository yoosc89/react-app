import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Reply from "./detail_reply";
import {
  CreatePost,
  ReplyList,
  ModifyPost,
  Deletepost,
  Savefile,
} from "./sync";
import Slider from "react-slick";
import { useParams, Link } from "react-router-dom";

const CarouselSlide = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    pauseOnHover: true,
    swipeToSlide: true,
  };
  return (
    <>
      <div class="mb-4 mt-4">
        <Slider {...settings}>
          {props.data &&
            props.data.files?.map((item) => (
              <div>
                <img
                  class="img-thumbnail"
                  height={200}
                  src={`http://localhost:8000/api/files/question/${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(e.target.src, "_blank");
                  }}
                />
              </div>
            ))}
        </Slider>
      </div>
    </>
  );
};

export const Createcontent = (props) => {
  const { contents, detail } = useParams();

  const replace = async (id) => {
    await window.location.replace(
      `http://localhost:3000/contents/${contents}/detail/${id}`
    );
  };
  return (
    <>
      <form
        enctype="multipart/form-data"
        method="post"
        class="mb-3"
        onSubmit={(e) => {
          CreatePost(e, (callback) => {
            setTimeout(Savefile(e, callback.id), 1000);
            setTimeout(replace(callback.id), 1000);
          });
        }}
      >
        <div class="mb-3">
          <div class=" text-bg-secondary p-2 text-sm-center">글쓰기</div>
          <input type="text" class="form-control mt-3" name="subject"></input>
        </div>
        <div class="mb-3">
          <div class=" text-bg-secondary p-2 text-sm-center">내용</div>
          <textarea
            class="form-control mt-3"
            name="content"
            rows="3"
            maxLength={200}
          ></textarea>
          <input
            class="form-control mt-3"
            type="file"
            name="file"
            multiple
          ></input>
          <button class="mt-3 btn btn-secondary w-100" type="submit">
            글쓰기
          </button>
        </div>
      </form>
    </>
  );
};

export const Detailcontent = () => {
  const [modify, setmodify] = useState(false);
  const [submit, setsubmit] = useState(0);
  const { detail, contents } = useParams();
  const data = ReplyList(detail);

  const onsubmit = (e) => {
    if (submit === 1) {
      ModifyPost(e, data.id, (callback) => {
        Savefile(e, data.id);
      });
    } else if (submit === 2) {
      Deletepost(e, data.id);
    }
  };

  return (
    <>
      <form
        enctype="multipart/form-data"
        method="post"
        class="mb-3"
        onSubmit={onsubmit}
      >
        <div class="mb-3">
          <div class=" text-bg-secondary p-2 text-sm-center">
            제목 [ID:{data.id}]
          </div>
          <input
            type="text"
            class="form-control mt-3"
            name="subject"
            defaultValue={data.subject}
            readOnly={!modify}
          ></input>
        </div>
        <div class="mb">
          <div class=" text-bg-secondary p-2 text-sm-center">내용</div>
          <textarea
            class="form-control mt-3"
            name="content"
            rows="3"
            maxLength={200}
            defaultValue={data.content}
            readOnly={!modify}
          ></textarea>
          {data.files?.length ? <CarouselSlide data={data} /> : null}
          {data.user &&
          data.user.user_id === localStorage.getItem("user_id") ? (
            modify ? (
              <div>
                <input
                  class="form-control mt-3"
                  type="file"
                  name="file"
                  multiple
                />
                <button
                  class="mt-3 btn btn-primary w-75"
                  type="submit"
                  onClick={() => setsubmit(1)}
                >
                  수정완료
                </button>
                <button
                  class="mt-3 btn btn-warning w-25"
                  type="submit"
                  onClick={() => setmodify(false)}
                >
                  취소
                </button>
              </div>
            ) : (
              <div>
                <button
                  class="mt-3 btn btn-secondary w-75"
                  type="submit"
                  onClick={() => setmodify(true)}
                >
                  수정하기
                </button>
                <button
                  class="mt-3 btn btn-danger w-25"
                  type="submit"
                  onClick={() => setsubmit(2)}
                >
                  삭제
                </button>
              </div>
            )
          ) : null}
        </div>
      </form>
      <Reply />
    </>
  );
};

const ContentPage = (props) => {
  const [replyview, setreplyview] = useState(false);

  return (
    <>
      <div>
        {replyview && true ? (
          <Reply Qid={props.Qid} data={props.answers} reload={props.reload} />
        ) : null}
      </div>
    </>
  );
};

export default ContentPage;
