import { useState } from "react";
import { useParams } from "react-router-dom";
import { AxoisProductDetail } from "./axios";

import "./scss/product_detail.scss";

const ProductDetail = (props) => {
  const [count, setcount] = useState(1);
  const [more, setmore] = useState(false);
  const { detail } = useParams();
  const data = AxoisProductDetail(detail);
  const cache = data.cache?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const discount = data.discount
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const shipping_fee = data.shipping_fee
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const image = [];

  for (let i = 10; i < 30; i++) {
    image.push(`https://picsum.photos/400/4${i}/?random`);
  }
  const onincrese = (e) => {
    setcount(count + 1);
  };
  const disincrese = (e) => {
    count > 1 ? setcount(count - 1) : setcount(1);
  };

  return (
    <div class="m-3 rounded-2 boderblack1px shadow prodeuct-detail-fadein">
      <div>
        <button class="btn" onClick={() => props.setproductdetailview(false)}>
          <a class="product-detail-close-text text-decoration-none">X</a>
        </button>
      </div>
      <div class="">
        <div class="flex">
          <div class="mt-4 ms-4 align-items-center">
            <img
              src="https://picsum.photos/800/800/?random"
              class="thumnaildetail rounded-4 mt-5 shadow-lg"
            ></img>
          </div>
          <div class="witdhflex m-4 leftborodr">
            <div class="ms-4">
              <div class="mt-2 title1">
                {props.params} {data.item_name}
              </div>
              <div class="mt-2">
                <a class="font20px text-nonedeco">Price : </a>
                <a class="font20px text-nonedeco">$ {discount}</a>
                <a>&nbsp;&nbsp;&nbsp;</a>
                <a class="text-small text-line-through text-nonedeco">
                  $ {cache}
                </a>
                <a>&nbsp;&nbsp;</a>
                <a class="text-nonedeco text-red">
                  {((data.cache - data.discount) * 100) / data.cache}% Discount
                </a>
              </div>
              <div class="mt-2 height300px overflow-auto">
                {data.item_content}
              </div>

              <div class="mt-2 flex">
                <div class="product-detail-width100px counttext">
                  <a>Count : &nbsp;</a>
                  <a class="textbold">{count}</a>
                </div>
                <button class="btn" onClick={disincrese}>
                  {"▼"}
                </button>
                <button class="btn" onClick={onincrese}>
                  {"▲"}
                </button>
              </div>

              <div class="flex mt-3">
                <div class="col-4">
                  <button class="btn btn-outline-primary w-100">
                    장바구니
                  </button>
                </div>
                <div class="col-1"></div>
                <div class="col-4">
                  <button class="btn btn-outline-primary w-100">
                    구매하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class={`${
            !more ? "height180px" : "heightmax1000px"
          } text-center m-4 bodertop1pxblack transition`}
        >
          <div class="mt-4">
            {image.map((item) => (
              <img src={item} class="thumnaillist flex-fill rounded-3 fadein" />
            ))}
          </div>
        </div>
        <div class="text-center">
          {!more ? (
            <p
              class="btn btn-outline-primary"
              onClick={() => {
                setmore(true);
              }}
            >
              더보기
            </p>
          ) : (
            <p
              class="btn btn-outline-primary"
              onClick={() => {
                setmore(false);
              }}
            >
              닫기
            </p>
          )}
        </div>
        <div
          class="product-detail-bottom"
          onClick={() => props.setproductdetailview(false)}
        >
          상품닫기
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
