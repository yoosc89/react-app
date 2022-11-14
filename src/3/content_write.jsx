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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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
  const [content, getcontent] = useState();
  console.log(content);
  return (
    <>
      <form
        enctype="multipart/form-data"
        method="post"
        class="mb-3"
        onSubmit={(e) => {
          CreatePost(e, content, (callback) => {
            Savefile(e, callback.id, () =>
              window.location.replace(
                `http://localhost:3000/contents/${contents}/detail/${callback.id}`
              )
            );
          });
        }}
      >
        <div class="mb-3">
          <div class=" text-bg-secondary p-2 text-sm-center">글쓰기</div>
          <input type="text" class="form-control mt-3" name="subject"></input>
        </div>
        <div class="mb-3">
          <div class=" text-bg-secondary p-2 text-sm-center">내용</div>
          <CKEditor
            id="createcontent"
            editor={ClassicEditor}
            disabled={false}
            data={content}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              getcontent(editor.getData());
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
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

export const Detailcontent = (props) => {
  const [modify, setmodify] = useState(false);
  const [submit, setsubmit] = useState(0);
  const { detail, contents } = useParams();
  const navigate = useNavigate();
  const data = ReplyList(detail, props?.load);
  const [content, getcontent] = useState("");
  useEffect(() => {
    getcontent(data.content);
  }, []);

  const onsubmit = (e) => {
    if (submit === 1) {
      ModifyPost(e, data.id, content.content, () =>
        Savefile(e, data.id, () => window.location.reload())
      );
    } else if (submit === 2) {
      Deletepost(e, data.id, async () => {
        props.reload(Math.random());
        await navigate(`/contents/${contents}`);
      });
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
          <CKEditor
            editor={ClassicEditor}
            disabled={!modify}
            data={data.content}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              //console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              getcontent({ ...data, content: editor.getData() });
            }}
            onBlur={(event, editor) => {
              //console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              //console.log("Focus.", editor);
            }}
          />
        </div>
        <div>
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
                  onClick={async () => {
                    setsubmit(1);
                  }}
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

      <Reply load={props.load} setload={props.reload} />
    </>
  );
};

const ContentPage = (props) => {
  return;
};

export default ContentPage;
