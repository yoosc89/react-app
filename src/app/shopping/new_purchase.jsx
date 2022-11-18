import "./scss/new_purchase.scss";
import { AxoisOrderConsumer, AxoisProductDetail } from "./axios";
import { useState } from "react";

const ItemRow = (props) => {
  return (
    <>
      <div class="row">
        <div class="col col-2 new_purchase-height-50px new_purchase-pt-12px text-end">{props.label}</div>
        <div class="col pt-2 ">
          {props.value ? (
            <input
              class={`new_purchase-input ${
                props.readOnly ? "new_purchase-input-readonly" : "new_purchase-input-write"
              }`}
              readOnly={props.readOnly}
              value={props.value}
            />
          ) : (
            <input
              class={`new_purchase-input ${
                props.readOnly ? "new_purchase-input-readonly" : "new_purchase-input-write"
              }`}
              readOnly={props.readOnly}
              defaultValue={props.defaultValue}
            />
          )}
        </div>
      </div>
    </>
  );
};

const Purchase = () => {
  return (
    <>
      <div class="shadow m-4 rounded-2 bg-white new_purchase-main-width">
        <div class="p-3 ps-4 new_purchase-text-30px new_purchase-text-bold new_purchase-text-spacing">주문 / 결제</div>
      </div>
    </>
  );
};

const BuyerInfo = (props) => {
  const [modify, setmodify] = useState(true);
  const data = props.data;

  return (
    <>
      <div class="shadow m-4 rounded-2 bg-white new_purchase-main-width ">
        <div class="row p-4">
          <div class="new_purchase-text-bold new_purchase-text-23px">구매자</div>
          <div class="ps-4 pt-3 ">
            <ItemRow label="이름" defaultValue={data.user_name} readOnly={modify} />
            <ItemRow label="연락처" defaultValue={data.phone_number} readOnly={modify} />
            <ItemRow label="E-mail" defaultValue={data.email} readOnly={modify} />
          </div>
          <div class="text-center pt-2 pb-2">
            <button
              class="new_purchase-button"
              onClick={(e) => {
                e.preventDefault();
                modify ? setmodify(false) : setmodify(true);
              }}
            >
              변경
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const RecipientInfo = (props) => {
  const [modify, setmodify] = useState(true);
  const data = props.data;

  return (
    <>
      <div class="shadow m-4 rounded-2 bg-white new_purchase-main-width">
        <div class="row p-4">
          <div class="new_purchase-text-bold new_purchase-text-23px">받는사람</div>
          <div class="ps-4 pt-3 ">
            <ItemRow label="이름" defaultValue={data.user_name} readOnly={modify} />
            <ItemRow label="연락처" defaultValue={data.phone_number} readOnly={modify} />
            <ItemRow label="주소" defaultValue={data.address1} readOnly={modify} />
            <ItemRow label="상세주소" defaultValue={data.address2} readOnly={modify} />
            <input class="new_purchase-input-readonly" />
            <div class="text-center pt-2 pb-2">
              <button
                class="new_purchase-button"
                onClick={(e) => {
                  e.preventDefault();
                  modify ? setmodify(false) : setmodify(true);
                }}
              >
                변경
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const OrderInfo = (props) => {
  const data = AxoisProductDetail(localStorage.getItem("product_id"));

  const count = Number(localStorage.getItem("order_count"));
  const discount = Number(data.discount);
  const cache = Number(data.cache);
  const product_price = (discount !== 0 ? discount : cache).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const price = (discount !== 0 ? discount * count : cache * count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <>
      <div class="shadow m-4 rounded-2 bg-white new_purchase-main-width">
        <div class="row p-4">
          <div class="new_purchase-text-bold new_purchase-text-23px new_purchase-main-width">주문정보</div>
          <div class="ps-4 pt-3 ">
            <ItemRow label="수량" defaultValue={count} readOnly={true} />
            <ItemRow label="상품금액" value={product_price} readOnly={true} />
            <ItemRow label="결제금액" value={price} readOnly={true} />
          </div>
        </div>
      </div>
    </>
  );
};

const NewPurchase = (props) => {
  const consumerdata = AxoisOrderConsumer(Math.random());
  return (
    <div class="new_purchase-main ">
      <div class="shadow m-3 rounded-2 bg-white ">주문상품</div>
      <form type="submit">
        <Purchase />
        <BuyerInfo data={consumerdata} />
        <RecipientInfo data={consumerdata} />
        <OrderInfo />
        <div class="text-center mt-5 mb-5">
          <button class="btn btn-outline-success w-50">주문하기</button>
        </div>
      </form>
    </div>
  );
};

export default NewPurchase;
