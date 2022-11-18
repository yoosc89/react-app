import "./scss/new_product.scss";
import { AxiosProductCreate } from "./axios";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <form
          method="post"
          typ="submit"
          onSubmit={(e) => {
            e.preventDefault();
            AxiosProductCreate(e, (callback) => {
              navigate(`/shopping/product_list/detail${callback.id}`);
            });
          }}
        >
          <div class="justify-content-start text-center m-3 flex">
            <div class="col-4">
              <div class=" form-floating w-100">
                <input
                  name="cache"
                  class="form-control-color form-control w-100"
                  placeholder=" "
                />
                <label for="cache">가격 </label>
              </div>
            </div>
            <div class="col-4 ps-3">
              <div class=" form-floating w-100">
                <input
                  name="discount"
                  class="form-control-color form-control w-100"
                  placeholder=" "
                />
                <label for="discount">할인액 </label>
              </div>
            </div>
            <div class="col-4 ps-3">
              <div class=" form-floating w-100">
                <input
                  name="shipping_fee"
                  class="form-control-color form-control w-100"
                  placeholder=" "
                />
                <label for="shipping_fee">배송비 </label>
              </div>
            </div>
          </div>
          <div class="justify-content-end text-center m-3 flex">
            <div class="form-floating w-100">
              <input
                name="item_name"
                type="text"
                class="form-control-color form-control w-100"
                placeholder="  "
              />
              <label for="item_name">Subject</label>
            </div>
          </div>
          <div class="m-3">
            <div class=" form-label">
              <label for="item_content">Body</label>
              <textarea
                name="item_content"
                class=" w-100 new-product-height-400-1000"
              />
            </div>
          </div>
          <div class="m-3 text-center">
            <div class="input-group mb-3 mt-3">
              <label for="thumnail" class="input-group-text">
                대표이미지
              </label>
              <input type="file" name="thumnail" class=" form-control" />
            </div>
            <div class="input-group mt-3 mb-3">
              <label for="thumnail" class="input-group-text">
                이미지
              </label>
              <input type="file" name="files" class=" form-control" multiple />
            </div>
            <div>
              <button class="btn btn-primary" type="submit">
                작성 완료
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewProduct;
