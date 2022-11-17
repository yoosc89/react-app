import "./scss/new_product.scss";

const NewProduct = () => {
  return (
    <>
      <div>
        <div class="justify-content-start text-center m-3 flex">
          <div class="col-4">
            <div class=" form-floating w-100">
              <input
                name="id"
                class="form-control-color form-control w-100"
                placeholder=" "
              />
              <label for="id">가격 </label>
            </div>
          </div>
          <div class="col-4 ps-3">
            <div class=" form-floating w-100">
              <input
                name="id"
                class="form-control-color form-control w-100"
                placeholder=" "
              />
              <label for="id">할인액 </label>
            </div>
          </div>
          <div class="col-4 ps-3">
            <div class=" form-floating w-100">
              <input
                name="id"
                class="form-control-color form-control w-100"
                placeholder=" "
              />
              <label for="id">기타 </label>
            </div>
          </div>
        </div>
        <div class="justify-content-end text-center m-3 flex">
          <div class="form-floating w-100">
            <input
              name="subject"
              type="text"
              class="form-control-color form-control w-100"
              placeholder="  "
            />
            <label for="subject">Subject</label>
          </div>
        </div>
        <div class="m-3">
          <div class=" form-label">
            <label for="subject">Body</label>
            <textarea class=" w-100 new-product-height-400-1000" />
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
            <input type="file" name="thumnail" class=" form-control" multiple />
          </div>
          <div>
            <button class="btn btn-primary">작성 완료</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
